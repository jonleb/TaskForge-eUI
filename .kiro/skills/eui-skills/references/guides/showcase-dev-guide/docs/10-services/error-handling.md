# ErrorHandling Service

## Presentation
The CoreModule handles the Error in the Angular application at 2 levels:

* Javascript exceptions
* Http Response errors

## Javascript exceptions
The Javascript exceptions thrown by the application at run-time are being caught by the CoreModule ErrorHandler. Currently, the handler _only_ forwards the error to the [LogService](https://eui.ecdevops.eu/eui-showcase-ux-components-19.x/showcase-dev-guide/docs/10-services/log-service) to log the error. In the future, it might have other roles added to it, but for now, that's all it does.

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

[//]: # (TODO: Fix the stackblitz example)
[//]: # (<em>**Experimental**</em>)
[//]: # (> <iframe width="100%" height="300px" src="https://stackblitz.com/edit/sb-errorHandling-javascripts-exceptions?embed=1&file=src/app/app.component.ts&hideNavigation=1"></iframe>)

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

In order to use the Http Error Handler interceptor, you need to provide a `httpErrorHandler` property to your application configuration. For more information on how to provide an **appConfig** to the CoreModule, [read the documentation here](https://eui.ecdevops.eu/eui-showcase-ux-components-19.x/showcase-dev-guide/docs/10-advanced-concepts/01-configuration/02-eui-app-config).

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
    const growlService = injector.get(EuiGrowlService);
    growlService.growlError(error.statusText);
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

When your application makes HTTP requests, eUI and Angular are using HTTP interceptors to implement repetitive operations of every request. You can check [eUI Http Interceptors](https://eui.ecdevops.eu/eui-showcase-ux-components-19.x/showcase-dev-guide/docs/10-services/http-interceptors) and use them in your application. If Http requests are fails, We have to implement some scenarios based on Http status codes. The main goals of the error handling of Http requests are to not broke application, updating application state for fail scenario and providing the user a 'message' which users can understand/communicate.

[//]: # (TODO: Fix the stackblitz example)
[//]: # (<em>**Experimental**</em>)
[//]: # (> <iframe width="100%" height="300px" src="https://stackblitz.com/edit/sb-errorhandling-httpresponse-error?embed=1&file=src/app/app.component.ts&hideNavigation=1"></iframe>)

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
    const growlService = injector.get(EuiGrowlService);
        growlService.growlError(error.statusText);
};
```
