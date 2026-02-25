---
description: Embeds the EUI editor in the dialog body and validates before closing.
id: with-eui-editor
---

```html
<button euiButton type="button" (click)="openWithService()" aria-haspopup="dialog">Open Dialog</button>
```

```typescript
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { EuiDialogConfig, EuiDialogService } from '@eui/components/eui-dialog';
import { EuiGrowlService } from '@eui/core';
import { EUI_BUTTON } from '@eui/components/eui-button';

import { EditorComponent } from '../../dummy-components/editor.component';

@Component({
    selector: 'with-eui-editor',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithEuiEditorComponent {
    private euiDialogService = inject(EuiDialogService);
    private growlService = inject(EuiGrowlService);

    public openWithService(): void {
        let f: FormGroup;
        const config = new EuiDialogConfig({
            title: 'Dialog with eui-editor',
            isHandleCloseOnAccept: true,
            bodyComponent: {
                component: EditorComponent,
                config: {
                    isBlocked: false,
                    onFormValueChange: (form: FormGroup) => {
                        f = form;
                    },
                },
            },
            accept: (instances) => {
                instances.bodyComponent.markAllAsTouched();
                if (f.valid) {
                    this.closeDialog();
                } else {
                    this.growlService.growl({
                        severity: 'danger',
                        summary: 'Something went wrong...',
                        detail: 'The form is invalid, please fix the errors first.',
                    });
                }
            },
        });
        this.euiDialogService.openDialog(config);
    }

    public closeDialog(): void {
        this.euiDialogService.closeDialog();
    }

}
```

