---
description: Demonstrates the four placement options relative to the trigger (top, right, bottom, left).
id: position
---

```html
<div class="eui-u-flex eui-u-flex-column eui-u-flex-justify-content-center">
    <div class="doc-sample-section-title">Bottom (default)</div>
    <button euiButton euiRounded euiBasicButton euiIconButton euiSizeS aria-label="Popover Icon Button" (click)="openPopover2($event)">
        <eui-icon-svg icon="eui-circle-fill" size="m" fillColor="secondary" />
    </button>
    <eui-popover #popover2 [title]="'This is the popover title'" [position]="'bottom'">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus corporis commodi.
    </eui-popover>


    <div class="doc-sample-section-title">Top</div>
    <button euiButton euiRounded euiBasicButton euiIconButton euiSizeS aria-label="Popover Icon Button" (click)="openPopover1($event)">
        <eui-icon-svg icon="eui-circle-fill" size="m" fillColor="secondary" />
    </button>
    <eui-popover #popover1 [title]="'This is the popover title'" [position]="'top'">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus corporis commodi.
    </eui-popover>


    <div class="doc-sample-section-title">Left</div>
    <button euiButton euiRounded euiBasicButton euiIconButton euiSizeS aria-label="Popover Icon Button" (click)="openPopover3($event)">
        <eui-icon-svg icon="eui-circle-fill" size="m" fillColor="secondary" />
    </button>
    <eui-popover #popover3 [title]="'This is the popover title'" [position]="'left'">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus corporis commodi.
    </eui-popover>


    <div class="doc-sample-section-title">Right</div>
    <button euiButton euiRounded euiBasicButton euiIconButton euiSizeS aria-label="Popover Icon Button" (click)="openPopover4($event)">
        <eui-icon-svg icon="eui-circle-fill" size="m" fillColor="secondary" />
    </button>
    <eui-popover #popover4 [title]="'This is the popover title'" [position]="'right'">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus corporis commodi.
    </eui-popover>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component, viewChild } from "@angular/core";

import { EUI_POPOVER, EuiPopoverComponent } from "@eui/components/eui-popover";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'position',
    templateUrl: 'component.html',
    imports: [...EUI_ICON, ...EUI_BUTTON, ...EUI_POPOVER],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionComponent {

    position = 'bottom';

    readonly popover = viewChild<EuiPopoverComponent>('popover');
    readonly popover1 = viewChild<EuiPopoverComponent>('popover1');
    readonly popover2 = viewChild<EuiPopoverComponent>('popover2');
    readonly popover3 = viewChild<EuiPopoverComponent>('popover3');
    readonly popover4 = viewChild<EuiPopoverComponent>('popover4');

    public openPopover1(e: any) {
        this.popover1().openPopover(e.target);
    }

    public openPopover2(e: any) {
        this.popover2().openPopover(e.target);
    }

    public openPopover3(e: any) {
        this.popover3().openPopover(e.target);
    }

    public openPopover4(e: any) {
        this.popover4().openPopover(e.target);
    }
}
```

