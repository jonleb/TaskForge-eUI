# showcase templates   view states   routes edit state   item2

```html
<form [formGroup]="form">
    <div euiInputGroup>
        <label euiLabel [euiRequired]="isEditActive">Document date</label>
        <eui-datepicker isClearable formControlName="dateValue" [isReadOnly]="!(uiStateService.state$ | async).isEditActive"></eui-datepicker>
        <eui-feedback-message euiDanger *ngIf="render('dateValue')">This field is required</eui-feedback-message>
    </div>

    <div euiInputGroup>
        <label euiLabel>Editable content</label>
        <textarea euiTextArea formControlName="textareaValue" rows="5" [euiMaxlength]="4000" placeholder="Enter any extra information here" [readonly]="!(uiStateService.state$ | async).isEditActive"></textarea>
    </div>
</form>
```
