# ecl-loading-indicator

## Overview

The Loading indicator is an infinite looped animation that provides visual feedback about the system status.
<br>
<more-info componentPartUrl="loading-indicator/usage/"></more-info>

## API

API content

## Samples

### [Default](samples/ecl-loading-indicator/default)

```html
<div style="position:relative;height:200px">
    <ecl-loading-indicator>
        <div eclLoadingIndicatorLabel>
            {{ 'ecl.loading-indicator.LOADING' | translate }}
        </div>
    </ecl-loading-indicator>
</div>

<h6 class="section-title">Not centered</h6>
<div style="position:relative;height:200px">
    <ecl-loading-indicator isCentered="false">
        <div eclLoadingIndicatorLabel>
            {{ 'ecl.loading-indicator.LOADING' | translate }}
        </div>
    </ecl-loading-indicator>
</div>

<h6 class="section-title">Custom text</h6>
<div style="position:relative;height:200px">
    <ecl-loading-indicator>
        <div eclLoadingIndicatorLabel>
            Waiting...
        </div>
    </ecl-loading-indicator>
</div>

<h6 class="section-title">No text</h6>
<div style="position:relative;height:200px">
    <ecl-loading-indicator></ecl-loading-indicator>
</div>

<h6 class="section-title">Visibility</h6>
<div style="position:relative;height:200px">
    <ecl-loading-indicator [isVisible]="isVisible">
        <div eclLoadingIndicatorLabel>
            {{ 'ecl.loading-indicator.LOADING' | translate }}
        </div>
    </ecl-loading-indicator>
</div>
<div>
    <button eclButton
            variant="primary"
            (click)="onClick()">
                Toggle visibility
    </button>
</div>
```

```typescript
import { Component } from '@angular/core';
import { EUI_ECL_BUTTON } from '@eui/ecl/components/ecl-button';
import { EUI_ECL_LOADING_INDICATOR } from '@eui/ecl/components/ecl-loading-indicator';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [TranslateModule, ...EUI_ECL_BUTTON, ...EUI_ECL_LOADING_INDICATOR],
})
export class DefaultComponent {

    isVisible = true;

    onClick() {
        this.isVisible = !this.isVisible;
    }
}
```

### Other examples

- [Inverted](samples/ecl-loading-indicator/inverted)
- [Sizes](samples/ecl-loading-indicator/sizes)
