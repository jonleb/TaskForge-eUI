# ecl-notification

## Overview

Notifications component contains important information to alert users.
<br>
<more-info componentPartUrl="notification/usage/"></more-info>

## API

API content

## Samples

### Default

```html
<h6 class="section-title">Info</h6>
<ecl-notification variant="info">
  <div eclNotificationTitle>Information notification</div>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam accumsan semper lorem, ac mollis lacus tincidunt eu.
  Duis scelerisque diam eu tempus fringilla.
</ecl-notification>

<h6 class="section-title">Success</h6>
<ecl-notification variant="success">
  <div eclNotificationTitle>Success notification</div>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam accumsan semper lorem, ac mollis lacus tincidunt eu.
  Duis scelerisque diam eu tempus fringilla.
</ecl-notification>

<h6 class="section-title">Warning</h6>
<ecl-notification variant="warning">
  <div eclNotificationTitle>Warning notification</div>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam accumsan semper lorem, ac mollis lacus tincidunt eu.
  Duis scelerisque diam eu tempus fringilla.
</ecl-notification>

<h6 class="section-title">Error</h6>
<ecl-notification variant="error">
  <div eclNotificationTitle>Error notification</div>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam accumsan semper lorem, ac mollis lacus tincidunt eu.
  Duis scelerisque diam eu tempus fringilla.
</ecl-notification>
```

```typescript
import { Component } from '@angular/core';
import { EUI_ECL_NOTIFICATION } from '@eui/ecl/components/ecl-notification';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_NOTIFICATION],
})
export class DefaultComponent {}
```
