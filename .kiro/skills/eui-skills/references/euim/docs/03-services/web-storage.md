# Web Storage Service

## Overview
The EUI storage services are extending the web storage API, offering a uniform way of saving key/value pairs locally, using different types of storage, like localStorage, sessionStorage, IndexedDB, Web SQL or SQLite. They have been developed in accordance with the best practices and terminology imposed by different storage services, like **localStorage**, **sessionStorage**, **[localforage](https://localforage.github.io/localForage)**, and **[Ionic Storage](https://ionicframework.com/docs/building/storage)**. The storage services are coming in two flavors: synchronous and asynchronous. Both flavors can be extended according to your needs. Let's take a look at these services.

## Getting started
StorageService is an abstract class. You can provide an Implementation of StorageService in the CoreModule of your application. We have implemented a couple of services that extend the StorageService. Those are **localStorage**, **sessionStorage**, **localforage**, and **Ionic Storage.** Whether you see YOUR_STORAGE_SERVICE replace by either eUI's builtin or your own service that extends the StorageService.
```javascript
import { CoreModule as UxCoreModule, StorageService } from '@eui/core';
import { YOUR_STORAGE_SERVICE } from 'YOU\_PACKAGE';
...
@NgModule({
    imports: [
        UxCoreModule.forRoot(),
        ...
    ],
    ...
    providers: [
        ...,
		YOUR_STORAGE_SERVICE,
        { provide: StorageService, useExisting: YOUR_STORAGE_SERVICE },
        ...
    ]
})
export class CoreModule {}
```
The eUI has both Synchronous and Asynchronous Storage services. You can find more information about them below.

## Synchronous Storage

### StorageService (abstract, synchronous)

`StorageService` is the base storage service. It's an abstract and synchronous class. Therefore, all the other synchronous storage services must implement this class. This is the definition of the class:
```javascript
export abstract class StorageService {
    abstract name(): string;
    abstract get(key: string): any;
    abstract get<T>(key: string): T;
    abstract set(key: string, value: any): void;
    abstract set<T>(key: string, value: T): void;
    abstract remove(key: string): void;
}
```
`StorageService` is having two implementations: `LocalStorageService` and `SessionStorageService`. By default, `StorageService` is set in eUI core as `LocalStorageService`. You can check this calling the method `StorageService.name()`. It should return the value "LocalStorageService". If you are planning to use the `StorageService` in a generic way, with the possibility to change the implementation later, you can simply inject it into your own services. To change the implementation from `LocalStorageService` to `SessionStorageService` or other custom storage service, please use the following code in your core.module.ts:
```javascript
import { CoreModule as UxCoreModule, StorageService, SessionStorageService } from '@eui/core';
...
@NgModule({
    imports: [
        UxCoreModule.forRoot(),
        ...
    ],
    ...
    providers: [
        { provide: EUI_CONFIG_TOKEN, useValue: { appConfig: appConfig, environment: environment } },
		...,
        SessionStorageService,
        { provide: StorageService, useExisting: SessionStorageService },
        ...
    ]
})
export class CoreModule {}
```
### LocalStorageService (concrete, synchronous)

`LocalStorageService` is using `[localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)` to save key/value pairs locally. If you are planning to use this service directly, just inject it into your own services.

### SessionStorageService (concrete, synchronous)

`SessionStorageService` is using `[sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)` to save key/value pairs locally. If you are planning to use this service directly, before injecting it in your own services, you must declare it in core.module.ts, as a provider:
```javascript
import { CoreModule as UxCoreModule, SessionStorageService } from '@eui/core';
...
@NgModule({
    imports: [
        UxCoreModule.forRoot(),
        ...
    ],
    ...
    providers: [
        { provide: EUI_CONFIG_TOKEN, useValue: { appConfig: appConfig, environment: environment } },
		...,
        SessionStorageService,
        ...
    ]
})
export class CoreModule {}
```
### AsyncStorageService (abstract, asynchronous)

`AsyncStorageService` is the base for asynchronous storage services. This is the definition of the class:
```javascript
export abstract class AsyncStorageService extends StorageService {
    abstract ready(): Observable<any>; 
    abstract get(key: string): Observable<any>;
    abstract get<T>(key: string): Observable<T>;
    abstract set(key: string, value: any): Observable<any>;
    abstract set<T>(key: string, value: T): Observable<any>;
    abstract remove(key: string): Observable<any>;

    /**
     * asynchronous helper for set function
     * @paramkey the associated key
     * @paramvalue the value to set
     */
    setAsync(key:string, value:any): void;
    setAsync<T>(key:string, value:T): void {
        this.set(key, value).subscribe(() => {});
    }

    /**
     * asynchronous helper for remove function
     * @paramkey the associated key
     */
    removeAsync(key:string): void {
        this.remove(key).subscribe(() => {});
    }
}
```
All the abstract methods are returning one-time emission `Observable`. If you do not want to subscribe to the `set` and `remove` Observable, you can use the helpers `setAsync` and `removeAsync`. `AsyncStorageService` is having two implementations: `LocalForageService and IonicStorageService.` If you are planning to use the `StorageService` in a generic way, with the possibility to change the implementation later, you must define it as a provider. Please use the following code in your `core.module.ts`:
```javascript
import { CoreModule as UxCoreModule, AsyncStorageService, LocalForageService } from '@eui/core';
...
@NgModule({
    imports: [
        UxCoreModule.forRoot(),
        ...
    ],
    ...
    providers: [
        { provide: EUI_CONFIG_TOKEN, useValue: { appConfig: appConfig, environment: environment } },
		...,
        LocalForageService,
        { provide: AsyncStorageService, useExisting: LocalForageService },
        ...
    ]
})
export class CoreModule {}
```
## Asynchronous Storage

### LocalForageService (concrete, asynchronous)

`LocalForageService` is using [localforage](https://localforage.github.io/localForage) to save key/value pairs locally, using different data stores (IndexedBD, Web SQL and/or localStorage). Please click on the [localforage](https://localforage.github.io/localForage) link for detailed documentation. If you are planning to use this service directly, before injecting it in your own services, you must declare it and configure it in core.module.ts, as a provider:
```javascript
import * as localForage from 'localforage';
import { CoreModule as UxCoreModule, LocalForageService, LOCAL_FORAGE_SERVICE_CONFIG_TOKEN } from '@eui/core';
...
@NgModule({
    imports: [
        UxCoreModule.forRoot(),
        ...
    ],
    ...
    providers: [
        { provide: EUI_CONFIG_TOKEN, useValue: { appConfig: appConfig, environment: environment } },
		...,
        { provide: LOCAL_FORAGE_SERVICE_CONFIG_TOKEN, useValue: { driver: [localForage.INDEXEDDB, localForage.WEBSQL, localForage.LOCALSTORAGE] } },
        LocalForageService,
        ...
    ]
})
export class CoreModule {}
```
LOCAL_FORAGE_SERVICE_CONFIG_TOKEN is accepting an object of type `LocalForageOptions`. You can find the documentation [here](https://localforage.github.io/localForage/#settings-api-config).

If you experience any issue with **localforage** javascript library of properties being undefined that means there is a bundling issue so make sure to communicate with us through support functional mailbox.

### IonicStorageService (concrete, asynchronous, only for ionic projects)

`IonicStorageService` is using [Ionic Storage](https://ionicframework.com/docs/building/storage) to save key/value pairs locally, using different data stores (SQLite, IndexedBD, Web SQL and/or localStorage). Please click on the [Ionic Storage](https://ionicframework.com/docs/building/storage) link for detailed documentation. If you are planning to use this service directly, before injecting it in your own services, you must declare it and configure it in core.module.ts, as a provider:
```javascript
import { IonicStorageModule } from '@ionic/storage';
import { CoreModule as UxCoreModule, IonicStorageService } from '@eui/core';
...
@NgModule({
    imports: [
        UxCoreModule.forRoot(),
        IonicStorageModule.forRoot({
driverOrder: ['indexeddb', 'sqlite', 'websql'],
        }),
        ...
    ],
    ...
    providers: [
        { provide: EUI_CONFIG_TOKEN, useValue: { appConfig: appConfig, environment: environment } },
		...,
        IonicStorageService,
        ...
    ]
})
export class CoreModule {}
```
`IonicStorageService` is using a `Storage` provided and configured by `IonicStorageModule`. You can find the documentation [here](https://ionicframework.com/docs/building/storage).

## Custom storage services
You can extend all our storage services. If your implementation is generic enough, please contact us and we will be happy to add it as part of the eUI base.

## Example
Below we will showcase a simple component where it utilizes the StorageService to set and get data from the SessionStorage of the browser. Before we provide 3 different tokens for 3 different Storage service implementations.
```javascript
...
@NgModule({
    imports: [...],
    declarations: [...],
    providers: [
		...
        {
            provide: LOCAL_FORAGE_SERVICE_CONFIG_TOKEN,
            useValue: {
                driver: [localForage.INDEXEDDB, localForage.WEBSQL, localForage.LOCALSTORAGE],
                name: 'myApp',
                version: 1.0,
                size: 4980736, // Size of database, in bytes. WebSQL-only for now.
                storeName: 'keyvaluepairs', // Should be alphanumeric, with underscores.
                description: 'some description'
            }
        },
        { provide: StorageService, useExisting: SessionStorageService },
        { provide: 'LocalStorageService', useExisting: LocalStorageService },
        { provide: AsyncStorageService, useExisting: LocalForageService },
		...
    ]
})
export class CoreModule { ... }
```
Then on our component named Storage we inject LocalStorageService and StorageService (which implemented by SessionStorageService. In our component, we render two forms. We retrieve and set the form on each StorageService implementation accordingly.
```javascript
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StorageService, UxAppShellService } from '@eui/core';

interface AppStorage {
    name: string;
    version: number;
    [key: string]: any;
}

@Component({
    selector: 'app-storage',
    templateUrl: './storage.component.html'
})
export class StorageComponent implements OnInit {
    storageLocal: AppStorage = {
        name: null,
        version: null
    };
    storageSession: AppStorage = {
        name: null,
        version: null
    };
    @ViewChild('sessionForm') sessionForm: NgForm;
    @ViewChild('localForm') localForm: NgForm;

    constructor(
        private sessionStorageService: StorageService,
        private uxService: UxAppShellService,
        @Inject('LocalStorageService') private localStorageService: StorageService
    ) { }

    ngOnInit() {
    }

    onLocalSave() {
        this.localStorageService.set('STORAGE', this.localForm.value);
        this.sessionForm.reset();
    }

    onSessionSave() {
        this.sessionStorageService.set('SESSION\_STORAGE', this.sessionForm.value);
        this.localForm.reset();
    }

    retrieveLocalStorage() {
        // check if there is an application LOCAL storage already
        this.storageLocal = this.localStorageService.get('STORAGE');
        if (!this.storageLocal) {
            this.uxService.growlWarning('Local storage was empty.');

            // if not create one
            this.localStorageService.set('STORAGE', { name: null, version: 0 });
            this.storageLocal = this.localStorageService.get('STORAGE');
        }
        this.localForm.setValue(this.storageLocal);
    }

    retrieveSessionStorage() {
        // check if there is an application session storage
        this.storageSession = this.sessionStorageService.get('SESSION\_STORAGE');
        if (!this.storageSession) {
            this.uxService.growlWarning('Session storage was empty.');

            // if there's not any create it
            this.sessionStorageService.set('SESSION\_STORAGE', { name: null, version: 0 });
            this.storageSession = this.sessionStorageService.get('SESSION\_STORAGE');
        }
        this.sessionForm.setValue(this.storageSession);
    }
}
```
