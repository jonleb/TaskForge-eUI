---
description: Shows how to react to popover open, close, and outside click events.
id: event-handlers
---

```html
<button euiButton euiRounded euiBasicButton euiIconButton euiSizeS aria-label="Popover Icon Button" (click)="openPopover($event)">
    <eui-icon-svg icon="eui-circle-fill" size="m" fillColor="secondary" />
</button>
<eui-popover #popover [title]="'This is popover title'" hasBackDrop (open)="onOpen()" (close)="onClose()" (outsideClick)="onOutsideClick()">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus corporis commodi.
</eui-popover>
```

```typescript
import { ChangeDetectionStrategy, Component, viewChild } from "@angular/core";

import { EUI_POPOVER, EuiPopoverComponent } from "@eui/components/eui-popover";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'event-handlers',
    templateUrl: 'component.html',
    imports: [...EUI_POPOVER, ...EUI_ICON, ...EUI_BUTTON],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventHandlersComponent {

    readonly popover = viewChild<EuiPopoverComponent>('popover');

    public openPopover(e: any) {
        this.popover().openPopover(e.target);
    }

    public onOpen() {
        console.log('open');
    }

    public onClose() {
        console.log('close');
    }

    public onOutsideClick() {
        console.log('outsideClick');
    }
}
```

