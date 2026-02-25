# showcase templates   templates   mywp templates   tasks centre   task details   :id   item1

```html
<eui-fieldset label="Select action" [isLarge]="true">
    <form [formGroup]="formValidation">

        <div class="eui-u-flex eui-u-mb-s">
            <input  euiInputRadio
                    id="choice-1"
                    type="radio"
                    name="radioForm"
                    value="confirm"
                    formControlName="radioForm"
                    (click)="getFormAction('Confirm final report completeness')" />
            <label euiLabel for="choice-1">Confirm final report completeness</label>
        </div>

        <div class="eui-u-flex eui-u-mb-s">
            <input  euiInputRadio
                    id="choice-2"
                    type="radio"
                    name="radioForm"
                    value="new"
                    formControlName="radioForm"
                    (click)="getFormAction('Request a new report')" />
            <label euiLabel for="choice-2">Request a new report</label>
        </div>

        <div class="eui-u-flex eui-u-mb-s">
            <input  euiInputRadio
                    id="choice-3"
                    type="radio"
                    name="radioForm"
                    value="newna"
                    formControlName="radioForm"
                    (click)="getFormAction('Request a new NA validation')" />
            <label euiLabel for="choice-3">Request a new NA validation</label>
        </div>

        <div class="eui-u-flex eui-u-mb-s">
            <input  euiInputRadio
                    id="choice-4"
                    type="radio"
                    name="radioForm"
                    value="complete"
                    formControlName="radioForm"
                    (click)="getFormAction('Complete the final beneficiary report (approve the assessment and the NA validation)')" />
            <label euiLabel for="choice-4">Complete the final beneficiary report (approve the assessment and the NA validation)</label>
        </div>

        <div class="eui-u-flex eui-u-mb-s">
            <input  euiInputRadio
                    id="choice-5"
                    type="radio"
                    name="radioForm"
                    value="cancel"
                    formControlName="radioForm"
                    (click)="getFormAction('Cancel processing (report submitted by mistake)')" />
            <label euiLabel for="choice-5">Cancel processing (report submitted by mistake)</label>
        </div>

        <div class="eui-u-flex eui-u-mb-s">
            <input  euiInputRadio
                    id="choice-6"
                    type="radio"
                    name="radioForm"
                    value="cancel"
                    formControlName="radioForm"
                    (click)="getFormAction('The documentation related to the Enabling Condition submitted is complete - process with the decision adoption.')" />
            <label euiLabel for="choice-6">The documentation related to the Enabling Condition submitted is complete - process with the decision adoption.</label>
        </div>

    </form>
</eui-fieldset>

<eui-fieldset label="Filters" [isLarge]="true" class="eui-u-mt-l">
    <div class="eui-u-flex eui-u-flex-justify-between">
        <div class="eui-u-display-flex eui-u-flex-justify-content-start">
            <eui-autocomplete [autocompleteData]="autocompleteData" [placeholder]="'Search for a document (at least 3 characters)'"></eui-autocomplete>
        </div>
        <div class="eui-u-ml-auto">
            <div euiInputGroup class="eui-u-mb-none">
                <div euiInputGroupAddOn>
                    <select euiSelect
                        id="sortInput"
                        name="sortInput"
                        placeholder="Sort by...">
                        @for (option of sortingOptions; track $index) {
                            <option [ngValue]="option.id">
                                {{ option.value }}
                            </option>
                        }
                    </select>
                    <button euiButton euiIconButton euiPrimary euiOutline (click)="changeSortingDirection()" [euiTooltip]="orderTooltipText">
                        <eui-icon-svg [icon]="isDescending ? 'eui-arrow-down': 'eui-arrow-up'" aria-label="Sort icon"></eui-icon-svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</eui-fieldset>

<br />

<eui-card euiCollapsible euiCollapsed="true" [euiHighlighted]="(uiStateService.state$ | async).isEditActive">
    <eui-card-header>
        <eui-card-header-title>
            Overview
        </eui-card-header-title>
    </eui-card-header>
    <eui-card-content>
        <pre class="eui-u-text-pre"><small>data: {{ (uiStateService.state$ | async) | json }}</small></pre>
    </eui-card-content>
</eui-card>
```
