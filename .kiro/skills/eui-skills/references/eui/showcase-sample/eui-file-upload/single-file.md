---
description: Forces single-file selection by disabling multiple uploads.
id: single-file
---

```html
<form [formGroup]="form" enctype="multipart/form-data">
    <eui-file-upload formControlName="image" [progress]="progress" [isMultiple]="false" hasDragArea>
        <span class="eui-u-mr-xs"><button euiButton euiPrimary (click)="submit()">Submit</button></span>
    </eui-file-upload>
</form>
```

```typescript
import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Subject, takeUntil } from 'rxjs';

import { EUI_FILE_UPLOAD, EuiFileUploadUtilsService } from "@eui/components/eui-file-upload";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'single-file',
    templateUrl: 'component.html',
    imports: [ReactiveFormsModule, ...EUI_FILE_UPLOAD, ...EUI_BUTTON],
    providers: [
        EuiFileUploadUtilsService,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleFileComponent implements OnInit, OnDestroy {

    public form: FormGroup;
    public progress = 0;
    private destroy$: Subject<boolean> = new Subject<boolean>();

    private cd = inject(ChangeDetectorRef);
    private euiFileUploadUtilsService = inject(EuiFileUploadUtilsService);

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

