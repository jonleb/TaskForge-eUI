import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * A Group Control Validator that checks if a threshold of checked control checkboxes is reached and
 * returns an error otherwise clear existing control errors.
 *
 * @param minRequired
 */
export const requireCheckboxesToBeCheckedValidator = (minRequired = 1): ValidatorFn => (formGroup: FormGroup): ValidationErrors | null => {
    // indicate how many checkboxes are checked
    let checked = 0;
    // find how many checkboxes are checked
    Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.controls[key];
        if (control.value === true) {
            checked++;
        }
    });
    // if number of checked checkboxes is less than required, return error
    if (checked < minRequired) {
        // invalid all children
        Object.keys(formGroup.controls).forEach(key => {
            formGroup.controls[key].setErrors({ incorrect: true }, { emitEvent: true });
        });
        return { requireCheckboxesToBeChecked: true };
    } else {
        // Clear the errors
        // Object.keys(formGroup.controls).forEach(key => {
        //     const control = formGroup.controls[key];
        //     // filter out the requireCheckboxesToBeChecked error
        //     const { requireCheckboxesToBeChecked: _, ...errors } = control.errors || {};
        //     control.setErrors(Object.keys(errors).length > 0 ? errors: null, { emitEvent: true });
        // });
        Object.keys(formGroup.controls).forEach(key => {
            // Clear the errors
            formGroup.controls[key].setErrors(null, { emitEvent: true });
        });
    }
    return null;
};
