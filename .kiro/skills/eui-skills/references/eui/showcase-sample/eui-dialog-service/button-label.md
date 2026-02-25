---
description: Customizes accept/dismiss labels and title using translation keys while injecting a body component.
id: button-label
---

```html
<button euiButton type="button" (click)="openWithService()" aria-haspopup="dialog">Open Dialog</button>
```

```typescript
import { Component, inject, ChangeDetectionStrategy } from "@angular/core";

import { EUI_DIALOG, EuiDialogConfig, EuiDialogService } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

import { ChangeLangServiceComponent } from '../../dummy-components/change-lang-service-component';

@Component({
    selector: 'button-label',
    templateUrl: 'component.html',
    imports: [...EUI_DIALOG, ...EUI_BUTTON],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonLabelComponent {

    private euiDialogService = inject(EuiDialogService);

    public openWithService(): void {
        const config = new EuiDialogConfig({
            acceptLabel: 'eui.YES',
            dismissLabel: 'eui.NO',
            title: 'eui.languageSelector.modalTitle',
            bodyComponent: {
                component: ChangeLangServiceComponent,
            },
        });

        this.euiDialogService.openDialog(config);
    }

}
```

