# showcase templates   list details flows   cards list advanced   details   :id

```html
<eui-page>
    <eui-page-breadcrumb>
        <eui-breadcrumb>
            <eui-breadcrumb-item id="0" link="/" iconSvgName="eui-home" ariaLabel="Home"></eui-breadcrumb-item>
            <eui-breadcrumb-item id="1" label="List details flows" link="/list-details-flows"></eui-breadcrumb-item>
            <eui-breadcrumb-item id="2" label="Cards list with edit in page"></eui-breadcrumb-item>
            <eui-breadcrumb-item id="3" label="{{ data.country }} - {{ data.metadata.description }}"></eui-breadcrumb-item>
        </eui-breadcrumb>
    </eui-page-breadcrumb>

    <eui-page-header label="Page detail"
                     [subLabel]="(data.country).toUpperCase() + ' - ' + data.metadata.description"
                     [isCollapsible]="true"
                     [isCollapsed]="false">

        <eui-page-header-action-items>
            <button euiButton euiSecondary (click)="onSecondaryActionClicked($event)">Secondary action</button>
            <button euiButton euiPrimary (click)="onEditClicked($event)">
                <eui-icon-svg icon="eui-edit"></eui-icon-svg>
                Edit
            </button>
            <!-- Optional More actions dropdown button -->
            <eui-dropdown>
                <button euiButton euiPrimary euiOutline euiTooltip="More actions" [attr.aria-label]="'More actions menu'">
                    More
                    <eui-icon-svg icon="eui-ellipsis-vertical"></eui-icon-svg>
                </button>
                <eui-dropdown-content>
                    <button euiDropdownItem aria-label="Extra page action item 1">
                        <eui-icon-svg icon="eui-chevron-right" class="eui-u-mr-s"></eui-icon-svg>
                        Extra page action 1
                    </button>
                    <button euiDropdownItem aria-label="Extra page action item 2">
                        <eui-icon-svg icon="eui-chevron-right" class="eui-u-mr-s"></eui-icon-svg>
                        Extra page action 2
                    </button>
                </eui-dropdown-content>
            </eui-dropdown>
        </eui-page-header-action-items>

        <eui-page-header-body>

            <eui-card>
                <eui-card-content class="eui-u-pb-none" style="max-height: 25vh">
                    <div class="row">
                        <div class="col-xl-3 col-lg-6 col-md-6 eui-u-mb-s">
                            <div class="eui-u-c-text-light">Country flag</div>
                            <div class="eui-flag-icon eui-flag-icon-{{ data.iso.toLowerCase() }} eui-flag-icon-2x" class="eui-u-shadow-3"></div>
                        </div>
                        <div class="col-xl-3 col-lg-6 col-md-6 eui-u-mb-s">
                            <div class="eui-u-c-text-light">Capital city</div>
                            <div class="eui-u-flex-wrap eui-u-f-bold">{{ data.capital }}</div>
                        </div>
                        <div class="col-xl-3 col-lg-6 col-md-6 eui-u-mb-s">
                            <div class="eui-u-c-text-light">Population</div>
                            <div class="eui-u-flex-wrap eui-u-f-bold">{{ data.population | number }}</div>
                        </div>
                        <div class="col-xl-3 col-lg-6 col-md-6 eui-u-mb-s">
                            <div class="eui-u-c-text-light">Reference year</div>
                            <eui-chip euiSecondary>
                                <span euiLabel><strong>{{ data.year }}</strong></span>
                            </eui-chip>
                        </div>
                    </div>
                </eui-card-content>
            </eui-card>

        </eui-page-header-body>
    </eui-page-header>

    <eui-page-content>

        <eui-page-columns>

            <!-- LEFT COLUMN : navigation menu -->
            <eui-page-column [isCollapsedWithIcons]="isPageColumnCollapsed" label="Navigation menu" euiSize2XL [isCollapsible]="true" [hasSidebarMenu]="true" (collapse)="onColumnCollapse($event)">
                <eui-page-column-header-body>
                    <button euiButton euiPrimary euiOutline euiBlockButton (click)="onBackToParent($event)" class="eui-u-mb-m">
                        <eui-icon-svg icon="eui-chevron-left"></eui-icon-svg>
                        <span euiLabel>Back to cards list</span>
                    </button>
                </eui-page-column-header-body>
                <eui-page-column-body>
                    <eui-sidebar-menu hasCollapsedInitials 
                                      [items]="sidebarItems"
                                      [isCollapsed]="isPageColumnCollapsed"
                                      (itemClick)="onSidebarItemClicked($event)">
                    </eui-sidebar-menu>
                </eui-page-column-body>
            </eui-page-column>

            <!-- RIGHT COLUMN : main content (lazy loaded) -->
            <eui-page-column [label]="menuItem?.label || 'Overview'" [euiHighlighted]="(asService.state$ | async).isDimmerActive">
                <eui-page-column-body>
                    <router-outlet (activate)="onActivate($event)"></router-outlet>
                </eui-page-column-body>
            </eui-page-column>

        </eui-page-columns>

    </eui-page-content>

    <eui-page-footer *ngIf="(asService.state$ | async).isDimmerActive" euiHighlighted="true">
        <div class="eui-u-flex eui-u-flex-justify-content-end">
            <button euiButton euiSecondary (click)="onCancel($event)" class="eui-u-mr-m">Cancel</button>
            <button euiButton euiPrimary (click)="onSave($event)">Save</button>
        </div>
    </eui-page-footer>

</eui-page>

<!-- Hidden Popover triggered by MenuItem icon click event -->
<eui-popover #popover [title]="popupAction + ' popover title'">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus corporis commodi.
</eui-popover>
```
