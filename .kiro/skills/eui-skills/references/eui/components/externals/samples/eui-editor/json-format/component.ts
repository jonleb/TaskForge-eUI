import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';
import { EuiEditorModule } from '@eui/components/externals/eui-editor';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'json-format',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        EuiEditorModule,
        ...EUI_SLIDE_TOGGLE,
        ...EUI_INPUT_GROUP,
        ...EUI_LABEL,
    ],
})
export class JsonFormatComponent implements OnInit {
    // eslint-disable-next-line max-len
    jsonContent = `{\"ops\":[{\"insert\":\"Hello \"},{\"attributes\":{\"color\":\"#e55bb7\",\"bold\":true},\"insert\":\"World !\"},{\"attributes\":{\"header\":1},\"insert\":\"\\n\"},{\"insert\":\"\\nThis \"},{\"attributes\":{\"bold\":true},\"insert\":\"JSON content object \"},{\"insert\":\"is easy to store and to maintain, because there is \"},{\"attributes\":{\"italic\":true,\"color\":\"#e60000\",\"bold\":true},\"insert\":\"no html \"},{\"insert\":\"syntax parsing necessary.\\nIt contains representations of the content(as inserts) and formatting operations (as attributes).\\nCheck the code source for more detail.\\n\"}]}`;
    placeholder = 'Compose an epic...';

    form: FormGroup;

    ngOnInit(): void {
        this.form = new FormGroup({
            jsonContent: new FormControl<string>(this.jsonContent),
        });
    }
}
