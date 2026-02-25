# Eui App Env Configuration

## Config Essentials

When you create an eui application with the eui-cli, you will have a default installation in terms of configuration.
In the application, you will have two different environment files. They are responsible for your development and production environments.
You can define different envDynamicConfigs to have different AppJsonConfig, or other features of the EuiEnvConfig to configure your application for your environment. 

### env config

*src/environments/environment.ts* 
```typescript
import { EuiEnvConfig } from '@eui/core';

export const environment: EuiEnvConfig = {
    production: false,
    enableDevToolRedux: true,
    envDynamicConfig: {
        uri: 'assets/config/env-json-config.json',
    },
};

```
*src/environments/environment.prod.ts* 
```typescript
import { EuiEnvConfig } from '@eui/core';

export const environment: EuiEnvConfig = {
    production: true,
    enableDevToolRedux: false,
    envDynamicConfig: {
        uri: 'assets/config/env-json-config.json',
    },
};

```

### angular.json

These environment files used into your root angular.json files, and when you run the production build, 
by this configuration in angular.json, it will take care replacing environment file.

*/angular.json* 
```
  "configurations": {
              "production": {
                "fileReplacements": [
                  {
                    "replace": "src/environments/environment.ts",
                    "with": "src/environments/environment.prod.ts"
                  }
                ],
```

When your application starts, It will always use src/environments/environment.ts file. As You have replaced environment file with angular configuration, 
you will be using that environment specific file in your build. There are two places in the eui application that uses environment.ts file.

The first one is to configure EuiCoreModule with EUI_CONFIG_TOKEN's environment part. 
*src/app/core/core.module.ts* 
```
.....
import { environment } from '../../environments/environment';
.....

        {
            provide: EUI_CONFIG_TOKEN,
            useValue: { appConfig: appConfig, environment: environment }
        },
```

The second part is to load JSON configuration from the path which is defined into envDynamicConfig model in environment file.  
preInitApp function is responsible to use envDynamicConfig model, retrieve the AppJsonConfig and write it into environment's loadedEnvDynamicConfig model.
It will be used while EuiCoreModule's startup logic, and It will create the CONFIG_TOKEN in your application based on the instructions in envDynamicConfig.

*src/main.ts* 
```typescript
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { preInitApp } from '@eui/core';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

preInitApp(environment).then(() => platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err)),
);
```


### default env-json-config

Default generated application's environment.ts & environment.prod.ts environment object has assets/config/env-json-config.json at the  envDynamicConfig->uri path.
When your application bootstraps, It will call that path, and will load the AppJsonConfig. 

*src/assets/config/env-json-config.json* 
```json
{
    "modules": {
        "core": {
            "base": "/api",
            "userDetails": "/user-details"
        }
    }
}
```

## Dynamic Configuration with eui-cli

---
**This section intended to cover the dynamic configuration for default apps.**

---

In eUI we encourage to you build your application for production once, and without re-building your application, configure your application
with AppJsonConfig for your devops environments like TST, ACC, PROD. We will cover this scenario
with eui-cli's configEnvTarget option. 

### example of creating env-json-config for specific environment
We can create env-json-config-local.json file into the src/assets/config.

*src/assets/config/env-json-config-local.json* 
```json
{
    "modules": {
        "core": {
            "base": "/api",
            "userDetails": "/user-details-local-example"
        }
    }
}
```

### Serving application with option: configEnvTarget for local

When you pass to configEnvTarget=local option to start-serve command , It will get **src/assets/config/env-json-config-local.json**
file and will replace **src/assets/config/env-json-config.json** file with it. You will have CONFIG_TOKEN with local definitions.

```
 "start-serve": "eui-scripts serve-app --configuration=proxy-mock",
```

```
npm run start-serve -- --configEnvTarget=local
```

### Injecting dynamic config in your application build

Let's say you have created another dynamic json config your prod environment.

*src/assets/config/env-json-config-prod.json* 
```json
{
    "modules": {
        "core": {
            "base": "/api",
            "userDetails": "/user-details-prod-example"
        }
    }
}
```

There is the app:inject-config command that you can use to inject different configurations into your production build.

```
"app:inject-config": "eui-scripts inject-config-app",
```

For example when you run:
```
npm run app:inject-config myapp -- --configEnvTarget=prod
```
It will take env-json-config-prod.json file and replace the env-json-config.json in your application build.
You will not need to rebuild your application after you build your application for prod. You can create TST,ACC,PROD files and define your environment specific JSON configurations,
and inject your dynamic config into your production build.
