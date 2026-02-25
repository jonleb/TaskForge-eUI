---
description: Combines a form dialog with a confirmation message box before submit.
id: with-msg-box
---

```html
<button euiButton type="button" (click)="openDialog()" aria-haspopup="dialog">Open Dialog</button>

Form Values: {{ formValues | json }}
```

```typescript
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { EUI_DIALOG, EuiDialogComponentInstances, EuiDialogConfig, EuiDialogService } from '@eui/components/eui-dialog';
import { EuiMessageBoxConfig, EuiMessageBoxService } from '@eui/components/eui-message-box';
import { EuiGrowlService } from '@eui/core';
import { EUI_BUTTON } from '@eui/components/eui-button';

import { MsgFooterComponent, MsgFooterComponentConfig } from '../../dummy-components/with-msg-box-footer.component';
import { MsgFormComponent, MsgFormComponentConfig } from '../../dummy-components/with-msg-box-form.component';

@Component({
    selector: 'with-msg-box',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
        ...EUI_DIALOG,
        JsonPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EuiDialogWithEuiMessageBoxComponent {

    public formValues = {};

    private euiDialogService = inject(EuiDialogService);
    private euiMessageBoxService = inject(EuiMessageBoxService);
    private growlService = inject(EuiGrowlService);

    public openDialog(): void {
        let componentForm: FormGroup;
        let componentInstances: EuiDialogComponentInstances<unknown, MsgFormComponent, MsgFooterComponent>;

        const config = new EuiDialogConfig({
            title: 'Fill the form',
            bodyComponent: {
                component: MsgFormComponent,
                config: new MsgFormComponentConfig({
                    onFormValueChange: (form: FormGroup) => {
                        componentForm = form;

                        if (componentInstances.footerComponent) {
                            if (form.valid) {
                                componentInstances.footerComponent.disableSubmitButton();
                            } else {
                                componentInstances.footerComponent.enableSubmitButton();
                            }
                        }
                    },
                }),
            },
            footerComponent: {
                component: MsgFooterComponent,
                config: new MsgFooterComponentConfig({
                    accept: () => {
                        const messageBoxConfig = new EuiMessageBoxConfig({
                            title: 'Confirm',
                            content: "<p class='eui-u-text-paragraph'>Are you sure you want to save ?</p>",
                            isHandleCloseOnAccept: true,
                            accept: () => {
                                this.growlService.growl({
                                    severity: 'success',
                                    summary: 'SUBMIT SUCCESS',
                                    detail: 'The Form has been successfully submitted.',
                                });
                                this.euiDialogService.closeDialog();
                                this.euiMessageBoxService.closeMessageBox();
                                this.formValues = componentForm.value;
                            },
                        });
                        this.euiMessageBoxService.openMessageBox(messageBoxConfig);
                    },
                }),
            },
            init: (instances) => {
                componentInstances = instances;

                if (componentInstances.bodyComponent && componentInstances.footerComponent) {
                    if (componentInstances.bodyComponent.form.valid) {
                        componentInstances.footerComponent.isDisabled = false;
                    } else {
                        componentInstances.footerComponent.isDisabled = true;
                    }
                }
            },
        });
        this.euiDialogService.openDialog(config);
    }
}
```

