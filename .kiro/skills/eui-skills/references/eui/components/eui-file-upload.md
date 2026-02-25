# eui-file-upload

## Overview

<p class="eui-u-text-paragraph">
<code class="eui-u-text-code">eui-file-upload</code> allows the user to upload a file to a server. It can be use in the classic simple file way or with a drag and drop feature.<br/>
<br/>
Please refer to sample in the right menu for other features.
</p>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | e2eAttr | string | 'eui-file-upload' |
| Input | progress | number | - |
| Input | accept | string | '*' |
| Input | maxFiles | number | - |
| Input | isMultiple | boolean | true |
| Input | hasProgressBar | boolean | true |
| Input | hasPreview | boolean | true |
| Input | hasPreviewAsImage | boolean | true |
| Input | hasPreviewAsIcon | boolean | false |
| Input | hasTotalSizeDisplayed | boolean | true |
| Input | hasResetButton | boolean | true |
| Input | hasDragArea | boolean | false |
| Input | isItemsClickable | boolean | false |
| Output | fileDrop | unknown | new EventEmitter() |
| Output | itemClick | unknown | new EventEmitter<Blob \| EuiUploadedFileInterface \| any>() |

## Samples

### [Default](samples/eui-file-upload/Default)

```html
<form [formGroup]="form" enctype="multipart/form-data">
    <eui-file-upload formControlName="image" [progress]="progress">
        <span class="eui-u-mr-xs"><button euiButton euiPrimary (click)="submit()">Submit</button></span>
    </eui-file-upload>
</form>
```

```typescript
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Subject, takeUntil } from 'rxjs';

import { EUI_FILE_UPLOAD, EuiFileUploadUtilsService } from "@eui/components/eui-file-upload";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_FILE_UPLOAD, ReactiveFormsModule, ...EUI_BUTTON],
    providers: [
        EuiFileUploadUtilsService,
    ],    
})
export class DefaultComponent implements OnInit, OnDestroy {

    public form: FormGroup;
    public progress = 0;
    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private cd: ChangeDetectorRef, private euiFileUploadUtilsService: EuiFileUploadUtilsService) {}

    ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl('John Doe'),
            image: new FormControl(null, Validators.required),
        });

        this.form.get('image').valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.progress = 0;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    public submit(): void {
        console.log(this.form.value);
        if (this.form.valid) {
            this.euiFileUploadUtilsService.sendData(this.form.value, 'http://localhost:3000/api/fake-api').pipe(
                this.euiFileUploadUtilsService.uploadProgress((progress) => {
                    if (this.form.get('image').value.length > 0) {
                        this.progress = progress;
                        this.cd.detectChanges();
                    }
                }),
                this.euiFileUploadUtilsService.toResponseBody(),
            ).subscribe((response) => {
                console.log(response);
            });
        }
    }
}
```

### Other examples

- [Options: No preview](samples/eui-file-upload/no-preview)
- [Options: Preview as icon](samples/eui-file-upload/preview-icon)
- [Options: Templating](samples/eui-file-upload/templating)
- [Main features: Allowed files](samples/eui-file-upload/allowed-files)
- [Main features: Auto upload](samples/eui-file-upload/auto-upload)
- [main features: Enable drag area](samples/eui-file-upload/enable-drag-area)
- [Main features: Max file selection](samples/eui-file-upload/max-file-selection)
- [Main features: No reset button](samples/eui-file-upload/no-reset-button)
- [Main features: Single file selection](samples/eui-file-upload/single-file)
- [Reactive Forms: Reactive Forms](samples/eui-file-upload/reactive-forms)
- [Reactive Forms: Validators](samples/eui-file-upload/validators)
- [Misc: Clickable items](samples/eui-file-upload/clickable-items)
- [Misc: Send data Customization](samples/eui-file-upload/send-data-customization)
