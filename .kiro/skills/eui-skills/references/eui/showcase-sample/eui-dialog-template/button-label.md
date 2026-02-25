---
description: Template-driven dialog opened via ViewChild with custom accept/dismiss labels and an in-dialog action.
id: button-label
---

```html
<button euiButton type="button" (click)="openDialog()" aria-haspopup="dialog">Open Dialog</button>

<eui-dialog #dialog title="eui.languageSelector.modalTitle" acceptLabel="eui.YES" dismissLabel="eui.NO">
    <button euiButton type="button" (click)="onDialogButtonClick()">Change language</button>
</eui-dialog>
```

```typescript
import { Component, inject, ChangeDetectionStrategy, viewChild } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';

import { EUI_DIALOG, EuiDialogComponent } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'button-label',
    templateUrl: 'component.html',
    imports: [...EUI_DIALOG, ...EUI_BUTTON],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonLabelComponent {

    readonly dialog = viewChild<EuiDialogComponent>('dialog');

    private translateService = inject(TranslateService);

    public openDialog(): void {
        this.dialog().openDialog();
    }

    onDialogButtonClick(): void {
        this.translateService.use(this.translateService.currentLang === 'fr' ? 'en' : 'fr');
    }
}
```

