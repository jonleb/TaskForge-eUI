---
description: Demonstrates closing behavior options: disable escape, enable backdrop click, and hide the close button.
id: closing
---

```html
<div class="doc-sample-section-title">Disable close on escape</div>
<button euiButton type="button" (click)="openWithService1()" class="eui-u-mr-m eui-u-mb-m" aria-haspopup="dialog">Open Dialog</button>

<div class="doc-sample-section-title">Enable close on click outside dialog</div>
<button euiButton type="button" (click)="openWithService2()" class="eui-u-mr-m eui-u-mb-m" aria-haspopup="dialog">Open Dialog</button>

<div class="doc-sample-section-title">No close button</div>
<button euiButton type="button" (click)="openWithService3()" class="eui-u-mr-m eui-u-mb-m" aria-haspopup="dialog">Open Dialog</button>
```

```typescript
import { Component, inject, ChangeDetectionStrategy } from "@angular/core";

import { EUI_DIALOG, EuiDialogConfig, EuiDialogService } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'closing',
    templateUrl: 'component.html',
    imports: [...EUI_DIALOG, ...EUI_BUTTON],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClosingComponent {

    private euiDialogService = inject(EuiDialogService);

    public openWithService1(): void {
        const config = new EuiDialogConfig({
            title: 'Dialog title',
            content: 'Dialog content',
            hasClosedOnEscape: false,
        });

        this.euiDialogService.openDialog(config);
    }

    public openWithService2(): void {
        const config = new EuiDialogConfig({
            title: 'Dialog title',
            content: 'Dialog content',
            hasClosedOnClickOutside: true,
        });

        this.euiDialogService.openDialog(config);
    }

    public openWithService3(): void {
        const config = new EuiDialogConfig({
            title: 'Dialog title',
            content: 'Dialog content',
            hasCloseButton: false,
        });

        this.euiDialogService.openDialog(config);
    }
}
```

