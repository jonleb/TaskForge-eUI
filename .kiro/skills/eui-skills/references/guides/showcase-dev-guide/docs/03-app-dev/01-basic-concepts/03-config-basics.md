# App development - Basic concepts - app configuration

In this chapter, we'll present the basic concepts of the configuration, this includes : 

- eUI core configuration : instructing how the eUI services internal should behave
- API / modules configuration : instructing external endpoints configuration
- the CONFIG_TOKEN : federating the merged configuration available throughout your eUI Angular code.

The goal of this config and how it's merged it's allowing to write environment free Angular code within your eUI app,  
thus making more easy to deliver your application in any target environment you might need :  
build once => deploy on many.

## Configuration overview and principles

In a default eUI application, generated from the eUI CLI (see the getting started guide in the previous chapters),  
Some default configuration concepts are provided :

![config](assets/docs/03-app-dev/01-basic-concepts/config-global.png)

### eUI core configuration : 

In **/src/config** you'll find a first set of files, their goal is to configure mainly eUI services and instruct them how to operate with some default values provided : 

it's composed of 3 files : 

- index.ts : entry point setting up the EuiAppConfig, merging the global.ts + module.ts files
- global.ts : GlobalConfig setting up some eUI globals like the i18nService for example
- module.ts : ModulesConfig setting up default API entry points, static for all target environments (see later)


### eUI Angular environment configuration : 

In **/src/environments** : By default, the environment configuration is **ONLY** used for setting some Angular properties, they are only 2 : 

- **environment.ts** : for local dev and **dev** angular build target, not optimized build, meant for debuging once app is built.
- **environment.prod.ts** : for upper target environment build, once the **build-prod** is executed (configuration=prod), this has **NOTHING** to do with a target PROD environment, it's only here the **prod** Angular flag for building an optimized application to deliver it outside of your DEV environment!.

In those file, we are defining the **envDynamicConfig** property, that will load at runtime the specific configuration files : API / changing per environment of your application.

```javascript
import { EuiEnvConfig } from '@eui/core';

export const environment: EuiEnvConfig = {
    production: false,
    enableDevToolRedux: true,
    envDynamicConfig: {
        uri: 'assets/config/env-json-config.json',
    },
};
```

**NOTE** : if you don't have changing API for your environment, those API can be set in the **module.ts** as explained above.


### eUI API dynamic JSON configuration

![config](assets/docs/03-app-dev/01-basic-concepts/config-assets.png)

In this basic chapter, and on eUI default application the API configuration is dynamically set to be fetched at runtime from the relative **assets/config/env-json-config.json** file.

This file contains the API endpoints used for the mock server as an example, but the principle will be the same for targeting a REST endpoints on the server where the eUI app is deployed or any other API definitions/location.

```javascript
{
    "modules": {
        "core": {
            "base": "/api",
            "userDetails": "/user-details"
        }
    }
}

```

**NOTE** by default there's only one single file here for all target environment, but this can be easily extended to one file per envioronment if needed.  
The principle here is that there's only one file known at runtime by your eUI app.  

For example : we want to have a different file for the INT environment, in **/src/assets/config** we'll then create a **env-json-config-INT.json**, this file will then replace the "known" file : **env-json-config.json** at **POST BUILD** time, we'll see later how to deal with that in a more [advanced](./docs/10-advanced-concepts/03-app-config) chapter.


## eUI CONFIG_TOKEN injector token

Now that we have our config in place, the content of this merged config : global app config + environment + dynamic API
is made available for you and throughout the eUI App code through the CONFIG_TOKEN.

This avoid you to import any Typescript files from your code that will need to be recompiled and thus making the application built, environment free => building your application ONE time to deliver it to any of the target environment.  

As a first example, the default eUI app has by default the initial call to the user-details API :  

in **/src/app/app-starter.service.ts** : 

```javascript
...
// injected CONFIG_TOKEN on constructor class : 
    constructor(
        ...
        @Inject(CONFIG_TOKEN) private config: EuiAppConfig,
        ...
    ) {
    }
...
// fetch of the user-details from the CONFIG_TOKEN (config)
    private fetchUserDetails(): Observable<UserDetails> {
        const moduleCoreApi = this.config.modules.core;
        const url = `${moduleCoreApi.base}${moduleCoreApi.userDetails}`;
        const user = { userId: 'anonymous' };

        if (!url) {
            return of(user);
        }
        return this.http.get<UserDetails>(url);
    }
...

```

### Injecting targeted environment config into build
There is additionally app:inject-config command that you can use to inject different configurations into your production build.

```
"app:inject-config": "eui-scripts inject-config-app",
```

For example when you run:
```
npm run app:inject-config myapp -- --configEnvTarget=prod
```
It will take env-json-config-prod.json file and replace the env-json-config.json in your build application.
You will not need to rebuild your application after you build your application with prod. You can create TST,ACC,PROD files and define your environment specific JSON configurations,
and with *build-prod*. 

## More details

To see overview of EuiConfig model please visit [Overview(EuiConfig)](./docs/10-advanced-concepts/01-configuration/01-eui-config) section. 

To see EuiAppConfig model in detail please visit [Eui App Config](./docs/10-advanced-concepts/01-configuration/02-eui-app-config) section. 

To see EuiEnvConfig model in detail please visit [Eui Env Config](./docs/10-advanced-concepts/01-configuration/03-env-config) section. 

To see how to configure your eUI Application for a specific environment with cli in detail please visit [Eui App Env Configuration](./docs/10-advanced-concepts/01-configuration/04-eui-app-env-configuration) section.
