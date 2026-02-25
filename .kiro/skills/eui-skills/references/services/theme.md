# ThemeService

Manages application theme switching (ec, eu, light, dark, compact).

## Setup

Include theme CSS files in `angular.json`:

```json
"styles": [
  "node_modules/@eui/core/styles/eui-styles.scss",
  "node_modules/@eui/styles/dist/eui-theme-dark.css",
  "node_modules/@eui/styles/dist/eui-theme-compact.css",
  "src/styles.scss"
]
```

## Basic Usage

```typescript
import { EuiThemeService } from '@eui/core';

@Component({...})
export class MyComponent {
  private themeService = inject(EuiThemeService);

  switchToDark() {
    this.themeService.setTheme('dark');
  }

  getCurrentTheme() {
    return this.themeService.getCurrentTheme();
  }
}
```

## Available Themes

| Theme | CSS Class | Description |
|-------|-----------|-------------|
| `ec` | (default) | European Commission |
| `eu` | - | European Union |
| `light` | (default) | Light mode |
| `dark` | `eui-t-dark` | Dark mode |
| `compact` | `eui-t-compact` | Compact spacing |

## Configuration

Set default and available themes in `config/global.ts`:

```typescript
export const GLOBAL: GlobalConfig = {
  theme: {
    defaultTheme: 'ec',
    availableThemes: ['ec', 'eu', 'light', 'dark'],
  },
};
```

## Subscribe to Theme Changes

```typescript
this.themeService.theme$.subscribe(theme => {
  console.log('Theme changed to:', theme);
});
```

## See Also

- [eui-styles.md](../eui-styles.md) - Full styling guide
