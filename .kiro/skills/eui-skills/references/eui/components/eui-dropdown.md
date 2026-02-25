# eui-dropdown

## Overview

<p class="eui-u-text-paragraph">The <strong>eui-dropdown</strong> component is composed of a trigger, usually a button, which allows to display the dropdown content specified with the <code class="eui-u-text-code">eui-dropdown-content</code> template directive.</p>

<div class="doc-sample-section-title">Anatomy sample</div>
<pre class="eui-u-text-pre"><code class="eui-u-text-code">&lt;eui-dropdown&gt;
    &lt;button&gt;Trigger&lt;/button&gt;
    &lt;eui-dropdown-content&gt;
        &lt;button euiDropdownItem&gt;I'm a focusable list item&lt;/button&gt;
        &lt;button euiDropdownItem&gt;I'm a focusable list item&lt;/button&gt;
    &lt;/eui-dropdown-content&gt;
&lt;/eui-dropdown&gt;</code></pre>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | e2eAttr | string | 'eui-dropdown' |
| Input | tabIndex | number | -1 |
| Input | width | string | 'auto' |
| Input | height | string | 'auto' |
| Input | position | 'top' \| 'right' \| 'bottom' \| 'left' | 'bottom' |
| Input | subDropdownPosition | 'right' \| 'left' | 'right' |
| Input | isBlock | boolean | false |
| Input | isDropDownRightAligned | boolean | false |
| Input | hasClosedOnClickInside | boolean | true |
| Input | isLabelUpdatedFromSelectedItem | boolean | false |
| Input | isExpandOnHover | boolean | false |
| Input | hasTabNavigation | boolean | false |
| Input | isRightClickEnabled | boolean | false |
| Input | euiDisabled | boolean | false |
| Output | expand | EventEmitter<boolean> | new EventEmitter() |
| Output | isDropdownOpen | EventEmitter<boolean> | new EventEmitter() |

## Samples

### [Default](samples/eui-dropdown/Default)

```html
<p class="eui-u-text-paragraph">Default <strong>eui-dropdown</strong> and dropdown items are using the <code class="eui-u-text-code">euiDropdownItem</code> directive around the <strong>button</strong> html element.</p>

<div class="row">
    <div class="col-md-6">
        <eui-dropdown>
            <button euiButton euiPrimary>Button trigger</button>
            <eui-dropdown-content>
                <div class="eui-u-flex eui-u-flex-column eui-u-flex-align-items-start">
                    <p class="eui-u-ph-m">Use the <kbd class="eui-u-text-kbd">&uarr;</kbd> and <kbd class="eui-u-text-kbd">&darr;</kbd> arrow keys to navigate</p>
                    <button euiDropdownItem (click)="onClick('Item 1')" aria-label="Item 1">I'm focusable and keyboard navigable</button>
                    <button euiDropdownItem (click)="onClick('Item 2')" aria-label="item 2">I'm also focusable and keyboard navigable</button>
                    <button euiDropdownItem (click)="onClick('Item 3')" aria-label="item 3">I'm the last focusable dropdown item</button>
                </div>
            </eui-dropdown-content>
        </eui-dropdown>
    </div>
    <div class="col-md-6">
        <eui-dropdown>
            <a href="javascript:void(0)" class="eui-u-text-link">Link trigger</a>
            <eui-dropdown-content>
                <div class="eui-u-flex eui-u-flex-column eui-u-flex-align-items-start">
                    <p class="eui-u-ph-m">Use the <kbd class="eui-u-text-kbd">&uarr;</kbd> and <kbd class="eui-u-text-kbd">&darr;</kbd> arrow keys to navigate</p>
                    <button euiDropdownItem (click)="onClick('Item 1')" aria-label="Item 1">I'm focusable and keyboard navigable</button>
                    <button euiDropdownItem (click)="onClick('Item 2')" aria-label="Item 2">I'm also focusable and keyboard navigable</button>
                    <button euiDropdownItem (click)="onClick('Item 3')" aria-label="Item 3">I'm the last focusable dropdown item</button>
                </div>
            </eui-dropdown-content>
        </eui-dropdown>
    </div>
</div>


<div class="doc-sample-section-title">Hamburger menu</div>

<eui-dropdown>
    <button euiButton euiRounded euiIconButton euiBasicButton euiPrimary [attr.aria-label]="'Menu'">
        <eui-icon-svg icon="eui-menu"></eui-icon-svg>
    </button>
    <eui-dropdown-content>
        <div>
            <button euiDropdownItem (click)="onClick('Menu item 1')" aria-label="Item 1">Menu item 1</button>
            <button euiDropdownItem (click)="onClick('Menu item 2')" aria-label="Item 2">Menu item 2</button>
            <button euiDropdownItem (click)="onClick('Menu item 3')" aria-label="Item 3">Menu item 3</button>
        </div>
    </eui-dropdown-content>
</eui-dropdown>


<div class="doc-sample-section-title">Options menu</div>

<div class="row">
    <div class="col">
        <eui-dropdown>
            <button euiButton euiRounded euiIconButton euiBasicButton euiPrimary [attr.aria-label]="'More options'">
                <eui-icon-svg icon="eui-ellipsis-vertical" size="s" />
            </button>
            <eui-dropdown-content>
                <button euiDropdownItem (click)="onClick('Option item 1')" aria-label="Item 1">Option item 1</button>
                <button euiDropdownItem (click)="onClick('Option item 2')" aria-label="Item 2">Option item 2</button>
                <button euiDropdownItem (click)="onClick('Option item 3')" aria-label="Item 3">Option item 3</button>
            </eui-dropdown-content>
        </eui-dropdown>
    </div>
    <div class="col">
        <eui-dropdown>
            <button euiButton euiPrimary [attr.aria-label]="'Menu'">
                <span euiLabel>Options</span>
                <eui-icon-svg icon="eui-ellipsis-vertical" size="s" />
            </button>
            <eui-dropdown-content>
                <button euiDropdownItem (click)="onClick('Menu item 1')">Menu item 1</button>
                <button euiDropdownItem (click)="onClick('Menu item 2')">Menu item 2</button>
                <button euiDropdownItem (click)="onClick('Menu item 3')">Menu item 3</button>
            </eui-dropdown-content>
        </eui-dropdown>
    </div>
    <div class="col">
        <eui-dropdown>
            <button euiButton euiPrimary euiOutline [attr.aria-label]="'Menu'">
                <span euiLabel>More actions</span>
                <eui-icon-svg icon="eui-ellipsis-vertical" size="s" />
            </button>
            <eui-dropdown-content>
                <button euiDropdownItem (click)="onClick('Menu item 1')">Menu item 1</button>
                <button euiDropdownItem (click)="onClick('Menu item 2')">Menu item 2</button>
                <button euiDropdownItem (click)="onClick('Menu item 3')">Menu item 3</button>
            </eui-dropdown-content>
        </eui-dropdown>
    </div>
</div>



<div class="doc-sample-section-title">Actionable avatar</div>

<div class="row">
    <div class="col">
        <eui-dropdown>
            <button euiButton euiRounded euiIconButton euiBasicButton euiAvatarButton [attr.aria-label]="'More options'">
                <eui-avatar>
                    <eui-avatar-image imageUrl="assets/images/avatars/small/panda.png"></eui-avatar-image>
                </eui-avatar>
            </button>
            <eui-dropdown-content>
                <button euiDropdownItem (click)="onClick('Option item 1')" aria-label="Item 1">Option item 1</button>
                <button euiDropdownItem (click)="onClick('Option item 2')" aria-label="Item 2">Option item 2</button>
                <button euiDropdownItem (click)="onClick('Option item 3')" aria-label="Item 3">Option item 3</button>
            </eui-dropdown-content>
        </eui-dropdown>
    </div>
</div>


<div class="doc-sample-section-title">Menu items dynamically generated based on data array</div>

<eui-dropdown>
    <button euiButton euiPrimary [attr.aria-label]="'Menu items'">
        <span euiLabel>Menu</span>
        <eui-icon-svg icon="eui-chevron-down" size="xs" />
    </button>
    <eui-dropdown-content>
        @for (dropdownItem of dropdownItems; track $index) {
            <button euiDropdownItem (click)="onClick(dropdownItem.label)" [attr.aria-label]="dropdownItem.label">{{ dropdownItem.label }}</button>
        }
    </eui-dropdown-content>
</eui-dropdown>
```

```typescript
import { Component, OnInit } from "@angular/core";

import { EUI_DROPDOWN } from "@eui/components/eui-dropdown";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_AVATAR } from "@eui/components/eui-avatar";

@Component({
    // eslint-disable-next-line
    selector: "Default",
    templateUrl: "component.html",
    imports: [
        ...EUI_DROPDOWN,
        ...EUI_ICON,
        ...EUI_BUTTON,
        ...EUI_LABEL,
        ...EUI_AVATAR,
    ],
})
export class DefaultComponent implements OnInit {
    public dropdownItems = [];

    ngOnInit(): void {
        for (let i = 1; i <= 10; i++) {
            this.dropdownItems.push({ label: `Menu item from array ${i}` });
        }
    }

    public onClick(label: string) {
        console.log(label + " selected");
    }
}
```

### Other examples

- [Options: Children position](samples/eui-dropdown/children-position)
- [Options: isActive](samples/eui-dropdown/isActive)
- [Options: isBlock](samples/eui-dropdown/isBlock)
- [Options: isDropDownRightAligned](samples/eui-dropdown/isDropDownRightAligned)
- [Options: Position](samples/eui-dropdown/position)
- [Options: Width](samples/eui-dropdown/width)
- [Options: Height](samples/eui-dropdown/height)
- [Options: With icon](samples/eui-dropdown/with-icon)
- [Main features: Closing](samples/eui-dropdown/closing)
- [Main features: Disabled](samples/eui-dropdown/disabled)
- [main features: Dynamic multi-level](samples/eui-dropdown/dynamic-multi-level)
- [Main features: isRightClickEnabled](samples/eui-dropdown/isRightClickEnabled)
- [main features: Multi-level](samples/eui-dropdown/multi-level)
- [Main features: Update label](samples/eui-dropdown/update-label)
- [composition: In Dialog](samples/eui-dropdown/in-dialog)
- [composition: In Table](samples/eui-dropdown/in-table)
- [composition: Tooltip](samples/eui-dropdown/tooltip)
- [misc: Long scrollable list items](samples/eui-dropdown/long-scrollable)
- [misc: Rich content](samples/eui-dropdown/rich-content)

## Accessibility

<code class="eui-u-text-code">eui-dropdown</code> consists of a menu trigger that triggers the menu containing the menu items within <code class="eui-u-text-code">eui-dropdown-content</code> directive.
Menu triggers or menu items without text or labels should be given a meaningful label via <code class="eui-u-text-code">aria-label</code> or <code class="eui-u-text-code">aria-labelledby</code>.


<div class="doc-sample-section-title">Keyboard interaction</div>

<p class="eui-u-text-paragraph">The <strong>dropdown trigger</strong> uses an <code class="eui-u-text-code">eui-button</code> which interacts with the following keys :</p>
<table class="eui-table-default eui-table-default--responsive eui-table-default--bordered eui-table-default--compact">
    <thead>
        <tr>
            <th>Shortcut</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><kbd class="eui-u-text-kbd">Enter</kbd> / <kbd class="eui-u-text-kbd">Space</kbd> (on trigger)</td>
            <td>Opens the dropdown panel and focuses the first item</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Enter</kbd> / <kbd class="eui-u-text-kbd">Space</kbd> (on item)</td>
            <td>Activates the focused item</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Down_Arrow</kbd> / <kbd class="eui-u-text-kbd">Up_Arrow</kbd></td>
            <td>Moves focus to the next/previous item</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Home</kbd> / <kbd class="eui-u-text-kbd">End</kbd></td>
            <td>Moves focus to the first/last item</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Esc</kbd></td>
            <td>Closes the dropdown and returns focus to the trigger</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Tab</kbd></td>
            <td>Closes the dropdown and moves focus to the next element in tab order</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Shift+Tab</kbd></td>
            <td>Closes the dropdown and moves focus to the previous element in tab order</td>
        </tr>
    </tbody>
</table>
<!-- LEFT blank showcase central link provided in showcase doc-page component -->
