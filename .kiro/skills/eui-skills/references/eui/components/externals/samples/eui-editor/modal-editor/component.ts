import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

import { EuiAppShellService, EuiGrowlService } from '@eui/core';
import { EuiDialogConfig, EuiDialogService } from '@eui/components/eui-dialog';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';
import { EuiEditorModule } from '@eui/components/externals/eui-editor';
import { EUI_BUTTON } from '@eui/components/eui-button';

import { EditorComponent } from './component/component';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'modal-editor',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        EuiEditorModule,
        ...EUI_SLIDE_TOGGLE,
        ...EUI_INPUT_GROUP,
        ...EUI_LABEL,
        ...EUI_BUTTON,
    ],
    providers: [EuiAppShellService, EuiGrowlService],
})
export class ModalEditorComponent implements OnInit {

    public form1: FormGroup;
    public textContent: `This is some text content of the rich text editor.`;
    // eslint-disable-next-line max-len
    public jsonContent = `{\"ops\":[{\"insert\":\"Hello \"},{\"attributes\":{\"color\":\"#e55bb7\",\"bold\":true},\"insert\":\"World !\"},{\"attributes\":{\"header\":1},\"insert\":\"\\n\"},{\"insert\":\"This \"},{\"attributes\":{\"bold\":true},\"insert\":\"JSON content object \"},{\"insert\":\"is easy to store and to maintain, because there is \"},{\"attributes\":{\"italic\":true,\"color\":\"#e60000\",\"bold\":true},\"insert\":\"no html \"},{\"insert\":\"syntax parsing necessary. It contains representations of the content (as inserts) and formatting operations (as attributes).\\nCheck the code source for more detail.\\n\"}]}`;
    public htmlContent = `<p class="eui-u-text-paragraph">This is some <strong style="color: rgb(230, 0, 0);">formatted </strong>content of the rich text editor.</p>
                    <ol>
                        <li>Numbered list</li><li class=\"ql-indent-1\">Sub-section</li>
                        <li class=\"ql-indent-1\">Sub-section</li><li class=\"ql-indent-2\">Sub-section</li>
                        <li class=\"ql-indent-2\">Sub-section</li><li class=\"ql-indent-3\">Sub-section</li>
                        <li class=\"ql-indent-3\">Sub-section</li><li class=\"ql-indent-3\">Sub-section</li>
                    </ol>

                    <p class=\"ql-indent-1\"><br></p>

                    <ul>
                        <li>Bulletted list</li>
                        <li class=\"ql-indent-1\">Sub-section</li>
                        <li class=\"ql-indent-1\">Sub-section</li>
                        <li class=\"ql-indent-2\">Sub-section</li>
                        <li class=\"ql-indent-2\">Sub-section</li>
                    </ul>
    `;

    public editorInitContent: string;
    public editorFormat: ('html' | 'json') = 'json';
    public editorPlaceholder = 'Compose an epic...';

    constructor(private asService: EuiAppShellService, private euiDialogService: EuiDialogService, public growlService: EuiGrowlService,) { }

    ngOnInit(): void {
        if (this.editorFormat === 'json') {
            this.editorInitContent = this.jsonContent;
        } else {
            this.editorInitContent = this.htmlContent;
        }
        this.form1 = new FormGroup({
            editorContent: new FormControl<string>(this.editorInitContent),
        });
    }

    public openDialog(): void {
        let editorValue: string = null;
        const dialog = this.euiDialogService.openDialog(new EuiDialogConfig({
            title: 'Rich text content editor',
            width: '50vw',
            height: '50vh',
            bodyComponent: {
                component: EditorComponent,
                config: {
                    initialEditorContent: this.form1?.get('editorContent').value,
                    initialEditorFormat: this.editorFormat,
                    initialEditorPlaceholder: this.editorPlaceholder,
                    // Get back the updated Form values from injected component
                    onFormValueChange: (formGroup: FormGroup): void => {
                        // Add any validity/business checks here
                        if (formGroup.valid) {
                            // Get the FormControl value(s) you need here
                            editorValue = formGroup.get('editorContent').value;
                        } else {
                            this.growlService.growl({
                                severity: 'danger',
                                summary: 'SUBMIT FORM IS NOT VALID!',
                                detail: 'Please fill in all required fields !',
                            });
                        }
                    },
                },
            },
            accept: () => {
                this.form1.get('editorContent').patchValue(editorValue);
                this.growlService.growl({
                    severity: 'success',
                    summary: 'SUBMIT SUCCESS',
                    detail: 'Editor contents has been successfully updated.',
                });
            },
            dismiss: () => {
                this.growlService.growl({
                    severity: 'info',
                    summary: 'DISMISSED ACTION',
                    detail: 'Editor content edition has been cancelled.',
                });
            },
        }));
    }
}
