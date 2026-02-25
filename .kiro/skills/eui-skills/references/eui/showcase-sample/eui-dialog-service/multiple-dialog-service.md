---
description: Opens a dialog that can spawn a message box and demonstrates handling multiple overlays via the service.
id: multiple-dialog-service
---

```html
<button euiButton type="button" (click)="openWithService()" aria-haspopup="dialog">Open Dialog</button>
{{ injectedFormValues | json }}
```

```typescript
import { ChangeDetectorRef, Component, inject, OnDestroy, ChangeDetectionStrategy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Subject } from 'rxjs';
import { JsonPipe } from '@angular/common';

import { EUI_DIALOG, EuiDialogConfig, EuiDialogService } from '@eui/components/eui-dialog';
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EuiMessageBoxConfig, EuiMessageBoxService } from '@eui/components/eui-message-box';
import { EuiGrowlService } from '@eui/core';

import { Dialog1ServiceComponent, Dialog1ServiceComponentConfig } from '../../dummy-components/dialog1-service-component';

@Component({
    selector: 'multiple-dialog-service',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
        ...EUI_DIALOG,
        JsonPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleDialogServiceComponent implements OnDestroy {

    public formValues: FormGroup;
    public injectedFormValues: any;

    private destroy$: Subject<boolean> = new Subject<boolean>();

    private euiDialogService = inject(EuiDialogService);
    private cd = inject(ChangeDetectorRef);
    private euiMessageBoxService = inject(EuiMessageBoxService);
    private growlService = inject(EuiGrowlService);

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    public openWithService(): void {
        let componentForm: FormGroup;
        const config = new EuiDialogConfig({
            title: 'Dialog title of Dialog1ServiceComponent',
            isHandleCloseOnAccept: true,
            isHandleCloseOnDismiss: true,
            bodyComponent: {
                component: Dialog1ServiceComponent,
                config: new Dialog1ServiceComponentConfig({
                    onFormValueChange: (form: FormGroup) => {
                        componentForm = form;
                    },
                }),
            },
            close: (instances) => {
                this.injectedFormValues = componentForm.value;
            },
            dismiss: (instances) => {
                const config = new EuiMessageBoxConfig({
                    title: 'Confirm',
                    content: '<p class="eui-u-text-paragraph">Are you sure to cancel the form</p>',
                    isHandleCloseOnAccept: true,
                    accept: () => {
                        this.euiMessageBoxService.closeMessageBox();
                        this.euiDialogService.closeDialog();
                    },
                });

                this.euiMessageBoxService.openMessageBox(config);
            },
            accept: (instances) => {
                instances.bodyComponent.checkForm();
                if (componentForm.valid) {
                    this.injectedFormValues = componentForm.value;
                    this.growlService.growl({
                        severity: 'success',
                        summary: 'SUBMIT SUCCESS',
                        detail: 'The Form has been successfully submitted.',
                    });
                    this.euiDialogService.closeDialog();
                    this.cd.detectChanges();
                } else {
                    this.growlService.growl({ severity: 'danger', summary: 'SUBMIT FAILED!', detail: 'Please fill in all required fields !' });
                }
            },
        });

        const dialog = this.euiDialogService.openDialog(config);
    }
}
```

