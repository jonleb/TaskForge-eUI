import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';
import { EuiEditorModule, euiEditorMinLength, euiEditorMaxLength, euiEditorMinWords, euiEditorMaxWords } from '@eui/components/externals/eui-editor';

@Component({
    // eslint-disable-next-line
    selector: 'validators',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        EuiEditorModule,
        ...EUI_SLIDE_TOGGLE,
        ...EUI_INPUT_GROUP,
        ...EUI_LABEL,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_ALERT,
    ],
})
export class ValidatorsComponent implements OnInit {
    public placeholder = 'Compose an epic...';

    public form1: FormGroup;
    public form2: FormGroup;
    public form3: FormGroup;
    public form4: FormGroup;
    public htmlContent = `<p>At vero eos et <strong style=\"color: rgb(230, 0, 0);\">accusamus </strong>et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p><p>Et harum quidem rerum facilis est et expedita distinctio.</p><h6 class=\"ql-align-right\"><strong style=\"color: rgb(136, 136, 136);\"><em>Cogito, ergo sum</em></strong></h6>`;
    public jsonContent = `{\"ops\":[{\"insert\":\"At vero eos et \"},{\"attributes\":{\"color\":\"#e60000\",\"bold\":true},\"insert\":\"accusamus \"},{\"insert\":\"et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.\\nEt harum quidem rerum facilis est et expedita distinctio.\\n\"},{\"attributes\":{\"italic\":true,\"color\":\"#888888\",\"bold\":true},\"insert\":\"Cogito, ergo sum\"},{\"attributes\":{\"align\":\"right\",\"header\":6},\"insert\":\"\\n\"}]}`;

    ngOnInit(): void {
        this.form1 = new FormGroup({
            htmlContent: new FormControl<string>(this.htmlContent, [Validators.required, euiEditorMinLength(5), euiEditorMaxLength(400)]),
        });

        this.form2 = new FormGroup({
            jsonContent: new FormControl<string>(this.jsonContent, [Validators.required, euiEditorMinLength(5), euiEditorMaxLength(400)]),
        });

        this.form3 = new FormGroup({
            htmlContent: new FormControl<string>(this.htmlContent, [Validators.required, euiEditorMinWords(5), euiEditorMaxWords(10)]),
        });

        this.form4 = new FormGroup({
            jsonContent: new FormControl<string>(this.jsonContent, [Validators.required, euiEditorMinWords(5), euiEditorMaxWords(10)]),
        });
    }
}
