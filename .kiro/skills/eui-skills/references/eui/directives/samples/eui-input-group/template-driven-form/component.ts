import { Component, OnInit } from '@angular/core';
import {
    FormsModule as AngularFormsModule,
    NgForm,
    ReactiveFormsModule,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';

@Component({
    // tslint:disable-next-line
    selector: 'template-driven-forms',
    templateUrl: 'component.html',
    styles: [`ul li {
        list-style:outside;
        margin-left: 1rem;
    }`],
    imports: [
        AngularFormsModule,
        ReactiveFormsModule,
        ...EUI_ALERT,
        ...EUI_LABEL,
        ...EUI_BUTTON,
        ...EUI_BADGE,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_INPUT_GROUP,
        ...EUI_INPUT_TEXT,
        JsonPipe
    ],
})
export class TemplateDrivenFormsComponent implements OnInit {

    // public form: FormGroup;
    public user: Object = {
        firstName: '',
        lastName: '',
    };
    // private fb: FormBuilder = inject(FormBuilder);

    ngOnInit(): void {
        this.user = {
            firstName: 'Jane',
            lastName: 'Doe',
        };
    }

    public onSubmitModelTemplate(form: NgForm) {
        console.log(form);
    }
}
