---
description: This sample compares the card state color variants: primary, secondary, success, info, warning, and danger.
id: colors
---

```html
<div class="row">
    <div class="col-md-4">
        <eui-card euiPrimary>
            <eui-card-header>
                <eui-card-header-title>Primary</eui-card-header-title>
            </eui-card-header>
            <eui-card-footer>
                <eui-card-footer-action-buttons>
                    <button euiButton euiOutline euiPrimary euiSizeS>LIKE</button>
                </eui-card-footer-action-buttons>
            </eui-card-footer>
        </eui-card>
    </div>
    <div class="col-md-4">
        <eui-card euiSecondary>
            <eui-card-header>
                <eui-card-header-title>Secondary</eui-card-header-title>
            </eui-card-header>
            <eui-card-footer>
                <eui-card-footer-action-buttons>
                    <button euiButton euiOutline euiPrimary euiSizeS>LIKE</button>
                </eui-card-footer-action-buttons>
            </eui-card-footer>
        </eui-card>
    </div>
    <div class="col-md-4">
        <eui-card euiSuccess>
            <eui-card-header>
                <eui-card-header-title>Success</eui-card-header-title>
            </eui-card-header>
            <eui-card-footer>
                <eui-card-footer-action-buttons>
                    <button euiButton euiOutline euiPrimary euiSizeS>LIKE</button>
                </eui-card-footer-action-buttons>
            </eui-card-footer>
        </eui-card>
    </div>
</div>

<div class="row eui-u-mt-m">
    <div class="col-md-4">
        <eui-card euiInfo>
            <eui-card-header>
                <eui-card-header-title>Info</eui-card-header-title>
            </eui-card-header>
            <eui-card-footer>
                <eui-card-footer-action-buttons>
                    <button euiButton euiOutline euiPrimary euiSizeS>LIKE</button>
                </eui-card-footer-action-buttons>
            </eui-card-footer>
        </eui-card>
    </div>
    <div class="col-md-4">
        <eui-card euiWarning>
            <eui-card-header>
                <eui-card-header-title>Warning</eui-card-header-title>
            </eui-card-header>
            <eui-card-footer>
                <eui-card-footer-action-buttons>
                    <button euiButton euiOutline euiPrimary euiSizeS>LIKE</button>
                </eui-card-footer-action-buttons>
            </eui-card-footer>
        </eui-card>
    </div>
    <div class="col-md-4">
        <eui-card euiDanger>
            <eui-card-header>
                <eui-card-header-title>Danger</eui-card-header-title>
            </eui-card-header>
            <eui-card-footer>
                <eui-card-footer-action-buttons>
                    <button euiButton euiOutline euiPrimary euiSizeS>LIKE</button>
                </eui-card-footer-action-buttons>
            </eui-card-footer>
        </eui-card>
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_BUTTON } from '@eui/components/eui-button';


@Component({
    // eslint-disable-next-line
    selector: 'colors',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CARD,
        ...EUI_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorsComponent {

}
```

