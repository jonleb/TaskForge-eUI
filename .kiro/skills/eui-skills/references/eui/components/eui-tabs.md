# eui-tabs

## Overview

<p class="eui-u-text-paragraph">eUI Tabs component helps to organize content into separate views where only one view can be visible at a time.
Each tab's label is shown in the tab header and the active tab is designated with a primary ink bar visual.
The active tab may be set using the <code class="eui-u-text-code">activeTabIndex</code> input option or when the user selects one of the tab labels in the header.</p>
<p class="eui-u-text-paragraph">When the list of tab labels exceeds the width of the header or its container, pagination controls appear to let the user scroll left and right across the tabs.</p>

<br/>

<eui-card [euiCollapsible]="true" [euiCollapsed]="true">
    <eui-card-header>
        <eui-card-header-title>Migrate from the legacy eui-tabs</eui-card-header-title>
    </eui-card-header>
    <eui-card-content>
        <div tabindex="0" style="overflow-y: auto;">
            - <code class="eui-u-text-code">&#64;Input()</code> tabs has been removed. Tabs needs to be declared in the component view with &lt;eui-tab&gt;.<br/>
            - <code class="eui-u-text-code">&#64;Input() patchMatch</code> has been removed. <code class="eui-u-text-code">RouterModule</code> needs to be imported at component level.<br/>
            - <code class="eui-u-text-code">&#64;Input() isHandleChangeTab</code> has been renamed to <code class="eui-u-text-code">isHandleActivateTab</code> and moved to &lt;eui-tab&gt; component.<br/>
            - <code class="eui-u-text-code">&#64;Input() isSubTabs</code> has been removed as tabs can be natively neseted.<br/>
            - <code class="eui-u-text-code">&#64;Input() isVerticalTabs</code> has been removed.<br/>
            - <code class="eui-u-text-code">&#64;Output() tabSelect</code> has been renamed to <code class="eui-u-text-code">tabActivate</code>.<br/>
            - public method <code class="eui-u-text-code">changeTab(tabIndex)</code> has been renamed to <code class="eui-u-text-code">activateTab(tabIndex)</code>.<br/>
            - <code class="eui-u-text-code">eui-tab-label, euiTabLabel</code> components has been renamed <code class="eui-u-text-code">eui-tab-header</code>.<br/>
            - <code class="eui-u-text-code">eui-tab-content, euiTabContent</code> components has been renamed <code class="eui-u-text-code">eui-tab-body</code>.<br/>
        </div>
    </eui-card-content>
</eui-card>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | e2eAttr | string | 'eui-tabs' |
| Input | activeTabIndex | number | 0 |
| Input | ariaLabel | string | 'eUI Tabs' |
| Input | isMainNavigation | boolean | false |
| Input | isFlat | boolean | false |
| Output | tabClose | unknown | new EventEmitter<{ tab: EuiTabComponent |
| Output | tabActivate | unknown | new EventEmitter<{ tab: EuiTabComponent |
| Output | tabClick | unknown | new EventEmitter<{ tab: EuiTabComponent |

## Samples

### [Default](samples/eui-tabs/Default)

```html
<div class="doc-sample-section-title">Template</div>

<eui-tabs>
    <eui-tab>
        <eui-tab-header>
            <eui-tab-header-label>
                Tab 1
            </eui-tab-header-label>
            <eui-tab-header-sub-label>
                sub-label
            </eui-tab-header-sub-label>
        </eui-tab-header>
        <eui-tab-body>
            Tab content 1
        </eui-tab-body>
    </eui-tab>

    <eui-tab>
        <eui-tab-header>
            <eui-tab-header-label>
                Tab 2
            </eui-tab-header-label>
            <eui-tab-header-sub-label>
                sub-label
            </eui-tab-header-sub-label>
        </eui-tab-header>
        <eui-tab-body>
            Tab content 2
        </eui-tab-body>
    </eui-tab>
</eui-tabs>

<div class="doc-sample-section-title">Array of tabs</div>

<eui-tabs>
    @for (tab of tabs; let i = $index; track tab) {
        <eui-tab>
            <eui-tab-header>
                <eui-tab-header-label>
                   {{ tab.tabLabel }}
                </eui-tab-header-label>
                <eui-tab-header-sub-label>
                    {{ tab.tabSubLabel }}
                </eui-tab-header-sub-label>
            </eui-tab-header>
            <eui-tab-body>{{ tab.tabContent }}</eui-tab-body>
        </eui-tab>
    }
</eui-tabs>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_TABS } from "@eui/components/eui-tabs";
import { EUI_LABEL } from '@eui/components/eui-label';

@Component({
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_LABEL,
        ...EUI_TABS,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {

    public tabs = [
        { tabLabel: 'Tab 1', tabSubLabel: 'Tab Sublabel 1', tabContent: 'Content 1' },
        { tabLabel: 'Tab 2', tabSubLabel: 'Tab Sublabel 2', tabContent: 'Content 2' },
        { tabLabel: 'Tab 3', tabSubLabel: 'Tab Sublabel 3', tabContent: 'Content 3' },
    ];

}
```

### Other examples

- [Variants: Colors](samples/eui-tabs/colors)
- [Variants: isFlat](samples/eui-tabs/is-flat)
- [Variants: isMainNavigation](samples/eui-tabs/is-main-navigation)
- [Options: hasNoContentPadding](samples/eui-tabs/has-no-content-padding)
- [Options: isClosable](samples/eui-tabs/closable)
- [Options: isDisabled](samples/eui-tabs/disable)
- [Options: isVisible](samples/eui-tabs/visible)
- [Main Features: Init on any tab](samples/eui-tabs/init-on-other-tab)
- [Main Features: isHandleActivateTab](samples/eui-tabs/handle-activate)
- [Main Features: isHandleCloseOnClose](samples/eui-tabs/handle-close)
- [Main Features: Right content](samples/eui-tabs/right-content)
- [Main Features: Scrollable Tabs](samples/eui-tabs/scrollable-tabs)
- [Main Features: Using Router](samples/eui-tabs/using-router)
- [Compositions: With icon and badge](samples/eui-tabs/with-icon-badge)
- [Event Handlers: Events](samples/eui-tabs/event-handlers)
- [Misc: With component](samples/eui-tabs/with-component)
- [Misc: Add a tab](samples/eui-tabs/add-tab)
- [Misc: Insert a tab](samples/eui-tabs/insert-tab)

## Accessibility

<code class="eui-u-text-code">eui-tabs</code> are a set of layered sections of content, known as tab panels, that display one panel of content at a time. Each tab panel has an associated tab element, that when activated, displays the panel. <br>
The list of tab elements is arranged along one edge of the currently displayed panel and it is a <code class="eui-u-text-code">ul</code> html element having a <code class="eui-u-text-code">role="tablist"</code> that is announced to the screen readers through the <code class="eui-u-text-code">ariaLabel</code> Input property which defaults to 'eUI Tabs' and it's <code class="eui-u-text-code">aria-orientation</code> property defaults to "horizontal" to indicate that the tablist is horizontally oriented.<br> 
The tablist holds several <code class="eui-u-text-code">eui-tab</code> items that are <code class="eui-u-text-code">li</code> html elements that behave as <code class="eui-u-text-code">role="tab"</code>. <br>
The element that contains the content panel for a tab has <code class="eui-u-text-code">role='tabpanel'</code>. <br>
Each tab has the property <code class="eui-u-text-code">aria-controls</code> referring to its associated tabpanel element. <br>
The active tab element has the state <code class="eui-u-text-code">aria-selected</code> set to true and all other tab elements have it set to false. <br>
Each tabpanel has the property <code class="eui-u-text-code">aria-labelledby</code> referring to its associated tab element. <br>
If the tab has it's <code class="eui-u-text-code">isClosable</code> property set to true, an <code class="eui-u-text-code">ariaLabel</code> attribute is attached to the corresponding icon button, to announce that it is 'Closable'.<br>
<br>
<b>Keyboard interaction</b>
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
            <td> - When focus moves into the tab list, places focus on the active tab element. <br>
                 - When the tab list contains the focus, moves focus to the next element in the page tab sequence outside the tablist, which is the tabpanel unless the first element containing meaningful content inside the tabpanel is focusable.
            </td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Left-Arrow</kbd></td>
            <td> When focus is on a tab element, moves focus to the previous tab. If focus is on the first tab, moves focus to the last tab.</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Right-Arrow</kbd></td>
            <td> When focus is on a tab element, moves focus to the next tab. If focus is on the last tab, moves focus to the first tab.</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Enter</kbd></td>
            <td>Activates the tab</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Home</kbd></td>
            <td>Moves focus to the first tab.</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">End</kbd></td>
            <td>Moves focus to the last tab.</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Delete</kbd></td>
            <td>If the tab is closable, deletes (closes) the current tab element and its associated tab panel and sets focus on the tab following the tab that was closed. If there is not a tab that followed the tab that was deleted, e.g., the deleted tab was the right-most tab, sets focus on the tab that preceded the deleted tab.</td>
        </tr>
    </tbody>
</table>
