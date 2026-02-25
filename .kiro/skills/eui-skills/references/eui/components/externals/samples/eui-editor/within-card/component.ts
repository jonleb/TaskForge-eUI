import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { EuiAppShellService } from '@eui/core';
import { EuiTooltipDirective } from '@eui/components/directives';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';
import { EuiEditorModule, euiEditorMinLength, euiEditorMaxLength, euiEditorMinWords } from '@eui/components/externals/eui-editor';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // eslint-disable-next-line
    selector: 'within-card',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        EuiEditorModule,
        ...EUI_SLIDE_TOGGLE,
        ...EUI_INPUT_GROUP,
        ...EUI_LABEL,
        EuiTooltipDirective,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_CARD,
        ...EUI_ICON,
        ...EUI_BUTTON,
    ],
    providers: [EuiAppShellService],
})
export class WithinCardComponent implements OnInit, OnDestroy {
    @Input() maxLength = 1000;

    public htmlContent = `
    <p class="eui-u-text-paragraph">This is some <strong>Html </strong><strong style="color: rgb(230, 0, 0);">formatted </strong>content of the rich text editor.</p>
    <p class="eui-u-text-paragraph">It contains Html semantic code with its customized styles such as color attributes.</p>

    <p class="eui-u-text-paragraph"><strong>Paragraphs</strong></p>
    <p class="eui-u-text-paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat nulla malesuada mauris consequat, ut fermentum ante facilisis.
    Vivamus vel porta massa. Nullam fringilla dolor ipsum, at cursus nulla bibendum sit amet.</p>
    <p class="eui-u-text-paragraph">Cras porta, magna at ornare tincidunt, massa augue tincidunt ligula, ut fringilla massa mauris quis dolor. Maecenas porta rutrum
    lorem, vel congue eros vehicula eu. Quisque auctor quam ac mi sodales imperdiet. Sed at nulla metus.</p>

    <p class="eui-u-text-paragraph">Check the code source for more detail.</p>
    `;

    public placeholder = 'Compose an epic...';

    public form: FormGroup;
    public isEditActive = false;
    public cardTitle = 'Title goes here';

    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(public asService: EuiAppShellService) { }

    ngOnInit(): void {
        // Get screen dimmer state and assign to isEditActive
        this.asService.state$.subscribe((state) => {
            this.isEditActive = state.isDimmerActive;
        });
        // Build form
        this.form = new FormGroup({
            htmlContent: new FormControl<string>(this.htmlContent, [
                Validators.required,
                euiEditorMinWords(2),
                euiEditorMinLength(5),
                euiEditorMaxLength(this.maxLength),
            ]),
            htmlContent2: new FormControl<string>(this.htmlContent, [
                Validators.required,
                euiEditorMinWords(2),
                euiEditorMinLength(5),
                euiEditorMaxLength(this.maxLength),
            ]),
            slideControl: new FormControl<boolean>(false, Validators.requiredTrue),
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    public onToggleEdit(): void {
        this.isEditActive = !this.isEditActive;
        this.asService.dimmerActiveToggle();
    }
}
