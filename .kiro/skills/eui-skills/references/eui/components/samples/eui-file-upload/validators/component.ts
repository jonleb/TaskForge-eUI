import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Subject, takeUntil } from 'rxjs';
import { KeyValuePipe } from "@angular/common";

import {
    EuiFileUploadUtilsService,
    asyncMimeTypeExtensionValidator,
    maxFilesValidator,
    maxSizeValidator,
    mimeTypeExtensionValidator,
    maxFileSizeValidator,
    EUI_FILE_UPLOAD,
} from "@eui/components/eui-file-upload";
import { EUI_FEEDBACK_MESSAGE } from "@eui/components/eui-feedback-message";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    // eslint-disable-next-line
    selector: 'validators',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_FILE_UPLOAD,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_BUTTON,
        KeyValuePipe,
    ],
    providers: [
        EuiFileUploadUtilsService,
    ],    
})
export class ValidatorsComponent implements OnInit, OnDestroy {
    public form1: FormGroup;
    public form2: FormGroup;
    public form3: FormGroup;
    public form4: FormGroup;
    public form5: FormGroup;
    public progress1 = 0;
    public progress2 = 0;
    public progress3 = 0;
    public progress4 = 0;
    public progress5 = 0;
    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private cd: ChangeDetectorRef,
        private euiFileUploadUtilsService: EuiFileUploadUtilsService,
    ) {}

    isMimeTypeInvalid(formControl: FormControl | AbstractControl): boolean {
        return formControl.hasError('invalidMimeFileType');
    }

    ngOnInit(): void {
        this.form1 = new FormGroup({
            name: new FormControl('John Doe'),
            image: new FormControl(null, maxFilesValidator(3)),
        });

        this.form2 = new FormGroup({
            name: new FormControl('John Doe'),
            image: new FormControl(null, maxSizeValidator(300000)),
        });

        this.form3 = new FormGroup({
            name: new FormControl('John Doe'),
            image: new FormControl(
                null,
                mimeTypeExtensionValidator(['image/jpeg']),
            ),
        });

        this.form4 = new FormGroup({
            name: new FormControl('John Doe'),
            image: new FormControl(null, null, [
                asyncMimeTypeExtensionValidator(['image/jpeg']),
            ]),
        });

        this.form5 = new FormGroup({
            name: new FormControl('John Doe'),
            image: new FormControl(null, maxFileSizeValidator(300000)),
        });

        this.form1
            .get('image')
            .valueChanges.pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.progress1 = 0;
            });

        this.form2
            .get('image')
            .valueChanges.pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.progress2 = 0;
            });

        this.form3
            .get('image')
            .valueChanges.pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.progress3 = 0;
            });

        this.form4
            .get('image')
            .valueChanges.pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.progress4 = 0;
            });
        this.form5
        .get('image')
        .valueChanges.pipe(takeUntil(this.destroy$))
        .subscribe(() => {
            this.progress5 = 0;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    public submit1(): void {
        console.log(this.form1.value);
        if (this.form1.valid) {
            this.euiFileUploadUtilsService
                .sendData(
                    this.form1.value,
                    'http://localhost:3000/api/fake-api',
                )
                .pipe(
                    this.euiFileUploadUtilsService.uploadProgress(
                        (progress) => {
                            if (
                                this.form1.get('image').value &&
                                this.form1.get('image').value.length > 0
                            ) {
                                this.progress1 = progress;
                                this.cd.detectChanges();
                            }
                        },
                    ),
                    this.euiFileUploadUtilsService.toResponseBody(),
                )
                .subscribe((response) => {
                    console.log(response);
                });
        }
    }

    public submit2(): void {
        console.log(this.form2.value);
        if (this.form2.valid) {
            this.euiFileUploadUtilsService
                .sendData(
                    this.form2.value,
                    'http://localhost:3000/api/fake-api',
                )
                .pipe(
                    this.euiFileUploadUtilsService.uploadProgress(
                        (progress) => {
                            if (
                                this.form2.get('image').value &&
                                this.form2.get('image').value.length > 0
                            ) {
                                this.progress2 = progress;
                                this.cd.detectChanges();
                            }
                        },
                    ),
                    this.euiFileUploadUtilsService.toResponseBody(),
                )
                .subscribe((response) => {
                    console.log(response);
                });
        }
    }

    public submit3(): void {
        console.log(this.form3);
        if (this.form3.valid) {
            this.euiFileUploadUtilsService
                .sendData(
                    this.form3.value,
                    'http://localhost:3000/api/fake-api',
                )
                .pipe(
                    this.euiFileUploadUtilsService.uploadProgress(
                        (progress) => {
                            if (
                                this.form3.get('image').value &&
                                this.form3.get('image').value.length > 0
                            ) {
                                this.progress3 = progress;
                                this.cd.detectChanges();
                            }
                        },
                    ),
                    this.euiFileUploadUtilsService.toResponseBody(),
                )
                .subscribe((response) => {
                    console.log(response);
                });
        }
    }

    public submit4(): void {
        console.log(this.form4);
        if (this.form4.valid) {
            this.euiFileUploadUtilsService
                .sendData(
                    this.form4.value,
                    'http://localhost:3000/api/fake-api',
                )
                .pipe(
                    this.euiFileUploadUtilsService.uploadProgress(
                        (progress) => {
                            if (
                                this.form4.get('image').value &&
                                this.form4.get('image').value.length > 0
                            ) {
                                this.progress4 = progress;
                                this.cd.detectChanges();
                            }
                        },
                    ),
                    this.euiFileUploadUtilsService.toResponseBody(),
                )
                .subscribe((response) => {
                    console.log(response);
                });
        }
    }

    public submit5(): void {
        console.log(this.form5.value);
        if (this.form5.valid) {
            this.euiFileUploadUtilsService
                .sendData(
                    this.form5.value,
                    'http://localhost:3000/api/fake-api',
                )
                .pipe(
                    this.euiFileUploadUtilsService.uploadProgress(
                        (progress) => {
                            if (
                                this.form5.get('image').value &&
                                this.form5.get('image').value.length > 0
                            ) {
                                this.progress5 = progress;
                                this.cd.detectChanges();
                            }
                        },
                    ),
                    this.euiFileUploadUtilsService.toResponseBody(),
                )
                .subscribe((response) => {
                    console.log(response);
                });
        }
    }
}
