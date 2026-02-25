import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, takeUntil, startWith } from 'rxjs';

import { EUI_OVERLAY } from '@eui/components/eui-overlay';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_FIELDSET } from '@eui/components/eui-fieldset';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_BADGE } from '@eui/components/eui-badge';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'advanced-layout',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_OVERLAY,
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_FIELDSET,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_INPUT_GROUP,
        ...EUI_INPUT_TEXT,
        ...EUI_LABEL,
        ...EUI_CHIP,
        ...EUI_BADGE,
        ...EUI_CARD,
    ],
})
export class AdvancedLayoutComponent implements OnInit, OnDestroy {
    public isOverlayActive = false;
    public isEditActive = false;
    public isCreateActive = false;

    public form: FormGroup;

    @Output() formChange  = new EventEmitter<FormGroup>();

    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor() {
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            widgetTitle: new FormControl<string>('', [Validators.required]),
            secundaId: new FormControl<string>(''),
            widgetUrl: new FormControl<string>('', [Validators.required]),
        });
        this.form.valueChanges.pipe(takeUntil(this.destroy$), startWith(true)).subscribe((form) => {
            this.formChange.emit(this.form);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    public closeOverlay(e: Event) {
        this.isEditActive = false;
        this.isCreateActive = false;
        this.form.reset();
        this.isOverlayActive = false;
    }

    public toggleOverlay(e: Event) {
        this.isOverlayActive = !this.isOverlayActive;
    }

    updateActiveState(event: boolean) {
        this.isOverlayActive = event;
    }

    public onEditClick(): void {
        this.isCreateActive = false;
        this.isEditActive = true;
    }

    public onCreateClick(): void {
        this.isEditActive = false;
        this.isCreateActive = true;
    }

    public submitForm(): void {
        this.form.markAllAsTouched();
    }

    public render(controlName: string): boolean {
        return this.form?.get(controlName).invalid &&
            this.form?.get(controlName).touched &&
            this?.form.get(controlName).hasError('required');
    }
}
