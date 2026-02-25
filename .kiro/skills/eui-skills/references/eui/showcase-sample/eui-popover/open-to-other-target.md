---
description: Opens the popover anchored to a different target element than the trigger.
id: open-to-other-target
---

```html
<button euiButton euiRounded euiBasicButton euiIconButton euiSizeS aria-label="Popover Icon Button" (click)="openPopover($event)">
    <eui-icon-svg icon="eui-circle-fill" size="m" fillColor="secondary" />
</button>

<eui-popover #popover [title]="'This is the popover title'">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus corporis commodi.
</eui-popover>

<span #otherTarget style="float: right;">Other target</span>
```

```typescript
import { ChangeDetectionStrategy, Component, ElementRef, viewChild } from "@angular/core";

import { EUI_POPOVER, EuiPopoverComponent } from "@eui/components/eui-popover";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'open-to-other-target',
    templateUrl: 'component.html',
    imports: [...EUI_POPOVER, ...EUI_ICON, ...EUI_BUTTON],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenToOtherTargetComponent {

    readonly popover = viewChild<EuiPopoverComponent>('popover');
    readonly otherTarget = viewChild<ElementRef>('otherTarget');

    public openPopover(e: any) {
        this.popover().openPopover(this.otherTarget().nativeElement);
    }
}
```

