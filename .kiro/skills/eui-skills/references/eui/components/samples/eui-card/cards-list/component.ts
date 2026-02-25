import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { EuiAppShellService, EuiGrowlService } from '@eui/core';
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_SELECT } from '@eui/components/eui-select';
import { EuiTooltipDirective } from '@eui/components/directives';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_LIST } from '@eui/components/eui-list';
import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EUI_BUTTON_GROUP } from '@eui/components/eui-button-group';
import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';
import { EUI_ALERT } from '@eui/components/eui-alert';

import { CardListItemComponent } from './card-list-item/component';
import { TasksDataService } from './service/cards-list.service';

@Component({
    // eslint-disable-next-line
    selector: 'cards-list',
    templateUrl: 'component.html',
    imports: [
        CardListItemComponent,
        FormsModule,
        RouterModule,
        ...EUI_ALERT,
        ...EUI_CARD,
        ...EUI_INPUT_GROUP,
        ...EUI_SELECT,
        EuiTooltipDirective,
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_LABEL,
        ...EUI_CHIP,
        ...EUI_LIST,
        ...EUI_INPUT_CHECKBOX,
        ...EUI_BUTTON_GROUP,
        ...EUI_DROPDOWN,
        ...EUI_SLIDE_TOGGLE,
    ],
    providers: [
        TasksDataService,
    ]
})
export class CardsListComponent implements OnInit, OnDestroy {
    public isCollapsible = true;
    public isCollapsed = true;
    public isSelected = false;
    public displayGrid = false;
    public hasBottomExpander = true;

    public payload: any;
    public id: string;

    public sortingOptions: any[] = [
        { id: 'createDate', value: 'Creation date' },
        { id: 'businessTaskData.EXERCISE_ID', value: 'Exercide Id' },
        { id: 'taskState', value: 'Task status' },
        { id: 'localizedTitle', value: 'Task title' },
        { id: 'taskId', value: 'Task Id' },
    ];
    public isDescending = true;
    public orderTooltipText = 'Descending sort order';
    public sortProp: string;

    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        public asService: EuiAppShellService,
        public dataService: TasksDataService,
        public growlService: EuiGrowlService,
    ) {}

    ngOnInit(): void {
        this.id = '_' + Math.random().toString(36).substr(2, 9);

        // Get data Payload from Service
        this.dataService
            .getData(0)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (response: any) => {
                    this.payload = response.data;
                },
                error: (error) => {
                    this.growlService.growl({
                        severity: 'danger',
                        summary: 'ERROR',
                        detail: 'Could not get users list : ' + error,
                    });
                },
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    public onToggleDisplayMode() {
        this.displayGrid = !this.displayGrid;
    }

    public onChangeSortOrder(e: any) {
        this.sortProp = e.target.value;
        this.payload = this.orderRows(
            this.sortProp,
            this.isDescending ? 'desc' : 'asc',
            this.payload,
        );
    }

    public changeSortingDirection() {
        this.isDescending = !this.isDescending;
        this.orderTooltipText = this.isDescending
            ? 'Descending sort order'
            : 'Ascending sort order';
        if (this.sortProp) {
            this.payload = this.orderRows(
                this.sortProp,
                this.isDescending ? 'desc' : 'asc',
                this.payload,
            );
        } else {
            this.growlService.growl({
                severity: 'warning',
                summary: 'Attention!',
                detail: 'Please select a sort criteria first.',
            });
        }
    }

    public onChangeExpander(e: boolean): void {
        this.hasBottomExpander = !this.hasBottomExpander;
    }

    private orderRows(prop: string, order: string, r: any[]): any[] {
        let rows: any[] = null;
        if (!order) {
            rows = r;
        } else {
            if (order === 'desc') {
                rows = r.sort((a: any, b: any) => {
                    const aSortOn =
                        typeof this.getObjProp(a, prop) === 'string'
                            ? this.getObjProp(a, prop).toLowerCase()
                            : this.getObjProp(a, prop);
                    const bSortOn =
                        typeof this.getObjProp(b, prop) === 'string'
                            ? this.getObjProp(b, prop).toLowerCase()
                            : this.getObjProp(b, prop);

                    if (!aSortOn && bSortOn) {
                        return 1;
                    }
                    if (aSortOn && !bSortOn) {
                        return -1;
                    }
                    if (!aSortOn && !bSortOn) {
                        return 0;
                    }
                    if (aSortOn < bSortOn) {
                        return 1;
                    }
                    if (aSortOn > bSortOn) {
                        return -1;
                    }
                    return 0;
                });
            } else {
                rows = r.sort((a: any, b: any) => {
                    const aSortOn =
                        typeof this.getObjProp(a, prop) === 'string'
                            ? this.getObjProp(a, prop).toLowerCase()
                            : this.getObjProp(a, prop);
                    const bSortOn =
                        typeof this.getObjProp(b, prop) === 'string'
                            ? this.getObjProp(b, prop).toLowerCase()
                            : this.getObjProp(b, prop);

                    if (!aSortOn && bSortOn) {
                        return -1;
                    }
                    if (aSortOn && !bSortOn) {
                        return 1;
                    }
                    if (!aSortOn && !bSortOn) {
                        return 0;
                    }
                    if (aSortOn > bSortOn) {
                        return 1;
                    }
                    if (aSortOn < bSortOn) {
                        return -1;
                    }
                    return 0;
                });
            }
        }
        return rows;
    }

    private getObjProp(obj: any, prop: string): string {
        return prop
            ? prop
                  .split('.')
                  .reduce(
                      (prev, curr) => (prev ? prev[curr] : null),
                      obj || self,
                  )
            : null;
    }
}
