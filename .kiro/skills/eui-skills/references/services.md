# eUI Services

Core services for eUI Angular 21 applications.

## Service Guides

| Service | Purpose |
|---------|---------|
| [I18nService](services/i18n.md) | Translations and language switching |
| [AppShellService](services/app-shell.md) | Header, sidebar, footer, breakpoints |
| [ThemeService](services/theme.md) | Theme switching (ec, eu, light, dark) |
| [GrowlService](services/growl.md) | Toast notifications |
| [DialogService](services/dialog.md) | Programmatic modals |
| [PermissionService](services/permission.md) | User authorization |
| [LocaleService](services/locale.md) | Date/number formatting |
| [BreadcrumbService](services/breadcrumb.md) | Breadcrumb management |
| [LogService](services/log.md) | Logging with levels and appenders |
| [ErrorHandling](services/error-handling.md) | JS exceptions and HTTP errors |
| [LoaderService](services/loader.md) | Dynamic JS/CSS loading |

## Store-Based Services

These services use a common pattern with `init`, `getState`, `updateState`:

```typescript
interface EuiServiceModel<T> {
  init(state: T): Observable<EuiServiceStatus>;
  getState(): Observable<T>;
  updateState(state: T): void;
}
```

Services using this pattern:
- I18nService
- PermissionService
- LocaleService
- UserService

## Quick Reference

### EuiGrowlService

```typescript
import { EuiGrowlService } from '@eui/core';

growl.growlSuccess("Success!");
growl.growlError("Error occurred");
growl.growlWarning("Warning");
growl.growlInfo("Info");
```

### EuiThemeService

```typescript
import { EuiThemeService } from '@eui/core';

themeService.setTheme('dark');
```

### EuiDialogService

```typescript
import { EuiDialogService, EuiDialogConfig } from '@eui/components/eui-dialog';

dialogService.openDialog(new EuiDialogConfig({
  title: 'Confirm',
  content: 'Are you sure?',
  accept: () => { /* confirmed */ },
}));
```

### EuiAppShellService

```typescript
import { EuiAppShellService } from '@eui/core';

appShell.sidebarToggle();
appShell.isSidebarOpen = true;
```

### I18nService

```typescript
import { I18nService } from '@eui/core';

i18nService.init({ activeLang: 'fr' });
i18nService.updateState({ activeLang: 'de' });
```

## See Also

- [Full service docs](guides/showcase-dev-guide/docs/10-services/)
