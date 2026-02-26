import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { authGuard, roleGuard } from './core/auth';

export const routes: Routes = [
    { path: 'login', loadChildren: () => import('./features/login/login.routes').then(m => m.LOGIN_ROUTES) },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'screen/home', pathMatch: 'full' },
            { path: 'index.jsp', redirectTo: 'screen/home' },
            { path: 'screen/home', loadChildren: () => import('./features/home/home.routes').then(m => m.HOME_ROUTES) },
            { path: 'screen/module1', loadChildren: () => import('./features/module1/module1.routes').then(m => m.MODULE1_ROUTES) },
            { path: 'screen/module2', loadChildren: () => import('./features/module2/module2.routes').then(m => m.MODULE2_ROUTES) },
            { path: 'screen/projects', loadChildren: () => import('./features/projects/projects.routes').then(m => m.PROJECTS_ROUTES) },
            {
                path: 'screen/admin/users',
                loadChildren: () => import('./features/admin/users/users.routes').then(m => m.USERS_ROUTES),
                data: { roles: ['SUPER_ADMIN'] },
                canActivate: [authGuard, roleGuard],
            },
        ],
    },
];
