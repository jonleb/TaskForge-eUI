# EUIM Styles Guide

Styling guide for eUI-Mobile (EUIM) applications with Ionic 8.

## Setup

EUIM apps use Ionic's styling system. Styles are configured in `angular.json`:

```json
"styles": [
  "node_modules/@ionic/angular/css/core.css",
  "node_modules/@ionic/angular/css/normalize.css",
  "node_modules/@ionic/angular/css/structure.css",
  "node_modules/@ionic/angular/css/typography.css",
  "node_modules/@ionic/angular/css/padding.css",
  "node_modules/@ionic/angular/css/float-elements.css",
  "node_modules/@ionic/angular/css/text-alignment.css",
  "node_modules/@ionic/angular/css/text-transformation.css",
  "node_modules/@ionic/angular/css/flex-utils.css",
  "src/theme/variables.scss",
  "src/global.scss"
]
```

## Ionic CSS Utilities

EUIM uses Ionic utility classes (prefix `ion-`).

### Padding

```html
<div class="ion-padding">All padding</div>
<div class="ion-padding-top">Top padding</div>
<div class="ion-padding-start">Start padding (LTR: left)</div>
<div class="ion-padding-horizontal">Horizontal padding</div>
<div class="ion-no-padding">No padding</div>
```

### Margin

```html
<div class="ion-margin">All margin</div>
<div class="ion-margin-bottom">Bottom margin</div>
<div class="ion-margin-vertical">Vertical margin</div>
<div class="ion-no-margin">No margin</div>
```

### Text Alignment

```html
<p class="ion-text-start">Start aligned</p>
<p class="ion-text-center">Center aligned</p>
<p class="ion-text-end">End aligned</p>
<p class="ion-text-justify">Justified</p>
<p class="ion-text-wrap">Wrap text</p>
<p class="ion-text-nowrap">No wrap</p>
```

### Text Transform

```html
<p class="ion-text-uppercase">UPPERCASE</p>
<p class="ion-text-lowercase">lowercase</p>
<p class="ion-text-capitalize">Capitalize</p>
```

### Flex

```html
<div class="ion-justify-content-center">Center justify</div>
<div class="ion-justify-content-between">Space between</div>
<div class="ion-align-items-center">Center align</div>
<div class="ion-align-self-start">Self start</div>
```

### Hide/Show

```html
<div class="ion-hide">Hidden</div>
<div class="ion-hide-sm-up">Hidden on sm and up</div>
<div class="ion-hide-md-down">Hidden on md and down</div>
```

## CSS Variables

Customize theme in `src/theme/variables.scss`:

```scss
:root {
  --ion-color-primary: #3880ff;
  --ion-color-secondary: #3dc2ff;
  --ion-color-tertiary: #5260ff;
  --ion-color-success: #2dd36f;
  --ion-color-warning: #ffc409;
  --ion-color-danger: #eb445a;
  
  --ion-font-family: 'Inter', sans-serif;
  
  --ion-background-color: #ffffff;
  --ion-text-color: #000000;
}
```

## Color Attribute

Apply colors via `color` attribute:

```html
<ion-button color="primary">Primary</ion-button>
<ion-button color="secondary">Secondary</ion-button>
<ion-button color="success">Success</ion-button>
<ion-button color="danger">Danger</ion-button>
```

## Dark Mode

```scss
// src/theme/variables.scss
@media (prefers-color-scheme: dark) {
  :root {
    --ion-background-color: #121212;
    --ion-text-color: #ffffff;
  }
}
```

Or toggle programmatically:

```typescript
document.body.classList.toggle('dark');
```

## Platform-Specific Styles

```scss
// iOS only
.ios {
  ion-toolbar {
    --background: #f8f8f8;
  }
}

// Android only
.md {
  ion-toolbar {
    --background: #ffffff;
  }
}
```

## Key Differences from eUI Desktop

| Aspect | eUI Desktop | EUIM (Ionic) |
|--------|-------------|--------------|
| Prefix | `eui-u-*` | `ion-*` |
| Spacing | `eui-u-mt-m` | `ion-margin-top` |
| Colors | CSS classes | `color` attribute |
| Theming | CSS variables | Ionic CSS variables |
| Grid | Bootstrap | Ionic grid |

## Ionic Grid

```html
<ion-grid>
  <ion-row>
    <ion-col size="12" size-md="6" size-lg="4">
      Column content
    </ion-col>
  </ion-row>
</ion-grid>
```

## Reference

- Ionic CSS Utilities: https://ionicframework.com/docs/layout/css-utilities
- Ionic Theming: https://ionicframework.com/docs/theming/basics
- [EUIM docs](euim/docs/)
