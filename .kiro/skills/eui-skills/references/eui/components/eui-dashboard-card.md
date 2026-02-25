# eui-dashboard-card

## Overview

N/C <br>

## API

API content

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | e2eAttr | string | 'eui-dashboard-card' |
| Input | label | string | - |
| Input | subLabel | string | - |
| Input | labelMaxLines | 1 \| 2 \| 3 \| 4 \| 5 | 2 |
| Input | subLabelMaxLines | 1 \| 2 \| 3 \| 4 \| 5 | 2 |
| Input | imageUrl | string | - |
| Input | iconSvgName | string | - |
| Input | iconSvgSize | '2xs' \| 'xs' \| 's' \| 'm' \| 'l' \| 'xl' \| '2xl' \| '3xl' \| '4xl' | 'm' |
| Input | iconLabel | string | - |
| Input | url | string | - |
| Input | urlExternal | string | - |
| Input | urlExternalTarget | string | '_blank' |
| Input | colorPalette | string | - |
| Input | isHorizontal | boolean | false |
| Input | isFlatAvatar | boolean | false |
| Input | hasNoBackgroundAvatar | boolean | false |
| Input | isClickeable | boolean | false |
| Input | isFlat | boolean | false |
| Input | isStacked | boolean | false |
| Output | cardClick | unknown | new EventEmitter<MouseEvent>() |

## Host Directives

| Host Directive | Inputs |
| --- | --- |
| BaseStatesDirective | euiPrimary, euiSecondary, euiSuccess, euiInfo, euiWarning, euiDanger, euiVariant, euiSizeXS, euiSizeS, euiSizeM, euiSizeL, euiSizeXL, euiSize2XL, euiSizeVariant, euiDisabled, euiOutline |

## Samples

### [Default](samples/eui-dashboard-card/Default)

```html
<div class="doc-sample-section-title">label and subLabel provided</div>

<div class="row">
    <div class="col-md-4">
        <eui-dashboard-card
            label="LABEL">
        </eui-dashboard-card>
    </div>
    <div class="col-md-4">
        <eui-dashboard-card
            label="LABEL"
            subLabel="This is the sub label of the card">
        </eui-dashboard-card>
    </div>
</div>




<div class="doc-sample-section-title">isClickeable</div>

<div class="row">
    <div class="col-md-4">
        <eui-dashboard-card label="LABEL" isClickeable (cardClick)="onCardClick($event)">
        </eui-dashboard-card>
    </div>
</div>


<div class="doc-sample-section-title">isClickeable with urlExternal</div>

<div class="row">
    <div class="col-md-4">
        <eui-dashboard-card label="LABEL" isClickeable urlExternal="https://www.google.com">
        </eui-dashboard-card>
    </div>
</div>


<div class="doc-sample-section-title">With button as content</div>

<div class="row">
    <div class="col-md-4">
        <eui-dashboard-card
            label="LABEL">
            <button euiButton euiInfo euiOutline euiSizeS>more</button>
        </eui-dashboard-card>
    </div>
    <div class="col-md-4">
        <eui-dashboard-card
            label="LABEL"
            subLabel="This is the sub label of the card">
            <button euiButton euiInfo euiOutline euiSizeS>more</button>
        </eui-dashboard-card>
    </div>
</div>


<div class="doc-sample-section-title">Real-life content example</div>

<div class="row">
    <div class="col-md-4">
        <eui-dashboard-card
            label="Main title of the card"
            subLabel="Some explanations about what this card widget will lead the user to">
            <button euiButton euiOutline euiSizeS euiInfo>
                Go to location
            </button>
            <div class="eui-u-text-small eui-u-mt-s">
                or <a class="eui-u-text-link">somewhere</a> else
            </div>
        </eui-dashboard-card>
    </div>
</div>
```

```typescript
import { Component } from "@angular/core";

import { EUI_DASHBOARD_CARD } from "@eui/components/eui-dashboard-card";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_DASHBOARD_CARD, ...EUI_BUTTON],
})
export class DefaultComponent {
    onCardClick(event: Event): void {
        alert(`Card clicked : ${event}`);
    }
}
```

### Other examples

- [Variants: Colors](samples/eui-dashboard-card/colors)
- [Variants: Sizes](samples/eui-dashboard-card/sizes)
- [Options: Disabled](samples/eui-dashboard-card/disabled)
- [Main features: Header body footer](samples/eui-dashboard-card/header-body-footer)
- [Main features: Icon SVG](samples/eui-dashboard-card/iconClass)
- [Main features: iconLabel](samples/eui-dashboard-card/iconLabel)
- [Main features: Image](samples/eui-dashboard-card/imageUrl)
- [Event Handlers: Events](samples/eui-dashboard-card/event-handlers)
- [Misc: Border colors](samples/eui-dashboard-card/border-colors)
- [Misc: Button color variants](samples/eui-dashboard-card/button-colors)
- [Misc: Horizontal layout](samples/eui-dashboard-card/horizontal-layout)
- [Misc: Long label/subLabel text](samples/eui-dashboard-card/labelMaxLines-subLabelMaxLines)
- [Custom content](samples/eui-dashboard-card/custom-content)
