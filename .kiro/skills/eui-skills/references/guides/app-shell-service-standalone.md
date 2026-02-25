# app shell service standalone

```html
<eui-app [isSidebarHidden]="isSidebarHidden">
    <eui-app-toolbar>
        <eui-toolbar>
            <eui-toolbar-logo></eui-toolbar-logo>

            <eui-toolbar-app appName="appName"></eui-toolbar-app>

            <eui-toolbar-items euiPositionRight>
                <eui-toolbar-item>
                    <eui-user-profile></eui-user-profile>
                </eui-toolbar-item>
            </eui-toolbar-items>
            <eui-language-selector isToolbarSelector></eui-language-selector>
        </eui-toolbar>
    </eui-app-toolbar>

    <eui-app-sidebar>
        <eui-app-sidebar-body>
            <eui-app-sidebar-menu [items]="sidebarLinks" [hasFilter]="true" [hasIcons]="true"></eui-app-sidebar-menu>
        </eui-app-sidebar-body>
    </eui-app-sidebar>

    <eui-app-page-wrapper>

        <eui-page>
            <eui-page-header label="EuiAppShellService"></eui-page-header>

            <eui-page-content>
                <eui-alert>
                    <eui-alert-title>Usage</eui-alert-title>
                    <pre class="eui-u-mb-none">import &#123; EuiAppShellService &#125; from '&#64;eui/core';</pre>
                </eui-alert>

                <h6 class="eui-u-text-h6 section-title">Responsive breakpoints</h6>
                <p class="eui-u-mt-none">
                    Subscribe to breakpoint$ Observable in order to detect the device viewport. Try to resize your window to see it in action.
                    <br>
                    <em>Please note that due to the iFrame, which limits the viewport size, the displayed breakpoint may not be accurate.</em>
                </p>

                <div class="eui-u-flex eui-u-flex-wrap eui-u-mt-m">
                    <div class="col eui-u-width-10 eui-u-p-xs text-center"
                         [ngClass]="{'eui-u-c-bg-danger eui-u-c-white': (asService.breakpoints$ | async).isMobile}">
                        isMobile
                    </div>
                    <div class="col eui-u-width-10 eui-u-p-xs text-center"
                         [ngClass]="{'eui-u-c-bg-danger eui-u-c-white': (asService.breakpoints$ | async).isTablet}">
                        isTablet
                    </div>
                    <div class="col eui-u-width-10 eui-u-p-xs text-center"
                         [ngClass]="{'eui-u-c-bg-danger eui-u-c-white': (asService.breakpoints$ | async).isLtLargeTablet}">
                        isLtLargeTablet
                    </div>
                    <div class="col eui-u-width-10 eui-u-p-xs text-center"
                         [ngClass]="{'eui-u-c-bg-danger eui-u-c-white': (asService.breakpoints$ | async).isLtDesktop}">
                        isLtDesktop
                    </div>
                    <div class="col eui-u-width-10 eui-u-p-xs text-center"
                         [ngClass]="{'eui-u-c-bg-danger eui-u-c-white': (asService.breakpoints$ | async).isDesktop}">
                        isDesktop
                    </div>
                    <div class="col eui-u-width-10 eui-u-p-xs text-center"
                         [ngClass]="{'eui-u-c-bg-danger eui-u-c-white': (asService.breakpoints$ | async).isXL}">
                        isXL
                    </div>
                    <div class="col eui-u-width-10 eui-u-p-xs text-center"
                         [ngClass]="{'eui-u-c-bg-danger eui-u-c-white': (asService.breakpoints$ | async).isXXL}">
                        isXXL
                    </div>
                    <div class="col eui-u-width-10 eui-u-p-xs text-center"
                         [ngClass]="{'eui-u-c-bg-danger eui-u-c-white': (asService.breakpoints$ | async).isFHD}">
                        isFHD
                    </div>
                    <div class="col eui-u-width-10 eui-u-p-xs text-center"
                         [ngClass]="{'eui-u-c-bg-danger eui-u-c-white': (asService.breakpoints$ | async).is2K}">
                        is2K
                    </div>
                    <div class="col eui-u-width-10 eui-u-p-xs text-center"
                         [ngClass]="{'eui-u-c-bg-danger eui-u-c-white': (asService.breakpoints$ | async).is4K}">
                        is4K
                    </div>
                </div>
            </eui-page-content>

        </eui-page>

    </eui-app-page-wrapper>

</eui-app>
```
