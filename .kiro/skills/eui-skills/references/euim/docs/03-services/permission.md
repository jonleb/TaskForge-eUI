# Permission Service

## Overview
There are significant differences between client and Server-side applications about security and permissions topics. Server-side security for REST-based applications is Source (end-point) oriented. Client-side security is related to the user journey and business logic. There isn't %100 percentage **security** for Client-side web applications in terms of preventing you to call REST API or access hidden content. You have to still protect your sources even If It is hidden or blocked at the **view layer**.

We can divide Permission & Security scenarios into three

*   User can see to the allowed links/pages in the navigation
*   User can access to the allowed routes/URLs
*   User can consume to the allowed sources/end-points

eUI is providing helper services to manage security & permission scenarios by accepting a simple & strict data model.

## Permissions Service

### Data Model & Configuration

Permission service is extending UserState with rights property. If You want to use Permissions Service, You should provide rights property into the User model that is [configured user detail end-point's](https://eui.ecdevops.eu/docs/dev/docs/guides-ngrx.html#using-ux-core-ngrx-modules) response.
```javascript
export interface UserExtendedState extends UserState {  
    rights: Array<UxUserRight>;  
}  
  
export interface UxUserRight {
    id: string;
    permissions?: string[];
}

// sample NgrxState
user: {
    userId: '',
    firstName: 'Hilario',
    lastName: 'Stracke',
    ...,
    rights: [
      {
        id: 'SUB_SECTION_122',
        permissions: []
      },
      {
        id: 'SUB_SECTION_111',
        permissions: []
      },
      {
        id: 'MODULE1',
        permissions: []
      },
      {
        id: 'JMS_MONITORING',
        permissions: [
          'search',
          'filter'
        ]
      }
    ]
    ...,
}
```
Rights and Permissions are related to the user journey. You can think that **Right**->id is **mapped to a page**, and **permissions** are **mapped to elements** on that page like 'update' or 'delete' button. After the user clicks the button, it can create a request to your back-end, you still have to protect these requests even if you hide them at front-end.
```javascript
rights: [
    ...,
    {
        id: 'Module_X', // -> User has right to access page/state X
        permissions: [
        	'Permission A at Module_X', // -> User has permission to display A element at Module_X
        	'Permission B at Module_X', // -> User has permission to display A element at Module_X
        	...
        ]
    },
    ...
]
```
### Initialize Service

For eUI 9 it has been decided for eUI to drop automation of initialization of services. Hence we rethought the Architecture of an eUI app and how it will be initialized. Now initialization of the Permission Service is up to the developer to handle. We provide though all the guidelines and functionality of how to do this. Based on your application's architecture you can choose at what point you'll initialize the PermissionService. You can either do it at the constructor of your AppComponent (main component) or by using the APP_INITIALIZER token provided by angular. Below you can find an example of doing it at the AppComponent level.
```javascript
...
export class AppComponent {
    constructor(
  		...,
        @Inject(CONFIG_TOKEN) private config: EuiConfig,
        private permService: EuiPermissionService,
		...
	) {
        ...
		this.initPermissionService().subscribe(() => console.log('PermissionService has been initiated!'))
 		...
    }

 	/**
     * Fetches user details&preferences then merges with the default prefs,
     * create user: UserState object
     * then initialise to the UserService on run time
     */
    initPermissionService(): Observable<any> {
        return this.fetchUserRights()
            .pipe(
                switchMap((userRights) => {
                    return this.euiPermissionService.init(userRights);
                }));
    }
 	
	// fetch the User rights either from calling Endpoint or NgRx if you previously 
	// fetched them with UserService initialization.
	fetchUserRights() {
		...
	}
}
...
```
Keep in mind

For the initialization example above you have to keep in mind that Initialization is Asynchronous and at that point Rendering of the application has already started. This means that by the time that Permission service will have initiated the rendering will have finished. In case there's somewhere a UxHasPermissionDirective on the template that part will not be rendered until Permission information initiated.

EuiPermissionService is providing helper methods. These methods are used by **UxHasPermissionDirective** into Ux-Core. But They are publicly open to using whenever you want in your application.
```javascript
export class EuiPermissionService extends EuiService<UxUserRight[]> {
    /**
     * initialize the service by providing a state
     * @param rights
     */
    init(rights: UxUserRight[]): Observable<EuiServiceStatus>;

    /**
     * get the user's Rights from the state
     */
    getState(): Observable<UxUserRight[]>;

    /**
     * update the state with the given user's rights
     * @param rights
     */
    updateState(rights: UxUserRight[]): void;

    /**
     * accepts a string of right and or a permission. In string first comes the right and or followed by permission in
     * a dot separated way e.g. 'RIGHT.PERMISSION' or 'RIGHT'. The string can contain more that 2 separated fields.
     * In that case the last field should be the permission and all the others a Right. e.g. 'RIGHT1.RIGHT2.PERMISSION'
     * The last part is useful where you want a user to have multiple rights and the permission of the last right.
     * @param rightsAndPermission
     */
    checkAttributePermission(rightsAndPermission: string): boolean;

    /**
     * check if a user has the right.
     * @param rightId the id of Right
     */
    checkRight(rightId: string): boolean;

    /**
     * check if a user has that right and that right has the permission given.
     * @param rightId the right of the user
     * @param permission the permission of the right
     */
    checkPermission(rightId: string, permission: string): boolean;
```
Auth Guard
----------

### Creating Auth Guard Service

You can create your custom AuthGuardService to protect the app's routes. Your custom service should implement CanActivate, CanActivateChild methods.
```javascript
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import {
    UxAppShellService,
    EuiPermissionService
} from '@eui/core';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

    constructor(private router: Router,
                private euiPermissionService: EuiPermissionService,
                private uxService: UxAppShellService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        const isLoggedIn = true; // you can provide this information from your service

        // Checks login. If It is not, It redirects user.
        if (isLoggedIn) {
            // Checks route right based on permission data and returns false/true We are using route->data
            if (this.euiPermissionService.checkRight(route.data.id)) {
                return true;
            } else {
                this.uxService.growlWarning('You don\'t have the permission access this page');
            }
        } else {

            // Giving feedback to user and redirecting here.
            this.uxService.growlWarning('You have to login to access this page');
            this.router.navigate(['/login']);
        }

        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // If You are handling child routes different way, You can customise here.
        return this.canActivate(route, state);
    }
}
```
After creating your custom Auth guard service, You should add it to your applications' core module providers or **{ provideIn: 'root' }** at **Injectable()** decorator's metadata.
```javascript
...
import { AuthGuardService } from './services/auth-guard.service';
...

@NgModule({
    imports: [
    	...
    ],
    declarations: [],
    exports: [
        SharedModule,
    ],
    providers: [
        ...
        AuthGuardService,
       ...
    ]
})
...
```
### Using Auth Guard Service

These integrations will make ready your guard service to use.  
If you want to protect a route, You have to add to your route definition;
```javascript
data:{ id:'Module_Id' } // -> Your Id that is same with targetted Rights[n]->id 
canActivate: [AuthGuardService] // -> Your Custom Service
```
When a user tries to access a route that is protected by AuthGuardService:

*   It will check the user logged in or not first, If the user is not logged in will redirect the user.
*   If the user is logged in, It will check to activate the route with permission data.
*   If the User doesn't have permission, It will notify the user.
```javascript
...
import { AuthGuardService } from './core/services/auth-guard.service';  
  
const routes: Routes = [  
        { path: '', redirectTo: 'screen/home', pathMatch: 'full' },  
        { path: 'index.jsp', redirectTo: 'screen/home' },  
        { path: 'screen/home', loadChildren: './features/home/home.module#HomeModule' },  
        {  
        path: 'screen/jms-monitoring',  
        data: { id: 'JMS_MONITORING' },  
        loadChildren: './features/jms-monitoring/jms-monitoring.module#JmsMonitoringModule',  
        canActivate: [AuthGuardService]  
    },  
  {  
        path: 'screen/module1',  
        data: { id: 'MODULE1' },  
        loadChildren: './features/+module1/module1.module#Module1Module',  
        canActivate: [AuthGuardService]  
  },  
  {  
        path: 'login',  
        loadChildren: './features/login/login.module#LoginModule'  
  }  
];  
  
...
```
### Permissions Directive
In case there are elements/components in your application that are visible to your users based on the permissions or Rights they have, you can use the UxPermissionDirective. It is part of the **@eui/core** package. You can directly use it in a template. It will use the EuiPermissionsService data dynamically. As input, you can pass a String array (string formatted). Every value of that array can be either a Right or permission. Permission should be formatted like this, [**RIGHT_ID**] **dot** [**PERMISSION_ID**] (_e.g. RIGHT_ID.permission_ID_) . It can also be formated like this, [RIGHT_ID_1].[RIGHT_ID_2]....[RIGHT_ID_N].[PERMISSION_ID] (_e.g. RIGHT_.RIGHT_2.RIGHT_3.Perm_1_).

> *hasPermission=" [ 'SingleRight_Id','**Right_Id**.**PermissionId**' , 'JMS_MONITORING.filter' ]
```html
<div class="page-title">
    JMS Monitoring
</div>

<!-- It will check with AND opertaor Array of 'ModuleID.PermissionID' If user has 
the all rights or right-permission binaries that are defined, It will render inside of the <div>...</div> -->

<div *hasPermission="['JMS_MONITORING.search','JMS_MONITORING.filter']">
    <app-jms-monitoring-search (search)="onSearch($event)"></app-jms-monitoring-search>
</div>

<app-jms-monitoring-results [users]="users"></app-jms-monitoring-results>
```
## Auth Service
You can create your own AuthService and use it as a central point to manage authentication status for the application. If Your application doesn't have auth operations, you can ignore this service. There are redirectUrl and loginPageUrl variables that are connected with application configuration. RedirectUrl is for the situation that an unauthorized user is trying to access protected page. AuthGuard service is keeping the target route to redirect user after login operation to the targeted page.

### Configuration

You can define the **isLoggedIn**, **redirectUrl** and **loginPageUrl** into your configuration.
```javascript
import { environment } from '../environments/environment';  
  
export const GLOBAL = {    
...  
  auth: {  
  isLoggedIn: true,  
  redirectUrl: '',  
  loginPageUrl: '/login'  
  }  
  ...
};
```
provide configuration token
```javascript
import { appConfig } from '../../config/index';

@NgModule({
imports: [...],
providers: [
	...,
	{
		provide: AUTH_CONFIG_TOKEN,
		useValue: { authConfig: appConfig.auth }
	},
	...
]
})
export MyModule {
...
}
```
### Showcase of Custom Auth Service
```javascript
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { AuthConfig, DEFAULT_AUTH_CONFIG } from './ux-auth.config';
 
export const AUTH_CONFIG_TOKEN = new InjectionToken<AuthConfig>('AUTH_CONFIG');
 
@Injectable()
export class AuthService {
 
    // default must be false, it should be update after login
    isLoggedIn = true;
 
    // it should be integrated with user state,and navigate to passed url after login
    redirectUrl: string;
    loginPageUrl: string;

    constructor(@Optional() @Inject(AUTH_CONFIG_TOKEN) config: AuthConfig) {
        const authConfig = Object.assign({}, DEFAULT_AUTH_CONFIG, config);
        this.isLoggedIn = authConfig.isLoggedIn;
        this.redirectUrl = authConfig.redirectUrl;
        this.loginPageUrl = authConfig.loginPageUrl;
    }
 
    setLoggedIn(status: boolean) {
        this.isLoggedIn = status;
    }
 
    setRedirectUrl(url: string) {
        this.redirectUrl = url;
    }
}
```
## Dynamic Menu Service
UxDynamicMenuService is a helper service that working with the Permission service and helps to load menuLinks in a dynamic way and filter them with user context. We have already defined the rights model. If You want to load your menu links from the server, You can add menuLinks property to the [configured user detail end-point's](https://eui.ecdevops.eu/docs/dev/docs/guides-ngrx.html#using-ux-core-ngrx-modules) response.

### Data Model
The menuLinks should fit the [UxLink](https://webgate.ec.europa.eu/CITnet/stash/projects/UXATEC/repos/eui/browse/src/packages/ux-core/src/lib/src/core/models/ux-link.model.ts) model. They will be used to generate a menu from that links.

If allowedRightId provided into ux-link, service will check it.
```javascript
{
   "user":{
      "userId":"",
      "firstName":"Hilario",
      "lastName":"Stracke",
      "menuLinks":[
         {
            "label":"page.home.link_label",
            "iconClass":"fa fa-home",
            "url":"screen/home",
            "isHome":true
         },
         {
            "label":"page.login.link_label",
            "iconClass":"fa fa-sign-in",
            "url":"/login"
         },
         {
            "allowedRightId":"JMS_MONITORING",
            "label":"JMS Monitoring",
            "iconClass":"fa fa-filter",
            "url":"/screen/jms-monitoring"
         },
         {
            "allowedRightId":"MODULE1",
            "label":"Showcases",
            "iconClass":"fa fa-eur",
            "url":"/screen/module1",
            "children":[
               {
                  "label":"Http Status Codes",
                  "children":[
                     {
                        "allowedRightId":"SUB_SECTION_111",
                        "label":"Test Suite",
                        "subLabel":"sub label",
                        "iconClass":"fa fa-star color-accent",
                        "url":"/screen/module1/page1"
                     },
                     {
                        "allowedRightId":"SUB_SECTION_112",
                        "label":"Sub section item 1.1.2",
                        "subLabel":"sub label",
                        "iconClass":"fa fa-star-o",
                        "url":"/screen/module1/page2",
                        "metadata":{
                           "data1":"data1",
                           "data2":"data2"
                        }
                     }
                  ]
               },
               {
                  "label":"SUB SECTION 1.2",
                  "children":[
                     {
                        "allowedRightId":"SUB_SECTION_121",
                        "label":"Sub section item 1.2.1",
                        "subLabel":"sub label",
                        "iconClass":"fa fa-star color-accent",
                        "url":"/screen/module1/page1"
                     },
                     {
                        "allowedRightId":"SUB_SECTION_122",
                        "label":&ququot;Sub section item 1.2.2",
                        "subLabel":"sub label",
                        "iconClass":"fa fa-star-o",
                        "url":"/screen/module1/page2",
                        "metadata":{
                           "data1":"data1",
                           "data2":"data2"
                        }
                     }
                  ]
               }
            ]
         }
      ]
   }
}
```
## Helper Functions
You can load MenuLinks into your component with **getMenuLinks** and you can filter them with **filterUxLinksWithRights** method. The method uses the {id:'moduleId'....} of UxLink. If You didn't provide any ID into the link, It won't be checked If user has right. It will be displayed on the menu. Keep in mind that this service is synced with Links from the State but it may not be always a fit.
```javascript
export declare class UxDynamicMenuService { 
	...
	getMenuLinks(): any[];
	filterUxLinksWithRights(links: Array<UxLink>): Array<UxLink>;
	...
}
```
