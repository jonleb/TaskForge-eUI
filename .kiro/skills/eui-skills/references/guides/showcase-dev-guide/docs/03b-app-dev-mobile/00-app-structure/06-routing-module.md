# Default application structure

## app-routing.module.ts

The global app routes are defined here, basically referring to feature modules defined in your app. For better performances those feature modules, and this includes the home page (default route when the app starts up), are lazy-loaded, and thus will only be loaded once you'll navigate to their corresponding route. By default, the empty route (root context of your app) is redirected to the home route.

````javascript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
const routes: Routes = [
    { path: '', redirectTo: 'screen/home', pathMatch: 'full' },
    { path: 'index.jsp', redirectTo: 'screen/home' },
    { path: 'screen/home', loadChildren: './features/home/home.module#Module' },
    { path: 'screen/module1', loadChildren: './features/module1/module1.module#Module' },
    { path: 'screen/module2', loadChildren: './features/module2/module2.module#Module' },
];
 
@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
})
export class AppRoutingModule {}
````
