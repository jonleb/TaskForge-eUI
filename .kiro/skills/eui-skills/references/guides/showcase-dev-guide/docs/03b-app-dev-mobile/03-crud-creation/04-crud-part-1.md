# App development - eUI mobile - CRUD - Part 1

...coming soon

<!-- 
<b class="eui-u-color-success">Code commit for this page</b>

<a target="_blank" href="https://citnet.tech.ec.europa.eu/CITnet/stash/projects/CSDR/repos/app-eui-default/commits/b25e5a3884443872fbe235b23c2385c6585d1199">eUI app default - user management feature module</a>

---

## Update of the default imported sample code from eUI showcase CRUD template

In this chapter, we'll fetch the users list we want to manage and display it in the **user-management.component**

1. STEP 1 : Updating our Express server DB with some user entries

    (see basic concepts chapter for more info about the Express mock server).  

    in the **/mock/db/db.json**, we'll add some users, based on the model as defined in /mock/models/user.js file

    ```javascript
    "users": [
        {
            "id": 1,
            "firstName": "John",
            "lastName": "Lennon",
            "email": "John.Lennon@ec.europa.eu"
        },
        {
            "id": 2,
            "firstName": "Paul",
            "lastName": "McCartney",
            "email": "Paul.McCartney@ec.europa.eu"
        },
        {
            "id": 3,
            "firstName": "George",
            "lastName": "Harrison",
            "email": "George.Harrison@ec.europa.eu"
        },
        {
            "id": 4,
            "firstName": "Ringo",
            "lastName": "Starr",
            "email": "Ringo.Starr@ec.europa.eu"
        }
    ]
    ```
    Once done, mock server restarts, now if you point to http://localhost:3000/api/users, the users list will be displayed :

    ![crud-1-1](assets/docs/images/03-app-dev/03a-eui-default/crud-part1-1.png)

2. STEP 2 - define api config for our users API

    (see basic concepts - config for more details)

    in **/assets/config/env-json-config.json** added the users api entry in the "modules" section :

    ```javascript
    {
        "modules": {
            "core": {
                "base": "/api",
                "userDetails": "/user-details"
            },
            "users": "/api/users"
        }
    }
    ```

3. STEP 3 - update the **/user-management/shared/services/user-service.ts** to the new api location : 

    ```javascript
    ...
    constructor(
        @Inject(CONFIG_TOKEN) protected config: any,
        private http: HttpClient,
    ) {
        console.log(config);
        this.url = `${config.modules.users}`;
    }
    ...
    ```

    here the config.modules.users is accessible through the **CONFIG_TOKEN**, default url for HTTP request will then be used.

    On save, the app is reloaded, pointing to the **User management** link in the sidebar now displays some data : 

    ![crud-1-2](assets/docs/images/03-app-dev/03a-eui-default/crud-part1-2.png)

    As you can see, we also need to adapt the screen to display the user properties on which we're working on, let's see how to update the template view :

4. STEP 4 - update the **/user-management/components/list/list.component**

    First let's update the **User** interface located in **/shared/models/user.model.ts** to make it correspond to the model of fetched users : 

    ```javascript
    ...
    export interface User {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    }
    ...
    ```

    Next, let's update the template to match the User model properties to be displayed in the table : 

    ```html
    ...
    <table euiTable euiTableResponsive [rows]="users" [paginator]="paginator" [filter]="filter">
        <ng-template euiTemplate="header">
            <tr>
                <th>ID</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
        </ng-template>
        <ng-template let-user euiTemplate="body">
            <tr>
                <td>{{ user.id }}</td>
                <td>{{ user.firstName }}</td>
                <td>{{ user.lastName }}</td>
                <td>{{ user.email }}</td>
                <td>
                    <button euiButton euiRounded euiIconButton euiSizeM euiBasicButton euiPrimary (click)="onEditUser(user)"><span euiIcon iconClass="eui-icon eui-icon-create"></span></button>
                    <button euiButton euiRounded euiIconButton euiSizeM euiBasicButton euiDanger (click)="onDeleteUser(user)"><span euiIcon iconClass="eui-icon eui-icon-delete-o"></span></button>
                </td>
            </tr>
        </ng-template>
    </table>
    ...
    ```    

    After saving, all user properties are displayed : 

    ![crud-1-3](assets/docs/images/03-app-dev/03a-eui-default/crud-part1-3.png)

5. STEP 5 - update the page title

    finally we update the page title of the eui-page component, to reflect the User management page we're in : 

    ```html
    <eui-page>
        <eui-page-header label="User management"></eui-page-header>

        <eui-page-content>
        ...
    ```
    ![crud-1-4](assets/docs/images/03-app-dev/03a-eui-default/crud-part1-4.png)


## Detailed flow description

Let's see what's happening through the code : 

1. Initial fetch during **list.component.ts** onInit hook : 

    When the page module is loaded, initial route is rendered, the **ListComponent** is initialized.  
    On the **ngOnInit** function of in the list.component.ts file the **_getUsers()** call is made : 

    ```javascript
        ...
        import { UserService } from '../../shared/services/user.service';
        import { User } from '../../shared/models/user.model';        
        ...
        users: User[] = [];
        ...
        ngOnInit() {
            this._getUsers();
        }
        ...
    ```

    As we'll reuse the _getUsers() function for another call later, we create a private function (by naming convention prefixed with underscore) : 
    
    ```javascript
    private _getUsers() {
        this.userService.getUsers().subscribe(
            (users: Array<User>) => {
                this.users = users;
            },
            error => {
                this.asService.growl({ severity: 'danger', summary: 'ERROR', detail: 'Could not get users list : ' + <any>error });
            },
        );
    }    
    ```
    Once the async call and the subscription returns the expected users array of User, we then assign the result to a **users** variables that will be used for the rendering the view.

    This function is calling the userService.getUsers(), we subscribe to it so the Http request happens : 

2. HTTP GET from the **shared/services/user-service.ts** : 

    ```javascript
    ...
    private url;

    constructor(
        @Inject(CONFIG_TOKEN) protected config: any,
        private http: HttpClient,
    ) {
        console.log(config);
        this.url = `${config.modules.users}`;
    }

    getUsers(): Observable<Array<User>> {
        return this.http.get<User[]>(this.url).pipe(catchError(handleError));
    }
    ...
    ```

3. Rendering the view and the **users** array within the template : 

    Once the users are fetched are available, the view reacts to it and iterate over the users array to display each user row : 

    ```html
    <table euiTable euiTableResponsive [rows]="users" [paginator]="paginator" [filter]="filter">
        <ng-template euiTemplate="header">
            <tr>
                <th>ID</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
        </ng-template>
        <ng-template let-user euiTemplate="body">
            <tr>
                <td>{{ user.id }}</td>
                <td>{{ user.firstName }}</td>
                <td>{{ user.lastName }}</td>
                <td>{{ user.email }}</td>
                <td>
                    <button euiButton euiRounded euiIconButton euiSizeM euiBasicButton euiPrimary (click)="onEditUser(user)"><span euiIcon iconClass="eui-icon eui-icon-create"></span></button>
                    <button euiButton euiRounded euiIconButton euiSizeM euiBasicButton euiDanger (click)="onDeleteUser(user)"><span euiIcon iconClass="eui-icon eui-icon-delete-o"></span></button>
                </td>
            </tr>
        </ng-template>
    </table>
    ``` 

    Here the **euiTable** directive receive as input the **users** rows, then a template binding using the **let-user** is projecting the content of the iterated user through the template. -->
