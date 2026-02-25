# Application Configuration

eUI configuration system with global settings, modules, and environment overrides.

## Configuration Structure

Main entry point combining all config parts:

```typescript
// src/config/index.ts
import { EuiAppConfig } from '@eui/core';
import { GLOBAL } from './global';
import { MODULES } from './modules';

export const appConfig: EuiAppConfig = {
  global: GLOBAL,
  modules: MODULES,
};
```

## Global Config (`config/global.ts`)

App-wide settings: title, i18n, user defaults. Shared across all modules.

```typescript
import { GlobalConfig } from '@eui/core';

export const GLOBAL: GlobalConfig = {
  appTitle: 'My App',
  showConnectionStatus: true,
  i18n: {
    i18nService: {
      defaultLanguage: 'en',
      languages: ['en', 'fr', 'de'],
    },
    i18nLoader: {
      i18nFolders: ['i18n-eui', 'i18n'],
    },
  },
  user: {
    defaultUserPreferences: {
      lang: 'en',
      dashboard: {},
    },
  },
};
```

## Modules Config (`config/modules.ts`)

Feature-specific settings: API endpoints, module translations. Each key is a module name.

```typescript
import { ModulesConfig } from '@eui/core';

export const MODULES: ModulesConfig = {
  core: {
    api: {
      base: '/api',
      user: {
        base: '/users',
        details: '/details',
        preferences: '/preferences',
      },
    },
  },
  portfolio: {
    api: { base: '/api/portfolio' },
    i18nFolders: ['i18n-portfolio'],
  },
};
```

## Providing Configuration

Register config at app bootstrap. Environment merges into appConfig.

```typescript
// app.config.ts
import { EUI_CONFIG_TOKEN, provideEuiInitializer } from '@eui/core';
import { appConfig } from './config';
import { environment } from '../environments/environment';

export const appConfiguration: ApplicationConfig = {
  providers: [
    {
      provide: EUI_CONFIG_TOKEN,
      useValue: { appConfig, environment },
    },
    provideEuiInitializer(),
  ],
};
```

## Environment Files

Control build-time behavior: production mode, dev tools, config source.

```typescript
// src/environments/environment.ts (development)
import { EuiEnvConfig } from '@eui/core';

export const environment: EuiEnvConfig = {
  production: false,
  enableDevToolRedux: true,  // Redux DevTools in browser
  envDynamicConfig: {
    uri: 'assets/config/env-json-config.json',
  },
};

// src/environments/environment.prod.ts (production)
export const environment: EuiEnvConfig = {
  production: true,
  enableDevToolRedux: false,
  envDynamicConfig: {
    uri: 'assets/config/env-json-config.json',
  },
};
```

## External JSON Config (`assets/config/env-json-config.json`)

Runtime config loaded at startup. Enables build-once-deploy-anywhere.

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

Create environment-specific files:
- `env-json-config-local.json`
- `env-json-config-tst.json`
- `env-json-config-prod.json`

## Dynamic Configuration Loading

Load external config before Angular bootstraps. Required for env-json-config.

```typescript
// main.ts
import { preInitApp } from '@eui/core';
import { environment } from './environments/environment';

preInitApp(environment).then(() =>
  platformBrowserDynamic().bootstrapModule(AppModule)
);
```

Load from API instead of file:

```typescript
envDynamicConfig: {
  uri: '/api/configuration',
  configTimeout: 5000,
}
```

## Multi-Environment Deployment

Swap config files without rebuilding. Useful for CI/CD pipelines.

```bash
# Serve with specific config
npm run start-serve -- --configEnvTarget=local

# Inject config into production build
npm run app:inject-config myapp -- --configEnvTarget=prod
```

## Accessing Configuration

Inject config anywhere to read settings at runtime.

```typescript
import { Inject } from '@angular/core';
import { CONFIG_TOKEN, EuiAppConfig } from '@eui/core';

@Injectable()
export class MyService {
  constructor(@Inject(CONFIG_TOKEN) private config: EuiAppConfig) {}

  getApiBase() {
    return this.config.modules.core.api.base;
  }
}
```

## State Storage

Where eUI persists app state. Default: localStorage.

```typescript
import { BrowserStorageType } from '@eui/core';

export const appConfig: EuiAppConfig = {
  global: GLOBAL,
  modules: MODULES,
  saveStateStorage: BrowserStorageType.session,
};
```

## Handlers Config

Custom error handling, logging, and extensibility hooks.

```typescript
export const appConfig: EuiAppConfig = {
  global: GLOBAL,
  modules: MODULES,
  httpErrorHandler: HTTP_ERROR_HANDLERS,
  errorMappingHandler: ERROR_MAPPING_HANDLER,
  log: LOG_CONFIG,
  customHandler: {
    myHandler: myCustomFunction,
  },
};
```

## Key Interfaces

```typescript
interface EuiAppConfig {
  global: GlobalConfig;
  modules?: ModulesConfig;
  httpErrorHandler?: HttpErrorHandlerConfig;
  errorMappingHandler?: ErrorMappingHandler;
  log?: LogConfig;
  customHandler?: { [id: string]: any };
}

interface GlobalConfig {
  appTitle?: string;
  showConnectionStatus?: boolean;
  user?: UserConfig;
  i18n?: I18nConfig;
  locale?: LocaleServiceConfig;
}
```

## See Also

- [Full config docs](guides/showcase-dev-guide/docs/10-advanced-concepts/03-app-config.md)
- [EuiAppConfig reference](guides/showcase-dev-guide/docs/10-advanced-concepts/01-configuration/02-eui-app-config.md)
- [i18n configuration](i18n.md)
