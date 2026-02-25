# @eui/core
## Overview

@eui/core package exposes CoreModule and Core Services

### CoreModule
CoreModule is responsible for preparing tokens and initializing base services of CoreModule.
It has forRoot and forChild methods in order to import the module with providers.
If you want to use eUI Core Services you need to call forRoot method at AppModule level. eUI CLI generated apps has it out of the box.
forChild is standing there for lazy load features of eUI Core Services.

---

***eUI’s CoreModule is no longer importing the HttpClientModule from '@angular/common/http’. 
   If you didn't generate the app with eUI 14 CLI, and you don’t import the HttpClientModule at the root level, you should add it to AppModule or your CoreModule.***

---

### Core Services

There are configurable services via Store like UserService, I18nService, EuiPermissionService, LocaleService, 

and plain services like LogService, ApiQueueService, StorageService etc. in @eui/core package.

#### Configurable Services via Store
UserService, I18nService, EuiPermissionService and LocaleService are store based configured services.
Every store based configured service implements EuiServiceModel. 
<b>init</b> method to initialize with the state object. It can be called any time, and all the instances will react to new state. It can be called run-time to re-initialize. init emits EuiServiceStatus typed observable.
<b>getState</b> to access to the current state, It will react to the state changes and will emit new state.
<b>updateState</b> to update state, it will not reset the service but update the state in order to trigger a behavioral change.
 
````typescript
export interface EuiServiceModel<T> {
    init(t: T): Observable<EuiServiceStatus>;

    /**
     * retrieves the State of the service. If you don't pass anything it will retrieve the whole State
     * of that service. If you pass a selector or MapFunction it will retrieve a slice of the state. If
     * you pass a string that's a key of the Service State type it will retrieve that slice of the state.
     */
    getState<K = T>(): Observable<T>;
    getState<K>(mapFn?: (state: T) => K): Observable<K>;
    getState<A extends keyof T>(key?: A): Observable<T[A]>;
    getState<K>(keyOrMapFn?: ((state: T) => K) | string): Observable<K>
    

    updateState(t: T): void;
}
````

## CoreModule.forRoot
Calling EuiCoreModule.forRoot at AppModule and providing EUI_CONFIG_TOKEN with appConfig and environment variables will initialize your CoreModule.
In the eUI generated app there is CoreModule which calls CoreModule(eUI's)'s forRoot.

forRoot is responsible for preparing tokens like CONFIG_TOKEN, GLOBAL_CONFIG_TOKEN, HTTP_ERROR_HANDLER_CONFIG_TOKEN,
and initializing services like LogService and StoreService.

````typescript
import { NgModule } from '@angular/core';
import {
    CoreModule,
    EUI_CONFIG_TOKEN,
} from '@eui/core';
import { appConfig } from '../../config/index';
import { environment } from '../../environments/environment';
 
@NgModule({
    imports: [
        // ...
        CoreModule.forRoot(),
        // ...
    ],
    providers: [
      // .. 
      { provide: EUI_CONFIG_TOKEN, useValue: { appConfig: appConfig, environment: environment } },
    ]

    // ............
})
export class AppModule {
 
}
````
## CoreModule.forChild

Calling EuiCoreModule.forChild with your custom module name which is defined in your [modules](./docs/10-advanced-concepts/01-configuration/02-eui-app-config#modules-config) configuration.
You can check the [Lazy load translation modules](./docs/10-services/translation#lazy-load-translation-modules) as  an example of lazy load core features.

forChild is responsible for preparing tokens like MODULE_NAME_TOKEN, MODULE_CONFIG_TOKEN,
and initializing LogService for lazy load module, and triggering AddAppLoadedConfigModulesAction for the eUI's store services in order to react to the new configuration.  

````typescript
import { NgModule } from '@angular/core';
import {
    CoreModule,
    EUI_CONFIG_TOKEN,
} from '@eui/core';
 
@NgModule({
    imports: [
        // ...
        CoreModule.forChild('customModuleName'),
        // ...
    ],
    // ..
})
export class YourLazyModule {
 
}
````

## forChild - HTTP_INTERCEPTORS defect is solved

---
***eUI’s CoreModule is no longer importing the HttpClientModule from '@angular/common/http’. 
   So you'll not have this problem anymore. If you somehow still need to re-import HttpClientModule at lazy load module level,
   you can use the solution below***
---

The module below is a custom re-provider module that you can use.

````typescript
import {
    Injector,
    ModuleWithProviders,
    NgModule,
    Optional,
    SkipSelf,
    InjectionToken,
    Inject,
} from '@angular/core';
import {
    HTTP_INTERCEPTORS,
    HttpClientModule,
} from '@angular/common/http';
@NgModule()
export class EuiLazyCoreModuleHttpInterceptorReuseModule {
    constructor(@Optional() @SkipSelf() parentModule: EuiLazyCoreModuleHttpInterceptorReuseModule, injector: Injector) {
        // if there is a parentModule, a new instance is created in a lazy loaded module
        if (!parentModule) {
            // storing root interceptors expect the default HttpClientModule's xsrf interceptor on window
            window['EUI_LAZY_LOAD_ROOT_HTTP_INTERCEPTORS'] = injector.get(HTTP_INTERCEPTORS).filter((interceptor) => {
                return interceptor.constructor.name !== 'HttpXsrfInterceptor';
            });
            console.log('here', window['EUI_LAZY_LOAD_ROOT_HTTP_INTERCEPTORS']);
        }
    }

    static forRoot(): ModuleWithProviders<EuiLazyCoreModuleHttpInterceptorReuseModule> {
        return {
            ngModule: EuiLazyCoreModuleHttpInterceptorReuseModule,
            providers: [],
        };
    }

    static forChild(): ModuleWithProviders<EuiLazyCoreModuleHttpInterceptorReuseModule> {
        return {
            ngModule: EuiLazyCoreModuleHttpInterceptorReuseModule,
            providers: [
                window['EUI_LAZY_LOAD_ROOT_HTTP_INTERCEPTORS'].map((interceptor) => {
                    return {
                        provide: HTTP_INTERCEPTORS,
                        useValue: interceptor,
                        multi: true,
                    };
                }),
            ],
        };
    }
}
````

After creating EuiLazyCoreModuleHttpInterceptorReuseModule, you must call its forRoot at AppModule level.

````typescript
import { NgModule } from '@angular/core';
import {
    CoreModule,
} from '@eui/core';
 
@NgModule({
    imports: [
        // ...After CoreModule
        CoreModule.forRoot(),
        EuiLazyCoreModuleHttpInterceptorReuseModule.forRoot(),
        // ...
    ],
    // ............
})
export class AppModule {
 
}
````
Then after every CoreModule.forChild call you'll call EuiLazyCoreModuleHttpInterceptorReuseModule.forChild.

````typescript
import { NgModule } from '@angular/core';
import {
    CoreModule,
    EUI_CONFIG_TOKEN,
} from '@eui/core';
 
@NgModule({
    imports: [
        // ...After CoreModule
        CoreModule.forChild('module1'),
        EuiLazyCoreModuleHttpInterceptorReuseModule.forChild(),
        // ...
    ],
    // ..
})
export class YourLazyModule {
 
}
````
