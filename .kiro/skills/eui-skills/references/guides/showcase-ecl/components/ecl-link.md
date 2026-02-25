# ecl-link

## Overview

Links are a navigation component used to direct users to another section, page, website, document or file. They must be clearly distinguished from other text and features on a page.
<br>
<more-info componentPartUrl="navigation/link/usage/"></more-info>

## API

API content

## Samples

### [Default](samples/ecl-link/Default)

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


<h6 class="section-title">Inverted link</h6>
<div>
    <p class="ecl-u-bg-grey ecl-u-bg-dark ecl-u-type-color-white ecl-u-pa-xs">The European Commission is the executive of
        <a routerLink="/" eclLink isInverted>
            The European Union
        </a>
        and promotes its general interest.
    </p>
</div>

<h6 class="section-title">Inverted standalone</h6>
<div>
    <p class="ecl-u-bg-grey ecl-u-bg-dark ecl-u-type-color-white ecl-u-pa-xs">
        <a routerLink="/" eclLink variant="standalone" isInverted>
            The European Union
        </a>
    </p>
</div>

<h6 class="section-title">Primary link</h6>
<div>
    <a routerLink="/" eclLink variant="primary">
        Link button
    </a>
</div>

<h6 class="section-title">Primary highlight link</h6>
<div>
    <a routerLink="/" eclLink variant="primary" isHighlight>
        Link button
    </a>
</div>

<h6 class="section-title">Secondary link</h6>
<div>
    <a routerLink="/" eclLink variant="secondary">
        Secondary link
    </a>
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

### Other examples

- [Links with icons](samples/ecl-link/icons)
