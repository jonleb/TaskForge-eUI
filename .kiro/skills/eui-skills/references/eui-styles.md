# eUI Styles Guide

Styling guide for eUI Angular 21 applications.

## Setup

Import eUI styles in `angular.json`:

```json
"styles": [
  "node_modules/@eui/core/styles/eui-styles.scss",
  "src/styles.scss"
]
```

With Bootstrap grid (optional):

```json
"styles": [
  "node_modules/@eui/styles/dist/eui-bootstrap-grid.css",
  "node_modules/@eui/core/styles/eui-styles.scss",
  "src/styles.scss"
]
```

For theming support, add theme files:

```json
"styles": [
  "node_modules/@eui/core/styles/eui-styles.scss",
  "node_modules/@eui/styles/dist/eui-theme-dark.css",
  "node_modules/@eui/styles/dist/eui-theme-compact.css",
  "src/styles.scss"
]
```

## Design Tokens

Design tokens are reusable values shared across the eUI ecosystem. CSS utilities are derived from these tokens.

### Colors

**Color families (9):** branding, primary, secondary, neutral, info, success, warning, danger, cta

**Text color only** (`eui-u-c-*`) - sets `color` property:
```html
<span class="eui-u-c-primary">Primary text</span>
<span class="eui-u-c-danger-dark">Dark danger text</span>
```
Variants: `<color>`, `<color>-light`, `<color>-lighter`, `<color>-dark`, `<color>-darker`, `white`, `black`

**Background + auto-contrast text** (`eui-u-c-bg-*`) - sets BOTH `background-color` AND `color`:
```html
<div class="eui-u-c-bg-primary-surface-light">Light blue bg + dark text</div>
<div class="eui-u-c-bg-danger-surface-dark">Dark red bg + white text</div>
```

Surface variants (for backgrounds):
- `<color>-base` - base color
- `<color>-surface` - standard
- `<color>-surface-light` - lighter
- `<color>-surface-medium` - medium intensity
- `<color>-surface-dark` - darker
- `<color>-surface-hover`, `<color>-surface-light-hover`, `<color>-surface-medium-hover` - hover states

On-surface variants (inverted - use on-surface color as background):
- `<color>-on-surface`, `<color>-on-surface-light`, `<color>-on-surface-medium`, `<color>-on-surface-dark`
- `<color>-on-surface-hover`, `<color>-on-surface-light-hover`, `<color>-on-surface-medium-hover`

Basic: `white`, `black`

Note: `branding` has fewer variants (no medium, no hover states).

**CSS variables** (`--eui-c-*`) for custom styling:
```css
.custom { 
  background: var(--eui-c-primary-surface-light);
  color: var(--eui-c-primary-on-surface-light);
  border: 1px solid var(--eui-c-primary-border);
}
.custom:hover {
  background: var(--eui-c-primary-surface-hover);
}
```

**Border variables** (no utility classes - use inline or custom CSS):
- `--eui-c-<color>-border` - standard border
- `--eui-c-<color>-border-light` - lighter border
- `--eui-c-<color>-border-lighter` - lightest border

**Hover variables** (included in surface utilities, or use directly):
- `--eui-c-<color>-surface-hover` - hover background
- `--eui-c-<color>-on-surface-hover` - hover text

**General context CSS variables** (`--eui-c-*`):
- Backgrounds: `surface-page`, `surface-shell`, `surface-container`, `surface-container-1..3`
- Text: `text`, `text-light`, `text-lighter`
- States: `focus-visible`, `focus`, `hover`, `hover-disabled`, `active`, `active-bg`, `active-bg-alt`, `disabled`, `disabled-bg`, `readonly`
- Other: `link`, `divider`, `divider-light`

**Numeric palettes (ECL only):** When using ECL styles (`eui-ecl-ec.css` or `eui-ecl-eu.css`), numeric color scales are available:
- CSS variables: `--ecl-color-primary-950` through `--ecl-color-primary-25`
- Utility classes: `ecl-u-bg-primary-950` through `ecl-u-bg-primary-25`
- Families: primary, secondary, neutral, grey, info, success, error, warning

### Spacing Tokens

Unified spacing scale:

- `none` 0
- `5xs` 0.0625rem
- `4xs` 0.125rem
- `3xs` 0.25rem
- `2xs` 0.375rem
- `xs` 0.5rem
- `s` 0.75rem
- `m` 1rem
- `l` 1.25rem
- `xl` 1.5rem
- `2xl` 1.75rem
- `3xl` 2rem
- `4xl` 2.25rem
- `5xl` 2.5rem
- `6xl` 3rem
- `7xl` 3.5rem
- `8xl` 4rem
- `9xl` 4.5rem
- `10xl` 5rem

Use the spacing tokens through `eui-u-m*` and `eui-u-p*` utilities.

### Border Radius

Utility classes: `eui-u-br-*`
CSS variables: `--eui-br-*`

Values: `none`, `xs`, `s`, `m`, `l`, `max`

- `eui-u-br-none` - no radius
- `eui-u-br-xs` - extra small
- `eui-u-br-s` - small
- `eui-u-br-m` - medium
- `eui-u-br-l` - large
- `eui-u-br-max` - full/circle (use with equal width/height for circles)

Note: `eui-u-br-circle` doesn't exist - use `eui-u-br-max`.

### Border State

`eui-u-border-state-*` classes only apply a LEFT accent border (not full border): `primary`, `secondary`, `info`, `success`, `warning`, `danger`

Other: `eui-u-border-none`, `eui-u-border-bottom-separator`

For full borders, use inline style:
```html
<div style="border: 1px solid var(--eui-c-primary);">Full border</div>
```

### Opacity

`eui-u-o-*`: `none`, `25`, `50`, `75`, `100`

### Shadows

`eui-u-sh-*`: `0` (none), `1`, `2`, `3`, `4`, `5` (increasing elevation)

### Z-Index

`eui-u-zi-*`: `auto`, `zero`, `root`, `breadcrumb`, `header`, `nav`, `sidebar`, `overlay`, `modal`, `modal-backdrop`, `menu`, `tooltip`, `max`, `growl-message`

### Cursor

`eui-u-cursor-*`: `pointer`, `default`, `help`, `move`, `crosshair`, `wait`, `progress`, `text`, `no-drop`, `not-allowed`, `grab`

### Display

`eui-u-display-*`: `block`, `inline`, `inline-block`, `hidden`, `visible`

Responsive: `eui-u-display-hidden-mobile`, `-hidden-mobile-up`, `-hidden-desktop-down`

Print: `eui-u-display-print-only`, `-print-hidden`

Scrollbars: `eui-u-display-scrollbars` (styled scrollbars)

### Flex

Display: `eui-u-d-flex`, `eui-u-display-flex`, `eui-u-inline-flex` (pure flexbox), `eui-u-flex` (includes width:100% + align-items:center)

Direction: `eui-u-flex-row`, `eui-u-flex-row-reverse`, `eui-u-flex-column`, `eui-u-flex-column-reverse`

Justify: `eui-u-flex-justify-content-start`, `-end`, `-center`, `-between`, `-around`, `-evenly`

Align: `eui-u-flex-align-items-start`, `-center`, `-end`, `-stretch`

Wrap: `eui-u-flex-wrap`, `eui-u-flex-wrap-reverse`, `eui-u-flex-nowrap`

Gap: `eui-u-flex-gap-*` (spacing tokens: none, 5xs-10xl, xs-xl, s, m, l)

Grow/Shrink: `eui-u-flex-grow`, `eui-u-flex-no-grow`, `eui-u-flex-shrink`, `eui-u-flex-no-shrink`, `eui-u-flex-col`

### Typography

- Typeface: Inter (default eUI font).
- Responsive font sizes from `2xs` to `6xl` across breakpoints.
- Font styles: light (300), regular (400), medium (500), semi-bold (600), bold (700).

Size scale (desktop values):

- `2xs` 0.625rem (10px)
- `xs` 0.75rem (12px)
- `s` 0.875rem (14px)
- `m` 1rem (16px)
- `l` 1.125rem (18px)
- `xl` 1.25rem (20px)
- `2xl` 1.5rem (24px)
- `3xl` 1.75rem (28px)
- `4xl` 2rem (32px)
- `5xl` 2.25rem (36px)
- `6xl` 2.5rem (40px)

Responsive line-heights are paired per breakpoint in the typography table (Mobile XS/S, Tablet, Desktop).

Typography utilities:

- `eui-u-f-*` for font families, sizes, and weights
- `eui-u-text-*` for text formatting and headings

**Font utilities** (`eui-u-f-*`):
- Size+weight combo: `eui-u-f-{size}` or `eui-u-f-{size}-{weight}` (e.g., `eui-u-f-xl`, `eui-u-f-xl-bold`)
- Sizes: `2xs`, `xs`, `s`, `m`, `l`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`
- Weights: `light`, `medium`, `semi-bold`, `bold`
- Size only: `eui-u-f-size-{size}`
- Weight only: `eui-u-f-weight-{weight}`, `eui-u-f-regular`
- Style: `eui-u-f-italic`, `eui-u-f-bold-italic`, `eui-u-f-semi-bold-italic`, `eui-u-f-medium-italic`, `eui-u-f-light-italic`

**Text utilities** (`eui-u-text-*`):
- Headings: `eui-u-text-h1` to `eui-u-text-h6`
- Alignment: `eui-u-text-left`, `-center`, `-right`, `-justify`
- Transform: `eui-u-text-uppercase`, `-lowercase`, `-capitalize`
- Wrap: `eui-u-text-wrap`, `-no-wrap`, `-truncate`
- Decoration: `eui-u-text-underline`, `-overline`, `-line-through`
- Size shortcuts: `eui-u-text-small`, `-smaller`, `-smallest`, `-tiny`
- Links: `eui-u-text-link`, `-link-underline`, `-link-external`, `-link-neutral-underline`
- Semantic: `eui-u-text-paragraph`, `-list`, `-list-item`, `-blockquote`, `-code`, `-pre`, `-kbd`, `-mark`, `-highlight`, `-monospace`

### Icons

Default icon sets for eUI 21:

- eUI Core set (`eui`) - 85 icons
- eUI File set (`eui-file`) - 27 icons
- ECL icon set for official social media and institutional icons (`ecl`) - 99 icons
- Phosphor (`regular`, `fill`) - 1512 icons each

Example: `<eui-icon-svg icon="eui-link:eui" size="m" fillColor="neutral"></eui-icon-svg>`

## Layout and Styling by Library

### eUI (Standard)

**Core Stylesheets**

- Import eUI base styles from `@eui/core`.
- Use the `eui-u-*` utility classes for spacing, layout, typography, and colors.

**Layout Guidance**

- Prefer `eui-page`, `eui-section-header`, `eui-card`, and layout utilities.
- Use grid and flex utilities (`eui-u-flex`, `eui-u-grid`) for structure.
- Avoid mixing ECL or EUIM layout patterns in standard eUI screens.

**Theme Usage**

- Default theme is `ec` unless the project requires `eu`.
- Keep color usage to semantic tokens and utility classes.

**Angular Helpers**

- `EuiThemeService` for theme switching.
- `EuiAppShellService` for layout shell state (header, sidebar, footer).

### ECL

**Core Stylesheets**

- Import ECL styles from `@ecl/preset-ec` or `@ecl/preset-eu`.
- Use ECL class names and structure provided by each component.

**Layout Guidance**

- Use ECL layout components (e.g., `ecl-page-header`, `ecl-site-header`, `ecl-site-footer`).
- Keep markup aligned with the Europa Design System.
- Avoid mixing standard eUI utility classes unless explicitly documented.

**Theme Usage**

- Choose EC vs EU theme via `EclThemeService`.

**Angular Helpers**

- `EclThemeService`, `EclRtlService`, `EclLanguageService`.

### EUIM (eUI-Mobile)

**Core Stylesheets**

- Use Ionic layout primitives and spacing utilities alongside EUIM components.

**Layout Guidance**

- Prefer EUIM layout components (`euim-scroller-x`, `euim-media-header`) and Ionic containers.
- Avoid desktop eUI layout components in mobile apps.

**Theme Usage**

- Rely on Ionic theming and EUIM component defaults.

**Angular Helpers**

- Prefer Ionic layout services and router for navigation in EUIM apps.

## Grid System

- eUI uses Bootstrap 5.3 grid system (Flexbox-based) to build mobile-first responsive layouts.
- Layout structure uses `.container` / `.container-fluid`, `.row`, and `.col-*` classes.
- Grid breakpoints follow Bootstrap (xs, sm, md, lg, xl, xxl).
- Use breakpoint-specific columns like `.col-md-6` and `.col-lg-4` to adjust per viewport.
- Bootstrap grid styles are part of eUI and maintained with the design system.
- Ensure the Bootstrap grid CSS is included in `angular.json` when using the grid, for example:

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap-grid.min.css",
  "node_modules/@eui/core/styles/eui-styles.scss",
  "src/styles.scss"
]
```

Reference: <https://getbootstrap.com/docs/5.3/layout/grid/>

## CSS Utilities

The design system recommends using eUI utility classes, which automatically set contrast-safe foreground colors for the color palette.

Core families (examples):

- Colors: `eui-u-c-primary`, `eui-u-c-bg-branding-surface-light`
- Typography: `eui-u-f-m`, `eui-u-text-h4`
- Text formatting: `eui-u-text-left`, `eui-u-text-truncate`
- Spacing: `eui-u-mt-m`, `eui-u-ph-s`
- Layout/flex: `eui-u-flex`, `eui-u-flex-justify-content-between`
- Borders: `eui-u-border-state-primary`, `eui-u-br-m`, `eui-u-border-bottom-separator`
- Visibility: `eui-u-visibility-hidden`, `eui-u-sr-only`
- Overflow: `eui-u-overflow-auto`
- Positioning: `eui-u-p-relative`, `eui-u-p-fixed`
- Width/height: `eui-u-width-*`, `eui-u-height-*`
  - Width: 0-30 = rem, 33/50/66/100 = percentage
  - Height: 0-30 = rem, 33/50/100 = percentage (no 66)
  - auto: `eui-u-width-auto`, `eui-u-height-auto`

See `references/docs-full/99-reference/02-css-utility-classes.md` for the full catalog.

## CSS Variables

CSS variables are used to override styles cautiously and mirror the token names.

Key families:

- Generic colors: `--eui-c-white`, `--eui-c-black`, `--eui-c-surface-page`, `--eui-c-text`, `--eui-c-focus`, `--eui-c-hover`, `--eui-c-disabled`, `--eui-c-link`, `--eui-c-divider`
- State colors: `--eui-c-primary-*`, `--eui-c-secondary-*`, `--eui-c-info-*`, `--eui-c-success-*`, `--eui-c-warning-*`, `--eui-c-danger-*`, `--eui-c-cta-*`
- Surface and on-surface pairs: `--eui-c-<variant>-surface-*` + `--eui-c-<variant>-on-surface-*`
- Borders: `--eui-c-<variant>-border`, `--eui-c-<variant>-border-light`, `--eui-c-<variant>-border-lighter`

Font variables:

- `--eui-f-family` defaults to `Inter, Arial, Helvetica Neue, Helvetica, sans-serif`
- `--eui-f-family-monospace` defaults to `Consolas, Liberation Mono, Courier New, monospace`
- `--eui-f-size-base` defaults to `16px` (changing to `14px` enables compact mode)
- `--eui-f-2xs` through `--eui-f-6xl`, plus light variants

Always use the font variables for declarations (example: `font: var(--eui-f-2xs);`).

## Theming

Themes are CSS-variable sets applied globally via a theme class on the `html` element.

Built-in themes:

- Light (default, included in `eui.css`)
- Compact (`eui-theme-compact.css`, class: `eui-t-compact`)
- Dark (`eui-theme-dark.css`, class: `eui-t-dark`)

Usage:

```javascript
document.querySelector("html").classList.add("eui-t-compact");
// document.querySelector("html").classList.remove("eui-t-compact");
```

## Local References

- `references/docs-full/99-reference/` for full reference tables.
- `references/icons.md` for the full icon set lists.
