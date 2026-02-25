# Default application structure

## app.component.html
By default, the generated app provides some options which are not mandatory and just given here as an example on how the sub-content are injected corresponding to their sub layout elements (navBarItems f.e.)

````html
<eui-app [userInfos]="userInfos?.fullName" isSidebarOpen=true>
    <eui-toolbar>
        <eui-toolbar-logo></eui-toolbar-logo>
        <eui-toolbar-app appName="appName"></eui-toolbar-app>
        <eui-toolbar-environment>MOCK</eui-toolbar-environment>
        <eui-toolbar-items euiPositionRight>
            <eui-toolbar-item-user-profile>
                <eui-user-profile-menu>
                    <eui-user-profile-menu-item>
                        <eui-icon iconClass="eui-icon-person-thin"></eui-icon> {{ 'eui.my-profile-informations' | translate }}
                    </eui-user-profile-menu-item>
                    <eui-user-profile-menu-item>
                        <eui-icon iconClass="eui-icon-logout-thin"></eui-icon> {{ 'eui.sign-out' | translate }}
                    </eui-user-profile-menu-item>
                </eui-user-profile-menu>
            </eui-toolbar-item-user-profile>
            <eui-toolbar-item-notifications>
                <eui-notifications [count]="notificationItems?.length" [items]="notificationItems"></eui-notifications>
            </eui-toolbar-item-notifications>
        </eui-toolbar-items>
    </eui-toolbar>
    <eui-app-sidebar>
        <eui-app-sidebar-body>
            <eui-app-sidebar-menu [items]="sidebarItems"></eui-app-sidebar-menu>
        </eui-app-sidebar-body>
    </eui-app-sidebar>
</eui-app>
````

## app.component.ts
Let's decompose it for better understanding. The import part and component declaration

````javascript
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    getUserState,
    UserState,
} from '@eui/core';
import { Observable, Subscription } from 'rxjs';
import { AppStarterService } from './app-starter.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
    userInfos: UserState;
    // Observe state changes
    userState: Observable<UserState>;
    // an array to keep all subscriptions and easily unsubscribe
    subs: Subscription[] = [];

    sidebarItems = [
        { label: 'Home', url: 'screen/home', iconClass: 'eui-icon-home' },
        { label: 'Module 1', url: 'screen/module1', iconClass: 'eui-icon-work' },
        { label: 'Module 2', url: 'screen/module2', iconClass: 'eui-icon-work' },
    ];
    notificationItems = [
        { label: 'Title label 1', subLabel: 'Subtitle label' },
        { label: 'Title label 2', subLabel: 'Subtitle label' },
        { label: 'Title label 3', subLabel: 'Subtitle label' },
        { label: 'Title label 4', subLabel: 'Subtitle label' },
    ];

    constructor(
        private store: Store<any>,
        private appStarterService: AppStarterService,
    ) {
        this.appStarterService.start().subscribe(() => {
            this.userState = <any>this.store.select(getUserState);
            this.subs.push(this.userState.subscribe((user: UserState) => {
                this.userInfos = { ...user };
                console.log(user);
            }));
        });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.subs.forEach((s: Subscription) => s.unsubscribe());
    }
}
````
