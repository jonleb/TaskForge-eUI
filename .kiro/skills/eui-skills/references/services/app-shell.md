# AppShellService

Manages application shell state: sidebar, header, breakpoints, device info.

## Basic Usage

```typescript
import { EuiAppShellService } from '@eui/core';

@Component({...})
export class MyComponent {
  constructor(private asService: EuiAppShellService) {}
}
```

## Sidebar Control

```typescript
// Toggle sidebar
this.asService.sidebarToggle();

// Open/close directly
this.asService.isSidebarOpen = true;
this.asService.isSidebarOpen = false;
```

## Breakpoints

React to responsive breakpoints:

```typescript
// Current breakpoint name
this.asService.state$.subscribe(state => {
  console.log(state.breakpoint); // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
});

// All breakpoint matches
this.asService.state$.subscribe(state => {
  console.log(state.breakpoints); // { xs: true, sm: true, md: false, ... }
});
```

## Window Dimensions

```typescript
this.asService.state$.subscribe(state => {
  console.log(state.windowHeight, state.windowWidth);
});
```

## Device Info

```typescript
this.asService.state$.subscribe(state => {
  console.log(state.deviceInfo);
  // { browser, os, device, ... }
});
```

## Language List

Update language selector dynamically:

```typescript
this.asService.setState({
  ...this.asService.state,
  languages: ['en', 'fr', { code: 'de', label: 'Deutsch' }],
});
```

## Full State Update

```typescript
this.asService.setState({
  sidebarVisible: true,
  sidebarCollapsed: false,
  languages: ['en', 'fr'],
});
```

## See Also

- [Full docs](../guides/app-shell-service.md)
