---
description: Composes avatars with eui-badge for counts, dots, and size compatibility.
id: with-badge
---

```html
<eui-avatar euiSizeS>
    <eui-avatar-text>eUI</eui-avatar-text>
    <eui-avatar-badge>
        <eui-badge euiDanger euiSizeS>7</eui-badge>
    </eui-avatar-badge>
</eui-avatar>
&nbsp;
<eui-avatar euiSizeS>
    <eui-avatar-text>eUI</eui-avatar-text>
    <eui-avatar-badge>
        <eui-badge euiDanger />
    </eui-avatar-badge>
</eui-avatar>
&nbsp;
<eui-avatar>
    <eui-avatar-text>eUI</eui-avatar-text>
    <eui-avatar-badge>
        <eui-badge euiDanger>7</eui-badge>
    </eui-avatar-badge>
</eui-avatar>
&nbsp;
<eui-avatar>
    <eui-avatar-text>eUI</eui-avatar-text>
    <eui-avatar-badge>
        <eui-badge euiDanger />
    </eui-avatar-badge>
</eui-avatar>
&nbsp;
<eui-avatar euiSizeL>
    <eui-avatar-text>eUI</eui-avatar-text>
    <eui-avatar-badge>
        <eui-badge euiDanger euiSizeL>7</eui-badge>
    </eui-avatar-badge>
</eui-avatar>
&nbsp;
<eui-avatar euiSizeL>
    <eui-avatar-text>eUI</eui-avatar-text>
    <eui-avatar-badge>
        <eui-badge euiDanger />
    </eui-avatar-badge>
</eui-avatar>

<div class="doc-sample-section-title">with badge and icon within</div>

<eui-avatar euiSizeS>
    <eui-avatar-image />
    <eui-avatar-badge isPositionBottom>
        <eui-badge euiDanger euiSizeXS>
            <eui-icon-svg icon="circle-dashed:regular" size="2xs" />
        </eui-badge>
    </eui-avatar-badge>
</eui-avatar>
&nbsp;
<eui-avatar euiSizeS>
    <eui-avatar-image />
    <eui-avatar-badge isPositionBottom>
        <eui-badge euiSizeXS euiSuccess>
            <eui-icon-svg icon="circle-dashed:regular" size="2xs" />
        </eui-badge>
    </eui-avatar-badge>
</eui-avatar>


<div class="doc-sample-section-title">isShapeSquare variant</div>

<eui-avatar isShapeSquare>
    <eui-avatar-text>eUI</eui-avatar-text>
    <eui-avatar-badge>
        <eui-badge euiDanger>7</eui-badge>
    </eui-avatar-badge>
</eui-avatar>


<div class="doc-sample-section-title">Icon sizes VS badge sizes supported examples</div>

@for (size of sizes; track size.size) {
    <strong>Avatar size : {{ size.size }}</strong>

    <div class="eui-u-flex">
        @for (badgeSize of size.badgeSizes; track badgeSize.s) {
            <div class="eui-u-flex eui-u-flex-column eui-u-flex-justify-content-center">
                <span>badge size {{ badgeSize.s }}</span>
                @if (badgeSize.v) {
                    <eui-avatar [euiSizeVariant]="size.size">
                        <eui-avatar-text>JD</eui-avatar-text>
                        <eui-avatar-badge>
                            @if (badgeSize.s === 'dot') {
                                <eui-badge euiDanger/>
                            } @else {
                                <eui-badge euiDanger [euiSizeVariant]="badgeSize.s">9</eui-badge>
                            }
                        </eui-avatar-badge>
                    </eui-avatar>
                } @else {
                    <abbr>N/A</abbr>
                    <span class="eui-icon eui-icon-e-help eui-u-c-info" [euiTooltip]="tooltipNA"></span>
                }
            </div>
        }
    </div>
    <br>
}
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_AVATAR } from '@eui/components/eui-avatar';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EuiTooltipDirective } from '@eui/components/directives';


@Component({
    // eslint-disable-next-line
    selector: 'with-badge',
    templateUrl: 'component.html',
    imports: [
        EuiTooltipDirective,
        ...EUI_AVATAR,
        ...EUI_BADGE,
        ...EUI_ICON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WithBadgeComponent {

    tooltipNA = 'This composition is not available and is not recommended ! &#13; The icon is too small and will be fully covered by the badge.';

    sizes = [
        {
            size: 'xs', badgeSizes: [
                { s: 'dot', v: true }, { s: 's', v: true }, { s: 'm', v: true },
            ],
        },
        {
            size: 's', badgeSizes: [
                { s: 'dot', v: true }, { s: 's', v: true }, { s: 'm', v: true },
            ],
        },
        {
            size: 'm', badgeSizes: [
                { s: 'dot', v: true }, { s: 's', v: true }, { s: 'm', v: true },
            ],
        },
        {
            size: 'l', badgeSizes: [
                { s: 'dot', v: true }, { s: 's', v: true }, { s: 'm', v: true },
            ],
        },
        {
            size: 'xl', badgeSizes: [
                { s: 'dot', v: false }, { s: 's', v: false }, { s: 'm', v: true },
            ],
        },
        {
            size: '2xl', badgeSizes: [
                { s: 'dot', v: false }, { s: 's', v: false }, { s: 'm', v: false },
            ],
        },
    ];
}
```

