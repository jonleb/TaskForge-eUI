import { Component } from '@angular/core';
import { EclSortTableEvent, EUI_ECL_TABLE, SortOrder } from '@eui/ecl/components/ecl-table';

@Component({
    // tslint:disable-next-line
    selector: 'sort',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_TABLE],
})
export class SortComponent {
    dataSource: any[] = [
        {
            defaultOrder: 0,
            jobTitle: 'Policy Officer - Clean Energy For All Europeans',
            approvedBy: 'FG II, FG III, FG IV',
            organization: 'EU-LISA',
            contractType: 'Seconded National Expert (SNE)',
            location: 'Vigo (Spain)'
        },
        {
            defaultOrder: 1,
            jobTitle: 'Corporate Support Officer',
            approvedBy: 'FG IV',
            organization: 'European Commission',
            contractType: 'Permanent official',
            location: 'Prague (Czech Republic)'
        },
        {
            defaultOrder: 2,
            jobTitle: 'Administators in Financial rules appliable to the EU budget',
            approvedBy: 'AD7',
            organization: 'European Commission',
            contractType: 'Permanent official',
            location: 'Brussels (Belgium), Luxembourg (Luxembourg), Strasbourg (France)'
        },
        {
            defaultOrder: 3,
            jobTitle: 'Administators in Economic and Monetary Union Law',
            approvedBy: 'AD7',
            organization: 'European Commission',
            contractType: 'Permanent official',
            location: 'Brussels (Belgium), Luxembourg (Luxembourg), Strasbourg (France)'
        },
        {
            defaultOrder: 4,
            jobTitle: 'Administators in Competition Law',
            approvedBy: 'AD7',
            organization: 'European Commission',
            contractType: 'Permanent official',
            location: 'Brussels (Belgium), Luxembourg (Luxembourg), Strasbourg (France)'
        }
    ];

    onSort(evt: EclSortTableEvent) {
        // Users sort logic
        this.dataSource.sort((rowA, rowB) => {
            const a = rowA[evt.columnId];
            const b = rowB[evt.columnId];

            if (evt.sortOrder == SortOrder.ASCENDING) {
                return (a < b) ? -1 : (a > b ? 1 : 0)
            }
            if (evt.sortOrder == SortOrder.DESCENDING) {
                return (a > b) ? -1 : (a < b ? 1 : 0)
            }
            if (evt.sortOrder == null) {
                const c = rowA['defaultOrder'];
                const d = rowB['defaultOrder'];
                return (c < d) ? -1 : (c > d ? 1 : 0)
            }
        });
    }
}
