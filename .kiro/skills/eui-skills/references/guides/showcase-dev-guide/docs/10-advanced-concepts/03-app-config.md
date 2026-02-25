# Application configuration

## EuiAppConfig
This is a sample of and index.ts EuiAppConfig configuration.
```typescript
import { EuiAppConfig } from '@eui/core';
 
export const appConfig: EuiAppConfig = {
    global: GLOBAL,
    modules: MODULES,
    versions: VERSIONS,
    httpErrorHandler: HTTP_RESPONSE_HANDLERS,
    errorMappingHandler: ERROR_MAPPING_HANDLER,
    log: LOG_CONFIG,
};
```
check below the models.
```typescript
export type EuiAppConfig = EuiAppJsonConfig & EuiAppHandlersConfig ;
 
export interface EuiAppJsonConfig {
    global: GlobalConfig;
    modules?: ModulesConfig;
    versions?: VersionsConfig;
     
    [key: string]: any;
}
 
export interface EuiAppHandlersConfig {
    httpErrorHandler?: HttpErrorHandlerConfig;
    errorMappingHandler?: ErrorMappingHandler;
    log?: LogConfig;
    customHandler?: {
        [handlerId: string]: any;
    };
}
```
Example of a moduleConfig object
```typescript
import { ModulesConfig } from '@eui/core';

export const MODULES: ModulesConfig = {
    core: {
        api: {
            base: 'assets/',
            user: {
                'base': 'config/',
                'details': 'user-details.json',
                'preferences': 'user-preferences.json',
                'rights': 'user-rights.json',
            },
        },
    },
};
```
You can override any of the environment properties if needed. In the example above, the **moduleConfig.modules.moduleA.api.base** might be relative to where the application is deployed and should not be absolute.

## GlobalConfig
The structure of the configuration is as seen below.

### Structure
Using the i18n configuration and the user

<em>global.ts</em>
```javascript
import { GlobalConfig } from '@eui/core';

export const GLOBAL: GlobalConfig = {
    appTitle: 'CSDR-app',
    i18n: {
        i18nService: {
            defaultLanguage: 'en',
            languages: ['en', 'fr'],
        },
        i18nLoader: {
            i18nFolders: ['i18n-eui', 'i18n-ecl', 'i18n'],
        },
    },
	user: {
		defaultUserPreferences: {
			dashboard: { },
			lang: 'en'
		}
	},
};
```
For more information about **i18n and** **user** service please check below where you can find detailed information about the new structure.  

<em>model.ts</em>
```javascript
export interface GlobalConfig {
	/** show/hide connection status */
	showConnectionStatus?: boolean;
	user?: UserConfig;
	i18n?: I18nConfig;

	[key: string]: any;
}

// UserConfig interface is added
export interface UserConfig {
    defaultUserPreferences?: UserPreferences;
}

// I18nConfig interface is added
export interface I18nConfig {
    i18nService: I18nServiceConfig;
    i18nLoader: I18nLoaderConfig;
}
export interface I18nServiceConfig {
    /** an ISO 2 char code array of available languages */
    languages?: string[];
    /** default language to be used in case of not any has been set */
    defaultLanguage?: string;
}

export interface I18nLoaderConfig {
    i18nFolders?: string | string[];
    /** array of service urls to translation, don't add the language it will be added e.g. http://net1/trans/en
     * Keep in mind that the url should be the prefix and not contain any suffix. */
    i18nServices?: string | string[];
    i18nResources?: I18nResource | I18nResource[];
}

// I18nResource
export interface I18nResource {
    /** prefix of the resource could be like the 2 char language code e.g. /en */
    prefix: string;
    /** suffix can be either .json or anything related of the resource HTTP call */
    suffix?: string;
    /**
     It is an ID of the function which should be defined into the customHandlers with the interface TranslationsCompiler
     */
    compileTranslations?: string;
}
```

## Override by environment
When you generated your Angular application with @angular/cli, an _environments_ folder has been generated with 2 files inside. The `environment.ts` and `environment.prod.ts` file. The first one is the one used during development. If you already have a config.ts file with the above appConfig object, you might not need the environement.ts file for anything.

The `environment.prod.ts` file is the one you want to customize for deployment-specific settings. When you build your Angular application with the `ng build --prod` command, @angular/cli replaces at build time content of the environement.ts file with the content of the environement.prod.ts file. This means that you can just import the `environement.ts` file in your app, knowing that its content will be automatically updated at build time.

>    /** * If you are developing, this will correspond to the "environement.ts" file, * if your are building in "prod" this will correspond to the "environement.prod.ts" file. */
>    import { environment } from '../environments/environment';


So in order to override the `base` property above when the application is deployed, we just need to add the following in our `environment.prod.ts` file:
```javascript
export const environment = {
    moduleA: {
        api: { base: '' }
    }
}
```

The CoreModule will merge the environment object into the appConfig object, overriding any property. The resulting configuration when deployed would then be
```javascript
{
    global: {
        appTitle: 'My EUI application',
        appSubtitle: 'Subtitle of the application',
    },
    moduleA: {
        api: {
            base: '',
            section1: '/section1',
            section2: '/section2',
        }
    }
}
```
### Example
Here is a complete example of how to import the CoreModule with an application configuration object and an environment configuration.

<em>app.component.ts</em>
```javascript
import { CoreMoule, EUI_CONFIG_TOKEN } from '@eui/core';

import { appConfig } from './config/index';
import { environment } from '../environments/environment';
....
// APP ROOT MODULE
@NgModule({
	imports: [
		.......
		CoreModule.forRoot(),
		.......
	],
	.......
	providers: [
		{ provide: EUI_CONFIG_TOKEN, useValue: { appConfig: appConfig, environment: environment } },
		.......
	],

})
export class AppModule {
}
```

## Dynamic Configuration
In case you want your configuration to be received from a service endpoint or a config file served in assets; in that case, you can use **preInit**() before Module bootstrapping. The function accepts the **EuiEnvConfig** object as an argument. Notice that in case you have config in a service endpoint and config file the configuration from service will override common keys of file configuration in the merged object that will generate. Actually preInit will load the Config file (if any) and then config from service Endpoint (if any) and merge them in environment object from environment.ts (prod, dev etc. - based on whatever is used).
```javascript
export interface EuiEnvConfig {
    envAppHandlersConfig?: EuiAppHandlersConfig;
    envDynamicConfig?: EnvDynamicConfig;
    loadedEnvDynamicConfig?: EuiAppJsonConfig;

    [key: string]: any;
}
```

For the AppHandlersConfig you can configure the handlers for HttpError, errorMapping
```javascript
import { BaseEnvironmentConfig } from '@eui/core';

export const environment: EuiEnvConfig = {
    ...,
    envAppHandlersConfig: {
        httpErrorHandler: YOUR_ENV_HTTP_ERROR_HANDLER,
        errorMappingHandler: ERROR_MAPPING_HANDLER, // Optional
        log: LOG_CONFIG, // Optional
        customHandler: { // Optional
            MyHandler: MY_CUSTOM_HANDLER
        }
    },
    ...
};
```

<em>main.ts</em>
```javascript
...
import { preInitApp } from '@eui/core';
...
preInitApp(environment).then((env) => platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err))
);
```
In order for preInit() to know what configuration to merge, you need to configure your environment.ts file with **envDynamicConfig** and pass a **uri** so you can fetch the configuration dynamically from a service endpoint! Keep in mind that you can configure the timeout for the HTTP call with **configTimeout**.
The default timeout is being set to 2000ms or 2 seconds. Keep in mind that this should return an EuiAppJsonConfig.

<em>environment.ts</em>
```javascript
import { BaseEnvironmentConfig } from '@eui/core';

export const environment: EuiEnvConfig = {
    ...,
    envDynamicConfig: { 
        uri: '/api/configuration-service', // endpoint can be either absolute or relative, don't forget the / in the beginning
        configTimeout: 5000 // optional - default is 2000
    },
    ...
};
```
Keep in mind that you can configure a portion of the envAppHandlersConfig through the dynamic configuration. 
Of course, it's not possible to declare a function as property of the JSON object. So envAppHandlersConfig can be configured fully through environment.ts and partially dynamically.

### Access the configuration
To access the configuration, the ux-core module exposes an Injection Token that you can inject in any of your components or providers.

<em>Utilize Configuration Token</em>
```javascript
// some.service.ts
import { Injectable, Inject } from '@angular/core';
import { CONFIG_TOKEN } from 'ux-core';

@Injectable()
export class SomeService {
    constructor(@Inject(CONFIG_TOKEN) private config: EuiAppConfig ) {}

    doSomething() {
        // Access the moduleA api configuration
        const apiConfig = this.config.modules.moduleA.api;
    }
}
```

<em>BEWARE</em>
> When injecting the CONFIG_TOKEN you are getting a reference to the CONFIG object. This means that if you alter the state of this object other Module initialization may be affected with their initialization ending up to unexpected behavior. So altering the CONFIG object affects the whole eUI application. Though, you can safely alter the state of the CONFIG object through accessing his **private** configuration like **this.config.modules.<YOU_MODULE>.<ANYTHING>**

## Application State
An eUI application is using a simple Signal as state management tool. By default, the state is being retrieved and saved (synced) with localstorage. You can configure and change that to use SessionStorage instead.
That can be easily configured by changing two things. The first should be the reducer and the second through providing the correct environment configuration.
```javascript

import { BrowserStorageType } from '@eui/core';

export const appConfig: EuiAppConfig = {
    global: GLOBAL,
    modules: MODULES,
    versions: VERSIONS,
    httpErrorHandler: HTTP_RESPONSE_HANDLERS,
    errorMappingHandler: ERROR_MAPPING_HANDLER,
    log: LOG_CONFIG,
    saveStateStorage: BrowserStorageType.session
};
```
To change from which storage the state should be retrieved, in a new eui app generated from CLI you can navigate to core/reducers/index.ts and change the metaReducers Array.
```javascript
...
import { ..., sessionStorageSync } from '@eui/core';
...
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [sessionStorageSync, storeFreeze] : [sessionStorageSync];

```
