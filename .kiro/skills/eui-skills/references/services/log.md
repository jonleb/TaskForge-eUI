# LogService

Logging with configurable levels and appenders.

## Basic Usage

```typescript
import { LogService } from '@eui/core';

@Component({...})
export class MyComponent {
  constructor(private log: LogService) {}

  doSomething() {
    this.log.info('Operation started');
    this.log.debug('Debug details', { data: someData });
    this.log.error('Something failed', error);
  }
}
```

## Log Levels

From lowest to highest priority:

| Level | Use Case |
|-------|----------|
| ALL | All messages |
| TRACE | Fine-grained debug info |
| DEBUG | Debug info |
| INFO | Progress/status info |
| WARN | Potential issues |
| ERROR | Errors (app continues) |
| FATAL | Critical errors |
| OFF | Disable logging |

## Named Logger (Recommended)

```typescript
import { LogService, Logger } from '@eui/core';

export class MyComponent {
  private logger: Logger;

  constructor(logService: LogService) {
    this.logger = logService.getLogger('MyApp.MyComponent');
  }

  doSomething() {
    this.logger.info('Data loaded', data);
    // Output: [INFO] [MyApp.MyComponent] Data loaded {...}
  }
}
```

## Configuration

```typescript
// config/index.ts
import { LogLevel, ConsoleAppender } from '@eui/core';

export const appConfig: EuiAppConfig = {
  log: {
    logLevel: LogLevel.INFO,
    logAppenders: [{
      type: ConsoleAppender,
      prefixFormat: '[{level}] [{time}] [{logger}]',
    }],
  },
};
```

## Prefix Placeholders

- `{level}` - Log level name
- `{logger}` - Logger name
- `{date}` - Date
- `{time}` - Time

## Server Logging

```typescript
import { UrlAppender, LogLevel } from '@eui/core';

log: {
  logLevel: LogLevel.INFO,
  logAppenders: [{
    type: UrlAppender,
    url: 'https://api.example.com/logs',
    detailedEventFromLevel: LogLevel.ERROR,
  }],
}
```

## Module-Specific Logging

```typescript
// config/modules.ts
export const MODULES = {
  portfolio: {
    logLevel: LogLevel.DEBUG,
  },
};
```

## Set Level Programmatically

```typescript
import { LogLevel } from '@eui/core';

this.logger.setLevel(LogLevel.DEBUG);
```

## See Also

- [Full log docs](../guides/showcase-dev-guide/docs/10-services/log-service.md)
