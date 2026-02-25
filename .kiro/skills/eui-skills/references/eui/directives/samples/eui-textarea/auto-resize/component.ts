import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { EuiDialogService, EuiDialogConfig } from '@eui/components/eui-dialog';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_TEXTAREA } from '@eui/components/eui-textarea';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BUTTON } from '@eui/components/eui-button';

import { BodyComponent } from './body.component';

@Component({
    // tslint:disable-next-line
    selector: 'auto-resize',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_INPUT_GROUP,
        ...EUI_TEXTAREA,
        ...EUI_LABEL,
        ...EUI_BUTTON,
    ],
})
export class AutoResizeComponent {

    public state: false | true = true;
    public form: FormGroup = new FormGroup({
        control: new FormControl('It was a dark and stormy night... '.repeat(20) + 'END'),
    });

    constructor(private euiDialogService: EuiDialogService, private cd: ChangeDetectorRef) {}

    public openDialog() {
        this.euiDialogService.openDialog(new EuiDialogConfig({
            title: 'Dialog title',
            bodyComponent: {
                component: BodyComponent,
                config: {
                    aaa: 1,
                    bbb: 2,
                    onFormValueChange: (values: any) => {
                        this.cd.detectChanges();
                    },
                },
            },
        }));
    }

    public changeState() {
        this.state = !this.state;
    }

    changeValue() {
        this.form.get('control').setValue(this.form.get('control').value + '\n' + Math.random() * 100 );
    }
}
