# GrowlService

Toast notifications for user feedback.

## Basic Usage

```typescript
import { EuiGrowlService } from '@eui/core';

@Component({...})
export class MyComponent {
  constructor(private growl: EuiGrowlService) {}

  showNotifications() {
    this.growl.growlSuccess('Operation completed!');
    this.growl.growlError('An error occurred');
    this.growl.growlWarning('Warning message');
    this.growl.growlInfo('Information');
  }
}
```

## Full API

```typescript
this.growl.growl(
  { severity: 'success', summary: 'Title', detail: 'Message' },
  isSticky,    // boolean - stays until dismissed
  isMultiple,  // boolean - allow multiple growls
  life,        // number - duration in ms (default: 3000)
  position,    // string - position on screen
  callback,    // function - on click callback
  ariaLive     // 'polite' | 'assertive' | 'off'
);
```

## Positions

- `top-left`, `top-center`, `top-right`
- `center`
- `bottom-left`, `bottom-center`, `bottom-right` (default)

## Severity Types

- `success` - green
- `info` - blue
- `warning` - yellow
- `danger` - red (sticky by default)

## Clear All

```typescript
this.growl.clearGrowl();
```

## With Custom Options

```typescript
this.growl.growl(
  { severity: 'info', summary: 'Update', detail: 'New version available' },
  true,           // sticky
  false,          // single growl
  5000,           // 5 seconds
  'top-right'     // position
);
```

## See Also

- [eui-growl component](../eui/components/eui-growl.md)
