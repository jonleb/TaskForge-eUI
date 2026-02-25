# eui-sidebar-menu

## Overview

<p class="eui-u-text-paragraph">The <code class="eui-u-text-code">eui-sidebar-menu</code> is a two level navigation menu based on the <code class="eui-u-text-code">eui-app-sidebar-menu</code> which can be used within any page.</p>
By default, its layout is linked to the page container. You can define your own container or use any of the following to build your navigation menu :
<br>
<div class="eui-u-ml-m">
    <ul>
        <li style="list-style: inside;">responsive layout : using Bootstrap grid classes (see Demo)</li>
        <li style="list-style: inside;">any eUI containers components : eui-page-column, eui-card, eui-table, etc.</li>
        <li style="list-style: inside;">any custom container : provide your own custom container's class to a div element or any custom container's component</li>
    </ul>
</div>

<div class="eui-u-f-l">Menu items options</div>
<p class="eui-u-text-paragraph">
    This is the <code class="eui-u-text-code">EuiMenuItem</code> model with its properties and default values.
</p>

<div *ngIf="!isCollapsed">
    <table class="eui-table-default eui-table-default--responsive eui-table-default--compact">
        <thead>
            <tr>
                <th>Property</th>
                <th class="eui-u-width-15">Type / value</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>id</td>
                <td>string</td>
                <td>menu item unique identifier</td>
            </tr>
            <tr>
                <td>category</td>
                <td>string</td>
                <td>optional menu items classification (group by)</td>
            </tr>
            <tr>
                <td>children</td>
                <td>EuiMenuItem[]</td>
                <td>an array of eUI menu items</td>
            </tr>
            <tr>
                <td>disabled</td>
                <td>boolean: false | true = false</td>
                <td>disables the menu item entry</td>
            </tr>
            <tr>
                <td>expanded</td>
                <td>boolean: false | true = false</td>
                <td>auto-expands a menu item with children</td>
            </tr>
            <tr>
                <td>hasMarker</td>
                <td>boolean: false | true = false</td>
                <td>displays a marker bullet before the item's label. See also markerTypeClass</td>
            </tr>
            <tr>
                <td>iconClass</td>
                <td>string</td>
                <td>any eUI icon or third-party icon's library prefixed by its family name (ex: fa fa-home)</td>
            </tr>
            <tr>
                <td>iconTypeClass</td>
                <td>string</td>
                <td>Can be one of: primary, secondary, success, info, warning, danger, accent</td>
            </tr>
            <tr>
                <td>label</td>
                <td>string</td>
                <td>The label of the menu item (can be translated)</td>
            </tr>
            <tr>
                <td>markerTypeClass</td>
                <td>string</td>
                <td>The color of the marker bullet added with hasMArker: primary, secondary, success, info, warning, danger, accent</td>
            </tr>
            <tr>
                <td>tagLabel</td>
                <td>string</td>
                <td>The label of the tag to be added to the right of the menu item label</td>
            </tr>
            <tr>
                <td>tagTypeClass</td>
                <td>string</td>
                <td>The color of the tag : primary, secondary, success, info, warning, danger, accent</td>
            </tr>
            <tr>
                <td>url</td>
                <td>string</td>
                <td>Any internal (route) url</td>
            </tr>
            <tr>
                <td>urlExternal</td>
                <td>string</td>
                <td>Any external link url starting with 'http'</td>
            </tr>
            <tr>
                <td>visible</td>
                <td>boolean: false | true = true</td>
                <td>Does not show the menu item if set to false</td>
            </tr>
            <tr>
                <td>actionIcon</td>
                <td>
                    <tr>
                        <td>icon</td>
                        <td>string</td>
                        <td>icon can also include the set in the format of `icon:set`</td>
                    </tr>
                    <tr>
                        <td>color</td>
                        <td>string</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>label</td>
                        <td>string</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>action</td>
                        <td>(event) => void;</td>
                        <td>A callback function when icon is clicked</td>
                    </tr>
                </td>
                <td>An extra button icon rendered at the right section of the menu item</td>
            </tr>
        </tbody>
    </table>
</div>

<div class="eui-button__expand-trigger" (click)="onToggle($event)">
    <button *ngIf="isCollapsed" class="eui-button eui-button--expand-toggle" euiButton euiTooltip="Expand">
        <eui-icon-svg icon="eui-chevron-down"></eui-icon-svg>
         <span euiLabel>Click to expand</span>
    </button>
    <button *ngIf="!isCollapsed" class="eui-button eui-button--expand-toggle" euiButton euiTooltip="Collapse">
        <eui-icon-svg icon="eui-chevron-up"></eui-icon-svg>
        Collapse
    </button>
</div>

## Samples

### [Default](samples/eui-sidebar-menu/Default)

```html
<p class="eui-u-text-paragraph">
    By default the <code class="eui-u-text-code">eui-sidebar-menu</code> layout is linked to the page container. 
    You can define your own container or use any of the eUI containers components, which will gather the sidebar menu's contents.
</p>

<eui-alert class="eui-u-mb-xl">
    <u>Recommended usage</u>: within an eui-page and <strong>eui-page-column</strong> (first column).<br>
    See the <a class="eui-u-text-link" href="/style-guide/layout-components/eui-page-column">eui-page-column</a> component for more information and samples.
</eui-alert>

<eui-sidebar-menu [items]="sidebarItems"></eui-sidebar-menu>
```

```typescript
import { Component } from '@angular/core';
import { EuiMenuItem } from '@eui/base';
import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_SIDEBAR_MENU } from '@eui/components/eui-sidebar-menu';

@Component({
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SIDEBAR_MENU,
        ...EUI_BUTTON,
        ...EUI_ALERT,
    ],
})
export class DefaultComponent {
    public sidebarItems: EuiMenuItem [] = [
        { label: 'Root item 1', urlExternal: 'https://www.google.com', urlExternalTarget: '_blank', iconSvgName: 'bag:regular', iconTypeClass: 'neutral-light' },
        { label: 'Root item 2', url: 'INTERNAL ROUTE TO BE SET', iconSvgName: 'bag:regular', iconTypeClass: 'neutral-light' },
        { label: 'Category section label' },
        { label: 'Root item 3', url: 'INTERNAL ROUTE TO BE SET', iconSvgName: 'bag:regular', iconTypeClass: 'neutral-light' },
        { label: 'Root item 4 with childs',
            children: [
                { label: 'Item 1', url: 'https://www.google.com', urlExternalTarget: '_blank', iconSvgName: 'file:regular', iconTypeClass: 'warning' },
                { label: 'Item 2', url: 'https://www.google.com', urlExternalTarget: '_blank', iconSvgName: 'file:regular', iconTypeClass: 'accent' },
                { label: 'Item 3 -disabled', url: 'https://www.google.com', urlExternalTarget: '_blank', disabled: true, iconSvgName: 'file:regular', iconTypeClass: 'warning' },
            ],
        },
    ];
}
```

### Other examples

- [Options: Action Icons](samples/eui-sidebar-menu/has-action-icons)
- [Options: Expand all items](samples/eui-sidebar-menu/expand-all)
- [Options: hasCollapsedInitials](samples/eui-sidebar-menu/has-collapsed-initials)
- [Options: hasIcons](samples/eui-sidebar-menu/has-icons)
- [Options: hasTooltip](samples/eui-sidebar-menu/has-tooltip)
- [Options: hasTooltipOnExpanded](samples/eui-sidebar-menu/has-tooltip-on-expanded)
- [Options: Icon Svg](samples/eui-sidebar-menu/icon-svg)
- [Options: With tags](samples/eui-sidebar-menu/with-tags)
- [Main features: Responsive layout](samples/eui-sidebar-menu/responsive)
- [Event handlers: Events](samples/eui-sidebar-menu/events)

## Accessibility

<code class="eui-u-text-code">eui-sidebar-menu</code> is using internally the <code class="eui-u-text-code">eui-menu</code> component. <br>
When <code class="eui-u-text-code">hasFilter</code>: an <code class="eui-u-text-code">input</code> field is added which has been given a meaningfull label via <code class="eui-u-text-code">[attr.aria-label]="searchFilterLabel"</code>. Two <code class="eui-u-text-code">span</code> icons are added as well that are announced through <code class="eui-u-text-code">aria-label="Search Icon"</code> and <code class="eui-u-text-code">aria-label="Clear"</code> accordingly. <br>

<p class="eui-u-text-paragraph">The menu itself consists of a <code class="eui-u-text-code">ul</code> element which behaves as a <code class="eui-u-text-code">role="menubar"</code> holding <code class="eui-u-text-code">li</code> items which behave as <code class="eui-u-text-code">role="menuitem"</code>.</p>
<div class="eui-u-ml-m">
    <ul>
        <li style="list-style: inside;">The menu item has an <code class="eui-u-text-code">attr.aria-label</code> attached which equals either to tha label, the tagLabel or the iconLabel depending on the content of the item.</li>
        <li style="list-style: inside;">If the menu item <code class="eui-u-text-code">hasIcons</code> a span icon is added with <code class="eui-u-text-code">[attr.aria-label]="item.iconLabel"</code>.</li>
        <li style="list-style: inside;">If the menu item is <code class="eui-u-text-code">disabled</code> the <code class="eui-u-text-code">[attr.aria-disabled]="item.disabled"</code> is automatically added.</li>
        <li style="list-style: inside;">If the menu item has children then <code class="eui-u-text-code">aria-haspopup</code> becomes true and a toggle <code class="eui-u-text-code">button</code> is added as well which is announced via <code class="eui-u-text-code">[attr.aria-label]="item.expanded ? expandMenuLabel : collapseMenuLabel"</code></li>
        <li style="list-style: inside;">If the menu item contains children and is expanded a corresponding <code class="eui-u-text-code">attr.aria-expanded</code>, is added which which announces the expanded/collapsed state to the screen reader users.</li>
        <li style="list-style: inside;">If a sub item <code class="eui-u-text-code">hasMarker</code>, then a corresponding <code class="eui-u-text-code">span</code> is added which has an <code class="eui-u-text-code">[attr.aria-label]="itemSub.markerTypeClass + ' ' + 'marker'"</code>.</li>
    </ul>
</div>

<div class="doc-sample-section-title">Keyboard interaction</div>
<p>Navigation within eui-sidebar-menu is following the patterns described in the menu/menubar section of <a href="https://www.w3.org/WAI/ARIA/apg/patterns/menubar/">Aria Authoring Practices Guide(APG)</a>.</p>
<p>In order for the navigation to work properly you need to make sure that your items are unique, meaning that if there are items with the same label you need to pass a unique id in order to differentiate them.</p>
<div class="row eui-u-flex-wrap">
    <table class="eui-table-default eui-table-default--responsive eui-table-default--bordered eui-table-default--compact">
        <thead>
            <tr>
                <th>Shortcut</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><kbd class="eui-u-text-kbd">Tab</kbd></td>
                <td>Moves focus into the menubar. When the focus is on a menuitem it moves the focus to the next interactive element outside the menubar. <br>
                    Attention:  Because menubar and menu elements are composite widgets, Tab and Shift + Tab do not move focus among the items in the menu. Instead, the keyboard commands described in this section enable users to move focus among the elements in a menubar or menu. More info <a href="https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_general_within">here</a>.
                </td>
            </tr>
            <tr>
                <td><kbd class="eui-u-text-kbd">Left_Arrow</kbd></td>
                <td>When focus is on a menuitem that has children and the menuitem is expanded, it collapses the menu item. <br>
                    If the item contains an action icon, it moves focus to the action icon and back to the menu item. In that case if the item has children the submenu is expanded/collapsed using the Enter key only.
                </td>
            </tr>
            <tr>
                <td><kbd class="eui-u-text-kbd">Right_Arrow</kbd></td>
                <td>When focus is on a menuitem that has children and the menuitem is collapsed, it expands the menu item. <br>
                    If the item contains an action icon, it moves focus to the action icon and back to the menu item. In that case if the item has children the submenu is expanded/collapsed using the Enter key only.
                </td>
            </tr>
            <tr>
                <td><kbd class="eui-u-text-kbd">Up_Arrow</kbd></td>
                <td>Moves focus to the previous menu item on a menubar enabling wrapping from the first to the last item. <br>
                    If the focus is on a menu item within a submenu it moves focus to the previous item without wrapping.
                </td>
            </tr>
            <tr>
                <td><kbd class="eui-u-text-kbd">Down_Arrow</kbd></td>
                <td>Moves focus to the next menu item enabling wrapping from the last to the first item. <br>
                    If the focus is on a menu item within a submenu it moves focus to the next item without wrapping.
                </td>
            </tr>
            <tr>
                <td><kbd class="eui-u-text-kbd">Enter</kbd></td>
                <td>When the focus is on a menu item that performs a function(link, url) it performs the navigation function. If there is no function and the item has children it expands/collapses the parent menu item. <br>
                    If a menuitem has action icon and the focus is on the action icon, it triggers the action icon.
                </td>
            </tr>
        </tbody>
    </table>
</div>

<!-- LEFT blank showcase central link provided in showcase doc-page component -->
