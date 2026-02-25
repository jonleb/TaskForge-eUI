import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, Input } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Subject, takeUntil } from 'rxjs';

import { EuiFileUploadComponent, EuiFileUploadUtilsService, EUI_FILE_UPLOAD } from "@eui/components/eui-file-upload";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EuiTemplateDirective } from "@eui/components/directives";
import { EUI_CARD } from "@eui/components/eui-card";
import { EUI_ICON } from '@eui/components/eui-icon';
import { EuiTooltipDirective } from '@eui/components/directives';
import { EUI_DROPDOWN } from "@eui/components/eui-dropdown";
import { EUI_ALERT } from "@eui/components/eui-alert";

@Component({
    // eslint-disable-next-line
    selector: 'file-icon',
    template: '<eui-icon-svg [icon]="icon" />',
    imports: [...EUI_ICON],
    providers: [
        EuiFileUploadUtilsService,
    ],    
})
export class FileIconComponent {
    @Input() filename: string;

    constructor(private euiFileUploadUtilsService: EuiFileUploadUtilsService) {}

    get icon(): string {
        const ext = this.filename.split('.');

        return this.euiFileUploadUtilsService.getIconForExtension(ext[ext.length - 1]);
    }
}

@Component({
    // eslint-disable-next-line
    selector: 'templating',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_FILE_UPLOAD,
        ...EUI_BUTTON,
        EuiTemplateDirective,
        ...EUI_CARD,
        ...EUI_ICON,
        EuiTooltipDirective,
        ...EUI_DROPDOWN,
        ...EUI_ALERT,
        FileIconComponent
    ],
})
export class TemplatingComponent implements OnInit, OnDestroy {

    public form: FormGroup;
    public progress = 0;

    @ViewChild('euiFileUpload') euiFileUpload: EuiFileUploadComponent;

    private destroy$: Subject<boolean> = new Subject<boolean>();
    private predefinedValues = [
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
    ];
    // private predefinedValues = null;

    constructor(private cd: ChangeDetectorRef, private euiFileUploadUtilsService: EuiFileUploadUtilsService) {}

    ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl('John Doe'),
            image: new FormControl(this.predefinedValues, Validators.required),
        });

        this.form.get('image').valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.progress = 0;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    public deleteFile(index: number): void {
        this.euiFileUpload.removeFromList(index);
    }

    public deleteUploadedFile(index: number): void {
        this.euiFileUpload.removeFromUploadedList(index);
    }

    public browse(): void {
        this.euiFileUpload.openBrowseWindow();
    }

    public reset(): void {
        this.euiFileUpload.resetList();
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
