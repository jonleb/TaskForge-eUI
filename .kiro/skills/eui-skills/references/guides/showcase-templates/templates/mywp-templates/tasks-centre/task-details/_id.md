# showcase templates   templates   mywp templates   tasks centre   task details   :id

```html
<eui-page>
    <eui-page-header [label]="'Task detail ' + data.country + ' - Prepare Grant Agreement - CCREF-ALERT-2021-' + data.population">

        <eui-page-header-sub-label class="eui-u-flex-gap-2xs">

            <div class="eui-u-flex eui-u-flex-gap-m">
                <!-- CATEGORY -->
                <div class="eui-u-c-bg-secondary-surface eui-u-ph-s eui-u-pv-4xs">
                    TASK
                </div>
    
                <!-- STATUS -->
                <eui-chip
                    [euiPrimary]="data.metadata?.status === 'Claimed'"
                    [euiSecondary]="data.metadata?.status === 'Unclaimed'"
                    [euiSuccess]="data.metadata?.status === 'Completed'">
                    {{ data.metadata?.status }}
                </eui-chip>
    
                <div class="eui-u-o-75">
                    {{ data.metadata?.status }} by {{ data.metadata?.statusDescription }} on {{ today | date: 'dd/MM/yyyy hh:mm:ss' }}
                </div>
            </div>

            <!-- OPTIONAL TAGS -->
            <div class="eui-u-flex eui-u-flex-align-items-start eui-u-flex-gap-s">
                <eui-icon-svg icon="tag:regular" class="eui-u-mt-xs" />
                <eui-chip-list>
                    @for (chip of chips; let i = $index; track chip.id) {
                        @if (isMaxVisibleChipsOpened || i <= maxVisibleChipsCount) {
                            <eui-chip [data]="{ id: chip.id }" [euiVariant]="chip.variant"><span euiLabel>{{ chip.label }}</span></eui-chip>
                        }
                    }
                    <eui-chip-list-additional-content>
                        @if (maxVisibleChipsCount && chips && chips.length > maxVisibleChipsCount) {
                            <button
                                euiButton
                                euiBasicButton
                                euiSecondary
                                euiSizeS
                                type="button"
                                class="eui-chip-list__expand-button"
                                (click)="toggleTags()">

                                @if (isMaxVisibleChipsOpened) {
                                    <eui-icon-svg icon="eui-chevron-left" aria-label="Collapse icon" />
                                    <span euiLabel>Less</span>
                                } @else {
                                    <span euiLabel>More</span>
                                    <eui-icon-svg icon="eui-chevron-right" aria-label="Expand icon" />
                                }
                            </button>
                        }
                    </eui-chip-list-additional-content>
                </eui-chip-list>




                <!-- Optional Manage action -->
                <button euiButton euiBasicButton euiPrimary euiSizeS>Manage</button>
            </div>
        </eui-page-header-sub-label>
            
        <eui-page-header-action-items>
            @if (data.metadata?.status !== 'Completed') {
                <button euiButton euiSecondary>Assign</button>
            }
            @if (data.metadata?.status !== 'Claimed' && data.metadata?.status !== 'Completed') {
                <button euiButton euiPrimary>Claim</button>
            }
            @if (data.metadata?.status === 'Claimed') {
                <button euiButton euiPrimary>Unclaim</button>
            }
        </eui-page-header-action-items>
    </eui-page-header>

    <eui-page-content>

        <eui-page-columns>
            <!-- LEFT COLUMN : navigation menu -->
            <eui-page-column [isCollapsedWithIcons]="isPageColumnCollapsed" label="Navigation menu" euiSize2XL [isCollapsible]="true" [hasSidebarMenu]="true" (collapse)="onColumnCollapse($event)">
                <eui-page-column-header-body>
                    <button euiButton euiPrimary euiOutline euiBlockButton (click)="onBackToParent($event)" class="eui-u-mb-m">
                        <eui-icon-svg icon="eui-chevron-left"></eui-icon-svg>
                        Back to Task centre
                    </button>
                </eui-page-column-header-body>
                <eui-page-column-body>
                    <eui-sidebar-menu [items]="sidebarItems"
                                      hasIcons
                                      hasCollapsedInitials 
                                      [isCollapsed]="isPageColumnCollapsed"
                                      (itemClick)="onSidebarItemClicked($event)">
                    </eui-sidebar-menu>
                </eui-page-column-body>
            </eui-page-column>

            <!-- RIGHT COLUMN : main content -->
            <eui-page-column [label]="(uiStateService.state$ | async)?.activeRoute?.label || 'Overview'" [euiHighlighted]="(asService.state$ | async).isDimmerActive">
                <eui-page-column-header-right-content>
                    <div class="eui-u-flex eui-u-flex-gap-m">
                        <!-- <button euiButton euiPrimary euiSizeS euiOutline (click)="toggleEditMode()">
                            <eui-icon-svg icon="eui-edit" />
                            Edit
                        </button> -->

                        <!-- Clock chart component here -->
                        <div class="eui-u-flex eui-u-flex-column eui-u-mr-m">
                            <div class="eui-u-flex">
                                <small>{{daysLeft}} days to deadline &mdash; <strong>{{endDate | date: 'd MMMM, y'}}</strong></small>
                            </div>
                            <div class="eui-u-flex eui-u-c-bg-secondary-surface">
                                <div class="eui-u-flex">
                                    <div class="eui-u-c-bg-success-surface" style="border-radius: 4px 0px 0px 4px; display: block; height: 16px; width: 100%;"></div>
                                    <div class="eui-u-c-bg-success-surface-light" style="border-radius: 0px 4px 4px 0px; display: block; height: 16px;" [style.width]="chartDaysLeft + '%'"></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </eui-page-column-header-right-content>

                <eui-page-column-body>
                    <router-outlet></router-outlet>
                </eui-page-column-body>
            </eui-page-column>

        </eui-page-columns>

    </eui-page-content>

    <!-- <eui-page-footer If="(uiStateService.state$ | async).isEditActive" euiHighlighted="true"> -->
    <eui-page-footer euiHighlighted>
        <div class="eui-u-flex eui-u-flex-justify-content-between eui-u-flex-gap-m">
            <!-- Left footer actions/content -->
            <div class="eui-u-flex eui-u-flex-justify-content-start">
                <div class="eui-u-flex eui-u-flex-gap-m">
                    <div class="eui-u-f-l">Selected&nbsp;outcome&nbsp;:</div>
                    <eui-dropdown isLabelUpdatedFromSelectedItem>
                        <button euiButton euiPrimary euiResponsive aria-label="Select outcome action">
                            <span euiLabel>Please select outcome</span>
                            <eui-icon-svg icon="eui-caret-down" size="s" />
                        </button>
                        <eui-dropdown-content>
                            @for (action of outcomeActions; track action) {
                                <button euiDropdownItem (click)="onOutcomeSelect(action.id)" [attr.aria-label]="'Selected action: ' + action.label">
                                    {{ action.label }}
                                </button>
                            }
                        </eui-dropdown-content>
                    </eui-dropdown>
                </div>
            </div>
            <!-- Right footer actions/content -->
            <div class="eui-u-flex-justify-content-end">
                <div class="eui-u-flex eui-u-flex-gap-m">
                    <button euiButton euiSecondary (click)="onCancel($event)">
                        Clear
                    </button>
                    <button euiButton euiPrimary (click)="onSave($event)">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    </eui-page-footer>
</eui-page>

<!-- Hidden Popover triggered by MenuItem icon click event -->
<eui-popover #menupopover title="Popover title">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus corporis commodi.
</eui-popover>
```
