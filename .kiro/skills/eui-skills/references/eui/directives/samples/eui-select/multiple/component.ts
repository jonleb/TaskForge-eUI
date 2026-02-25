import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { markFormGroupTouched, EuiAppShellService } from '@eui/core';
import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_LABEL } from '@eui/components/eui-label';

@Component({
    // tslint:disable-next-line
    selector: 'multiple',
    templateUrl: 'component.html',
    imports: [ReactiveFormsModule, ...EUI_LABEL, ...EUI_SELECT, JsonPipe],
    providers: [EuiAppShellService],
})
export class MultipleComponent implements OnInit {

    public form: FormGroup;

    public optionsMulti: {value: string; label: string; selected?: boolean}[] = [
        { value: 'Deinonychus', label: 'Deinonychus' },
        { value: 'Tyrannosaurus', label: 'Tyrannosaurus', selected: true },
        { value: 'Velociraptor', label: 'Velociraptor' },
    ];

    constructor(public asService: EuiAppShellService, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm(): void {
        this.form = this.fb.group({
            dinoMulti: new FormControl(null, [Validators.required]),
            dinoGroup: new FormControl(null, [Validators.required]),
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
