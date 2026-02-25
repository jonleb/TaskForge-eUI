import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Subject, takeUntil } from 'rxjs';

import { EUI_FILE_UPLOAD, EuiFileUploadUtilsService } from "@eui/components/eui-file-upload";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    // eslint-disable-next-line
    selector: 'max-file-selection',
    templateUrl: 'component.html',
    imports: [...EUI_FILE_UPLOAD, ReactiveFormsModule, ...EUI_BUTTON],
    providers: [
        EuiFileUploadUtilsService,
    ],    
})
export class MaxFileSelectionComponent implements OnInit, OnDestroy {

    public form: FormGroup;
    public progress = 0;
    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private cd: ChangeDetectorRef, private euiFileUploadUtilsService: EuiFileUploadUtilsService) {}

    ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl('John Doe'),
            image: new FormControl([
                {
                    name: '1.jpg',
                    url: 'http://localhost:4610/assets/images/eui-file-upload/1.jpg',
                    size: 36339,
                    type: 'image/jpeg',
                },
                {
                    name: '2.jpg',
                    url: 'http://localhost:4610/assets/images/eui-file-upload/2.jpg',
                    size: 44119,
                    type: 'image/jpeg',
                },
                {
                    name: '3.jpg',
                    url: 'http://localhost:4610/assets/images/eui-file-upload/3.jpg',
                    size: 117622,
                    type: 'image/jpeg',
                },
            ], Validators.required),
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
