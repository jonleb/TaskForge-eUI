# Web Storage Service

## Overview
EUI storage services augment the Web Storage API, enabling local storage of key/value pairs via localStorage, sessionStorage, IndexedDB, Web SQL, or SQLite. Adhering to best practices and specific terminologies of localStorage, sessionStorage, **[localforage](https://localforage.github.io/localForage)**, and **[Ionic Storage](https://ionicframework.com/docs/building/storage)**, these services are bifurcated into synchronous and asynchronous variants, both customizable.

## Initialization
`StorageService` functions as an abstract superclass, necessitating the provision of a concrete implementation within the `CoreModule` of your application. This architecture underpins several derived services extending `StorageService`, including `localStorage`, `sessionStorage`, `localforage`, and `Ionic Storage`. In application contexts, `YOUR_STORAGE_SERVICE` should be substituted with either an existing eUI-provided service or a custom service devised to extend `StorageService`, ensuring seamless integration and extensibility within the storage functionality framework.
EUI facilitates both synchronous and asynchronous storage services.

```javascript
import { CoreModule, StorageService } from '@eui/core';
import { YOUR_STORAGE_SERVICE } from 'YOUR_PACKAGE';
...
@NgModule({
    imports: [
        CoreModule.forRoot(),
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

## Synchronous Storage

### StorageService (abstract, synchronous)

`StorageService` serves as the foundational synchronous storage class. Implementations include `LocalStorageService` and `SessionStorageService`. Default implementation in EUI core is `LocalStorageService`. For generic usage and future implementation modifications, dependency injection is recommended.

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
import { CoreModule, StorageService, SessionStorageService } from '@eui/core';
...
@NgModule({
    imports: [
        CoreModule.forRoot(),
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

Implements storage using the native [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) API.

### SessionStorageService (concrete, synchronous)

Implements storage using the native [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) API. Requires declaration in `core.module.ts`.

```javascript
import { CoreModule, SessionStorageService } from '@eui/core';
...
@NgModule({
    imports: [
        CoreModule.forRoot(),
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

Base class for asynchronous storage implementations. Methods return single-emission `Observable`s, with `setAsync` and `removeAsync` helpers. Implementations include `LocalForageService` and `IonicStorageService`.

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
import { CoreModule, AsyncStorageService, LocalForageService } from '@eui/core';
...
@NgModule({
    imports: [
        CoreModule.forRoot(),
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
import { CoreModule, LocalForageService, LOCAL_FORAGE_SERVICE_CONFIG_TOKEN } from '@eui/core';
...
@NgModule({
    imports: [
        CoreModule.forRoot(),
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
import { CoreModule, IonicStorageService } from '@eui/core';
...
@NgModule({
    imports: [
        CoreModule.forRoot(),
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
import { StorageService, EuiAppShellService } from '@eui/core';

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
        private appShellService: EuiAppShellService,
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
            this.appShellService.growlWarning('Local storage was empty.');

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
            this.appShellService.growlWarning('Session storage was empty.');

            // if there's not any create it
            this.sessionStorageService.set('SESSION\_STORAGE', { name: null, version: 0 });
            this.storageSession = this.sessionStorageService.get('SESSION\_STORAGE');
        }
        this.sessionForm.setValue(this.storageSession);
    }
}
```

[//]: # (TODO: Fix the stackblitz example)
[//]: # (<em>**Experimental**</em>)
[//]: # (> <iframe width="100%" height="300px" src="https://stackblitz.com/edit/sb-webstorage-storage?embed=1&file=src/app/app.module.ts&hideNavigation=1"></iframe>)
