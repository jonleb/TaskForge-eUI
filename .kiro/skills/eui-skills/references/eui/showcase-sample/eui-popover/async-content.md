---
description: Loads content asynchronously and displays a blocked state until data is ready.
id: async-content
---

```html
<button euiButton euiRounded euiBasicButton euiIconButton euiSizeS aria-label="Popover Icon Button" (click)="openPopover($event)">
    <eui-icon-svg icon="eui-circle-fill" size="m" fillColor="secondary" />
</button>
<eui-popover #popover [title]="'This is popover title'" (close)="onClose()">
    <eui-block-content [isBlocked]="isBlocked">
        {{ content }}
    </eui-block-content>
</eui-popover>
```

```typescript
import { ChangeDetectionStrategy, Component, viewChild } from "@angular/core";
import { timer } from 'rxjs';

import { EUI_POPOVER, EuiPopoverComponent } from "@eui/components/eui-popover";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_BLOCK_CONTENT } from "@eui/components/eui-block-content";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'async-content',
    templateUrl: 'component.html',
    imports: [
        ...EUI_POPOVER,
        ...EUI_ICON,
        ...EUI_BLOCK_CONTENT,
        ...EUI_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsyncContentComponent {

    readonly popover = viewChild<EuiPopoverComponent>('popover');

    public content = '';
    public isBlocked = true;
    public size = 'm';

    public openPopover(e: any): void {
        this.popover().openPopover(e.target);

        timer(2000).subscribe(() => {
            // eslint-disable-next-line max-len
            this.content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a ante sed erat tempus suscipit sed id urna. Praesent aliquam neque id felis porta viverra. Duis volutpat sem non nunc dapibus mattis. Nam ullamcorper, libero blandit sodales volutpat, urna urna sagittis diam, ac accumsan dolor augue ac mi. Vestibulum fringilla eros sed tellus gravida laoreet. Suspendisse eros quam, accumsan eu urna nec, venenatis vulputate dolor. Duis ac tortor placerat sapien mattis convallis sed at neque. Duis nec sem euismod, porttitor arcu in, tincidunt ante. Phasellus laoreet lorem nec finibus molestie. Praesent elementum congue arcu nec sodales. Vivamus id auctor sem, ac viverra eros. Aliquam erat volutpat.';

            this.isBlocked = false;
            this.size = 'l';
        });
    }

    public onClose(): void {
        this.isBlocked = true;
        this.content = '';
        this.size = 's';
    }
}
```

