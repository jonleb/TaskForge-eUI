import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { formatDate } from '@angular/common';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { Subject, delay, of, Observable, takeUntil, debounceTime, take } from 'rxjs';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { DEFAULT_FORMATS, EUI_DATEPICKER } from '@eui/components/eui-datepicker';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';
import { EuiGrowlService } from '@eui/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';

@Injectable()
export class EuiAutocompleteService {

    /* tslint:disable */
    public dataSource: any = {
        length: 28,
        data: [
            { id: 1, name: 'Austria', year: 1995, iso: 'AT', population: 8504850, capital: 'Vienna', metadata: { flagColors: ['Red', 'White'], data2: 'bbb' } },
            { id: 2, name: 'Belgium', year: 1958, iso: 'BE', population: 11198638, capital: 'Brussels', metadata: { flagColors: ['Black', 'Yellow', 'Red'], data2: 'bbb' } },
            { id: 3, name: 'Bulgaria', year: 2007, iso: 'BG', population: 7364570, capital: 'Sofia', metadata: { flagColors: ['White', 'Green', 'Red'], data2: 'bbb' } },
            { id: 4, name: 'Croatia', year: 2013, iso: 'HR', population: 4284889, capital: 'Zagreb', metadata: { flagColors: ['Red', 'White', 'Blue'], data2: 'bbb' } },
            { id: 5, name: 'Cyprus', year: 2004, iso: 'CY', population: 1117000, capital: 'Nicosia', metadata: { flagColors: ['Orange', 'Green'], data2: 'bbb' } },
            { id: 6, name: 'Czechia', year: 2004, iso: 'CZ', population: 10513209, capital: 'Prague', metadata: { flagColors: ['White', 'Blue', 'Red'], data2: 'bbb' } },
            { id: 7, name: 'Denmark', year: 1973, iso: 'DK', population: 5655750, capital: 'Copenhagen', metadata: { flagColors: ['Red', 'White'], data2: 'bbb' } },
            { id: 8, name: 'Estonia', year: 2004, iso: 'EE', population: 1315819, capital: 'Tallinn', metadata: { flagColors: ['Blue', 'Black', 'White'], data2: 'bbb' } },
            { id: 9, name: 'Finland', year: 1995, iso: 'FI', population: 5470820, capital: 'Helsinki', metadata: { flagColors: ['Blue', 'White'], data2: 'bbb' } },
            { id: 10, name: 'France', year: 1958, iso: 'FR', population: 67210000, capital: 'Paris', metadata: { flagColors: ['Blue', 'White', 'Red'], data2: 'bbb' } },
            { id: 11, name: 'Germany', year: 1958, iso: 'DE', population: 80716000, capital: 'Berlin', metadata: { flagColors: ['Black', 'Red', 'Yellow'], data2: 'bbb' } },
            { id: 12, name: 'Greece', year: 1981, iso: 'GR', population: 10816286, capital: 'Athens', metadata: { flagColors: ['Blue', 'White'], data2: 'bbb' } },
            { id: 13, name: 'Hungary', year: 2004, iso: 'HU', population: 9877365, capital: 'Budapest', metadata: { flagColors: ['Red', 'White', 'Green'], data2: 'bbb' } },
            { id: 14, name: 'Ireland', year: 1973, iso: 'IE', population: 4609600, capital: 'Dublin', metadata: { flagColors: ['Green', 'White', 'Orange'], data2: 'bbb' } },
            { id: 15, name: 'Italy', year: 1958, iso: 'IT', population: 60782668, capital: 'Rome', metadata: { flagColors: ['Green', 'White', 'Red'], data2: 'bbb' } },
            { id: 16, name: 'Latvia', year: 2004, iso: 'LV', population: 1990300, capital: 'Riga', metadata: { flagColors: ['Red', 'White'], data2: 'bbb' } },
            { id: 17, name: 'Lithuania', year: 2004, iso: 'LT', population: 2944459, capital: 'Vilnius', metadata: { flagColors: ['Yellow', 'Green', 'Red'], data2: 'bbb' } },
            { id: 18, name: 'Luxembourg', year: 1958, iso: 'LU', population: 549680, capital: 'Luxembourg', metadata: { flagColors: ['Red', 'White', 'Blue'], data2: 'bbb' } },
            { id: 19, name: 'Malta', year: 2004, iso: 'MT', population: 446547, capital: 'Valletta', metadata: { flagColors: ['Red', 'White'], data2: 'bbb' } },
            { id: 20, name: 'Netherlands', year: 1958, iso: 'NL', population: 16856620, capital: 'Amsterdam', metadata: { flagColors: ['Red', 'White', 'Blue'], data2: 'bbb' } },
            { id: 21, name: 'Poland', year: 2004, iso: 'PL', population: 38483957, capital: 'Warsaw', metadata: { flagColors: ['Red', 'White'], data2: 'bbb' } },
            { id: 22, name: 'Portugal', year: 1986, iso: 'PT', population: 10427301, capital: 'Lisbon', metadata: { flagColors: ['Green', 'Red', 'Yellow'], data2: 'bbb' } },
            { id: 23, name: 'Romania', year: 2007, iso: 'RO', population: 19942642, capital: 'Bucharest', metadata: { flagColors: ['Blue', 'Yellow', 'Red'], data2: 'bbb' } },
            { id: 24, name: 'Slovakia', year: 2004, iso: 'SK', population: 5415949, capital: 'Bratislava', metadata: { flagColors: ['White', 'Blue', 'Red'], data2: 'bbb' } },
            { id: 25, name: 'Slovenia', year: 2004, iso: 'SI', population: 2061085, capital: 'Ljubljana', metadata: { flagColors: ['White', 'Blue', 'Red'], data2: 'bbb' } },
            { id: 26, name: 'Spain', year: 1986, iso: 'ES', population: 46704314, capital: 'Madrid', metadata: { flagColors: ['Red', 'Yellow'], data2: 'bbb' } },
            { id: 27, name: 'Sweden', year: 1995, iso: 'SE', population: 10004962, capital: 'Stockholm', metadata: { flagColors: ['Blue', 'Yellow'], data2: 'bbb' } },
            { id: 28, name: 'United Kingdom', year: 1973, iso: 'GB', population: 64100000, capital: 'London', metadata: { flagColors: ['Red', 'White', 'Blue'], data2: 'bbb' } },
        ]
    };
    /* tslint:enable */

    public getSearchResult(searchStr: string): Observable<{ length: number, data: any[] }> {
        const data = this.dataSource.data.filter((results: any) => {
            return results.name.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1;
        });

        const dataSource = {
            length: data.length,
            data,
        }

        return of(dataSource);
    }
}

@Component({
    // tslint:disable-next-line
    selector: 'search-field',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_INPUT_GROUP,
        ...EUI_INPUT_TEXT,
        ...EUI_INPUT_CHECKBOX,
        ...EUI_SELECT,
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_AUTOCOMPLETE,
        ...EUI_DATEPICKER,
        ...EUI_LABEL,
        ...EUI_DROPDOWN,
    ],
    providers: [EuiAutocompleteService, { provide: MAT_DATE_FORMATS, useValue: DEFAULT_FORMATS }],
})
export class SearchFieldComponent implements OnInit, OnDestroy {
    public searchForm: FormGroup;
    public searchFormValidated: FormGroup;
    public searchFormAsync: FormGroup;
    public searchFormAdvanced: FormGroup;
    public searchFormAdvanced1: FormGroup;
    public itemsDataLoading = false;
    public itemsServiceData: EuiAutoCompleteItem[] = [];

    public selectedDateFrom: Date;
    public selectedDateTo: Date;
    public inputDate = '';

    private selectedDatabase = 'ares';
    private destroy$: Subject<boolean> = new Subject<boolean>();
    private fb: FormBuilder = inject(FormBuilder);
    private cd: ChangeDetectorRef = inject(ChangeDetectorRef);
    private euiAutocompleteService: EuiAutocompleteService = inject(EuiAutocompleteService);
    public growlService: EuiGrowlService = inject(EuiGrowlService);

    ngOnInit(): void {
        this.searchForm = this.fb.group({
            searchField: [null],
        });

        this.searchFormValidated = this.fb.group({
            searchFieldValidated: [{ value: null, disabled: false }],
        });

        this.searchFormAsync = this.fb.group({
            autoComplete: [{ value: null, disabled: false }],
        });

        this.searchFormAsync.get('autoComplete').valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            if (value) {
                this.itemsDataLoading = true;
                this.cd.detectChanges();
                this.euiAutocompleteService.getSearchResult(value.label).pipe(
                    take(1),
                    debounceTime(500),
                    delay(500),
                ).subscribe((searchResults: any) => {
                    this.itemsServiceData = searchResults.data.map((s: any) => ({ id: s.id, label: s.name }));

                    this.itemsDataLoading = false;
                    this.cd.detectChanges();
                });
            }
        });

        this.searchFormAdvanced = this.fb.group({
            checkboxPdf: new FormControl({ value: false, disabled: false }),
            checkboxWord: new FormControl({ value: false, disabled: false }),
            datepickerFrom: [
                { value: new Date(), disabled: false },
                [Validators.required],
            ],
            datepickerTo: [
                { value: null, disabled: false },
                [Validators.required],
            ],
        });

        this.searchFormAdvanced1 = this.fb.group({
            searchAdvancedField:  [{ value: null, disabled: false }],
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    onSelect(value: Event) {
        this.selectedDatabase = value.target['value'];
    }

    public onSearch() {
        this.growlService.growl({ severity: 'info', summary: 'Search',
        detail: `text: ${this.searchForm.get('searchField').value}, database: ${this.selectedDatabase}` });
    }

    public onSearchValidated() {
        if (this.checkSearchStringLength(<FormControl>this.searchFormValidated.get('searchFieldValidated'))) {
            this.growlService.growl({
                severity: 'info', summary: 'Search',
                detail: `text: ${this.searchFormValidated.get('searchFieldValidated').value}, database: ${this.selectedDatabase}`,
            });
        } else {
            this.growlService.growl({
                severity: 'warning', summary: 'Search',
                detail: 'Enter at least 2 characters to search.',
            });
        }
    }

    public onSearchAsync() {
        if (this.searchFormAsync.get('autoComplete').value) {
            this.growlService.growl({
                severity: 'info', summary: 'Search',
                detail: `text: ${this.searchFormAsync.get('autoComplete').value.label}`,
            });
        }
    }

    public onSearchAdvanced() {
        this.growlService.growl({ severity: 'info', summary: 'Search',
        detail: `text: ${this.searchFormAdvanced1.get('searchAdvancedField').value},
            dateFrom: ${formatDate(this.searchFormAdvanced.get('datepickerFrom').value, 'YYYY', 'en-US')},
            dateTo: ${formatDate(this.searchFormAdvanced.get('datepickerTo').value, 'YYYY', 'en-US')},
            checkboxPdf: ${this.searchFormAdvanced.get('checkboxPdf').value},
            checkboxWord: ${this.searchFormAdvanced.get('checkboxWord').value},` });
    }

    public checkSearchStringLength(control: FormControl): boolean {
        if (!control.value || (control.value && control.value.length < 2)) {
            return false;
        } else {
            return true;
        }
    }

    public onDateSelectedFrom(e: Date) {
        this.selectedDateFrom = e;
    }

    public onDateSelectedTo(e: Date) {
        this.selectedDateTo = e;
    }

    public onInputChanged(e: string) {
        this.inputDate = e;
    }

    public applyAdvancedFilter(event: any) {
        this.growlService.growl({ severity: 'info', summary: 'Search',
        detail: `dateFrom: ${formatDate(this.searchFormAdvanced.get('datepickerFrom').value, 'YYYY', 'en-US')},
            dateTo: ${formatDate(this.searchFormAdvanced.get('datepickerTo').value, 'YYYY', 'en-US')},
            checkboxPdf: ${this.searchFormAdvanced.get('checkboxPdf').value},
            checkboxWord: ${this.searchFormAdvanced.get('checkboxWord').value},` });
    }
}
