import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

import { markFormGroupTouched, EuiAppShellService } from '@eui/core';
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EuiEditorModule } from '@eui/components/externals/eui-editor';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EuiTooltipDirective } from '@eui/components/directives';

@Component({
    // eslint-disable-next-line
    selector: 'card-editable',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CARD,
        ...EUI_BUTTON,
        EuiEditorModule,
        ...EUI_CHIP,
        ...EUI_ICON,
        ...EUI_LABEL,
        ReactiveFormsModule,
        EuiTooltipDirective,
    ],
})
export class CardEditableComponent implements OnInit, OnDestroy {

    public isEditActive = false;
    public cardTitle = 'Editable card';
    public cardSubtitle = 'Use the edit button to update the card content';
    public cardContentStyle = 'height: 12rem';
    /* eslint-disable */
    public htmlContent = `<p class="eui-u-text-paragraph">The <strong>Shiba Inu</strong> is a Japanese breed of hunting dog. A small-to-medium breed, it is the smallest of the six original and distinct spitz breeds of dog native to Japan.
A small, agile dog that copes very well with mountainous terrain and hiking trails, the <a class="eui-u-text-link-external" href="https://en.wikipedia.org/wiki/Shiba_Inu" target="_blank">Shiba Inu</a> was originally bred for hunting.</p>
<p class="eui-u-text-paragraph">It looks similar to and is often mistaken for other Japanese dog breeds like the Akita Inu or Hokkaido, but the Shiba Inu is a different breed with a distinct blood line, temperament, and smaller size than other Japanese dog breeds.</p>`;
    /* eslint-enable */

    public placeholder = 'Compose an epic...';
    public form: FormGroup;

    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor( private fb: FormBuilder,
                 public asService: EuiAppShellService ) {}

    ngOnInit(): void {
        // Get screen dimmer state and assign to isEditActive
        this.asService.state$.subscribe((state) => {
            this.isEditActive = state.isDimmerActive;
        });
        this.buildForm();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    public onCardTitleLinkClicked(event: Event): void {
        alert('Title clicked !');
        if (event) {
            event.preventDefault();
            event.stopPropagation();
            event.cancelBubble = true;
        }
    }

    public onToggleEdit(): void {
        this.isEditActive = !this.isEditActive;
        this.asService.dimmerActiveToggle();
    }

    // Form validators inits/reset
    public buildForm() {
        this.form = this.fb.group({
            htmlContent: [this.htmlContent],
        });
    }

    public isFormValid(): boolean {
        markFormGroupTouched(this.form.controls);
        if (this.form.valid) {
            // Add customs checks here...
            return true;
        }
        return false;
    }
}
