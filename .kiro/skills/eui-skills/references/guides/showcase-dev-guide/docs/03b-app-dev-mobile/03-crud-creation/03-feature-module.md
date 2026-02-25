# App development - eUI mobile - Feature module

...coming soon

<!-- 
<b class="eui-u-color-success">Code commit for this page</b>

<a target="_blank" href="https://citnet.tech.ec.europa.eu/CITnet/stash/projects/CSDR/repos/app-eui-default/commits/93ddf84db4db1dabab5e4fe6ac1e7b314a6a4cd6">eUI app default - user management feature module</a>

---

## Creating the user management feature module

1. Stop your local server

    As we need to touch the project structure, to avoid file locking issues

2. Delete **module1** and **module2** folders

    Those module folders are just provided as example, we won't need them anymore

3. Copy default eUI showcase pattern for CRUD simple

    In eUI showcase: <a target="_blank" href="https://eui.ecdevops.eu/eui-showcase-ux-10.x/templates/crud-simple">Advanced Templates - CRUD - CRUD Simple showcase page</a>  

    We'll copy the sources located on the **view source** link in CSDR bitbucket

    In the end, our **user-management** folder will look like this :  

     ![app-custom-3](assets/docs/images/03-app-dev/03a-eui-default/app-custom-3.png)

3. Updating application routes

    In order to reference and lazy load our newly created module, we need to update the **app-routing.module.ts** :

    ```javascript
        const routes: Routes = [
            { path: '', redirectTo: 'screen/home', pathMatch: 'full' },
            { path: 'index.jsp', redirectTo: 'screen/home' },
            { path: 'screen/home', loadChildren: './features/home/home.module#Module' },
            { path: 'screen/user-management', loadChildren: './features/user-management/module#Module' },
        ];
    ```
4. Restart : `npm run start`

    Once you click the **User management** link in the sidebar menu, it will correctly load and render the module : 

    ![app-custom-4](assets/docs/images/03-app-dev/03a-eui-default/app-custom-4.png)


5. Loading user-management screen

    Once you click the user-management sidebar link nothing is shown, opening the console we can see the error :

    ![app-custom-5](assets/docs/images/03-app-dev/03a-eui-default/app-custom-5.png)

    We'll fix this error in the next chapter, once fetching the user-list from the current api


## Default feature module structure and files

### user-management/module.ts

By default, a feature module as seen before is lazy loaded, this Angular module is an independent chunk of your app that is loaded at runtime once first its route is called.

A module knows about what it needs to operate: basically eUI modules and its internal components and routing module, this is reflected in the newly created feature root module :

```javascript
// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// module shared
import { UserService } from './shared/services/user.service';
import { SharedModule } from '../../shared/shared.module';

// module components
import { ListComponent } from './components/list/list.component';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [
    { path: '', component: ListComponent },
    { path: 'details/:id', component: DetailsComponent },
    { path: 'details', component: DetailsComponent },
];

@NgModule({
    imports: [
        HttpClientModule,
        SharedModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        ListComponent,
        DetailsComponent,
    ],
    providers: [
        UserService,
    ],
})
export class Module {
}
```

As an example, and as default shared part of your application, we always import **shared.module.ts** from the root features folder, this allows to import at a single place the 3rd party modules your features modules will need to be rendered, here eUI modules, and your own third party libraries for example.  
Centralizing them there avoid code repetition.

The routes constant defined the Angular routes relative to this module that will be triggerd after accessing the /user-management root route: 

By default, the empty ('') route will load the ListComponent, when you'll navigate to /user-management/details, the DetailsComponent will be rendered, here with or without a parameter id corresponding to the user uniqueId we want to display the details for.


### list and details components

Typically a component page, main route of your app will have this html structure, the content living within the eui-page-content component : 

```html
<eui-page>
    <eui-page-header label="User management"></eui-page-header>

    <eui-page-content>
    </eui-page-content>
</eui-page>
```

We'll see more about this in the next chapter about the CRUD creation.

 -->
