# Eui Env Config Model

## Model

EuiEnvConfig is responsible for the environment specific definitions. It keeps the environment part of the EuiConfig.


```typescript
export interface EuiEnvConfig {
    envDynamicConfig?: EnvDynamicConfig;
    envAppHandlersConfig?: EuiAppHandlersConfig;
    loadedEnvDynamicConfig?: EuiAppJsonConfig;

    [key: string]: any;
}
```

## Env Dynamic Config
EnvDynamicConfig is responsible to retrieve dynamically EuiAppJsonConfig. It keeps the information : which uri should be called, what will be the timeout for that call, will the loaded config merged or overwritten,
what will be the merge strategy.
```typescript
export interface EnvDynamicConfig {
    /** uri which can be local path or webservice, should store/return json-config which implements EuiAppJsonConfig*/
    uri: string;
    /**
     * Dynamic config will be awaiting for 2000ms(default) to resolve the request,
     * to change this duration you can use this parameter
     */
    configTimeout?: number;
    /**
     * Dynamic configuration overwrites to the config properties of EuiAppJsonConfig
     * in the default configuration (global, modules, versions, [key: string]: any; )
     * To merge the data for specific config property/ies you can define them as array, e.g.['modules','global']
     * Note: When deepMerge:true is not provided, If there is common sub property for the merged object,
     * dynamic fetched config will be overwriting it, otherwise It will be merged deeply.
     */
    merge?: Array<string>;
    /**
     * If merge array is provided, the way of merging will be one-level merge as default.
     * To have deep merge functionality, you have to define deepMerge:true
     */
    deepMerge?: boolean;
}
```
## Env App Handlers Config

It has the same interface with EuiAppHandlersConfig. If you want to override to the environment with environment specific configuration for EuiAppHandlersConfig, You can define at envAppHandlersConfig.

## Loaded Env Dynamic Config

It is an internal property which is used for run-time. It keeps the data of the dynamically loaded EuiAppJsonConfig.
