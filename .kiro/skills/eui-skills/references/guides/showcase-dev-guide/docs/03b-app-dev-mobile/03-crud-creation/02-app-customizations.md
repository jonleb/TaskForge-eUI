# App development - eUI mobile - App customizations

...coming soon

<b class="eui-u-color-success">Code commit for this page</b>

<a target="_blank" href="https://citnet.tech.ec.europa.eu/CITnet/stash/projects/CSDR/repos/app-eui-mobile-default/commits/9938b149e976d988b3343b6b84446ce4293578f4">eUI mobile app default - app customizations</a>

---

## index.html : setting a app title name

Let's first update the title of the main index.html to our app name :

```html
 ...
<head>
   ...
   <title>My eUI mobile app</title>
   ...
</head>
...
```


## euim-app : main app shell container

In eUI by default, the layout of your app is handled by the **euim-app** component.

By default here what's it provided as example in **/src/app/app.component.html** :

```html
<euim-app>
    <euim-app-sidebar>
        <euim-app-sidebar-header>
            <euim-user-profile>
                <euim-user-profile-avatar>
                    <euim-avatar-icon color="info" size="l" fill="solid">
                        <ion-icon icon="person"></ion-icon>
                    </euim-avatar-icon>
                </euim-user-profile-avatar>
                <euim-user-profile-infos >
                    <euim-user-profile-infos-item>
                        <p euimLabel euimLabelTitle>{{userInfos?.fullName}}</p>
                    </euim-user-profile-infos-item>
                </euim-user-profile-infos>
                <euim-user-profile-action>
                    <ion-button fill="clear">
                        <ion-icon name="settings-sharp" ></ion-icon>
                    </ion-button>
                </euim-user-profile-action>
            </euim-user-profile>
        </euim-app-sidebar-header>

        <euim-app-sidebar-menu [items]="sidebarItems"></euim-app-sidebar-menu>
    </euim-app-sidebar>
</euim-app>
```

Rendering the default sidebar menu : 

![sidebar-menu](assets/docs/images/03b-app-dev-mobile/03-crud-creation/sidebar-menu.png)

### Customize the sidebar menu entries

For our app, we'll need a **Home** page, to orient the user to underlying parts of our app and a **User management** screen for accessing our sample CRUD application page, managing users...

By default the sidebarItems are declared statically within **/src/app/app.component.ts** :
(we'll see in a future chapter how to deal with dynamic sidebar entries)

```javascript
...
    sidebarItems = [
        { label: 'Home', url: 'screen/home' },
        { label: 'Module 1', url: 'screen/module1', children: [
            { label: 'page 1', url: 'screen/module1/page1' },
            { label: 'page 2', url: 'screen/module1/page2' },
        ] },
        { label: 'Module 2', url: 'screen/module2' },
    ];
...
```

Let's update it to : 

```javascript
...
    sidebarItems = [
        { label: 'Home', url: 'screen/home', icon: 'home' },
        { label: 'User management', url: 'screen/user-management', icon: 'people' },
    ];
...
```

On reload, this will be rendered : 

![sidebar-menu-updated](assets/docs/images/03b-app-dev-mobile/03-crud-creation/sidebar-menu-updated.png)
