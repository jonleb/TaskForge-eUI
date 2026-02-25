# eui-overlay

## Overview

<p class="eui-u-text-paragraph">
    The <code class="eui-u-text-code">eui-overlay</code> is a panel which is displayed, on demand, over the page layout at the right of the screen (default).
    <br>
    It has been designed to display simple to advanced information by using predefined layout sections which are totally custom (empty by default):
</p>
<ul>
    <li>the header : optional, usually contains the overlay title and the close overlay action button/icon.</li>
    <li>the body : contains the main information, usually lists, forms, etc. This section is automatically scrollable when content exceeds the height's viewport.</li>
    <li>the footer : optional, contains all related actions (buttons).</li>
</ul>
See samples for various examples.

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | isActive | boolean | false |
| Input | euiHighlighted | boolean | false |
| Input | hasClosedOnClickOutside | boolean | false |
| Input | position | string | 'right' |
| Input | width | string | - |
| Input | fixedWidth | string | - |
| Output | activeState | unknown | new EventEmitter<boolean>() |

## Samples

### [isActive](samples/eui-overlay/Default)

```html
<p class="eui-u-text-paragraph">The <code class="eui-u-text-code">eui-overlay</code> panel is displayed when the <code class="eui-u-text-code">isActive</code> property is set to true.</p>

<button aria-haspopup="dialog" aria-label="Overlay trigger button" euiButton euiOutline euiPrimary (click)="toggleOverlay($event)">Overlay isActive = {{ isOverlayActive }}</button>

<eui-overlay [isActive]="isOverlayActive" (activeState)="updateActiveState($event)"></eui-overlay>


<button aria-haspopup="dialog" aria-label="Overlay trigger button (custom content)" euiButton euiOutline euiPrimary (click)="toggleOverlayCustom($event)">custom Overlay isActive = {{ isOverlayActiveCustom }}</button>

<eui-overlay [isActive]="isOverlayActiveCustom" (activeState)="updateActiveStateCustom($event)">
    <eui-overlay-content>
        custom content
    </eui-overlay-content>
</eui-overlay>
```

```typescript
import { Component } from '@angular/core';

import { EUI_OVERLAY } from '@eui/components/eui-overlay';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_OVERLAY,
        ...EUI_BUTTON,
    ],
})
export class DefaultComponent {
    public isOverlayActive = false;
    public isOverlayActiveCustom = false;

    public toggleOverlay(e: Event) {
        this.isOverlayActive = !this.isOverlayActive;
    }
    public toggleOverlayCustom(e: Event) {
        this.isOverlayActiveCustom = !this.isOverlayActiveCustom;
    }

    updateActiveState(event: boolean) {
        this.isOverlayActive = event;
    }
    updateActiveStateCustom(event: boolean) {
        this.isOverlayActiveCustom = event;
    }
}
```

### Other examples

- [Options: Position](samples/eui-overlay/position)
- [Options: Width](samples/eui-overlay/width)
- [Options: Resizable](samples/eui-overlay/resizable)
- [Main Features: Close on click outside](samples/eui-overlay/close-on-click-outside)
- [Main Features: Header title predefined](samples/eui-overlay/header-title)
- [Main Features: Layout](samples/eui-overlay/layout)
- [Composition: Advanced layout sample](samples/eui-overlay/advanced)

## Accessibility

<p class="eui-u-text-paragraph">The <code class="eui-u-text-code">eui-overlay</code> component should be triggered by a button html element that should also have an <code class="eui-u-text-code">aria-haspopup</code> set to dialog in order for the screen reader users to be aware that a dialog popup is about to open.<br>
The eui-overlay container has accordingly a <code class="eui-u-text-code">role="dialog"</code> matching the value of the aria-haspopup set to the trigger element.
Once the overlay opens it sets the focus automatically on the first focusable element(usually the close icon button) and traps the focus within the overlay interactive elements until the user closes the overlay.</p>


    <div class="doc-sample-section-title">Keyboard interaction</div>
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
                <td>Moves focus to the next focusable element</td>
            </tr>
            <tr>
                <td><kbd class="eui-u-text-kbd">Shift</kbd> + <kbd class="eui-u-text-kbd">Tab</kbd></td>
                <td>Moves focus to the previous focusable element</td>
            </tr>
            <tr>
                <td><kbd class="eui-u-text-kbd">Esc</kbd> escape key</td>
                <td>Closes the overlay window</td>
            </tr>
        </tbody>
    </table>
    <br>

<!-- LEFT blank showcase central link provided in showcase doc-page component -->
