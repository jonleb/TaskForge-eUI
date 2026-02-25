# showcase dev guide   home

```html
<eui-page>
    <eui-page-content>

        <div class="eui-u-m-4xl">
            <div class="eui-u-text-h2 eui-u-c-s-primary">Welcome to eUI developer's guide</div>
            <br>

            <eui-alert>
                eUI developers' guide and documentation provides step by step guide on how to get started with your eUI app development.
            </eui-alert>

            <br><br>

            <div class="row">
                <div class="col-md-12 col-lg-12 col-xl-4"></div>
                <div class="col-md-6 col-lg-4 col-xl-4 eui-u-display-flex">
                    <eui-dashboard-card euiSizeM euiWarning class="eui-u-mb-m" [labelMaxLines]="1"
                        iconLabel="!!!"
                        label="Migration guide"
                        subLabel="Guide on how to migrate from a previous major version of eUI, with detailed breaking changes">
                        <button euiButton euiOutline euiSizeS euiInfo [routerLink]="['/showcase-dev-guide/docs/99-migration-guide/eui-19-to-21']">
                            Show more
                        </button>
                    </eui-dashboard-card>
                </div>
                <div class="col-md-12 col-lg-12 col-xl-4"></div>
            </div>

            <div class="row">
                <div class="col-md-6 col-lg-4 col-xl-3 eui-u-display-flex">
                    <eui-dashboard-card euiSizeM euiInfo class="eui-u-mb-m" [labelMaxLines]="1"
                        iconLabel="01"
                        label="General infos"
                        subLabel="Give you an overview and good to know information about the eUI platform and related.">
                        <button euiButton euiOutline euiSizeS euiInfo [routerLink]="['/showcase-dev-guide/docs/00b-general-infos/00-overview']">
                            Show more
                        </button>
                    </eui-dashboard-card>
                </div>

                <div class="col-md-6 col-lg-4 col-xl-3 eui-u-display-flex">
                    <eui-dashboard-card euiSizeM euiInfo class="eui-u-mb-m" [labelMaxLines]="1"
                        iconLabel="02"
                        label="Getting started"
                        subLabel="Setup your local environment to create your first eUI app">
                        <button euiButton euiOutline euiSizeS euiInfo [routerLink]="['/showcase-dev-guide/docs/01-getting-started/00-overview']">
                            Show more
                        </button>
                    </eui-dashboard-card>
                </div>

                <div class="col-md-6 col-lg-4 col-xl-3 eui-u-display-flex">
                    <eui-dashboard-card euiSizeM euiInfo class="eui-u-mb-m" [labelMaxLines]="1"
                        iconLabel="03"
                        label="Generate an app - eUI CLI quick guide"
                        subLabel="How to setup the eUI CLI for generating a ready-to-use eUI app">
                        <button euiButton euiOutline euiSizeS euiInfo [routerLink]="['/showcase-dev-guide/docs/01b-app-generation/00-overview']">
                            Show more
                        </button>
                    </eui-dashboard-card>
                </div>
                <div class="col-md-6 col-lg-4 col-xl-3 eui-u-display-flex">
                    <eui-dashboard-card euiSizeM euiInfo class="eui-u-mb-m" [labelMaxLines]="1"
                        iconLabel="04"
                        label="App development"
                        subLabel="Step by step creation of an eUI app from scratch, from repository creation to the build">
                        <button euiButton euiOutline euiSizeS euiInfo [routerLink]="['/showcase-dev-guide/docs/03-app-dev/00-overview']">
                            Show more
                        </button>
                    </eui-dashboard-card>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-6 col-lg-4 col-xl-3 eui-u-display-flex">
                    <eui-dashboard-card euiSizeM euiInfo class="eui-u-mb-m" [labelMaxLines]="1"
                        iconLabel="05"
                        label="Core API - Services"
                        subLabel="Documentation about the eUI Angular services and how to configure them">
                        <button euiButton euiOutline euiSizeS euiInfo [routerLink]="['/showcase-dev-guide/docs/10-services/api-queue']">
                            Show more
                        </button>
                    </eui-dashboard-card>
                </div>
                <div class="col-md-6 col-lg-4 col-xl-3 eui-u-display-flex">
                    <eui-dashboard-card euiSizeM euiInfo class="eui-u-mb-m" [labelMaxLines]="1"
                        iconLabel="06"
                        label="Advanced concepts"
                        subLabel="If you want to know deeper about some particular services implementation">
                        <button euiButton euiOutline euiSizeS euiInfo [routerLink]="['/showcase-dev-guide/docs/10-advanced-concepts/01-configuration/01-eui-config']">
                            Show more
                        </button>
                    </eui-dashboard-card>
                </div>
                <div class="col-md-6 col-lg-4 col-xl-3 eui-u-display-flex">
                    <eui-dashboard-card euiSizeM euiInfo class="eui-u-mb-m" [labelMaxLines]="1"
                        iconLabel="07"
                        label="Accessibility"
                        subLabel="Guide on how to implement accessibility within your eUI app">
                        <button euiButton euiOutline euiSizeS euiInfo [routerLink]="['/showcase-dev-guide/accessibility/intro']">
                            Show more
                        </button>
                    </eui-dashboard-card>
                </div>
                <div class="col-md-6 col-lg-4 col-xl-3 eui-u-display-flex">
                    <eui-dashboard-card euiSizeM euiInfo class="eui-u-mb-m" [labelMaxLines]="1"
                        iconLabel="08"
                        label="FAQ"
                        subLabel="Frequently asked questions seen on helpdesk/support channel">
                        <button euiButton euiOutline euiSizeS euiInfo [routerLink]="['/showcase-dev-guide/docs/99-faq/faq']">
                            Show more
                        </button>
                    </eui-dashboard-card>
                </div>
            </div>

            <br><br><br>

            <p>
                Last updated : <span class="eui-u-font-italic">{{(asService.state$ | async).appMetadata.appReleaseDate}}</span>
            </p>
        </div>
    </eui-page-content>
</eui-page>
```
