import { Routes } from '@angular/router';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ProjectShellComponent } from './project-shell/project-shell.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MembersComponent } from './members/members.component';

export const PROJECTS_ROUTES: Routes = [
    { path: '', component: PortfolioComponent },
    {
        path: ':projectId',
        component: ProjectShellComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'members', component: MembersComponent },
        ],
    },
];
