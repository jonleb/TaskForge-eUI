# Eui App Config

## Model
EuiAppConfig has two main parts: EuiAppJsonConfig & EuiAppHandlersConfig. 

EuiAppJsonConfig includes JSON representable data which can be loaded dynamically(dynamic-config-link) from external resources via HTTP ,
EuiAppHandlersConfig includes ts sources like: handler functions, data-types. It can be still overwritten via EnvConfig(handlers-config-link).


```typescript
export declare type EuiAppConfig = EuiAppJsonConfig & EuiAppHandlersConfig;
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

## Global Config

GlobalConfig keeps the application & root services related configurations. You can find deeper information in CORE API-SERVICES section.
```typescript
export interface GlobalConfig {
    /** show/hide connection status */
    showConnectionStatus?: boolean;
    user?: UserConfig;
    i18n?: I18nConfig;
    locale?: LocaleServiceConfig;

    [key: string]: any;
}
```
## Modules Config

ModulesConfig keeps the feature modules & api urls  information. Before eui-core was interpreting core->user specific information, but right now It is totally custom.
Eui is You can check Log & I18n service related configuration in 
```typescript
export interface ModulesConfig {
    [module: string]: ModuleConfig;
}

export interface ModuleConfig extends LogConfig, I18nLoaderConfig {
    [key: string]: any;
}
```

## Eui App Handlers Config

EuiAppHandlersConfig keeps the sources files based configuration like : HttpErrorHandlerConfig, ErrorMappingHandler, LogConfig and customHandler definitions.

## eUI appConfig Example
**src/config/index.ts**
```typescript
import { EuiAppConfig } from '@eui/core';
import { GLOBAL } from './global';
import { MODULES } from './modules';

export const appConfig: EuiAppConfig = {
    global: GLOBAL,
    modules: MODULES,
};

```

Your starter starts with default GLOBALS. We are strongly suggesting to use global.ts for defaults. 
As It is part of the EuiAppJsonConfig, You can override modules with environment specific properties.
For your dev, prod or other environments you should use **env-json-config.json** configuration.

**src/config/global.ts**
```typescript
import { GlobalConfig } from '@eui/core';

export const GLOBAL: GlobalConfig = {
    appTitle: 'CSDR-app',
    i18n: {
        i18nService: {
            defaultLanguage: 'en',
            languages: ['en', 'fr'],
        },
        i18nLoader: {
            i18nFolders: ['i18n-eui', 'i18n', 'i18n-ecl'],
        },
    },
    user: {
        defaultUserPreferences: {
            dashboard: { },
            lang: 'en',
        },
    },
};

```
Your starter starts with empty MODULES. We are strongly suggesting to use modules.ts for defaults. 
As It is part of the EuiAppJsonConfig, You can override modules with environment specific properties.
For your dev, prod or other environments you should use **env-json-config.json** configuration.

**src/config/modules.ts**
```typescript
import { ModulesConfig } from '@eui/core';

export const MODULES: ModulesConfig = {
    core: {
        api: {
            base: '/core_api_base_url',
            user: {
                'base': '/user_base_url',
                'details': '/user-details',
                'preferences': '/user-preferences',
                'rights': '/user-rights',
            },
        },
    },
};
```
