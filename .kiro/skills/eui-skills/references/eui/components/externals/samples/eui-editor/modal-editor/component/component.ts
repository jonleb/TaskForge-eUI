import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { DIALOG_COMPONENT_CONFIG } from '@eui/components/eui-dialog';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';
import { EuiEditorModule } from '@eui/components/externals/eui-editor';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'my-editor',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        EuiEditorModule,
        ...EUI_SLIDE_TOGGLE,
        ...EUI_INPUT_GROUP,
        ...EUI_LABEL,
    ],
})
export class EditorComponent implements OnInit, OnDestroy {

    public injectedForm: FormGroup;
    public editorFormat: ('html' | 'json') = 'html';
    public editorPlaceholder: string;

    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(@Inject(DIALOG_COMPONENT_CONFIG) private config: any) { }

    ngOnInit(): void {
        // console.log(this.config);
        this.editorFormat = this.config.initialEditorFormat;
        this.editorPlaceholder = this.config.initialEditorPlaceholder;
        this.injectedForm = new FormGroup({
            editorContent: new FormControl<string>(this.config.initialEditorContent),
        });

        this.injectedForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            this.config.onFormValueChange(this.injectedForm);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
