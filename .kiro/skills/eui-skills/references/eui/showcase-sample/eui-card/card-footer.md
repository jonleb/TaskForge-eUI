---
description: This sample demonstrates footer composition with action buttons, action icons, and optional menu sections.
id: card-footer
---

```html
<div class="doc-sample-section-title">Card footer sections: action buttons - action icons - menu content</div>

<div class="row">
    <div class="col-md-6 eui-u-mb-m">
        <eui-card>
            <eui-card-header>
                <eui-card-header-title>
                    Default layout of a card footer
                </eui-card-header-title>
            </eui-card-header>

            <eui-card-content>
                <p class="eui-u-text-paragraph">Hover on footer's elements to display more information.</p>
            </eui-card-content>

            <eui-card-footer>
                <eui-card-footer-action-buttons euiTooltip="Here are displayed the main action buttons.&#13;It is recommended to have maximum 2 buttons.&#13;Primary action button is always displayed first.&#13;Other actions will be put in the menu.">
                    <span class="eui-u-cursor-help">Action buttons</span>
                </eui-card-footer-action-buttons>

                <eui-card-footer-action-icons euiTooltip="Here are displayed the action icons.&#13;It is recommended to have maximum 2 icons.&#13;Other actions will be put in the menu.">
                    <span class="eui-u-cursor-help">Action icons</span>
                </eui-card-footer-action-icons>

                <eui-card-footer-menu-content [tooltipText]="'Actions menu to propose more options'">
                    <div class="m-2">Menu content here</div>
                </eui-card-footer-menu-content>
            </eui-card-footer>
        </eui-card>
    </div>

    <div class="col-md-6 eui-u-mb-m">
        <eui-card>
            <eui-card-header>
                <eui-card-header-title>
                    Sample Card Title
                </eui-card-header-title>
            </eui-card-header>

            <eui-card-content>
                <p class="eui-u-text-paragraph">I am the content of the card container with a full default footer's layout.</p>
            </eui-card-content>

            <eui-card-footer>
                <eui-card-footer-action-buttons>
                    <div class="eui-u-flex eui-u-flex-wrap">
                        <button euiButton euiPrimary euiTooltip="Primary action button" aria-label="Primary action button">Action 1</button>
                        <button euiButton euiSecondary euiTooltip="Secondary action button" aria-label="Secondary action button">Action 2</button>
                    </div>
                </eui-card-footer-action-buttons>

                <eui-card-footer-action-icons>
                    <eui-icon-toggle keyboardAccessKey="fv" iconSvgNameOn="eui-star-fill" iconSvgNameOff="eui-star" euiTooltip="Mark as favourite" aria-label="Mark as favourite" />

                    <button euiButton euiRounded euiIconButton euiBasicButton euiPrimary euiTooltip="Share" aria-label="Share">
                        <eui-icon-svg icon="share-network:regular"/>
                    </button>
                </eui-card-footer-action-icons>

                <eui-card-footer-menu>
                    <eui-dropdown euiTooltip="More options">
                        <button
                            euiButton
                            euiRounded
                            euiIconButton
                            euiBasicButton
                            euiPrimary
                            type="button"
                            aria-label="More options">
                            <eui-icon-svg icon="eui-ellipsis-vertical" />
                        </button>
                        <eui-dropdown-content>
                            <button euiDropdownItem>Extra action 1</button>
                            <button euiDropdownItem>Extra action 2</button>
                            <button euiDropdownItem>Extra action 3</button>
                        </eui-dropdown-content>
                    </eui-dropdown>
                </eui-card-footer-menu>

            </eui-card-footer>
        </eui-card>
    </div>
</div>



<div class="doc-sample-section-title">Recommended custom cards footers' layouts</div>
<div class="row">
    <div class="col-md-6 eui-u-mb-m">
        <eui-card>
            <eui-card-header>
                <eui-card-header-title>
                    Action buttons aligned to the right
                </eui-card-header-title>
            </eui-card-header>
            <eui-card-content>
                <p class="eui-u-text-paragraph">I am the content of the card container...</p>
            </eui-card-content>
            <eui-card-footer>
                <eui-card-footer-action-buttons class="eui-u-flex eui-u-flex-justify-content-end eui-u-flex-wrap">
                    <button euiButton euiSecondary>Secondary</button>
                    <button euiButton euiPrimary class="eui-u-mr-none">Primary</button>
                </eui-card-footer-action-buttons>
            </eui-card-footer>
        </eui-card>
    </div>
    <div class="col-md-6 eui-u-mb-m">
        <eui-card>
            <eui-card-header>
                <eui-card-header-title>
                    Action buttons left & right multiple
                </eui-card-header-title>
            </eui-card-header>
            <eui-card-content>
                <p class="eui-u-text-paragraph">I am the content of the card container...</p>
            </eui-card-content>
            <eui-card-footer>
                <eui-card-footer-action-buttons class="eui-u-flex eui-u-flex-justify-content-between eui-u-flex-wrap">
                    <button euiButton euiBasicButton euiPrimary>Tertiary</button>
                    <div class="eui-u-ml-auto">
                        <button euiButton euiSecondary>Secondary</button>
                        <button euiButton euiPrimary class="eui-u-mr-none">Primary</button>
                    </div>
                </eui-card-footer-action-buttons>
            </eui-card-footer>
        </eui-card>
    </div>
    <div class="col-md-6 eui-u-mb-m">
        <eui-card>
            <eui-card-header>
                <eui-card-header-title>
                    Action buttons left & right
                </eui-card-header-title>
            </eui-card-header>
            <eui-card-content>
                <p class="eui-u-text-paragraph">I am the content of the card container...</p>
            </eui-card-content>
            <eui-card-footer>
                <eui-card-footer-action-buttons class="eui-u-flex eui-u-flex-justify-content-between eui-u-flex-wrap">
                    <button euiButton euiSecondary>Secondary</button>
                    <button euiButton euiPrimary class="eui-u-mr-none">Primary</button>
                </eui-card-footer-action-buttons>
            </eui-card-footer>
        </eui-card>
    </div>
    <div class="col-md-6 eui-u-mb-m">
        <eui-card>
            <eui-card-header>
                <eui-card-header-title>
                    Action buttons & toggle action icons
                </eui-card-header-title>
            </eui-card-header>
            <eui-card-content>
                <p class="eui-u-text-paragraph">I am the content of the card container...</p>
            </eui-card-content>
            <eui-card-footer>
                <eui-card-footer-action-buttons class="eui-u-flex eui-u-flex-justify-content-between">
                    <div class="eui-u-flex">
                        <button euiButton euiBasicButton euiPrimary>Tertiary</button>
                    </div>
                    <div class="eui-u-inline-flex">
                        <eui-card-footer-action-icons>
                            <eui-icon-toggle keyboardAccessKey="fw" iconSvgNameOn="eui-star-fill" iconSvgNameOff="eui-star" euiTooltip="Mark as favourite" aria-label="Mark as favourite" />
                            <button euiButton euiRounded euiIconButton euiBasicButton euiPrimary euiTooltip="Share" aria-label="Share">
                                <eui-icon-svg icon="share-network:regular" fillColor="secondary" />
                            </button>
                        </eui-card-footer-action-icons>
                        <button euiButton euiSecondary>Secondary</button>
                        <button euiButton euiPrimary class="eui-u-mr-none">Primary</button>
                    </div>

                </eui-card-footer-action-buttons>

            </eui-card-footer>
        </eui-card>
    </div>
    <div class="col-md-6 eui-u-mb-m">
        <eui-card>
            <eui-card-header>
                <eui-card-header-title>
                    Action buttons left aligned
                </eui-card-header-title>
            </eui-card-header>
            <eui-card-content>
                <p class="eui-u-text-paragraph">I am the content of the card container...</p>
            </eui-card-content>
            <eui-card-footer>
                <eui-card-footer-action-buttons>
                    <button euiButton euiBasicButton euiPrimary class="eui-u-mr-none">Action 1</button>
                    <button euiButton euiBasicButton euiPrimary class="eui-u-mr-none">Action 2</button>
                    <button euiButton euiBasicButton euiPrimary class="eui-u-mr-none">Action 3</button>
                </eui-card-footer-action-buttons>
            </eui-card-footer>
        </eui-card>
    </div>
    <div class="col-md-6 eui-u-mb-m">
        <eui-card>
            <eui-card-header>
                <eui-card-header-title>
                    Action buttons evenly distributed
                </eui-card-header-title>
            </eui-card-header>
            <eui-card-content>
                <p class="eui-u-text-paragraph">I am the content of the card container...</p>
            </eui-card-content>
            <eui-card-footer>
                <eui-card-footer-action-buttons class="eui-u-flex eui-u-flex-justify-content-between eui-u-flex-wrap eui-u-flex-gap-s">
                    <button euiButton euiBasicButton euiOutline>Action 3</button>
                    <button euiButton euiSecondary>Action 2</button>
                    <button euiButton euiPrimary class="eui-u-mr-none">Action 1</button>
                </eui-card-footer-action-buttons>
            </eui-card-footer>
        </eui-card>
    </div>
    <div class="eui-u-flex">
        <eui-card>
            <eui-card-header>
                <eui-card-header-title>
                    Action buttons advanced layout
                </eui-card-header-title>
            </eui-card-header>
            <eui-card-content>
                <p class="eui-u-text-paragraph">I am the content of the card container...</p>
            </eui-card-content>
            <eui-card-footer>
                <eui-card-footer-action-buttons class="eui-u-flex eui-u-flex-justify-content-between">
                    <div class="eui-u-flex">
                        <button euiButton euiBasicButton euiPrimary euiTooltip="Tertiary action button" aria-label="Tertiary action button">Tertiary</button>
                    </div>
                    <div class="eui-u-inline-flex">
                        <eui-card-footer-action-icons>
                            <eui-icon-toggle keyboardAccessKey="f" iconSvgNameOn="eui-star-fill" iconSvgNameOff="eui-star" euiTooltip="Mark as favourite" aria-label="Mark as favourite" />
                            <button euiButton euiRounded euiIconButton euiBasicButton euiPrimary euiTooltip="Share" aria-label="Share">
                                <eui-icon-svg icon="share-network:regular" fillColor="secondary" />
                            </button>
                        </eui-card-footer-action-icons>
                        <button euiButton euiSecondary euiTooltip="Secondary action button" aria-label="Secondary action button">Secondary</button>
                        <button euiButton euiPrimary euiTooltip="Primary action button" aria-label="Primary action button">Primary</button>
                        <eui-card-footer-menu>
                            <eui-dropdown isDropDownRightAligned euiTooltip="More actions">
                                <button
                                    euiButton
                                    euiPrimary
                                    euiOutline
                                    type="button"
                                    class="eui-u-mr-none">
                                    More actions
                                    <eui-icon-svg icon="eui-ellipsis-vertical" />
                                </button>
                                <eui-dropdown-content>
                                    <button euiDropdownItem>Extra action 1</button>
                                    <button euiDropdownItem>Extra action 2</button>
                                    <button euiDropdownItem>Extra action 3</button>
                                </eui-dropdown-content>
                            </eui-dropdown>
                        </eui-card-footer-menu>
                    </div>

                </eui-card-footer-action-buttons>

            </eui-card-footer>
        </eui-card>
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EuiTooltipDirective } from '@eui/components/directives';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_LIST } from '@eui/components/eui-list';
import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';
import { EUI_ICON_TOGGLE } from '@eui/components/eui-icon-toggle';


@Component({
    // eslint-disable-next-line
    selector: 'card-footer',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CARD,
        ...EUI_BUTTON,
        EuiTooltipDirective,
        ...EUI_ICON,
        ...EUI_DROPDOWN,
        ...EUI_ICON_TOGGLE,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardFooterComponent {
}
```

