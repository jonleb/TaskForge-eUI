# showcase templates   view states   routes edit state   item3

```html
<form [formGroup]="form">
    <div euiInputGroup>
        <label euiLabel [euiRequired]="isEditActive">Document date</label>
        <eui-datepicker isClearable formControlName="dateValue" [isReadOnly]="!(uiStateService.state$ | async).isEditActive"></eui-datepicker>
        <eui-feedback-message euiDanger *ngIf="render('dateValue')">This field is required</eui-feedback-message>
    </div>

    <div euiInputGroup>
        <label euiLabel for="textareaValue">Editable content (euiMaxlength=255)</label>
        <textarea euiTextArea id="textareaValue" formControlName="textareaValue" name="story" rows="3" [euiMaxlength]="255" (maxLengthReached)="onMaxLengthReached($event)" [readonly]="!(uiStateService.state$ | async).isEditActive">
            It was a dark and stormy night...
        </textarea>
        <eui-feedback-message euiDanger *ngIf="isMaxLengthReached">The maximum length of 255 characters has been reached !</eui-feedback-message>
    </div>

    <div euiInputGroup>
        <label euiLabel>Rich text editable content</label>
        <eui-editor formControlName="htmlContent"
                    [placeholder]="placeholder"
                    [isReadOnly]="!(uiStateService.state$ | async).isEditActive"
                    [isMinimalToolbar]="true"
                    format="html">
        </eui-editor>
    </div>
</form>
```
