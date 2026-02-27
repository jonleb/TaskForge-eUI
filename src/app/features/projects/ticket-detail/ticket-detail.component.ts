import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Subject, switchMap, combineLatest } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_PROGRESS_BAR } from '@eui/components/eui-progress-bar';
import { EuiIconButtonComponent } from '@eui/components/eui-icon-button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
    ProjectContextService, ProjectService, Project, BacklogItem, ProjectMember,
} from '../../../core/project';

@Component({
    selector: 'app-ticket-detail',
    templateUrl: './ticket-detail.component.html',
    styleUrls: ['./ticket-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...EUI_PAGE, ...EUI_CHIP, ...EUI_BUTTON, ...EUI_PROGRESS_BAR,
        EuiIconButtonComponent, DatePipe, TranslateModule,
    ],
})
export class TicketDetailComponent implements OnInit, OnDestroy {
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly projectContext = inject(ProjectContextService);
    private readonly projectService = inject(ProjectService);
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly translate = inject(TranslateService);
    private readonly destroy$ = new Subject<void>();

    ticket: BacklogItem | null = null;
    project: Project | null = null;
    members: ProjectMember[] = [];
    isLoading = true;
    hasError = false;
    notFound = false;

    ngOnInit(): void {
        combineLatest([
            this.projectContext.currentProject$.pipe(filter((p): p is Project => p !== null)),
            this.route.paramMap,
        ]).pipe(
            takeUntil(this.destroy$),
            switchMap(([project, params]) => {
                this.project = project;
                const ticketNumber = Number(params.get('ticketNumber'));
                this.isLoading = true;
                this.hasError = false;
                this.notFound = false;
                this.cdr.markForCheck();

                this.projectService.getProjectMembers(project.id).pipe(
                    takeUntil(this.destroy$),
                ).subscribe(members => {
                    this.members = members;
                    this.cdr.markForCheck();
                });

                return this.projectService.getTicket(project.id, ticketNumber);
            }),
        ).subscribe({
            next: ticket => {
                this.ticket = ticket;
                this.isLoading = false;
                this.cdr.markForCheck();
            },
            error: (err) => {
                this.isLoading = false;
                if (err?.status === 404) {
                    this.notFound = true;
                } else {
                    this.hasError = true;
                }
                this.cdr.markForCheck();
            },
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    get ticketKey(): string {
        if (!this.project || !this.ticket) return '';
        return `${this.project.key}-${this.ticket.ticket_number}`;
    }

    goBack(): void {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    getAssigneeName(): string {
        const ticket = this.ticket;
        if (!ticket?.assignee_id) return this.translate.instant('ticket-detail.unassigned');
        const member = this.members.find(m => m.userId === ticket.assignee_id);
        return member ? `${member.firstName} ${member.lastName}` : '—';
    }

    getEpicName(): string | null {
        if (!this.ticket?.epic_id) return null;
        return this.ticket.epic_id;
    }

    getCreatorName(): string {
        const ticket = this.ticket;
        if (!ticket) return '';
        const member = this.members.find(m => m.userId === ticket.created_by);
        return member ? `${member.firstName} ${member.lastName}` : ticket.created_by;
    }
}
