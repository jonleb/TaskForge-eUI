import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'screen/home', pathMatch: 'full' },
    { path: 'index.jsp', redirectTo: 'screen/home' },
    { path: 'screen/home', loadChildren: () => import('./features/home/home.routes').then(m => m.HOME_ROUTES) },
    { path: 'screen/module1', loadChildren: () => import('./features/module1/module1.routes').then(m => m.MODULE1_ROUTES) },
    { path: 'screen/module2', loadChildren: () => import('./features/module2/module2.routes').then(m => m.MODULE2_ROUTES) },
    { path: 'screen/users', loadChildren: () => import('./features/users/users.routes').then(m => m.USERS_ROUTES) },
    { path: 'screen/table-pagination', loadChildren: () => import('./features/table-pagination/table-pagination.routes').then(m => m.TABLE_PAGINATION_ROUTES) },
];
