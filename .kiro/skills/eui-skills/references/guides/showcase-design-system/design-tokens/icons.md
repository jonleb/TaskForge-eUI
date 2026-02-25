# showcase design system   design tokens   icons

```html
<eui-showcase-doc-page id="Icons">
    <docPageSections>
        <eui-showcase-doc-section id="Overview">

            <p class="eui-u-text-paragraph">
                The <strong>eUI Core (eui)</strong> / <strong>eUI file (eui-file)</strong> icon sets and 
                <a class="eui-u-text-link-external eui-u-f-bold" href="https://phosphoricons.com/" target="_blank">Phosphor</a>
                icons sets (Regular set variant recommended first and Fill set variant) are the default icon sets from the current <strong>eUI 21 Design System</strong>.
            </p>

            <p class="eui-u-text-paragraph">
                The <strong>ECL</strong> Icon Set is provided for all official social media icon references among other official icons.
            </p>
           
            <eui-alert class="eui-u-mt-m">
                For more features like search, transformations, usage samples and documentation, please refer to the
                <a class="eui-u-text-link" routerLink="/style-guide/components/eui-icon-svg">eui-icon-svg component's showcase</a>.
            </eui-alert>

        </eui-showcase-doc-section>

        <eui-showcase-doc-section id="Icons">
            <p class="eui-u-text-paragraph">
                <em>Click on an icon to see its implementation code source.</em>
            </p>

            <eui-tabs [activeTabIndex]="0">
                <!-- eUI CORE -->
                <eui-tab>
                    <eui-tab-header>
                        <eui-label>eUI - default set</eui-label>
                        <eui-badge euiPrimary euiSizeS euiOutline class="eui-u-ml-s">{{ euiCoreRendered?.length }}</eui-badge>
                    </eui-tab-header>
                    <eui-tab-body>
                        <div class="icons-demo">
                            @for (icon of euiCoreRendered; track icon; let i = $index) {
                                <div class="icon-item-container" title="{{icon}}" (click)="openPopover($event, icon, 'eui', selectedSize, selectedColor)" [euiTooltip]="icon" euiTooltipInfo>
                                    <div class="icon-item-inner-container">
                                        <eui-icon-svg icon="{{icon}}" size="l" fillColor="secondary" />
                                    </div>
                                    <span class="icon-item-title">{{icon}}</span>
                                </div>
                            }
                        </div>
                    </eui-tab-body>
                </eui-tab>

                <eui-tab>
                    <eui-tab-header>
                        <eui-label>eUI - file icons</eui-label>
                        <eui-badge euiPrimary euiSizeS euiOutline class="eui-u-ml-s">{{ euiFileRendered?.length }}</eui-badge>
                    </eui-tab-header>
                    <eui-tab-body>
                        <div class="icons-demo">
                            @for (icon of euiFileRendered; track icon; let i = $index) {
                                <div class="icon-item-container" title="{{icon}}" (click)="openPopover($event, icon, 'eui-file', selectedSize, selectedColor)" [euiTooltip]="icon" euiTooltipInfo>
                                    <div class="icon-item-inner-container">
                                        <eui-icon-svg icon="{{icon}}:eui-file" size="l" fillColor="secondary" />
                                    </div>
                                    <span class="icon-item-title">{{icon}}</span>
                                </div>
                            }
                        </div>
                    </eui-tab-body>
                </eui-tab>

                <!-- ECL -->
                <eui-tab>
                    <eui-tab-header>
                        <eui-label>ECL</eui-label>
                        <eui-badge euiPrimary euiSizeS euiOutline class="eui-u-ml-s">{{ ECLRendered?.length }}</eui-badge>
                    </eui-tab-header>
                    <eui-tab-body>
                        <div class="icons-demo">
                            @for (icon of ECLRendered; track icon; let i = $index) {
                                <div class="icon-item-container" title="{{icon}}" (click)="openPopover($event, icon, 'ecl', selectedSize, selectedColor)" [euiTooltip]="icon" euiTooltipInfo>
                                    <div class="icon-item-inner-container">
                                        <eui-icon-svg icon="{{icon}}" size="l" set="ecl" fillColor="secondary" />
                                    </div>
                                    <span class="icon-item-title">{{icon}}</span>
                                </div>
                            }
                        </div>
                    </eui-tab-body>
                </eui-tab>

                <!-- PHOSPHOR -->
                <eui-tab>
                    <eui-tab-header>
                        <eui-label>Phosphor Regular</eui-label>
                        <eui-badge euiPrimary euiSizeS euiOutline class="eui-u-ml-s">{{ phosphorRendered?.length }}</eui-badge>
                    </eui-tab-header>
                    <eui-tab-body>
                        <div class="icons-demo">
                            @for (icon of phosphorRendered; track icon; let i = $index) {
                                <div class="icon-item-container" (click)="openPopover($event, icon, 'regular', selectedSize, selectedColor)" [euiTooltip]="icon" euiTooltipInfo>
                                    <div class="icon-item-inner-container">
                                        <eui-icon-svg icon="{{icon}}:regular" size="l" fillColor="secondary" />
                                    </div>
                                    <span class="icon-item-title">{{icon}}</span>
                                </div>
                            }
                        </div>
                    </eui-tab-body>
                </eui-tab>

                <eui-tab>
                    <eui-tab-header>
                        <eui-label>Phosphor Fill</eui-label>
                        <eui-badge euiPrimary euiSizeS euiOutline class="eui-u-ml-s">{{ phosphorRendered?.length }}</eui-badge>
                    </eui-tab-header>
                    <eui-tab-body>
                        <div class="icons-demo">
                            @for (icon of phosphorRendered; track icon; let i = $index) {
                                <div class="icon-item-container" (click)="openPopover($event, icon, 'fill', selectedSize, selectedColor)" [euiTooltip]="icon" euiTooltipInfo>
                                    <div class="icon-item-inner-container">
                                        <eui-icon-svg icon="{{icon}}:fill" size="l" fillColor="secondary" />
                                    </div>
                                    <span class="icon-item-title">{{icon}}</span>
                                </div>
                            }
                        </div>
                    </eui-tab-body>
                </eui-tab>
            </eui-tabs>

        </eui-showcase-doc-section>
    </docPageSections>
</eui-showcase-doc-page>


<eui-popover #popover title="{{ (selectedSet).toUpperCase() }} &mdash; {{selectedIcon}}">
    <div class="eui-u-flex eui-u-flex-column eui-u-flex-gap-s">
        <div class="eui-u-flex eui-u-flex-gap-m">
            <eui-icon-svg [icon]="selectedSet !== 'eui' ? selectedIcon+':'+selectedSet : selectedIcon" [set]="selectedSet" size="2xl" fillColor="primary" />
            <div class="eui-u-flex eui-u-f-2xl eui-u-c-neutral-dark">{{ selectedIcon }}</div>
            <div class="eui-u-inline-flex eui-u-flex-column">
                <div class="eui-u-text-tiny">24x24</div>
                <eui-icon-svg [icon]="selectedSet !== 'eui' ? selectedIcon+':'+selectedSet : selectedIcon" [set]="selectedSet" size="m" fillColor="primary" style="outline: 1px dashed silver" />
            </div>
        </div>
        @if (selectedSet === 'eui') {
            <input euiInputText
                value="<eui-icon-svg icon=&quot;{{selectedIcon}}&quot; />"
                readonly />
        } @else {
            <input euiInputText
                value="<eui-icon-svg icon=&quot;{{selectedIcon}}:{{selectedSet}}&quot; />"
                readonly />
        }
        <div class="eui-u-flex eui-u-flex-justify-content-center">
            <button euiButton euiOutline euiPrimary euiSizeS (click)="copySourceToClipboard(selectedIcon);">
                <eui-icon-svg icon="eui-copy" />
                Copy to clipboard
            </button>
        </div>
    </div>
</eui-popover>
```
