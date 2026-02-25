# LoaderService

Dynamically load external JS/CSS dependencies.

## Basic Usage

```typescript
import { EuiLoaderService } from '@eui/core';

@Component({...})
export class MyComponent {
  constructor(private loader: EuiLoaderService) {}

  loadLibrary() {
    this.loader.addDependency('Quill', 'https://cdn.quilljs.com/1.3.6/quill.js', 'js');
    
    this.loader.statusChanges('Quill').subscribe(status => {
      if (status === 'loaded') {
        // Library ready to use
      }
    });
  }
}
```

## With Prerequisites

Load dependencies in order:

```typescript
// CSS must load before JS
this.loader.addDependency('QuillCSS', 'https://cdn.quilljs.com/1.3.6/quill.snow.css', 'css');
this.loader.addDependency('Quill', 'https://cdn.quilljs.com/1.3.6/quill.js', 'js', ['QuillCSS']);
```

## Retry & Timeout Policies

```typescript
// Retry 3 times with 1 second interval
this.loader.setRetryPolicy(3, 1000);

// Timeout after 5 seconds
this.loader.setTimeoutPolicy(5000);
```

## Remove Dependency

```typescript
this.loader.removeDependency('Quill');
```

## Status Values

- `pending` - Not yet loaded
- `loading` - Currently loading
- `loaded` - Successfully loaded
- `error` - Failed to load

## See Also

- [Full loader docs](../guides/showcase-dev-guide/docs/10-services/loader-service.md)
