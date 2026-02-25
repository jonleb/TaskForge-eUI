# App Structure Guide

Application shell and page layout for eUI applications.

## App Shell (`eui-app`)

The root container for eUI applications:

```
┌─────────────────────────────────────────────────┐
│ eui-app                                         │
│ ┌─────────────────────────────────────────────┐ │
│ │ eui-toolbar (header bar)                    │ │
│ │   logo | app name | env | user | actions    │ │
│ ├───────┬─────────────────────────────────────┤ │
│ │ eui-  │ <router-outlet>                     │ │
│ │ app-  │   (page content)                    │ │
│ │ side- │                                     │ │
│ │ bar   │                                     │ │
│ └───────┴─────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

### Basic App Shell

```html
<eui-app [userInfos]="user.name" [isSidebarOpen]="true">
  <!-- Toolbar -->
  <eui-toolbar>
    <eui-toolbar-logo></eui-toolbar-logo>
    <eui-toolbar-app appName="My Application"></eui-toolbar-app>
    <eui-toolbar-environment>DEV</eui-toolbar-environment>
    <eui-toolbar-items euiPositionRight>
      <eui-toolbar-item>
        <eui-notifications [items]="notifications"></eui-notifications>
      </eui-toolbar-item>
      <eui-toolbar-item-user-profile>
        <eui-user-profile-menu>
          <eui-user-profile-menu-item>My Profile</eui-user-profile-menu-item>
          <eui-user-profile-menu-item>Sign Out</eui-user-profile-menu-item>
        </eui-user-profile-menu>
      </eui-toolbar-item-user-profile>
    </eui-toolbar-items>
  </eui-toolbar>

  <!-- Sidebar -->
  <eui-app-sidebar>
    <eui-app-sidebar-body>
      <eui-app-sidebar-menu
        [items]="sidebarItems"
        hasIcons
      ></eui-app-sidebar-menu>
    </eui-app-sidebar-body>
  </eui-app-sidebar>

  <!-- Page content via router -->
  <router-outlet></router-outlet>
</eui-app>
```

### Toolbar Components

| Component                       | Purpose                            |
| ------------------------------- | ---------------------------------- |
| `eui-toolbar-logo`              | EC/EU logo                         |
| `eui-toolbar-app`               | Application name                   |
| `eui-toolbar-environment`       | Environment badge (DEV, ACC, PROD) |
| `eui-toolbar-items`             | Container for toolbar items        |
| `eui-toolbar-item`              | Generic toolbar item wrapper       |
| `eui-toolbar-item-user-profile` | User profile dropdown              |
| `eui-notifications`             | Notifications panel                |
| `eui-language-selector`         | Language switcher                  |

### Notifications

```typescript
notifications = [
  { id: 1, label: "New message", metadata: { date: new Date(), read: false } },
  {
    id: 2,
    label: "Task completed",
    metadata: { date: new Date(), read: true },
  },
];
```

```html
<eui-notifications
  [items]="notifications"
  (itemClick)="onNotificationClick($event)"
  (markAllAsReadClick)="onMarkAllRead()"
>
</eui-notifications>
```

See [eui-notifications](eui/layout-components/eui-notifications.md) for full API.

### App Shell Service

Control shell state programmatically:

```typescript
import { EuiAppShellService } from "@eui/core";

// Toggle sidebar
this.appShellService.sidebarToggle();

// Set sidebar state
this.appShellService.isSidebarOpen = false;
```

See [AppShellService](services/app-shell.md) for full API.

---

## Page Anatomy

```
┌─────────────────────────────────────────┐
│ eui-page                                │
│ ┌─────────────────────────────────────┐ │
│ │ eui-page-breadcrumb (optional)      │ │
│ ├─────────────────────────────────────┤ │
│ │ eui-page-header                     │ │
│ │   - label, subLabel                 │ │
│ │   - action items                    │ │
│ ├─────────────────────────────────────┤ │
│ │ eui-page-content                    │ │
│ │   - direct content OR               │ │
│ │   - eui-page-columns                │ │
│ ├─────────────────────────────────────┤ │
│ │ eui-page-footer (optional)          │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## Basic Page

```typescript
import { EUI_PAGE } from '@eui/components/eui-page';

@Component({
  standalone: true,
  imports: [...EUI_PAGE],
  template: `
    <eui-page>
      <eui-page-header label="Page title" subLabel="Optional subtitle"></eui-page-header>

      <eui-page-content>
        <!-- Your content here -->
      </eui-page-content>

      <eui-page-footer>
        Optional footer
      </eui-page-footer>
    </eui-page>
  `,
})
```

## Page Header with Actions

```html
<eui-page-header label="Users">
  <eui-page-header-action-items>
    <button euiButton euiPrimary>Add User</button>
    <button euiButton>Export</button>
  </eui-page-header-action-items>
</eui-page-header>
```

## Page with Columns

Two-column layout with collapsible sidebar:

```html
<eui-page>
  <eui-page-header label="Dashboard"></eui-page-header>

  <eui-page-content>
    <eui-page-columns>
      <!-- Side column -->
      <eui-page-column
        label="Filters"
        euiSizeVariant="2xl"
        [isCollapsible]="true"
      >
        <eui-page-column-body>
          <!-- Filter controls -->
        </eui-page-column-body>
      </eui-page-column>

      <!-- Main column -->
      <eui-page-column label="Results">
        <eui-page-column-body>
          <!-- Main content -->
        </eui-page-column-body>
      </eui-page-column>
    </eui-page-columns>
  </eui-page-content>
</eui-page>
```

## Column Structure

```html
<eui-page-column label="Title" subLabel="Subtitle">
  <!-- Sticky header content -->
  <eui-page-column-header-body>
    Search or filter controls
  </eui-page-column-header-body>

  <!-- Scrollable body -->
  <eui-page-column-body> Main content </eui-page-column-body>

  <!-- Optional footer -->
  <eui-page-column-footer>
    <eui-page-column-footer-start>Left</eui-page-column-footer-start>
    <eui-page-column-footer-end>Right</eui-page-column-footer-end>
  </eui-page-column-footer>
</eui-page-column>
```

## Column Sizes

Use `euiSizeVariant` for column width:

| Size  | Width          |
| ----- | -------------- |
| `s`   | Small          |
| `m`   | Medium         |
| `l`   | Large          |
| `xl`  | Extra large    |
| `2xl` | 2x extra large |
| `3xl` | 3x extra large |
| `4xl` | 4x extra large |

```html
<eui-page-column
  label="Sidebar"
  euiSizeVariant="xl"
  [isCollapsible]="true"
></eui-page-column>
```

## App Shell Sidebar

The `eui-app-sidebar-menu` is for application-level navigation inside `eui-app`:

```html
<eui-app [userInfos]="user.name" [isSidebarOpen]="true">
  <eui-toolbar>
    <eui-toolbar-logo></eui-toolbar-logo>
    <eui-toolbar-app appName="My App"></eui-toolbar-app>
  </eui-toolbar>

  <eui-app-sidebar>
    <eui-app-sidebar-body>
      <eui-app-sidebar-menu
        [items]="sidebarItems"
        hasIcons
      ></eui-app-sidebar-menu>
    </eui-app-sidebar-body>
  </eui-app-sidebar>

  <router-outlet></router-outlet>
</eui-app>
```

```typescript
sidebarItems = [
  { label: "Home", url: "/home", iconSvgName: "house:regular" },
  { label: "Users", url: "/users", iconSvgName: "users:regular" },
  { label: "Settings", url: "/settings", iconSvgName: "gear:regular" },
];
```

**Note:** `eui-app-sidebar-menu` is for the app shell. Use `eui-sidebar-menu` for page-level navigation within columns.

## Sidebar Menu

Navigation menu within a page column:

```typescript
import { EUI_SIDEBAR_MENU } from "@eui/components/eui-sidebar-menu";

@Component({
  imports: [...EUI_SIDEBAR_MENU],
  template: `
    <eui-sidebar-menu [items]="menuItems" [hasIcons]="true"></eui-sidebar-menu>
  `,
})
export class MyComponent {
  menuItems = [
    { label: "Dashboard", url: "/dashboard", iconSvgName: "house:regular" },
    { label: "Users", url: "/users", iconSvgName: "users:regular" },
    {
      label: "Settings",
      iconSvgName: "gear:regular",
      children: [
        { label: "General", url: "/settings/general" },
        { label: "Security", url: "/settings/security" },
      ],
    },
  ];
}
```

### Menu Item Properties

Import from `@eui/base`:

```typescript
import { EuiMenuItem } from '@eui/base';

menuItems: EuiMenuItem[] = [
  { label: 'Home', url: '/home', iconSvgName: 'house:regular' },
];
```

| Property            | Type          | Description                              |
| ------------------- | ------------- | ---------------------------------------- |
| `label`             | string        | Display text                             |
| `url`               | string        | Internal route                           |
| `urlExternal`       | string        | External link (http...)                  |
| `urlExternalTarget` | string        | Link target (`_blank`, `_parent`)        |
| `iconSvgName`       | string        | SVG icon (`house:regular`) - recommended |
| `iconClass`         | string        | CSS icon class (`fa fa-home`) - legacy   |
| `iconTypeClass`     | string        | Icon color (primary, success, etc.)      |
| `children`          | EuiMenuItem[] | Submenu items                            |
| `disabled`          | boolean       | Disable item                             |
| `expanded`          | boolean       | Auto-expand children                     |
| `visible`           | boolean       | Show/hide item                           |
| `tagLabel`          | string        | Badge text                               |
| `tagTypeClass`      | string        | Badge color                              |
| `hasMarker`         | boolean       | Show marker bullet                       |
| `markerTypeClass`   | string        | Marker color                             |
| `category`          | string        | Group items by category                  |
| `id`                | string        | Unique identifier                        |

## Breadcrumb

```html
<eui-page>
  <eui-page-breadcrumb>
    <eui-breadcrumb [items]="breadcrumbs"></eui-breadcrumb>
  </eui-page-breadcrumb>

  <eui-page-header>...</eui-page-header>
  <eui-page-content>...</eui-page-content>
</eui-page>
```

```typescript
breadcrumbs = [
  { label: "Home", url: "/" },
  { label: "Users", url: "/users" },
  { label: "John Doe" }, // current page, no url
];
```

For dynamic breadcrumbs based on routes, see [BreadcrumbService](services/breadcrumb.md).

## Resizable Columns

```html
<eui-page-columns>
  <eui-page-column-resizable
    label="Resizable"
    [minWidth]="200"
    [maxWidth]="500"
  >
    <eui-page-column-body>...</eui-page-column-body>
  </eui-page-column-resizable>

  <eui-page-column label="Main">
    <eui-page-column-body>...</eui-page-column-body>
  </eui-page-column>
</eui-page-columns>
```

## Common Patterns

### Master-Detail

```html
<eui-page-columns>
  <eui-page-column label="List" euiSizeVariant="xl">
    <eui-page-column-body>
      <table euiTable [data]="items">
        ...
      </table>
    </eui-page-column-body>
  </eui-page-column>

  <eui-page-column label="Details">
    <eui-page-column-body>
      @if (selectedItem) {
      <app-item-details [item]="selectedItem"></app-item-details>
      }
    </eui-page-column-body>
  </eui-page-column>
</eui-page-columns>
```

### Filter + Content

```html
<eui-page-columns>
  <eui-page-column label="Filters" euiSizeVariant="l" [isCollapsible]="true">
    <eui-page-column-body>
      <!-- Filter form -->
    </eui-page-column-body>
    <eui-page-column-footer>
      <button euiButton euiPrimary>Apply</button>
      <button euiButton>Reset</button>
    </eui-page-column-footer>
  </eui-page-column>

  <eui-page-column label="Results">
    <eui-page-column-header-body>
      {{ totalResults }} results found
    </eui-page-column-header-body>
    <eui-page-column-body>
      <!-- Results list/table -->
    </eui-page-column-body>
  </eui-page-column>
</eui-page-columns>
```

## See Also

- [eui-page-v2](eui/layout-components/eui-page-v2.md)
- [eui-page-column-v2](eui/layout-components/eui-page-column-v2.md)
- [eui-page-header-v2](eui/layout-components/eui-page-header-v2.md)
- [eui-sidebar-menu](eui/layout-components/eui-sidebar-menu.md)
- [eui-breadcrumb](eui/layout-components/eui-breadcrumb.md)
