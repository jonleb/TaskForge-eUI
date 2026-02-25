# eui-list

## Overview

N/C <br>

## Samples

### [Default](samples/eui-list/Default)

```html
<p class="eui-u-text-paragraph">Default list using unordered list & list items with <code class="eui-u-text-code">ul &gt; li</code> tags.</p>
<br>

<ul euiList>
    <li euiListItem (click)="onListItemClicked('1')">
        <span euiLabel>Label 1</span>
    </li>
    <li euiListItem (click)="onListItemClicked('2')">
        <span euiLabel>Label 2</span>
    </li>
    <li euiListItem (click)="onListItemClicked('3')">
        <span euiLabel>Label 3</span>
    </li>
</ul>


<div class="doc-sample-section-title">With Sub-label</div>
<ul euiList>
    <li euiListItem (click)="onListItemClicked('1')">
        <span euiLabel>Label</span>
        <span euiLabel euiSizeS>Sub-label</span>
    </li>
    <li euiListItem (click)="onListItemClicked('2')">
        <span euiLabel>Label</span>
        <span euiLabel euiSizeS>Sub-label</span>
    </li>
    <li euiListItem (click)="onListItemClicked('3')">
        <span euiLabel>Label</span>
        <span euiLabel euiSizeS>Sub-label 1</span>
        <span euiLabel euiSizeS>Sub-label 2</span>
    </li>
</ul>

<div class="doc-sample-section-title">With Sub-label & icon</div>
<ul euiList>
    <li euiListItem (click)="onListItemClicked('1')">
        <span euiIconSvg icon="circle-dashed:regular"></span>
        <span euiLabel>Label</span>
        <span euiLabel euiSizeS>Sub-label</span>
    </li>
    <li euiListItem (click)="onListItemClicked('2')">
        <span euiIconSvg icon="circle-dashed:regular"></span>
        <span euiLabel>Label</span>
        <span euiLabel euiSizeS>Sub-label</span>
    </li>
    <li euiListItem (click)="onListItemClicked('3')">
        <span euiIconSvg icon="circle-dashed:regular"></span>
        <span euiLabel>Label</span>
        <span euiLabel euiSizeS>Sub-label 1</span>
        <span euiLabel euiSizeS>Sub-label 2</span>
    </li>
</ul>
```

```typescript
import { Component } from '@angular/core';

import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_LIST } from "@eui/components/eui-list";
import { EUI_ICON } from '@eui/components/eui-icon';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'default',
    templateUrl: 'component.html',
    imports: [...EUI_LIST, ...EUI_LABEL, ...EUI_ICON],
})
export class DefaultComponent {

    public onListItemClicked(label: string) {
        console.log('Selected item:', label);
    }
}
```

### Other examples

- [Variants: Colors](samples/eui-list/colors)
- [Options: isActive](samples/eui-list/isActive)
- [Main feature: Action list](samples/eui-list/action-list)
- [Main feature: Navigation list](samples/eui-list/navigation-list)
- [Main feature: Nested list](samples/eui-list/nested-list)
- [Misc: Custom template](samples/eui-list/custom-template)
- [Misc: Within eui-card](samples/eui-list/within-card)
- [Misc: Within responsive flexbox](samples/eui-list/within-resp-flexbox)

## Accessibility

<code class="eui-u-text-code">eui-list</code> behaves as a <code class="eui-u-text-code">role="list"</code> having each of the <code class="eui-u-text-code">eui-list-item</code> behaving as <code class="eui-u-text-code">role="list-item"</code>. <br>
<br>

<div class="doc-sample-section-title">Keyboard interaction</div>
<p>Keyboard navigation within eui-list is following the patterns described in the <a href="https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#fundamentalkeyboardnavigationconventions">Aria Authoring Practices Guide(APG)</a>.</p>

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
            <td>Moves focus into the list. When the focus is on a listitem it moves the focus to the next interactive element outside of the list. <br>
                Attention:  Because lists are elements considered as composite widgets, Tab and Shift + Tab do not move focus among the items in the list. Instead, the keyboard commands described in this section enable users to move focus among the elements in a list. More info <a href="https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_general_within">here</a>.
            </td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Down_Arrow</kbd></td>
            <td>Moves focus to the next list item enabling wrapping from the last to the first item. <br>
                If the focus is on a list item within a sublist it moves focus to the next item without wrapping.
            </td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Up_Arrow</kbd></td>
            <td>Moves focus to the previous list item on a list enabling wrapping from the first to the last item. <br>
                If the focus is on a list item within a sublist it moves focus to the previous item without wrapping.
            </td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Enter</kbd></td>
            <td>When the focus is on a list item that performs a function(link, url, click) it performs the navigation function.<br>
                If a listitem has rich content(i.e. extra button) and the focus is on the extra content, it triggers the action the content might have.
            </td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Right_Arrow</kbd></td>
            <td>When the focus is on a listitem that has rich content(i.e. extra button) it moves focus to the extra content and back to the list item.</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Left_Arrow</kbd></td>
            <td>When the focus is on a listitem that has rich content(i.e. extra button) it moves focus to the extra content and back to the list item.</td>
        </tr>
    </tbody>
</table>
