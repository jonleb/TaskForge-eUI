# app shell standalone   interactive

```html
<eui-app [isSidebarHidden]="shellData?.euiAppSidebarHidden">
    <eui-app-top-message *ngIf="shellData?.euiAppTopMessage"
                         [euiVariant]="shellData?.euiAppTopMessage_variant"
                         [isCloseable]="shellData?.euiAppTopMessage_isCloseable"
                         >
            <div innerHTML="{{shellData?.euiAppTopMessage_content}}"></div>
    </eui-app-top-message>

    <eui-app-header *ngIf="shellData?.euiAppHeader">
        <eui-header>
            <eui-header-logo *ngIf="shellData?.euiHeaderLogo"></eui-header-logo>
            <eui-header-environment *ngIf="shellData?.euiHeaderEnvironment">{{shellData?.euiHeaderEnvironment_value}}</eui-header-environment>
            <eui-header-app *ngIf="shellData?.euiHeaderApp && !shellData?.euiHeaderAppHtml"
                            appName="{{shellData?.euiHeaderApp_appName}}"
                            appSubTitle="{{shellData?.euiHeaderApp_appSubTitle}}">
            </eui-header-app>
            <eui-header-app *ngIf="shellData?.euiHeaderApp && shellData?.euiHeaderAppHtml">
                <eui-header-app-name><div [innerHTML]="shellData?.euiHeaderApp_appNameHtml"></div></eui-header-app-name>
                <eui-header-app-subtitle>{{shellData?.euiHeaderApp_appSubTitle}}</eui-header-app-subtitle>
            </eui-header-app>

            <eui-header-user-profile *ngIf="shellData?.euiHeaderUserProfile">
                <eui-user-profile-menu>
                    <eui-user-profile-menu-item class=" eui-u-p-s"
                        (click)="onProfileMenuItemClick($event, 'My profile information')"
                        (keydown.enter)="onProfileMenuItemClick($event, 'My profile information')">
                        <eui-icon-svg icon="eui-person-thin-o" fillColor="info" class="eui-u-mr-m"></eui-icon-svg>
                        <span euiLabel>My profile information</span>
                    </eui-user-profile-menu-item>
            
                    <eui-user-profile-menu-item class=" eui-u-p-s"
                        (click)="onProfileMenuItemClick($event, 'Sign out')"
                        (keydown.enter)="onProfileMenuItemClick($event, 'Sign out')">
                        <eui-icon-svg icon="eui-sign-out" fillColor="danger" class="eui-u-mr-m"></eui-icon-svg>
                        <span euiLabel>Sign out</span>
                    </eui-user-profile-menu-item>
                </eui-user-profile-menu>
            </eui-header-user-profile>

            <eui-language-selector></eui-language-selector>
        </eui-header>
    </eui-app-header>

    <eui-user-profile isShowAvatarInitials hasMenu isMobileOnly>
        <eui-user-profile-menu>
            <eui-user-profile-menu-item class=" eui-u-p-s"
                (click)="onProfileMenuItemClick($event, 'My profile information')"
                (keydown.enter)="onProfileMenuItemClick($event, 'My profile information')">
                <eui-icon-svg icon="eui-person-thin-o" fillColor="info" class="eui-u-mr-m"></eui-icon-svg>
                <span euiLabel>My profile information</span>
            </eui-user-profile-menu-item>

            <eui-user-profile-menu-item class=" eui-u-p-s"
                (click)="onProfileMenuItemClick($event, 'Sign out')"
                (keydown.enter)="onProfileMenuItemClick($event, 'Sign out')">
                <eui-icon-svg icon="eui-sign-out" fillColor="danger" class="eui-u-mr-m"></eui-icon-svg>
                <span euiLabel>Sign out</span>
            </eui-user-profile-menu-item>
        </eui-user-profile-menu>
    </eui-user-profile>

    <eui-app-toolbar *ngIf="shellData?.euiAppToolbar">
        <eui-toolbar>
            <eui-toolbar-logo *ngIf="shellData?.euiToolbarLogo"></eui-toolbar-logo>

            <eui-toolbar-app *ngIf="shellData?.euiToolbarApp" appName="{{shellData?.euiToolbarApp_appName}}"></eui-toolbar-app>

            <eui-toolbar-mega-menu *ngIf="shellData?.euiToolbarMegaMenu" [items]="menuItems"></eui-toolbar-mega-menu>

            <eui-toolbar-center *ngIf="shellData?.euiToolbarCenterSection">
                <eui-toolbar-search></eui-toolbar-search>
            </eui-toolbar-center>

            <eui-toolbar-items euiPositionRight>
                <eui-toolbar-item *ngIf="!shellData?.euiAppHeader && shellData?.euiToolbarItemUserProfile">
                    <eui-user-profile>
                        <eui-user-profile-menu>
                            <eui-user-profile-menu-item class=" eui-u-p-s"
                                (click)="onProfileMenuItemClick($event, 'My profile information')"
                                (keydown.enter)="onProfileMenuItemClick($event, 'My profile information')">
                                <eui-icon-svg icon="eui-person-thin-o" fillColor="info" class="eui-u-mr-m"></eui-icon-svg>
                                <span euiLabel>My profile information</span>
                            </eui-user-profile-menu-item>

                            <eui-user-profile-menu-item class=" eui-u-p-s"
                                (click)="onProfileMenuItemClick($event, 'Sign out')"
                                (keydown.enter)="onProfileMenuItemClick($event, 'Sign out')">
                                <eui-icon-svg icon="eui-sign-out" fillColor="danger" class="eui-u-mr-m"></eui-icon-svg>
                                <span euiLabel>Sign out</span>
                            </eui-user-profile-menu-item>
                        </eui-user-profile-menu>
                    </eui-user-profile>
                </eui-toolbar-item>

                <eui-toolbar-item *ngIf="shellData?.euiToolbarItemNotifications">
                    <eui-notifications *ngIf="shellData?.euiToolbarItemNotifications_option === 'simple'"
                                       [count]="notificationItemsSimple.length"
                                       [items]="notificationItemsSimple">
                    </eui-notifications>
                    <eui-notifications *ngIf="shellData?.euiToolbarItemNotifications_option === 'metadata'"
                                       [count]="notificationItemsMetadata.length"
                                       [items]="notificationItemsMetadata"
                                       (itemMarkAsReadClick)="eventTrigger('itemMarkAsReadClick', $event)"
                                       (markAllAsReadClick)="eventTrigger('markAllAsReadClick')"
                                       (refreshClick)="eventTrigger('refreshClick')"
                                       (viewAllClick)="eventTrigger('viewAllClick')"
                                       (settingsClick)="eventTrigger('settingsClick')"
                                       (itemClick)="eventTrigger('itemClick', $event)">
                    </eui-notifications>
                </eui-toolbar-item>
           </eui-toolbar-items>

           <eui-language-selector *ngIf="!shellData?.euiAppHeader" isToolbarSelector></eui-language-selector>
        </eui-toolbar>
    </eui-app-toolbar>

    <eui-app-sidebar *ngIf="shellData?.euiAppSidebar">
        <eui-app-sidebar-header *ngIf="shellData?.euiAppSidebarHeader">
            <eui-app-sidebar-header-user-profile *ngIf="shellData?.euiAppSidebarHeaderUserProfile"
                                                 hasProfileDrawer="{{shellData?.euiAppSidebarHeaderUserProfileDrawer}}"
                                                 (toggle)="onSidebarProfileToggle($event)"
                                                 welcomeLabel="{{shellData?.euiAppSidebarHeaderUserProfile_welcomeLabel}}"
                                                 impersonateLabel="{{shellData?.euiAppSidebarHeaderUserProfile_impersonateLabel}}">
            </eui-app-sidebar-header-user-profile>
        </eui-app-sidebar-header>

        <eui-app-sidebar-body *ngIf="shellData?.euiAppSidebarMenu">
            <eui-app-sidebar-menu
                [items]="sidebarItems"
                [hasFilter]="true"
                [hasIcons]="true">
            </eui-app-sidebar-menu>
        </eui-app-sidebar-body>

        <eui-app-sidebar-footer *ngIf="shellData?.euiAppSidebarFooter">
            sidebar footer
        </eui-app-sidebar-footer>

        <eui-app-sidebar-drawer *ngIf="shellData?.euiAppSidebarHeaderUserProfileDrawer" [isExpanded]="showProfileDrawer">
            <p class="eui-u-text-paragraph"><strong>This is the sidebar drawer custom content with inner scroll when content exceeds viewport height.</strong></p>
            <p class="eui-u-text-paragraph">It is usually used for displaying the <strong>user profile</strong> details.</p>

            <button euiButton euiPrimary euiSizeS euiOutline (click)="onSidebarDrawerProfileButtonClick($event)" class="eui-u-mb-m">Test internal profile</button>

            <eui-showcase-doc-lorem-ipsum textSize="medium"></eui-showcase-doc-lorem-ipsum>
        </eui-app-sidebar-drawer>
    </eui-app-sidebar>

    <eui-app-page-wrapper>
        <div class="eui-showcase-demo-flex">
            <div class="code" style="max-height: 90vh;">
                <pre class="eui-u-text-pre">{{ generatedCode }}</pre>

                @if (shellData?.euiToolbarMenu) {
                    <eui-fieldset label="menuItems data sample" isExpandable [isExpanded]="false" iconSvgName="eui-code" class="eui-u-mt-m">
                        <pre class="eui-u-text-pre">{{ menuItems }}</pre>
                    </eui-fieldset>
                }
            </div>
        </div>
    </eui-app-page-wrapper>

    <eui-app-footer *ngIf="shellData?.euiAppFooter">
        <eui-footer [euiPrimary]="shellData?.euiAppFooter_primary">
            footer content - <a>Link</a>
        </eui-footer>
    </eui-app-footer>
</eui-app>
```
