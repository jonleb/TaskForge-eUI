---
description: Opens a fixed-height dialog with a long body component to enable scrolling.
id: scrolling
---

```html
<button euiButton type="button" (click)="openWithService()" class="eui-u-mr-m eui-u-mb-m" aria-haspopup="dialog">Open Dialog</button>
```

```typescript
import { Component, inject, ChangeDetectionStrategy } from "@angular/core";

import { EUI_DIALOG, EuiDialogConfig, EuiDialogService } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

import { DummyTextComponent } from '../../dummy-components/dummy-text.component';

@Component({
    selector: 'scrolling',
    templateUrl: 'component.html',
    imports: [...EUI_BUTTON, EUI_DIALOG],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollingComponent {

    private euiDialogService = inject(EuiDialogService);

    public openWithService(): void {
        this.euiDialogService.openDialog(new EuiDialogConfig({
            title: 'Dialog title',
            bodyComponent: {
                component: DummyTextComponent,
            },
            height: '30vh',
        }));
    }
}
```

