import { Routes } from '@angular/router';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ProjectShellComponent } from './project-shell/project-shell.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MembersComponent } from './members/members.component';
import { BacklogComponent } from './backlog/backlog.component';

export const PROJECTS_ROUTES: Routes = [
    { path: '', component: PortfolioComponent },
    {
        path: ':projectId',
        component: ProjectShellComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'members', component: MembersComponent },
            { path: 'backlog', component: BacklogComponent },
            { path: 'backlog/:ticketNumber', loadComponent: () => import('./ticket-detail/ticket-detail.component').then(m => m.TicketDetailComponent) },
            { path: 'settings', loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent) },
        ],
    },
];
