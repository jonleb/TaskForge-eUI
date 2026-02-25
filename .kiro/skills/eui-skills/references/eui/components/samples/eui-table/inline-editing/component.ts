import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';
import { EuiAppShellService, EuiGrowlService } from '@eui/core';
import { EUI_TEXTAREA } from '@eui/components/eui-textarea';
import { EuiEditorModule } from '@eui/components/externals/eui-editor';
import { EUI_TABLE } from '@eui/components/eui-table';
import { EuiTemplateDirective } from "@eui/components/directives";
import { EUI_ICON_BUTTON } from '@eui/components/eui-icon-button';

import { Country } from '../../models/eui-countries-response.model';

@Component({
    // eslint-disable-next-line
    selector: 'inline-editing',
    templateUrl: 'component.html',
    imports: [
        ...EUI_TABLE,
        ...EUI_ICON,
        ReactiveFormsModule,
        ...EUI_INPUT_TEXT,
        ...EUI_SELECT,
        ...EUI_INPUT_NUMBER,
        ...EUI_TEXTAREA,
        ...EUI_ICON_BUTTON,
        EuiEditorModule,
        EuiTemplateDirective,
        DecimalPipe
    ],
})
export class InlineEditingComponent implements OnInit {

    public options: { value: number, label: number }[] = [];
    public form: FormGroup;

    public data: Country[] = [
        { id: 1, country: 'Austria', year: 1995, iso: 'AT', population: 8504850, capital: 'Vienna', comment: 'Comment Austria' },
        { id: 2, country: 'Belgium', year: 1958, iso: 'BE', population: 11198638, capital: 'Brussels', comment: 'Comment Belgium' },
        { id: 3, country: 'Bulgaria', year: 2007, iso: 'BG', population: 7364570, capital: 'Sofia', comment: 'Comment Bulgaria' },
        { id: 4, country: 'Croatia', year: 2013, iso: 'HR', population: 4284889, capital: 'Zagreb', comment: 'Comment Croatia' },
        { id: 5, country: 'Cyprus', year: 2004, iso: 'CY', population: 1117000, capital: 'Nicosia', comment: 'Comment Cyprus' },
        { id: 6, country: 'Czechia', year: 2004, iso: 'CZ', population: 10513209, capital: 'Prague', comment: 'Comment Czechia' },
        { id: 7, country: 'Denmark', year: 1973, iso: 'DK', population: 5655750, capital: 'Copenhagen', comment: 'Comment Denmark' },
        { id: 8, country: 'Estonia', year: 2004, iso: 'EE', population: 1315819, capital: 'Tallinn', comment: 'Comment Estonia' },
        { id: 9, country: 'Finland', year: 1995, iso: 'FI', population: 5470820, capital: 'Helsinki', comment: 'Comment Finland' },
        { id: 10, country: 'France', year: 1958, iso: 'FR', population: 67210000, capital: 'Paris', comment: 'Comment France' },
    ];

    constructor(private growlService: EuiGrowlService, public asService: EuiAppShellService) {}

    ngOnInit(): void {
        const currentYear = new Date().getFullYear();
        for (let year = 1958; year <= currentYear; year++) {
            this.options.push({ value: year, label: year });
        }

        this.form = new FormGroup({});
    }

    public editRow(rowId: number): void {
        this.asService.dimmerActiveToggle();
        const data = this.data.find(d => d.id === rowId);
        this.form.addControl('row-' + rowId, new FormGroup({
            country: new FormControl<string>(data.country, [Validators.required]),
            year: new FormControl<number>(data.year, [Validators.required]),
            iso: new FormControl<string>(data.iso, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
            population: new FormControl<number>(data.population, [Validators.required]),
            capital: new FormControl<string>(data.capital, [Validators.required]),
            comment: new FormControl<string>(data.comment),
        }));
    }

    public saveRow(rowId: number): void {
        this.data = this.data.map((data) => {
            if (data.id === rowId) {
                return {
                    ...data,
                    country: this.form.get('row-' + rowId).get('country').value,
                    year: this.form.get('row-' + rowId).get('year').value,
                    iso: this.form.get('row-' + rowId).get('iso').value,
                    population: this.form.get('row-' + rowId).get('population').value,
                    capital: this.form.get('row-' + rowId).get('capital').value,
                    comment: this.form.get('row-' + rowId).get('comment').value,
                }
            }

            return data;
        });

        this.growlService.growl({ severity: 'success', summary: 'SUBMIT SUCCESS', detail: 'The Form has been successfully submitted.' });
        this.form.removeControl('row-' + rowId);
        this.asService.dimmerActiveToggle();
    }

    public cancelEditRow(rowId: number): void {
        this.form.removeControl('row-' + rowId);
        this.asService.dimmerActiveToggle();
    }
}
