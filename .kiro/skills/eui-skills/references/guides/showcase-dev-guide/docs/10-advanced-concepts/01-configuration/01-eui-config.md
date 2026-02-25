# Overview

**EuiConfig** which is the model of **EUI_CONFIG_TOKEN**, keeps two main configurations for your app: **EuiAppConfig** & **EuiEnvConfig** 

**EuiAppConfig** is keeping your global & modules configurations, handlers etc. 

**EuiEnvConfig** is keeping the environment specific information like : how to load dynamic json config, environment
specific handler config, and custom attributes.

## Model

![Model](assets/docs/10-advanced-concepts/01-configuration/config-model.png)


## Providing Configuration
You have to provide token via providers of your root core module in addition calling  to eUI's CoreModule.forRoot().

**core.module.ts**

```typescript
// ...
import {
    // ...
    CoreModule as EuiCoreModule,
    EUI_CONFIG_TOKEN,
} from '@eui/core';

import { appConfig } from '../../config/index';
import { environment } from '../../environments/environment';

@NgModule({
    imports: [
        // ...
        EuiCoreModule.forRoot(),
        // ...
    ],
    declarations: [
    ],
    exports: [
        SharedModule,
    ],
    providers: [
        // ...
        {
            provide: EUI_CONFIG_TOKEN,
            useValue: { appConfig: appConfig, environment: environment }
        },
    ]
})
export class CoreModule {

}
```
