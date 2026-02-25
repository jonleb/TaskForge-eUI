import { Component } from '@angular/core';
import { EUI_ECL_FEEDBACK_MESSAGE } from '@eui/ecl/components/ecl-feedback-message';
import { EclFileUploadFileSelectedEvent, EUI_ECL_FILE_UPLOAD } from '@eui/ecl/components/ecl-file-upload';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_FILE_UPLOAD, ...EUI_ECL_FEEDBACK_MESSAGE, ...EUI_ECL_ICON],
})
export class DefaultComponent {
    disabled = true;

    onFilesSelected(evt: EclFileUploadFileSelectedEvent) {
        console.log('files selected:', evt);
    }
}
