# eUI-Mobile (EUIM) Components Reference

Mobile components for Ionic 8 + Capacitor apps (iOS/Android).

## When to Use EUIM

- Native mobile apps (iOS/Android) with Capacitor
- Mobile-first web experiences
- Apps requiring mobile-optimized UI patterns

For desktop web apps, use eUI components instead.

## Setup

```bash
# Generate mobile app with eUI CLI
eui-cli
# Select: Angular Mobile Ionic
```

```typescript
// Import components
import { EUIM_CARD } from '@eui/mobile-components/euim-card';
import { EUIM_AVATAR } from '@eui/mobile-components/euim-avatar';

@Component({
  standalone: true,
  imports: [...EUIM_CARD, ...EUIM_AVATAR],
})
```

## Components By Category

### Data Display

| Component | Purpose |
|-----------|---------|
| [euim-avatar](euim/docs/) | User avatar |
| [euim-card](euim/docs/) | Content card |
| [euim-card-list](euim/docs/) | List of cards |
| [euim-data-summary](euim/docs/) | Data summary display |
| [euim-empty-list-placeholder](euim/docs/) | Empty state placeholder |
| [euim-skeleton-list](euim/docs/) | Loading skeleton list |
| [euim-skeleton-list-item](euim/docs/) | Loading skeleton item |

### Feedback

| Component | Purpose |
|-----------|---------|
| [euim-alert-message](euim/docs/) | Alert message |
| [euim-message](euim/docs/) | Message display |
| [euim-spinner](euim/docs/) | Loading spinner |

### Form Controls

| Component | Purpose |
|-----------|---------|
| [euim-chip-selector](euim/docs/) | Chip-based selection |
| [euim-multiselect](euim/docs/) | Multi-select picker |
| [euim-toolbar-datepicker](euim/docs/) | Toolbar date picker |

### Layout

| Component | Purpose |
|-----------|---------|
| [euim-media-header](euim/docs/) | Media header |
| [euim-scroller-x](euim/docs/) | Horizontal scroller |
| [euim-toolbar-qrcode](euim/docs/) | QR code toolbar |

### Media

| Component | Purpose |
|-----------|---------|
| [euim-pdf-viewer](euim/docs/) | PDF viewer |
| [euim-slider-info-screen](euim/docs/) | Info slider/onboarding |

### Miscellaneous

| Component | Purpose |
|-----------|---------|
| [euim-about](euim/docs/) | About screen |
| [euim-badge](euim/docs/) | Badge/counter |
| [euim-helper-text](euim/docs/) | Helper text |

## Directives

| Directive | Purpose |
|-----------|---------|
| euim-align-center | Center alignment |
| euim-align-top | Top alignment |
| euim-divider | Divider line |
| euim-footer-transparent | Transparent footer |
| euim-list-header | List header styling |
| euim-list-item | List item styling |
| euim-min-width | Minimum width |
| euim-sidebar-footer | Sidebar footer |
| euim-toolbar-transparent | Transparent toolbar |
| euim-read-only-form | Read-only form styling |

## Basic Example

```typescript
import { Component } from '@angular/core';
import { EUIM_CARD } from '@eui/mobile-components/euim-card';
import { EUIM_AVATAR } from '@eui/mobile-components/euim-avatar';

@Component({
  standalone: true,
  imports: [...EUIM_CARD, ...EUIM_AVATAR],
  template: `
    <euim-card>
      <euim-avatar [src]="user.avatar" size="large"></euim-avatar>
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
    </euim-card>
  `,
})
export class ProfileComponent {
  user = { name: 'John', email: 'john@example.com', avatar: 'avatar.jpg' };
}
```

## Ionic Integration

EUIM components work alongside Ionic components:

```html
<ion-header>
  <ion-toolbar>
    <ion-title>My App</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  <euim-card-list>
    @for (item of items; track item.id) {
      <euim-card>{{ item.title }}</euim-card>
    }
  </euim-card-list>
</ion-content>
```

## Capacitor

Build native apps:

```bash
# Add platforms
npx cap add ios
npx cap add android

# Build and sync
npm run build
npx cap sync

# Open in IDE
npx cap open ios
npx cap open android
```

## Key Differences from eUI

| Aspect | eUI (Desktop) | EUIM (Mobile) |
|--------|---------------|---------------|
| Layout | Page-based | Screen-based |
| Navigation | Sidebar menu | Tab bar / drawer |
| Touch | Click events | Touch gestures |
| Components | `EUI_*` | `EUIM_*` |

## See Also

- [EUIM docs](euim/docs/index.md)
- [Getting started](euim/docs/01-getting-started/)
- [Services](euim/docs/03-services/)
