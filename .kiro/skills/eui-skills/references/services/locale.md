# LocaleService

Date/number formatting based on locale (CLDR).

## Setup

Register locale data before initializing:

```typescript
import { registerLocaleData } from '@angular/common';
import localeFR from '@angular/common/locales/fr';
import localeDE from '@angular/common/locales/de';

registerLocaleData(localeFR);
registerLocaleData(localeDE);
```

## Initialize

```typescript
import { LocaleService } from '@eui/core';

// Initialize after i18nService
this.localeService.init({ id: 'fr-FR' }).subscribe(status => {
  console.log('Locale initialized');
});
```

## Configuration

```typescript
// config/global.ts
export const GLOBAL: GlobalConfig = {
  locale: {
    bindWithTranslate: true, // auto-switch locale when language changes
  },
};
```

## Get Current State

```typescript
this.localeService.getState().subscribe(state => {
  console.log('Current locale:', state.id);
});
```

## Locale ID Mapper

Map language codes to specific locales:

```typescript
// app.module.ts
providers: [
  {
    provide: LOCALE_ID_MAPPER,
    useFactory: () => (locale: string) => {
      if (locale === 'fr') return 'fr-BE';
      return locale;
    },
  },
],
```

## Angular Locale Functions

With locale set, Angular pipes use correct formatting:

```html
{{ price | currency }}        <!-- €8 000,90 (fr-FR) vs €8,000.90 (en-US) -->
{{ date | date:'medium' }}    <!-- locale-aware date -->
{{ value | number:'1.2-2' }}  <!-- locale-aware number -->
```

## Key Points

- Locale ≠ Language (Greek has el-GR and el-CY locales)
- Initialize after i18nService
- Register locale data before init
- Use `bindWithTranslate: true` to auto-sync with language

## See Also

- [Full locale docs](../guides/showcase-dev-guide/docs/10-services/locale.md)
