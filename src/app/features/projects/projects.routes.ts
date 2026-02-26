import { Routes } from '@angular/router';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ProjectShellComponent } from './project-shell/project-shell.component';
import { DashboardPlaceholderComponent } from './dashboard-placeholder/dashboard-placeholder.component';

export const PROJECTS_ROUTES: Routes = [
    { path: '', component: PortfolioComponent },
    {
        path: ':projectId',
        component: ProjectShellComponent,
        children: [
            { path: '', component: DashboardPlaceholderComponent },
        ],
    },
];
