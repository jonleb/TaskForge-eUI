# Error Handling

JavaScript exceptions and HTTP error handling.

## JavaScript Exceptions

Caught by CoreModule's ErrorHandler and forwarded to LogService. You still need to handle errors in your code:

```typescript
this.myService.loadData().subscribe({
  next: (data) => {
    try {
      this.title = data.someProperty.title;
    } catch (e) {
      this.log.error('Failed to parse data', e);
    }
  },
  error: (err) => this.log.error('API call failed', err),
});
```

## HTTP Error Handler

Configure in `config/index.ts`:

```typescript
export const appConfig: EuiAppConfig = {
  httpErrorHandler: {
    routes: [
      {
        path: '*',
        401: '/unauthorized',
        404: '/not-found',
        500: '/server-error',
        default: GrowlHttpErrorCallbackFn,
      },
    ],
  },
};
```

## Route-Specific Handling

```typescript
httpErrorHandler: {
  routes: [
    // Specific route first
    {
      path: '/api/users/*',
      404: null,  // do nothing for 404
      default: ConsoleHttpErrorCallbackFn,
    },
    // Catch-all last
    {
      path: '*',
      default: GrowlHttpErrorCallbackFn,
    },
  ],
}
```

## Handler Types

```typescript
// Redirect to error page
{ 500: '/error-500' }

// Execute callback
{ 500: MyErrorCallbackFn }

// Do nothing
{ 500: null }
```

## Custom Callback

```typescript
import { HttpErrorResponse } from '@angular/common/http';
import { Injector } from '@angular/core';
import { EuiGrowlService } from '@eui/core';

export function MyErrorCallback(error: HttpErrorResponse, injector: Injector) {
  const growl = injector.get(EuiGrowlService);
  growl.growlError(`Error ${error.status}: ${error.message}`);
}
```

## Built-in Callbacks

- `GrowlHttpErrorCallbackFn` - Shows growl notification
- `ConsoleHttpErrorCallbackFn` - Logs to console
- `LogHttpErrorCallbackFn` - Uses LogService

## See Also

- [Full error handling docs](../guides/showcase-dev-guide/docs/10-services/error-handling.md)
