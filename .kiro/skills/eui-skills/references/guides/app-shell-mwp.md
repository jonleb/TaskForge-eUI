# app shell mwp

```html
<!-- <eui-app>
    <eui-app-toolbar>
        <eui-toolbar>
            <eui-toolbar-logo></eui-toolbar-logo>
            <eui-toolbar-app appName="appName"></eui-toolbar-app>
            <eui-toolbar-environment>MOCK</eui-toolbar-environment>
            <eui-toolbar-center>
                <eui-toolbar-selector label="Selector label" iconSvgName="eui-stack" (selectorClick)="onSelectorClick()"></eui-toolbar-selector>
            </eui-toolbar-center>
            <eui-toolbar-items>
                <eui-toolbar-item>
                    <eui-toolbar-search isInputText hasSearchButton placeholderLabel="Search" (searchClick)="onSearchClick($event)"></eui-toolbar-search>
                </eui-toolbar-item>
                <eui-toolbar-item>
                    <eui-icon-button icon="eui-state-info"></eui-icon-button>
                </eui-toolbar-item>
                <eui-toolbar-item>
                    <eui-icon-button icon="eui-email">
                        <eui-badge euiDanger></eui-badge>
                    </eui-icon-button>
                </eui-toolbar-item>
                <eui-toolbar-item>
                    <eui-notifications [count]="notificationItems?.length" [items]="notificationItems"></eui-notifications>
                </eui-toolbar-item>
                <eui-toolbar-item>
                    <eui-user-profile isShowAvatarInitials [isShowUserInfos]="false" euiStatusSuccess>
                        <eui-user-profile-menu>
                            <eui-user-profile-menu-item>
                                <eui-icon-svg icon="eui-user"></eui-icon-svg>
                                View profile information
                            </eui-user-profile-menu-item>
                            <eui-user-profile-menu-item>
                                <eui-icon-svg icon="eui-sign-out"></eui-icon-svg>
                                Sign out
                            </eui-user-profile-menu-item>
                        </eui-user-profile-menu>
                    </eui-user-profile>
                </eui-toolbar-item>
            </eui-toolbar-items>
            <eui-language-selector></eui-language-selector>
        </eui-toolbar>
    </eui-app-toolbar>
    <eui-app-sidebar>
        <eui-app-sidebar-body>
            <eui-app-sidebar-menu [items]="sidebarItems"></eui-app-sidebar-menu>
        </eui-app-sidebar-body>
    </eui-app-sidebar>
</eui-app> -->
<eui-app>
    <eui-app-header>
        <eui-header>
            <eui-header-logo/>
            <eui-header-app appName="App name"
                            appSubTitle="App sub-title">
            </eui-header-app>
            <eui-header-user-profile/>
            <eui-language-selector/>
            <eui-header-search (searchClick)="onSearchClick($event)"></eui-header-search>            
       </eui-header>
    </eui-app-header>    
    <eui-app-toolbar>
        <eui-toolbar>
            <eui-toolbar-mega-menu [items]="menuItems"/>
        </eui-toolbar>
    </eui-app-toolbar>
    <eui-app-breadcrumb>
        <div class="eui-u-flex">
            <eui-breadcrumb class="eui-u-width-100">
                <eui-breadcrumb-item link="/home" label="Home"/>
            </eui-breadcrumb>
            <div class="eui-u-d-flex eui-u-mt-s eui-u-mr-s">
                <button euiButton euiSizeS>
                    <eui-icon-svg icon="eui-chevron-left"/>
                </button>        
                <button euiButton euiSizeS>
                    <eui-icon-svg icon="eui-chevron-right"/>
                </button>        
            </div>
        </div>
    </eui-app-breadcrumb>
</eui-app>
```
