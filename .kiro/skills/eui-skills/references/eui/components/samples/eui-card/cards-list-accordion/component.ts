import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { EuiAppShellService, EuiGrowlService } from '@eui/core';
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_ICON } from '@eui/components/eui-icon';

import { CardListItemAccordionComponent } from './card-list-item/component';
import { TasksDataService } from '../cards-list/service/cards-list.service';

@Component({
    // eslint-disable-next-line
    selector: 'cards-list-accordion',
    templateUrl: 'component.html',
    imports: [
        CardListItemAccordionComponent,
        RouterModule,
        ...EUI_CARD,
        ...EUI_CHIP,
        ...EUI_LABEL,
        ...EUI_ICON,
    ],
    providers: [
        TasksDataService
    ]
})
export class CardsListAccordionComponent implements OnInit, OnDestroy {
    public payload: any;
    public id: string;

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
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    public onCollapse(event: boolean, cardItem?: any): void {
        this.payload = this.payload.map((p) =>
            p.taskId === cardItem.taskId
                ? { ...p, collapsed: !p.collapsed }
                : { ...p, collapsed: false },
        );
    }
}
