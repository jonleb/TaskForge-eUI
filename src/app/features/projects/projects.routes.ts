import { Routes } from '@angular/router';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ProjectShellComponent } from './project-shell/project-shell.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MembersComponent } from './members/members.component';
import { BacklogComponent } from './backlog/backlog.component';
import { SprintsComponent } from './sprints/sprints.component';

export const PROJECTS_ROUTES: Routes = [
    { path: '', component: PortfolioComponent },
    {
        path: ':projectId',
        component: ProjectShellComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'members', component: MembersComponent },
            { path: 'backlog', component: BacklogComponent },
            { path: 'sprints', component: SprintsComponent },
            { path: 'sprints/:sprintId', loadComponent: () => import('./sprints/sprint-planning/sprint-planning.component').then(m => m.SprintPlanningComponent) },
            { path: 'tickets/:ticketNumber', loadComponent: () => import('./ticket-detail/ticket-detail.component').then(m => m.TicketDetailComponent) },
            { path: 'board', loadComponent: () => import('./board/board.component').then(m => m.BoardComponent) },
            { path: 'settings', loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent) },
        ],
    },
];
