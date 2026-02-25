# showcase templates   templates   mywp templates   notifications   settings

```html
<!-- This page acts as the main router for navigation -->
<eui-page>
    <eui-page-breadcrumb>
        <eui-breadcrumb>
            <eui-breadcrumb-item id="0" link="/" iconSvgName="eui-home" ariaLabel="Home"></eui-breadcrumb-item>
            <eui-breadcrumb-item id="1" label="Templates - MyWorkplace" link="/templates"></eui-breadcrumb-item>
            <eui-breadcrumb-item id="2" label="Notifications settings"></eui-breadcrumb-item>
        </eui-breadcrumb>
    </eui-page-breadcrumb>

    <eui-page-header label="Notifications settings">

        <eui-page-header-action-items>
            <button euiButton euiPrimary (click)="onNotificationsListClick()">
                <eui-icon-svg icon="list-bullets:regular" class="eui-u-mr-s"></eui-icon-svg>
                Notifications list
            </button>
        </eui-page-header-action-items>

        <eui-page-header-body class="eui-u-mt-m">
            <eui-tabs [activeTabIndex]="(uiStateService.state$ | async).activeTabIndex" (tabActivate)="onTabActivate($event)">
                @for (tab of tabsMenu; track $index) {
                    <eui-tab [euiVariant]="tab.tabId === 99 ? 'danger' : 'secondary'">
                        <eui-tab-header>
                            <eui-tab-header-left-content>
                                <eui-icon-svg icon="{{ tab.tabIcon }}" fillColor="{{ tab.tabIconClass }}"></eui-icon-svg>
                            </eui-tab-header-left-content>
                            <eui-tab-header-label>
                                {{ tab.tabLabel }}
                            </eui-tab-header-label>
                        </eui-tab-header>
                        <eui-tab-body hasNoContentPadding></eui-tab-body>
                    </eui-tab>
                }
            </eui-tabs>
        </eui-page-header-body>
    </eui-page-header>

    <eui-page-content>
        <router-outlet></router-outlet>
    </eui-page-content>

</eui-page>
```
