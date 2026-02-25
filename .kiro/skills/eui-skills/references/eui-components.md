# eUI Components Reference

Category index of all documented eUI components and directives.

## Overview

Each component page includes:
- Overview and purpose
- Import statements and setup
- API reference (inputs, outputs, methods)
- Code examples and variants

## Using Components

### Import Pattern

```typescript
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
  standalone: true,
  imports: [...EUI_BUTTON],
})
```

### Common Properties

**Color variants:** `euiPrimary`, `euiSecondary`, `euiSuccess`, `euiInfo`, `euiWarning`, `euiDanger`

**Size variants:** `euiSizeXS`, `euiSizeS`, `euiSizeM`, `euiSizeL`, `euiSizeXL`

**State properties:** `euiDisabled`, `euiReadonly`, `euiRequired`, `euiLoading`

## Components By Category

### Form Controls
- [eui-autocomplete](eui/components/eui-autocomplete.md)
- [eui-calendar](eui/components/eui-calendar.md)
- [eui-date-range-selector](eui/components/eui-date-range-selector.md)
- [eui-datepicker](eui/components/eui-datepicker.md)
- [eui-icon-input](eui/components/eui-icon-input.md)
- [eui-icon-toggle](eui/components/eui-icon-toggle.md)
- [eui-input-button](eui/components/eui-input-button.md)
- [eui-input-checkbox](eui/directives/eui-input-checkbox.md) (directive)
- [eui-input-group](eui/directives/eui-input-group.md) (directive)
- [eui-input-number](eui/directives/eui-input-number.md) (directive)
- [eui-input-radio](eui/directives/eui-input-radio.md) (directive)
- [eui-input-text](eui/directives/eui-input-text.md) (directive)
- [eui-select](eui/directives/eui-select.md) (directive)
- [eui-slide-toggle](eui/components/eui-slide-toggle.md)
- [eui-slider](eui/components/eui-slider.md)
- [eui-textarea](eui/directives/eui-textarea.md) (directive)
- [eui-timepicker](eui/components/eui-timepicker.md)
- [eui-toggle-group](eui/components/eui-toggle-group.md)

### Buttons
- [eui-button](eui/components/eui-button.md) (directive)
- [eui-button-group](eui/components/eui-button-group.md)
- [eui-chip](eui/components/eui-chip.md)
- [eui-chip-group](eui/components/eui-chip-group.md)
- [eui-chip-list](eui/components/eui-chip-list.md)
- [eui-icon-button](eui/components/eui-icon-button.md)
- [eui-icon-button-expander](eui/components/eui-icon-button-expander.md)
- [eui-split-button](eui/components/eui-split-button.md)

### Data Display
- [eui-accordion](eui/components/eui-accordion.md)
- [eui-avatar](eui/components/eui-avatar.md)
- [eui-badge](eui/components/eui-badge.md)
- [eui-card](eui/components/eui-card.md)
- [eui-content-card](eui/components/eui-content-card.md)
- [eui-dashboard-card](eui/components/eui-dashboard-card.md)
- [eui-list](eui/components/eui-list.md)
- [eui-skeleton](eui/components/eui-skeleton.md)
- [eui-snc](eui/components/eui-snc.md)
- [eui-status-badge](eui/components/eui-status-badge.md)
- [eui-table](eui/components/eui-table.md)
- [eui-tabs](eui/components/eui-tabs.md)
- [eui-timeline](eui/components/eui-timeline.md)
- [eui-tree](eui/components/eui-tree.md)
- [eui-tree-list](eui/components/eui-tree-list.md)

### Feedback
- [eui-alert](eui/components/eui-alert.md)
- [eui-dialog-service](eui/components/eui-dialog-service.md)
- [eui-dialog-template](eui/components/eui-dialog-template.md)
- [eui-feedback-message](eui/components/eui-feedback-message.md)
- [eui-growl](eui/components/eui-growl.md)
- [eui-message-box-service](eui/components/eui-message-box-service.md)
- [eui-message-box-template](eui/components/eui-message-box-template.md)
- [eui-progress-bar](eui/components/eui-progress-bar.md)
- [eui-progress-circle](eui/components/eui-progress-circle.md)

### Navigation
- [eui-breadcrumb](eui/layout-components/eui-breadcrumb.md)
- [eui-mega-menu](eui/layout-components/eui-mega-menu.md)
- [eui-paginator](eui/components/eui-paginator.md)
- [eui-sidebar-menu](eui/layout-components/eui-sidebar-menu.md)
- [eui-wizard](eui/components/eui-wizard.md)
- [eui-wizard-v2](eui/components/eui-wizard-v2.md)

### Layout
- [eui-block-content](eui/components/eui-block-content.md)
- [eui-block-document](eui/components/eui-block-document.md)
- [eui-date-block](eui/components/eui-date-block.md)
- [eui-fieldset](eui/components/eui-fieldset.md)
- [eui-header](eui/layout-components/eui-header.md)
- [eui-notifications](eui/layout-components/eui-notifications.md)
- [eui-notifications-v2](eui/layout-components/eui-notifications-v2.md)
- [eui-overlay](eui/layout-components/eui-overlay.md)
- [eui-page](eui/layout-components/eui-page.md)
- [eui-page-header](eui/layout-components/eui-page-header.md)
- [eui-page-column](eui/layout-components/eui-page-column.md)
- [eui-page-column-resizable](eui/layout-components/eui-page-column-resizable.md)
- [eui-section-header](eui/components/eui-section-header.md)
- [eui-toolbar](eui/layout-components/eui-toolbar.md)
- [eui-user-profile](eui/layout-components/eui-user-profile.md)

### Miscellaneous
- [eui-banner](eui/components/eui-banner.md)
- [eui-comment-thread](eui/components/eui-comment-thread.md)
- [eui-disable-content](eui/components/eui-disable-content.md)
- [eui-discussion-thread](eui/components/eui-discussion-thread.md)
- [eui-dropdown](eui/components/eui-dropdown.md)
- [eui-file-upload](eui/components/eui-file-upload.md)
- [eui-icon-svg](eui/components/eui-icon-svg.md)
- [eui-icon-state](eui/components/eui-icon-state.md)
- [eui-label](eui/components/eui-label.md)
- [eui-popover](eui/components/eui-popover.md)
- [eui-rating](eui/components/eui-rating.md)

### Compositions
- [eui-dropdown-button](eui/compositions/eui-dropdown-button.md)
- [eui-dropdown-tree](eui/compositions/eui-dropdown-tree.md)

### Pipes
- [eui-truncate](eui/pipes/eui-truncate.md)

### Directives
- [eui-has-permission](eui/directives/eui-has-permission.md)
- [eui-max-length](eui/directives/eui-max-length.md)
- [eui-resizable](eui/directives/eui-resizable.md)
- [eui-tooltip](eui/directives/eui-tooltip.md)

### Externals
- [eui-editor](eui/components/externals/) - Rich text editor
- [eui-apex-chart](eui/components/charts/) - Charts
- [ngx-extended-pdf-viewer](eui/components/externals/) - PDF viewer
