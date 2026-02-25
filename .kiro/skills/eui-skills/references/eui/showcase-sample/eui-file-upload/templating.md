---
description: Customizes the uploaded item, buttons, and progress display with templates and custom actions.
id: templating
---

```html
<form [formGroup]="form" enctype="multipart/form-data">
    <eui-file-upload #euiFileUpload formControlName="image" [progress]="progress">

        <ng-template euiTemplate="uploadedFile" let-file>
            <eui-card class="eui-u-mv-m">
                <eui-card-header>
                    <eui-card-header-title>
                        <a class="eui-u-text-link">{{ file.file.name }}</a>
                    </eui-card-header-title>
                    <eui-card-header-subtitle>Optional subtitle</eui-card-header-subtitle>
             
                    <eui-card-header-left-content>
                        @if (file.file.type === 'image/jpeg' || file.file.type === 'image/gif' || file.file.type === 'image/png') {
                            <img class="eui-u-width-20" src="{{ file.file.url }}" alt="{{ file.file.name }}" />
                        } @else {
                            <file-icon [filename]="file.file.name" />
                        }
                    </eui-card-header-left-content>
             
                    <eui-card-header-right-content class="eui-u-flex-gap-m">
                       
                        <div class="eui-u-flex eui-u-flex-column eui-u-flex-gap-2xs">
                            <small>File size</small>
                            <span euiLabel>{{ file.file.size | filesize }}</span>
                        </div>
             
                        <div class="eui-u-flex eui-u-flex-column eui-u-flex-gap-2xs">
                            <small>File type</small>
                            <span euiLabel>{{ file.file.type }}</span>
                        </div>
                       
                        @if (file.isFileObject) {
                            <button euiButton euiBasicButton euiDanger euiOutline euiSizeS euiTooltip="Remove from the list" (click)="deleteFile(file.index)">
                                <eui-icon-svg icon="eui-trash" fillColor="danger" /> Delete
                            </button>
                        } @else {
                            <button euiButton euiBasicButton euiDanger euiOutline euiSizeS euiTooltip="Remove from the list" (click)="deleteUploadedFile(file.index)">
                                <eui-icon-svg icon="eui-trash" fillColor="danger" /> Delete
                            </button>
                        }
             
                    </eui-card-header-right-content>
                </eui-card-header>
            </eui-card>
        </ng-template>
        <ng-template euiTemplate="browseButton">
            <button euiButton type="button" (click)="browse()" aria-label="Choose files to upload">
                <eui-icon-svg icon="eui-upload" />
            </button>
        </ng-template>
        <ng-template euiTemplate="resetButton">
            <button euiButton type="button" (click)="reset()" aria-label="Reset the list of files">
                <eui-icon-svg icon="eui-close" />
            </button>
        </ng-template>
        <ng-template euiTemplate="progressBar" let-progress>
            @if (progress.progress > 0) {
                {{ progress.progress }}%
            }
        </ng-template>

        <span class="eui-u-mr-xs"><button euiButton euiPrimary (click)="submit()">Submit</button></span>
    </eui-file-upload>
</form>
```

```typescript
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, inject, input, viewChild } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Subject, takeUntil } from 'rxjs';

import { EUI_FILE_UPLOAD, EuiFileUploadComponent, EuiFileUploadUtilsService } from "@eui/components/eui-file-upload";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EuiTemplateDirective, EuiTooltipDirective } from "@eui/components/directives";
import { EUI_CARD } from "@eui/components/eui-card";
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_DROPDOWN } from "@eui/components/eui-dropdown";

@Component({
    selector: 'file-icon',
    template: '<eui-icon-svg [icon]="icon" />',
    imports: [...EUI_ICON],
    providers: [
        EuiFileUploadUtilsService,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileIconComponent {
    readonly filename = input<string>(undefined);

    private euiFileUploadUtilsService = inject(EuiFileUploadUtilsService);

    get icon(): string {
        const ext = this.filename().split('.');

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
        FileIconComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatingComponent implements OnInit, OnDestroy {

    public form: FormGroup;
    public progress = 0;

    readonly euiFileUpload = viewChild<EuiFileUploadComponent>('euiFileUpload');

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
    
    private cd = inject(ChangeDetectorRef);
    private euiFileUploadUtilsService = inject(EuiFileUploadUtilsService);

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
        this.euiFileUpload().removeFromList(index);
    }

    public deleteUploadedFile(index: number): void {
        this.euiFileUpload().removeFromUploadedList(index);
    }

    public browse(): void {
        this.euiFileUpload().openBrowseWindow();
    }

    public reset(): void {
        this.euiFileUpload().resetList();
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

