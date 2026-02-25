# ErrorHandling Service

## Presentation
The CoreModule handles the Error in the Angular application at 2 levels:

* Javascript exceptions
* Http Response errors

## Javascript exceptions
The Javascript exceptions thrown by the application at run-time are being caught by the CoreModule ErrorHandler. Currently, the handler _only_ forwards the error to the [L](https://eui.ecdevops.eu/docs/dev/docs/ux-core-trace.html)ogService to log the error. In the future, it might have other roles added to it, but for now, that's all it does.

What it means is that you are still responsible to handle the error in your component/service.  
Let say for example that you have this code in a component:
```javascript
...
ngOnInit() {
    loadInitialData();
}

private loadInitialData() {
    this.myService.loadData()
        .subscribe((data) => {
            this.title = data.someProperty.title;
        });
}
```
Now if the backend modifies its API and changes `someProperty` by `otherProperty` and did not communicate it (trust me, it happens more often than you'd think :), then the whole component would be broken.  
So if you are working with an unstable API, where changes happen frequently, you need to wrap your code in a try/catch.
```javascript
...
private loadInitialData() {
    this.myService.loadData()
        .subscribe((data) => {
            try {
                this.title = data.someProperty.title;
            } catch(e) {
                this.logService.warning(e.toString());
            }
        });
}
```
## Http Response errors

The CoreModule has an Http Error Handler interceptor that will catch the Http Response from all the Http request whose status is _not_ 200. The interceptor is in charge of either:

*   redirects to an error page.
*   executes a callback function. For example, it notifies the user of the error.
*   does nothing.

## redirect

Redirect means that when an Http Response status (not 200) is caught, the interceptor will redirect the user to a dedicated error page. This means that you need to declare error pages as routes in your `app.routing.module`.

### callback

Callback means that the interceptor will execute a function. For example, a function to show a growl message to the user with the text of the status displayed. The error still propagates and you can even handle the error at the component/service level if needed.

### Usage

In order to use the Http Error Handler interceptor, you need to provide a `httpErrorHandler` property to your application configuration. For more information on how to provide an **appConfig** to the CoreModule, [read the documentation here](https://eui.ecdevops.eu/docs/dev/docs/ux-core-global-config.html).

**index.ts**
```javascript
const appConfig = {
    global: { ... },
    httpErrorHandler: {
        routes: [{
            path: '*',
            default: GrowlHttpErrorCallbackFn,
        }],
    },
};
```
### Customize

You can customize the Http error handling for any particular route, using the `httpErrorHandler` parameter. Please take a look at the structure of this parameter:

```javascript
export interface HttpErrorHandlerConfig {
    /**
     * The list of routes, from specific to generic. The first matching route is handled.
     */
    routes: HttpErrorRouteConfig[];
}

export interface HttpErrorRouteConfig {
    /**
     * The path to match against, a URL string that uses router matching notation. Can include wildcard characters (*).
     */
    path: string;
    /**
     * What to do in case of an error status code.
     * if callback function, call it
     * if string, redirect the router to it
     * if null, do nothing
     */
    [key: number]: HttpErrorCallbackFn | string | null;
    /**
     * Default behavior, if error status code does not match to a specified key
     */
    default?: HttpErrorCallbackFn | string | null;
}

export type HttpErrorCallbackFn = (error: HttpErrorResponse, injector: Injector) => void;

/**
 * Example of callback function
 */
export function GrowlHttpErrorCallbackFn(error: HttpErrorResponse, injector: Injector) {
    const uxService = injector.get(UxService);
    uxService.growlError(error.statusText);
};
```
Let's look at one example:

**index.ts**
```javascript
export const appConfig: EuiAppConfig = {
    global: { ... },
	modules: { ... },
    httpErrorHandler: {
        routes: [
            {
                path: '/test/sendError',
                500: '/page500',
            },
            {
                path: '/test/*',
                404: '/page404',
                default: ConsoleHttpErrorCallbackFn,
            },            
            {
                path: '/admin/*',
                408: null,
                default: LogHttpErrorCallbackFn,
            },               
            {
                path: '*',
                401: '/page401',  
                404: '/page404',
                500: '/page500',
                default: GrowlHttpErrorCallbackFn,
            },
        ],
    },
};
```

<em>**AOT Compilation**</em>
> Because of a bug, the AoT compiler does not accept keys as numbers. In this case, define the status codes as strings. For example, instead of 401: '/page401', use '401': '/page401'
> 
> If a 500 status is sent in the route `/test/sendErro`r, the router will redirect to the /page500. All other routes starting with `/test/` will redirect to `/page404` in case of 404 status or will call the `ConsoleHttpErrorCallbackFn` function otherwise.
> 
> For all the routes starting with `/admin/,` in case of status 408 nothing happens. Otherwise, in case of all other error statuses, the function `LogHttpErrorCallbackFn` is called.
> 
> Finally, if a route is not matching any of the first 3 cases, the last one is executed. Here, a redirect will be performed, in case of 401, 404 or 500 statuses. Otherwise, the `GrowlHttpErrorCallbackFn` function will inform the user with a growl message.

You can add as many routes as you like.

It is recommended to use a wildcard path as the last route to handle Http errors globally.

When your application makes HTTP requests, eUI and Angular are using HTTP interceptors to implement repetitive operations of every request. You can check [eUI Http Interceptors](https://eui.ecdevops.eu/docs/dev/docs/ux-core-http-interceptors.html) and use them in your application. If Http requests are fails, We have to implement some scenarios based on Http status codes. The main goals of the error handling of Http requests are to not broke application, updating application state for fail scenario and providing the user a 'message' which users can understand/communicate.

### HttpErrorHandlerInterceptor
In order to handle Http errors using the `httpErrorHandler` parameter, the `HttpErrorHandlerInterceptor` must be added to your project.

**core.module.ts**
```javascript
...
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorHandlerInterceptor, HTTP_ERROR_HANDLER_CONFIG_TOKEN } from '@eui/core';
... 
@NgModule({ 
... 
    providers: [ 
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandlerInterceptor, multi: true },
... 
    ]
}) 
export class CoreModule { } 
```
### Handle Http error with callback functions
eUI is providing by default 4 callback functions: `AlertHttpErrorCallbackFn`, `ConsoleHttpErrorCallbackFn`, `LogHttpErrorCallbackFn` (similar with the console one, but is using the LogService), `GrowlHttpErrorCallbackFn` (described above).

You can also define your own callback functions. All you need to do is to respect the following definition/type:

export type HttpErrorCallbackFn = (error: HttpErrorResponse, injector: Injector) => void;

Examples:
```javascript
export function AlertHttpErrorCallbackFn(error: HttpErrorResponse) {
    alert(error.statusText);
};
export function ConsoleHttpErrorCallbackFn(error: HttpErrorResponse) {
    console.error('HttpError', error);
};
export function LogHttpErrorCallbackFn(error: HttpErrorResponse, injector: Injector) {
    const logService = injector.get(LogService);
    logService.error('HttpError', error);
};
export function GrowlHttpErrorCallbackFn(error: HttpErrorResponse, injector: Injector) {
    const uxService = injector.get(UxService);
     uxService.growlError(error.statusText);
};
```

### Handling Error Feedback: Component
We have intercepted Http Requests to take different actions based on the status codes, and the modified error object with custom structure. We may need to take some actions at a component level too. For example, you have a form. After submitting the form, there can be back-end validation errors. You may want to show these errors into your component behalf displaying notifications.

**page1.component.ts**
```javascript
import { Component } from '@angular/core';  
import { StatusService } from '../../shared/services/test-status.service';  
import { UxErrorOutputService } from '../../../../core/services/ux-error-output.service';  
 
@Component({  
   templateUrl: './page1.component.html'  
})  
export class Page1Component {  
 
   	success: boolean;  
 	successMessage: string;  
 	uxErrorContainerHelper;  
 
 	constructor( private statusService: StatusService, private uxErrorOutputService: UxErrorOutputService, ) {  
       	// There has been created a helper instance by UxErrorOutputService, to use in template and catch block of request. 
		// <app-ux-error-output [helper]="uxErrorContainerHelper"></app-ux-error-output> in template is using this instance. 
 		this.uxErrorContainerHelper = this.uxErrorOutputService.containerHelper();  
 	}  
 
   	onStatus(status) {  
       this.success = false;  
       this.statusService.getStatus(status).subscribe((stt: Array<any>) => {  
               	this.successMessage = JSON.stringify(stt);  
       			this.success = true;  
 			},  
 			// We are using helper class's handler function here. 
			// This function is registering caught error into UxErrorOutputService and sharing with <app-ux-error-output> component this.uxErrorContainerHelper.containerErrorHandler 
		);  
 	}  
 
   	onStatusNotGeneeric(status) {  
       	this.success = false;  
 		this.statusService.getStatus(status).subscribe((stt: Array<any>) => {  
               	this.successMessage = JSON.stringify(stt);  
 				this.success = true;  
 		},  
 		(err: any) => {  
               // You can implement your custom function too 
 		}  
       );  
 	}  
}
```
### Handling Error Feedback: Ngrx
It is possible to manage the Http request flows with Ngrx. After catching an error we can store the error with Reducers in Store. This example is about the login request failed situation. There are several possibilities like 'wrong password', 'wrong username' etc. _Please note that we are just focusing on handling multiple error feedback. It is obvious that we can't validate a password without knowing who is the user. The mock server is just checking hardcoded values and propagating validation errors_

**auth.effects.ts**
```javascript
...  
   @Effect() login$ = this.actions$  
 	// Listen for the 'LOGIN' action 
 	.ofType<LogInAction>(LOG\_IN)  
    .map(action => action.payload)  
    .switchMap(payload => this.authService.loginRequest(payload.username, payload.password)  
    	// If successful, dispatch success action with result 
 		.map(res => ({ type: LOG\_IN\_SUCCESS, payload: res }))  
               // If request fails, dispatch failed action 
 		.catch((err) => Observable.of({ type: LOG\_IN\_FAILED, payload: { err: err } }))  
     );
...
```
An error has been caught and dispatched failed action.

**auth.reducers.ts**
```javascript
...
const authLogOutFailed = (state: AuthState, action: LogOutFailedAction) => {  
   return Object.assign({}, state, { pending: false, err: action.payload.err });  
};
...
```
The state has been updated by err payload. The response is intercepted by the Http interceptor that we put, so it has the uxErrorOutput property and fits our internal handling logic and error output component.

**login.component.ts**
```javascript
...
 
@Component({  
   selector: 'app-login',  
 templateUrl: './login.component.html',  
 styleUrls: ['./login.component.scss']  
})  
export class LoginComponent implements OnInit {  
   formInput: FormGroup;  
 loggedIn: boolean;  
 authError = [];  
 
 constructor(private auth: AuthService, private fb: FormBuilder, private store: StoreService, private uxErrorOutputService: UxErrorOutputService) {  
       this.store.select(getAuthState).subscribe((authState) => {  
           if (authState.pending) {  
               // We can use this state property for loading spinner 
                 console.log(authState.pending);  
             }  
 
           if (authState.err && authState.err.error) {  
               // After caught error, transforming error output to use into component 
               // <app-ux-error-output [uxErrorOutput]="authError"></app-ux-error-output> 
               this.authError = this.uxErrorOutputService.customErrorOutput(authState.err);    
                                                
         } else {  
               this.authError = [];  
         }  
 
           this.loggedIn = authState.loggedIn;  
         });  
 }  
 
... 
 
}
```
The error has been bind to app-ux-error-output component by **[uxErrorOutput]="authError"**. As you can see that we can provide itemKey if we want to show just related error behalf to show all of them. _Please note that the app-ux-error-output component is an experimental component to demonstrate how we can approach more generic._

**login.component.html**
```html
...
<div class="row">
   <div class="col-md-6">
      <div *ngIf="loggedIn">
         <ux-button (click)="onLogout()">Logout</ux-button>
      </div>
      <form [formGroup]="formInput" *ngIf="!loggedIn">  
      <ux-form-group label="Username">
         <input type="text" formControlName="username"/>  
         <app-ux-error-output [uxErrorOutput]="authError" itemKey="username"></app-ux-error-output>
      </ux-form-group>
      <ux-form-group label="Password">
         <input type="password" formControlName="password"/>  
         <app-ux-error-output [uxErrorOutput]="authError" itemKey="password"></app-ux-error-output>
      </ux-form-group>
      <ux-form-group label="username:'eui' password:'right'">
         <ux-button (click)="onLogin()">Login</ux-button>
      </ux-form-group>
      <ux-form-group>
         <app-ux-error-output [uxErrorOutput]="authError"></app-ux-error-output>
      </ux-form-group>
      </form> 
   </div>
</div>
...
```
