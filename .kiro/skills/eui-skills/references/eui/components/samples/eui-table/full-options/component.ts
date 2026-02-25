import { Component, OnInit, ViewChild } from '@angular/core';
import { delay } from 'rxjs';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { DecimalPipe } from '@angular/common';

import { EUI_TABLE, EuiTableComponent, Sort } from '@eui/components/eui-table';
import { EUI_ALERT } from '@eui/components/eui-alert';
import { EuiTemplateDirective, EuiTooltipDirective } from '@eui/components/directives';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_BUTTON } from '@eui/components/eui-button';

import { EuiTableService } from '../../services/eui-table.service';
import { Country } from '../../models/eui-countries-response.model';

@Component({
    selector: 'full-options',
    templateUrl: 'component.html',
    imports: [...EUI_TABLE, ...EUI_ALERT, DragDropModule, EuiTemplateDirective, EuiTooltipDirective, DecimalPipe, ...EUI_ICON, ...EUI_BADGE, ...EUI_BUTTON],
    providers: [EuiTableService],
})
export class FullOptionsComponent implements OnInit {
    public data: Country[];
    public dataLength: number;
    public virtualScrollNbRows = 50;
    public totalPopulation = 0;
    public cols = [
        { prop: 'id', label: 'Id' },
        { prop: 'country', label: 'Country' },
        { prop: 'year', label: 'Year' },
        { prop: 'iso', label: 'Iso' },
        { prop: 'population', label: 'Population' },
        { prop: 'capital', label: 'Capital' },
        { prop: 'coordinates', label: 'Coordinates' },
        { prop: 'cities', label: 'Cities' },
    ];
    private searchFilter = null;
    private sorts: Sort[] = null;

    @ViewChild('euiTable') euiTable: EuiTableComponent;

    constructor(private euiTableService: EuiTableService) {}

    ngOnInit(): void {
        this.euiTableService.lazyDuplicateEntries(1000, { start: 0, end: this.virtualScrollNbRows }, this.searchFilter, this.sorts).subscribe((data) => {
            this.data = data.data;
            this.dataLength = data.length;
        });
    }

    onScrollChange(e: { start: number, end: number }): void {
        console.log('+++++++++++++++++++++++++++++++++++++++++++++BACKEND CALL', e.start, e.end)
        this.euiTableService.lazyDuplicateEntries(1000, { start: e.start, end: this.virtualScrollNbRows }, this.searchFilter, this.sorts).pipe(delay(2000)).subscribe((data) => {
            this.data = data.data;
            this.dataLength = data.length;
        });
    }

    onDrop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.cols, event.previousIndex + 2, event.currentIndex + 2);
    }

    onDropRow(event: CdkDragDrop<Country[], Country[], Country>): void {
        this.euiTable.moveItem(event.item.data.id, event.previousIndex, event.currentIndex);
    }

    onFilterChange(e: string): void {
        this.searchFilter = e;
        console.log('+++++++++++++++++++++++++++++++++++++++++++++BACKEND CALL', 0, this.virtualScrollNbRows)
        this.euiTableService.lazyDuplicateEntries(1000, { start: 0, end: this.virtualScrollNbRows }, this.searchFilter, this.sorts).subscribe((data) => {
            console.log(data)
            this.data = data.data;
            this.dataLength = data.length;
        });
    }

    public onSortChange(e: Sort[]) {
        console.log(e);
        this.sorts = e;
        console.log('+++++++++++++++++++++++++++++++++++++++++++++BACKEND CALL', 0, this.virtualScrollNbRows)
        this.euiTableService.lazyDuplicateEntries(1000, { start: 0, end: this.virtualScrollNbRows }, this.searchFilter, this.sorts).subscribe((data) => {
            console.log(data)
            this.data = data.data;
            this.dataLength = data.length;
        });
    }

}
