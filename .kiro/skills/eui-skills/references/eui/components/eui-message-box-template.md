# eui-message-box-template

## Overview

<p class="eui-u-text-paragraph">The <code class="eui-u-text-code">eui-message-box</code> component is a type of modal window that appears in front of app content to inform users about a task, provide additional (critical) information or require decisions.</p>

<div class="doc-sample-section-title">Usage</div>
<p class="eui-u-text-paragraph"><code class="eui-u-text-code">eui-message-box</code> can be used as a Template driven approach by declaring the <code class="eui-u-text-code">&lt;eui-message-box&gt;&lt;/eui-message-box&gt;</code> directly in the view, then it will work with <code class="eui-u-text-code">&#64;Input</code> and <code class="eui-u-text-code">&#64;Output</code> properties.<br/>
<br/>
Documentation about usage with <strong>EuiMessageBoxService</strong> available <a href="/eui-showcase-ux-components-21.x/style-guide/components/eui-message-box-service">here</a>.
</p>

## Samples

### [Default](samples/eui-message-box-template/default)

```html
<button euiButton type="button" (click)="openMessageBox()" aria-haspopup="dialog">Open Message Box</button><br/><br/>

<eui-message-box #messageBox
    [title]="'Message box title'"
    (messageBoxClose)="onClose()"
    (messageBoxOpen)="onOpen()"
    (accept)="onAccept()"
    (dismiss)="onDismiss()">
    <div class="eui-u-flex">
        Message box content
    </div>
</eui-message-box>
```

```typescript
import { Component, ViewChild } from '@angular/core';

import { EuiMessageBoxComponent, EUI_MESSAGE_BOX } from "@eui/components/eui-message-box";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'default',
    templateUrl: 'component.html',
    imports: [...EUI_MESSAGE_BOX, ...EUI_BUTTON],    
})
export class DefaultComponent {

    @ViewChild('messageBox') messageBox: EuiMessageBoxComponent;

    public openMessageBox(): void {
        this.messageBox.openMessageBox();
    }

    public onClose(): void {
        console.log('close from output');
    }

    public onOpen(): void {
        console.log('open from output');
    }

    public onAccept(): void {
        console.log('accept from output');
    }

    public onDismiss(): void {
        console.log('dismiss from output');
    }
}
```

### Other examples

- [variants: Colors](samples/eui-message-box-template/color)
- [Options: Buttons label](samples/eui-message-box-template/button-label)
- [Main features: Component injection](samples/eui-message-box-template/component-injection-template)
- [Main features: Disable buttons](samples/eui-message-box-template/disable-buttons)
- [Main features: Draggable](samples/eui-message-box-template/draggable)
- [Event handlers: Events](samples/eui-message-box-template/event-handler)
- [Event handlers: Handle events](samples/eui-message-box-template/handle-events)

## Accessibility

<p class="eui-u-text-paragraph">The <code class="eui-u-text-code">eui-message-box</code> component creates a modal dialog that implements the ARIA role="alertdialog" pattern by default. <br>
The trigger element of the eui-dialog needs to have an <code class="eui-u-text-code">aria-haspopup</code> set to alertdialog in order for the screen reader users to be aware that an alertdialog popup is about to open. A corresponding <code class="eui-u-text-code">aria-modal</code> attribute is attached to the <code class="eui-u-text-code">eui-dialog-container</code> to inform assistive technologies that content outside the dialog is inert. <br>
Once the message box opens it sets the focus automatically on the first focusable element. It contains a value for <code class="eui-u-text-code">aria-labelledby</code> that refers to the element containing the title of the dialog if the dialog has a visible label and also a value set for <code class="eui-u-text-code">aria-describedby</code> that refers to the element containing the dialog message.</p>


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
            <td>Move focus to next focusable element</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Shift</kbd> + <kbd class="eui-u-text-kbd">Tab</kbd></td>
            <td>Move focus to previous focusable element</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Esc</kbd> escape key</td>
            <td>Close the message box</td>
        </tr>
    </tbody>
</table>
<!-- LEFT blank showcase central link provided in showcase doc-page component -->
