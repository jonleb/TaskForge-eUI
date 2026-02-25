# ecl-notification

## Overview

Notifications component contains important information to alert users.
<br>
<more-info componentPartUrl="notification/usage/"></more-info>

## API

API content

## Samples

### [Default](samples/ecl-notification/Default)

```html
<h6 class="section-title">Info</h6>
<ecl-notification variant="info">
  <div eclNotificationTitle>Information notification</div>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam accumsan semper lorem, ac mollis lacus tincidunt eu.
  Duis scelerisque diam eu tempus fringilla.
  <div eclNotificationLink>
    <a eclLink routerLink="/">
      <span eclLinkLabel>Lorem ipsum</span>
      <ecl-icon icon="external" size="2xs">
      </ecl-icon>
    </a>
  </div>
  <div eclNotificationLink>
    <a eclLink routerLink="/">
      <span eclLinkLabel>Nullam accumsan semper lorem</span>
      <ecl-icon icon="external" size="2xs">
      </ecl-icon>
    </a>
  </div>
</ecl-notification>

<h6 class="section-title">Success</h6>
<ecl-notification variant="success">
  <div eclNotificationTitle>Success notification</div>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam accumsan semper lorem, ac mollis lacus tincidunt eu.
  Duis scelerisque diam eu tempus fringilla.
  <div eclNotificationLink>
    <a eclLink routerLink="/">
      <span eclLinkLabel>Lorem ipsum</span>
      <ecl-icon icon="external" size="2xs">
      </ecl-icon>
    </a>
  </div>
  <div eclNotificationLink>
    <a eclLink routerLink="/">
      <span eclLinkLabel>Nullam accumsan semper lorem</span>
      <ecl-icon icon="external" size="2xs">
      </ecl-icon>
    </a>
  </div>
</ecl-notification>

<h6 class="section-title">Warning</h6>
<ecl-notification variant="warning">
  <div eclNotificationTitle>Warning notification</div>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam accumsan semper lorem, ac mollis lacus tincidunt eu.
  Duis scelerisque diam eu tempus fringilla.
  <div eclNotificationLink>
    <a eclLink routerLink="/">
      <span eclLinkLabel>Lorem ipsum</span>
      <ecl-icon icon="external" size="2xs">
      </ecl-icon>
    </a>
  </div>
  <div eclNotificationLink>
    <a eclLink routerLink="/">
      <span eclLinkLabel>Nullam accumsan semper lorem</span>
      <ecl-icon icon="external" size="2xs">
      </ecl-icon>
    </a>
  </div>
</ecl-notification>

<h6 class="section-title">Error</h6>
<ecl-notification variant="error">
  <div eclNotificationTitle>Error notification</div>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam accumsan semper lorem, ac mollis lacus tincidunt eu.
  Duis scelerisque diam eu tempus fringilla.
  <div eclNotificationLink>
    <a eclLink routerLink="/">
      <span eclLinkLabel>Lorem ipsum</span>
      <ecl-icon icon="external" size="2xs">
      </ecl-icon>
    </a>
  </div>
  <div eclNotificationLink>
    <a eclLink routerLink="/">
      <span eclLinkLabel>Nullam accumsan semper lorem</span>
      <ecl-icon icon="external" size="2xs">
      </ecl-icon>
    </a>
  </div>
</ecl-notification>
```

```typescript
import { Component } from '@angular/core';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';
import { EUI_ECL_NOTIFICATION } from '@eui/ecl/components/ecl-notification';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_NOTIFICATION, ...EUI_ECL_LINK, ...EUI_ECL_ICON],
})
export class DefaultComponent {}
```

### Other examples

- [Without close button](samples/ecl-notification/closeable)
