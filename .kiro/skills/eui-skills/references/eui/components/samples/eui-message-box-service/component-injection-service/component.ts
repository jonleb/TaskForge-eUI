import { Component } from "@angular/core";
import { FormGroup } from '@angular/forms';

import { EuiMessageBoxConfig, EUI_MESSAGE_BOX, EuiMessageBoxService } from "@eui/components/eui-message-box";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_ALERT } from "@eui/components/eui-alert";

import { DummyBodyServiceComponent, DummyBodyComponentConfig } from '../../dummy-components/dummy-body-service-component';
import { DummyFooterServiceComponent, DummyFooterComponentConfig } from '../../dummy-components/dummy-footer-service-component';

@Component({
    // eslint-disable-next-line
    selector: 'component-injection-service',
    templateUrl: 'component.html',
    imports: [...EUI_MESSAGE_BOX, ...EUI_BUTTON, ...EUI_ALERT],    
})
export class ComponentInjectionServiceComponent {

    public formValues: FormGroup;

    constructor(private euiMessageBoxService: EuiMessageBoxService) {}

    public closeMessageBox(): void {
        this.euiMessageBoxService.closeMessageBox();
    }

    public openWithService(): void {
        let componentForm: FormGroup;
        let componentInstances: any;
        const config = new EuiMessageBoxConfig({
            title: 'Message Box title',
            bodyComponent: {
                component: DummyBodyServiceComponent,
                config: new DummyBodyComponentConfig({
                    onFormValueChange: (form: FormGroup) => {
                        componentForm = form;
                    },
                }),
            },
            footerComponent: {
                component: DummyFooterServiceComponent,
                config: new DummyFooterComponentConfig({
                    accept: () => {
                        componentInstances.bodyComponent.checkForm();
                        console.log(componentForm)
                        if (componentForm.valid) {
                            alert('Form valid');
                            this.euiMessageBoxService.closeMessageBox();
                        } else {
                            alert('Form invalid');
                        }
                    },
                    dismiss: () => {
                        this.euiMessageBoxService.closeMessageBox();
                    },
                }),
            },
            init: (instances) => {
                console.log(instances)
                componentInstances = instances;
            },
            open: () => {
                console.log('open from user config');
            },
            close: (instances) => {
                console.log('instances', instances);
                console.log('close from user config');
            },
        });

        this.euiMessageBoxService.openMessageBox(config);
    }
}
