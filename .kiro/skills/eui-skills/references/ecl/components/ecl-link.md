# ecl-link

## Overview

Links are a navigation component used to direct users to another section, page, website, document or file. They must be clearly distinguished from other text and features on a page.
<br>
<more-info componentPartUrl="navigation/link/usage/"></more-info>

## API

API content

## Samples

### Default

```html
<div>
    <p class="ecl-u-type-paragraph">
        The European Commission is the executive of
        <a routerLink="/" eclLink>The European Union</a>
        and promotes its general interest.
    </p>
</div>

<h6 class="section-title">Standalone</h6>
<div>
    <a routerLink="/" eclLink variant="standalone">Standalone link</a>
</div>

<h6 class="section-title">Link with Icon</h6>
<div>
    <p class="ecl-u-type-paragraph">
      The European Commission is the executive of
      <a eclLink routerLink="/">
        <span eclLinkLabel>The European Union</span>
        <ecl-icon icon="external" size="fluid" ariaHidden="false" role="img">
            <title>Links to an external domain</title>
        </ecl-icon>
      </a>
      and promotes its general interest.
    </p>
</div>

<div>
    <p class="ecl-u-type-paragraph">
      The European Commission is the executive of
      <a eclLink routerLink="/">
        <ecl-icon icon="external" size="fluid" ariaHidden="false" role="img">
            <title>Links to an external domain</title>
        </ecl-icon>
        <span eclLinkLabel>The European Union</span>
      </a>
      and promotes its general interest.
    </p>
</div>

<h6 class="section-title">Call-to-action link</h6>
<div>
    <a routerLink="/" eclLink variant="cta">
        Call to action link
    </a>
</div>

<h6 class="section-title">Primary link</h6>
<div>
    <a routerLink="/" eclLink variant="primary">
        Primary link
    </a>
</div>

<h6 class="section-title">Secondary link</h6>
<div>
    <a routerLink="/" eclLink variant="secondary">
        Secondary link
    </a>
</div>

<h6 class="section-title">Icon only link</h6>
<div>
    <a routerLink="/" eclLink isIconOnly>
        <ecl-icon icon="calendar" size="m" ariaHidden="false" role="img">
        </ecl-icon>
        <span eclLinkLabel>Default</span>
    </a>
</div>

<h6 class="section-title">Icon only link with indicator</h6>
<div>
    <a routerLink="/" eclLink isIconOnly>
        <span eclLinkIconContainer>
            <ecl-icon icon="calendar" size="m" ariaHidden="false" role="img"></ecl-icon>
            <span eclIndicator>8</span>
        </span>
        <span eclLinkLabel>Default</span>
    </a>
</div>

<h6 class="section-title">Inverted link</h6>
<div>
    <p class="ecl-u-type-paragraph ecl-u-bg-dark ecl-u-bg-dark ecl-u-type-color-white">The European Commission is the executive of
        <a routerLink="/" eclLink isInverted>
            The European Union
        </a>
        and promotes its general interest.
    </p>
</div>
```

```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_ICON, ...EUI_ECL_LINK],
})
export class DefaultComponent {}
```
