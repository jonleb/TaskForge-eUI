import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { pipe, Subject, filter, map, takeUntil, tap } from 'rxjs';

import { EUI_FILE_UPLOAD } from "@eui/components/eui-file-upload";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Injectable()
export class UploadUtilsService {

    constructor(private httpClient: HttpClient) {}

    public sendData(data: any, APIEndPoint: string) {
        return this.httpClient.post(APIEndPoint, this.toFormData(data), {
            reportProgress: true,
            observe: 'events',
        });
    }

    public toFormData(formValue: any): FormData {
        const formData = new FormData();

        for (const key of Object.keys(formValue)) {
            formValue[key].forEach((value: any) => {
                if (value instanceof File) {
                    formData.append(key, value);
                }
            });
        }

        return formData;
    }

    public uploadProgress<T>(cb: (progress: number) => void) {
        return tap((event: HttpEvent<T>) => {
            if (event.type === HttpEventType.UploadProgress) {
                cb(Math.round((100 * event.loaded) / event.total));
            }
        });
    }

    public toResponseBody<T>() {
        return pipe(
            filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
            map((res: HttpResponse<T>) => res.body),
        );
    }
}

@Component({
    // eslint-disable-next-line
    selector: 'send-data-customization',
    templateUrl: 'component.html',
    imports: [ReactiveFormsModule, ...EUI_FILE_UPLOAD, ...EUI_BUTTON],
    providers: [UploadUtilsService],
})
export class SendDataCustomizationComponent implements OnInit, OnDestroy {

    public form: FormGroup;
    public progress = 0;
    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private cd: ChangeDetectorRef, private uploadUtilsService: UploadUtilsService) {}

    ngOnInit(): void {
        this.form = new FormGroup({
            file: new FormControl(null, Validators.required),
        });

        this.form.get('file').valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
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
            this.uploadUtilsService.sendData(this.form.value, 'http://localhost:3000/api/fake-api').pipe(
                this.uploadUtilsService.uploadProgress((progress) => {
                    if (this.form.get('file').value.length > 0) {
                        this.progress = progress;
                        this.cd.detectChanges();
                    }
                }),
                this.uploadUtilsService.toResponseBody(),
            ).subscribe((response) => {
                console.log(response);
            });
        }
    }
}
