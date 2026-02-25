# ecl-file-upload

## Overview

This component is used to select file or files from the user's pc. The files then can be further processed.
<br>
<more-info componentPartUrl="forms/file-upload/usage/"></more-info>

## API

API content

## Samples

### Default

```html
<h6 class="section-title">Single</h6>
<ecl-form-group>
    <div eclFormLabel for="single" id="example-single-id-1-label" isRequired>Label</div>
    <div eclHelpBlock id="example-single-id-1-helper">
        Only <strong>txt doc docx pdf odt rtf</strong> files. Maximum size is <strong>5 MB</strong>.<br>Encrypted documents and those containing macros are not accepted.
    </div>
  <input
      id="single"
      aria-describedby="example-single-id-1-label example-single-id-1-helper"
      eclFileUpload
      required
      (filesSelected)="onFilesSelected($event)"/>
</ecl-form-group>

<h6 class="section-title">Multiple</h6>
<ecl-form-group>
  <div eclFormLabel for="multiple" id="example-multiple-id-1-label" isRequired>Label</div>
  <div eclHelpBlock id="example-multiple-id-1-helper">
      Only <strong>txt doc docx pdf odt rtf</strong> files. Maximum size is <strong>5 MB</strong>.<br>Encrypted documents and those containing macros are not accepted.
  </div>
  <input
      id="multiple"
      aria-describedby="example-multiple-id-1-label example-multiple-id-1-helper"
      eclFileUpload
      multiple
      required
      (filesSelected)="onFilesSelected($event)"/>
</ecl-form-group>

<h6 class="section-title">Disabled</h6>
<ecl-form-group>
  <div eclFormLabel for="disabled" id="example-disabled-id-1-label" isDisabled isRequired>Label</div>
  <div eclHelpBlock id="example-disabled-id-1-helper">
      Only <strong>txt doc docx pdf odt rtf</strong> files. Maximum size is <strong>5 MB</strong>.<br>Encrypted documents and those containing macros are not accepted.
  </div>
  <input
      id="disabled"
      aria-describedby="example-disabled-id-1-label example-disabled-id-1-helper"
      disabled
      eclFileUpload
      required
      (filesSelected)="onFilesSelected($event)"/>
</ecl-form-group>

<h6 class="section-title">Invalid</h6>
<ecl-form-group>
  <div eclFormLabel for="invalid" id="example-invalid-id-1-label" isInvalid>Label</div>
  <div eclHelpBlock id="example-invalid-id-1-helper">
      Only <strong>txt doc docx pdf odt rtf</strong> files. Maximum size is <strong>5 MB</strong>.<br>Encrypted documents and those containing macros are not accepted.
  </div>
  <input
      id="invalid"
      aria-describedby="example-invalid-id-1-label example-invalid-id-1-helper"
      eclFileUpload
      required
      (filesSelected)="onFilesSelected($event)"/>
    <div eclFeedbackMessage id="example-invalid-id-1-message">
        <ecl-icon icon="error" size="s" ariaHidden="false" role="img">
            <title>Error</title>
        </ecl-icon>
        This is the error message
    </div>
</ecl-form-group>

<h6 class="section-title">Optional</h6>
<ecl-form-group>
  <div eclFormLabel for="optional" id="example-optional-id-1-label" isOptional>Label</div>
  <div eclHelpBlock id="example-optional-id-1-helper">
      Only <strong>txt doc docx pdf odt rtf</strong> files. Maximum size is <strong>5 MB</strong>.<br>Encrypted documents and those containing macros are not accepted.
  </div>
  <input
      id="optional"
      aria-describedby="example-optional-id-1-label example-optional-id-1-helper"
      eclFileUpload
      required
      (filesSelected)="onFilesSelected($event)"/>
</ecl-form-group>
```

```typescript
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
```
