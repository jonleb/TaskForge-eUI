/* eslint-disable max-len */
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

import { EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_RADIO } from '@eui/components/eui-input-radio';
import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EuiTooltipDirective } from '@eui/components/directives';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'advanced-required',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
        ...EUI_ICON,
        ...EUI_LABEL,
        ...EUI_INPUT_TEXT,
        ...EUI_INPUT_RADIO,
        ...EUI_INPUT_CHECKBOX,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_INPUT_GROUP,
        EuiTooltipDirective,
    ],
})
export class AdvancedRequiredComponent implements OnInit {

    public isEditActive = false;        // Global edit
    public isTextEditActive = false;    // Text Fc edit
    public isNumberEditActive = false;  // Number Fc edit

    // Table rows edit
    public isEditActive1 = false;
    public isEditActive2 = false;
    public isEditActive3 = false;

    public modelTextValue = 'Jane DOE';
    public inputTextValue = 'It was a dark and stormy night';
    public inputNumberValue = 25;
    public priceNumberValue = 0.75;
    public mailTextValue = 'jane.doe@doe.com';
    public largeValue = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin mi velit, ac ornare nunc vehicula in. Pellentesque ultrices vitae eros rhoncus feugiat.
Sed in diam vitae felis posuere tempor eu nec augue. Duis nisl orci, finibus at pharetra at, ullamcorper at metus. Fusce ac neque ex. Nunc malesuada magna et arcu porttitor, tincidunt molestie diam posuere.
Praesent sit amet mi posuere, congue sem eget, iaculis leo. Phasellus fermentum tristique quam. Pellentesque eget lorem elit. Sed aliquet orci sed vestibulum volutpat.`;

    public selectOptions: any[] = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
    ];

    public colorsOptions: any[] = [
        { value: 'blue', label: 'Blue' },
        { value: 'green', label: 'Green' },
        { value: 'lime', label: 'Lime' },
        { value: 'orange', label: 'Orange' },
        { value: 'purple', label: 'Purple' },
        { value: 'red', label: 'Red' },
        { value: 'yellow', label: 'Yellow' },
    ];

    public autocompleteDataFormAutocomplete: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Lemon' },
        { id: 2, label: 'Lime' },
        { id: 3, label: 'Apple' },
        { id: 4, label: 'Orange' },
        { id: 5, label: 'Strawberry' },
        { id: 6, label: 'Peer' },
        { id: 7, label: 'Banana' },
    ];

    public radioOptions: any[] = [
        { value: '1', label: 'Choice 1' },
        { value: '2', label: 'Choice 2' },
        { value: '3', label: 'Choice 3' },
        { value: '4', label: 'Choice 4' },
    ];

    public dataSource: any[] = [
        { id: 1, fruit: { id: 1, label: 'Apple' }, colour: 'red', price: 0.5 },
        { id: 2, fruit: { id: 7, label: 'Banana' }, colour: 'yellow', price: 0.75 },
        { id: 3, fruit: { id: 4, label: 'Orange' }, colour: 'orange', price: 0.8 },
    ];

    public formValidation: FormGroup;
    public tableForm: FormGroup;
    private fb: FormBuilder = inject(FormBuilder);

    ngOnInit(): void {
        this.formValidation = this.fb.group({
            inputValue: [{ value: this.inputTextValue, disabled: false }, [Validators.required]],
            inputValue2: [{ value: this.modelTextValue, disabled: false }, [Validators.required]],
            numberValue: [{ value: this.inputNumberValue, disabled: false }, [Validators.required]],
            textareaValue: [{ value: this.largeValue, disabled: false }, [Validators.required]],
            selectValue: [{ value: 2, disabled: false }, [Validators.required]],
            autoComplete: [{ value: this.autocompleteDataFormAutocomplete[4], disabled: false }, [Validators.required]],
            datePicker: [{ value: new Date('06/08/1987'), disabled: false }, [Validators.required]],
            mailBoxValue: [{ value: this.mailTextValue, disabled: false }, Validators.compose( [Validators.email, Validators.required])],
            checkboxValue: [{ value: false, disabled: false }, [Validators.requiredTrue]],
            radioValue: [{ value: this.radioOptions[1].value, disabled: false }, [Validators.required]],
        });

        this.tableForm = this.fb.group({
            fruitValue1: [{ value: this.autocompleteDataFormAutocomplete[2], disabled: false }],
            colourValue1: [{ value: this.dataSource[0].colour, disabled: false }],
            priceValue1: [{ value: this.dataSource[0].price, disabled: false }],

            fruitValue2: [{ value: this.autocompleteDataFormAutocomplete[6], disabled: false }],
            colourValue2: [{ value: this.dataSource[1].colour, disabled: false }],
            priceValue2: [{ value: this.dataSource[1].price, disabled: false }],

            fruitValue3: [{ value: this.autocompleteDataFormAutocomplete[3], disabled: false }],
            colourValue3: [{ value: this.dataSource[2].colour, disabled: false }],
            priceValue3: [{ value: this.dataSource[2].price, disabled: false }],
        });
    }

    public onToggleEdit() {
        this.isEditActive = !this.isEditActive;
    }

    public onTextToggleEdit() {
        this.isTextEditActive = !this.isTextEditActive;
    }

    public onNumberToggleEdit() {
        this.isNumberEditActive = !this.isNumberEditActive;
    }

    public onCancelEdit() {
        this.formValidation.get('inputValue').reset();
        this.isEditActive = !this.isEditActive;
    }

    public onTextCancelEdit() {
        this.formValidation.get('inputValue').reset();
        this.onTextToggleEdit();
    }

    public onNumberCancelEdit() {
        this.formValidation.get('numberValue').reset();
        this.onNumberToggleEdit();
    }

    // Table rows edit
    public onTableToggleEdit(rowId: Number, colId?: Number) {
        // console.log('onTableToggleEdit() rowId-colId', rowId, colId )
        switch (rowId) {
            case 1:
                switch (colId) {
                    case 1:
                        this.isEditActive1 = true;
                        this.isEditActive2 = false;
                        this.isEditActive3 = false;
                        break;
                    case 2:
                        this.isEditActive1 = false;
                        this.isEditActive2 = true;
                        this.isEditActive3 = false;
                        break;
                    case 3:
                        this.isEditActive1 = false;
                        this.isEditActive2 = false;
                        this.isEditActive3 = true;
                        break;
                    default:
                        // NOP
                }
                break;
            case 2:
                switch (colId) {
                    case 1:
                        this.isEditActive1 = true;
                        this.isEditActive2 = false;
                        this.isEditActive3 = false;
                        break;
                    case 2:
                        this.isEditActive1 = false;
                        this.isEditActive2 = true;
                        this.isEditActive3 = false;
                        break;
                    case 3:
                        this.isEditActive1 = false;
                        this.isEditActive2 = false;
                        this.isEditActive3 = true;
                        break;
                    default:
                        // NOP
                }
                break;
            case 3:
                switch (colId) {
                    case 1:
                        this.isEditActive1 = true;
                        this.isEditActive2 = false;
                        this.isEditActive3 = false;
                        break;
                    case 2:
                        this.isEditActive1 = false;
                        this.isEditActive2 = true;
                        this.isEditActive3 = false;
                        break;
                    case 3:
                        this.isEditActive1 = false;
                        this.isEditActive2 = false;
                        this.isEditActive3 = true;
                        break;
                    default:
                        // NOP
                }
                break;
            default:
                // NOP
        }
    }

    public onTableCancelEdit() {
        this.isEditActive1 = false;
        this.isEditActive2 = false;
        this.isEditActive3 = false;
    }

    public render(controlName: string): boolean {
        return (this.isEditActive || this.isTextEditActive || this.isNumberEditActive) && this.formValidation?.get(controlName).invalid &&
            this.formValidation?.get(controlName).touched &&
            this?.formValidation.get(controlName).hasError('required');
    }

    public checkEmail(controlName: string): boolean {
        return this.isEditActive && this.formValidation?.get(controlName).invalid &&
            this.formValidation?.get(controlName).touched &&
            this?.formValidation.get(controlName).hasError('email');
    }
}
