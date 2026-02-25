# ecl-button

## Overview

Buttons trigger an action in a web page. There are 4 variants of the button component with different levels of importance and usages.
<br>
<more-info componentPartUrl="button/usage/"></more-info>

## API

API content

## Samples

### Default

```html
<h6 class="section-title">Primary</h6>
<div>
    <button eclButton variant="primary">Primary</button>
</div>

<h6 class="section-title">Secondary</h6>
<div>
    <button eclButton variant="secondary">Secondary</button>
</div>

<h6 class="section-title">Tertiary</h6>
<div>
    <button eclButton variant="tertiary">Tertiary</button>
</div>


<h6 class="section-title">Primary with icon on the left</h6>
<div>
    <button eclButton variant="primary">
        <ecl-icon icon="corner-arrow" transform="rotate-270"></ecl-icon>
        <span eclButtonLabel>Primary with icon</span>
    </button>
</div>

<h6 class="section-title">Primary with icon on the right</h6>
<div>
    <button eclButton variant="primary">
        <span eclButtonLabel>Primary with icon</span>
        <ecl-icon icon="corner-arrow" transform="rotate-90"></ecl-icon>
    </button>
</div>

<h6 class="section-title">Call to action</h6>
<div>
    <button eclButton variant="cta">
        <span eclButtonLabel>Call to action</span>
    </button>
</div>

<h6 class="section-title">Ghost</h6>
<div>
    <button eclButton variant="ghost">Ghost</button>
</div>

<h6 class="section-title">Ghost inverted</h6>
<div class="ecl-u-pa-s ecl-u-bg-dark ecl-u-type-color-white">
    <button eclButton variant="ghost-inverted">Ghost inverted</button>
</div>

<h6 class="section-title">Icon only</h6>
<div>
    <button eclButton variant="secondary" isIconOnly>
        <span eclButtonLabel>Icon clock</span>
        <ecl-icon icon="clock-filled" size="s"></ecl-icon>
    </button>
</div>

<h6 class="section-title">Icon only with indicator</h6>
<div>
    <button eclButton variant="primary" isIconOnly>
        <span eclButtonLabel>Icon clock</span>
        <span eclButtonIconContainer>
            <ecl-icon icon="clock-filled" size="s"></ecl-icon>
            <span eclIndicator>8</span>
        </span>
    </button>
</div>
```

```typescript
import { Component } from '@angular/core';
import { EUI_ECL_BUTTON } from '@eui/ecl/components/ecl-button';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_BUTTON, ...EUI_ECL_ICON],
})
export class DefaultComponent {}
```
