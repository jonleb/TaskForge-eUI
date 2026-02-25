---
description: Basic popover triggered by an icon button and anchored to the click target.
id: Default
---

```html
<button euiButton euiRounded euiBasicButton euiIconButton euiSizeS aria-label="Popover Icon Button" (click)="openPopover($event)">
    <eui-icon-svg icon="eui-circle-fill" size="m" fillColor="secondary" />
</button>
<eui-popover #popover [title]="'This is popover title'">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus corporis commodi.
</eui-popover>
```

```typescript
import { ChangeDetectionStrategy, Component, viewChild } from "@angular/core";

import { EUI_POPOVER, EuiPopoverComponent } from "@eui/components/eui-popover";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_POPOVER, ...EUI_ICON, ...EUI_BUTTON],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {

    readonly popover = viewChild<EuiPopoverComponent>('popover');

    public openPopover(e: any) {
        this.popover().openPopover(e.target);
    }
}
```

