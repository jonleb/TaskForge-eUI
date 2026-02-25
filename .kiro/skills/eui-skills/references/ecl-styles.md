# ECL Styles Guide

Styling guide for ECL (European Commission Library) applications.

## Setup

Import ECL styles in `angular.json`:

```json
"styles": [
  "node_modules/@ecl/preset-ec/dist/styles/ecl-ec.css",
  "src/styles.scss"
]
```

For EU theme:
```json
"styles": [
  "node_modules/@ecl/preset-eu/dist/styles/ecl-eu.css",
  "src/styles.scss"
]
```

## CSS Utility Classes

ECL uses `ecl-u-*` prefix (not `eui-u-*`).

### Typography

```html
<h1 class="ecl-u-type-heading-1">Heading 1</h1>
<h2 class="ecl-u-type-heading-2">Heading 2</h2>
<p class="ecl-u-type-paragraph">Paragraph text</p>
<p class="ecl-u-type-paragraph-lead">Lead paragraph</p>
```

### Spacing

Pattern: `ecl-u-{m|p}{side}-{size}`

Sides: `t` (top), `b` (bottom), `l` (left), `r` (right), `v` (vertical), `h` (horizontal)

Sizes: `none`, `2xs`, `xs`, `s`, `m`, `l`, `xl`, `2xl`, `3xl`, `4xl`

```html
<div class="ecl-u-mt-l ecl-u-mb-m">Margin top large, bottom medium</div>
<div class="ecl-u-pv-s ecl-u-ph-m">Padding vertical small, horizontal medium</div>
```

### Colors

```html
<div class="ecl-u-bg-primary">Primary background</div>
<div class="ecl-u-bg-secondary">Secondary background</div>
<span class="ecl-u-type-color-primary">Primary text</span>
<span class="ecl-u-type-color-grey">Grey text</span>
```

### Display & Visibility

```html
<div class="ecl-u-d-block">Block</div>
<div class="ecl-u-d-inline">Inline</div>
<div class="ecl-u-d-flex">Flex container</div>
<div class="ecl-u-d-none">Hidden</div>
```

### Borders

```html
<div class="ecl-u-border-all">All borders</div>
<div class="ecl-u-border-bottom">Bottom border</div>
<div class="ecl-u-border-color-primary">Primary border color</div>
```

## ECL Grid

ECL uses its own grid system:

```html
<div class="ecl-container">
  <div class="ecl-row">
    <div class="ecl-col-12 ecl-col-md-6 ecl-col-lg-4">
      Column content
    </div>
  </div>
</div>
```

## Theme Services

```typescript
import { EclThemeService } from '@eui/ecl';

// Switch between EC and EU themes
eclThemeService.setTheme('ec'); // or 'eu'
```

## Key Differences from eUI

| Aspect | eUI | ECL |
|--------|-----|-----|
| Prefix | `eui-u-*` | `ecl-u-*` |
| Grid | Bootstrap 5.3 | ECL grid |
| Typography | `eui-u-text-h1` | `ecl-u-type-heading-1` |
| Spacing | `eui-u-mt-m` | `ecl-u-mt-m` |

## Don't Mix

Avoid mixing eUI and ECL utility classes in the same component:

```html
<!-- ❌ Don't mix -->
<div class="eui-u-mt-m ecl-u-type-heading-1">...</div>

<!-- ✅ Use one system -->
<div class="ecl-u-mt-m ecl-u-type-heading-1">...</div>
```

## Reference

- ECL Documentation: https://ec.europa.eu/component-library
- [ECL home](ecl/home.md)
