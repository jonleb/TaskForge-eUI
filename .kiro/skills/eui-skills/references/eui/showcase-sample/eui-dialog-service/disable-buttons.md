---
description: Disables or enables the default accept button based on form validity from an injected component.
id: disable-buttons
---

```html
<button euiButton type="button" (click)="openWithService()" aria-haspopup="dialog">Open Dialog</button>
{{ injectedFormValues | json }}
```

```typescript
import { Component, inject, ChangeDetectionStrategy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { JsonPipe } from '@angular/common';

import { EUI_DIALOG, EuiDialogConfig, EuiDialogService } from "@eui/components/eui-dialog";
import { EuiGrowlService } from '@eui/core';
import { EUI_BUTTON } from "@eui/components/eui-button";

import { DialogServiceDisableButtonsComponent, DialogServiceDisableButtonsComponentConfig } from '../../dummy-components/dialog-service-disable-buttons-component';

@Component({
    selector: 'disable-buttons',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
        ...EUI_DIALOG,
        JsonPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisableButtonsComponent {

    public formValues: FormGroup;
    public injectedFormValues: any;

    private euiDialogService = inject(EuiDialogService);
    private growlService = inject(EuiGrowlService);

    public openWithService(): void {
        let componentForm: FormGroup;
        const config = new EuiDialogConfig({
            title: 'Dialog title',
            bodyComponent: {
                component: DialogServiceDisableButtonsComponent,
                config: new DialogServiceDisableButtonsComponentConfig({
                    onFormValueChange: (form: FormGroup) => {
                        componentForm = form;
                        if (form.invalid) {
                            this.euiDialogService.disableAcceptButton();
                        } else {
                            this.euiDialogService.enableAcceptButton();
                        }
                    },
                }),
            },
            clickOutside: (instances) => {
            },
            open: () => {
            },
            close: (instances) => {
            },
            dismiss: (instances) => {
            },
            accept: (instances) => {
                this.injectedFormValues = componentForm;
                this.growlService.growl({
                    severity: 'success',
                    summary: 'SUBMIT SUCCESS',
                    detail: 'The Form has been successfully submitted.',
                });
            },
        });

        const d = this.euiDialogService.openDialog(config);
    }

}
```

