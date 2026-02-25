# App development - Step 2 - Basic concepts

## App shell - eUI app customization

In order to facilate the creation of your app-shell using the eui-app components and related, an all shell generator is available for that purpose.

On the eUI Showcase, go to the *APP SHELL* section,  

And click on the *Open generator* button

![app-generator-1](assets/docs/03-app-dev/04-customization/app-shell-generator-1.png)

You can select your eui-app options and see the code related to the shell displayed in the content of the page :

![app-generator-1](assets/docs/03-app-dev/04-customization/app-shell-generator-2.png)

There you can test as well the supported breakpoints from desktop to mobile.



## eui-app : main app shell container

In eUI by default, the layout of your app is handled by the **eui-app** component.

By default here what's it provided as example in **/src/app/app.component.html** :

```html
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
```

### Customize the app toolbar

Let's customize to get rid of some parts of it :  

- added the **userSubInfos**, containing the org. entity of the user
- deleted the **eui-toolbar-environment** entry
- deleted the **eui-toolbar-item-notifications** entry
- set the **appName** to "myApp"

```html
<eui-app [userInfos]="userInfos?.fullName" [userSubInfos]="userInfos?.organisationRef?.abbreviation" isSidebarOpen=true>
    <eui-toolbar>
        <eui-toolbar-logo></eui-toolbar-logo>
        <eui-toolbar-app appName="myApp"></eui-toolbar-app>
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
        </eui-toolbar-items>
    </eui-toolbar>
    <eui-app-sidebar>
        <eui-app-sidebar-body>
            <eui-app-sidebar-menu [items]="sidebarItems"></eui-app-sidebar-menu>
        </eui-app-sidebar-body>
    </eui-app-sidebar>
</eui-app>
```

On reload, this will be rendered : 

![app-custom-1](assets/docs/images/03-app-dev/03-crud-creation/app-custom-1.png)
