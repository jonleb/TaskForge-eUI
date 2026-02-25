# eui-dialog-template

## Overview

<p class="eui-u-text-paragraph">The <code class="eui-u-text-code">eui-dialog</code> component is a type of modal window that appears in front of the app content to inform users about a task, provide additional (critical) information or require decisions.</p>

<div class="doc-sample-section-title">Usage</div>
<p class="eui-u-text-paragraph"><code class="eui-u-text-code">eui-dialog</code> can now be used as a Template driven approach by declaring the <code class="eui-u-text-code">&lt;eui-dialog&gt;&lt;/eui-dialog&gt;</code> directly into the view and using the typical <code class="eui-u-text-code">&#64;Input</code> and <code class="eui-u-text-code">&#64;Output</code> properties.
<br/>
It can also be used, as in the previous version, by dynamically injectig the modal dialog into the DOM via the provided <strong>EuiDialogService</strong>.<br/>
<br/>
Documentation about usage with <strong>EuiDialogService</strong> available <a href="/eui-showcase-ux-components-21.x/style-guide/components/eui-dialog-service">here</a>.
</p>

## Samples

### [Default](samples/eui-dialog-template/Default)

```html
<button euiButton type="button" (click)="openDialog()" aria-haspopup="dialog">Open Dialog</button>

<eui-dialog #dialog
    [title]="'Dialog title'"
    (clickOutside)="onClickOutside()"
    (close)="onClose()"
    (open)="onOpen()"
    (accept)="onAccept()"
    (dismiss)="onDismiss()">
    Dialog content
</eui-dialog>
```

```typescript
import { Component, ViewChild } from "@angular/core";

import { EUI_DIALOG, EuiDialogComponent } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_DIALOG, ...EUI_BUTTON],
})
export class DefaultComponent {

    @ViewChild('dialog') dialog: EuiDialogComponent;

    public openDialog(): void {
        this.dialog.openDialog();
    }

    public onClickOutside(): void {
        console.log('clickOutside from output');
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

- [Options: Alignment](samples/eui-dialog-template/alignment)
- [Options: Button label](samples/eui-dialog-template/button-label)
- [Options: classList](samples/eui-dialog-template/classlist)
- [Options: Closing](samples/eui-dialog-template/closing)
- [Options: Hide buttons](samples/eui-dialog-template/hide-buttons)
- [Options: No body padding](samples/eui-dialog-template/no-body-padding)
- [Options: No footer](samples/eui-dialog-template/no-footer)
- [Options: Scrolling](samples/eui-dialog-template/scrolling)
- [Options: Sizes](samples/eui-dialog-template/sizes)
- [Main features: Component injection](samples/eui-dialog-template/component-injection-template)
- [Main features: Disable buttons](samples/eui-dialog-template/disable-buttons)
- [Main features: Draggable](samples/eui-dialog-template/draggable)
- [Event handlers: Events](samples/eui-dialog-template/event-handler)
- [Event handlers: Handle events](samples/eui-dialog-template/handle-events)
- [Misc: Change title dynamically](samples/eui-dialog-template/change-title)
- [Misc: Multiple dialog with template](samples/eui-dialog-template/multiple-dialog-template)
- [Misc: With eui-block-content](samples/eui-dialog-template/with-eui-block-content)
- [Misc: With eui-block-document](samples/eui-dialog-template/with-eui-block-document)
- [Misc: With eui-editor](samples/eui-dialog-template/with-eui-editor)
- [Misc: With eui-list](samples/eui-dialog-template/with-eui-list)
- [Misc: With overlay component](samples/eui-dialog-template/with-overlay-component)
- [Misc: With selectable options](samples/eui-dialog-template/with-selectable-options)

## Accessibility

<p class="eui-u-text-paragraph">The <code class="eui-u-text-code">eui-dialog</code> component creates a modal dialog that implements the ARIA role="dialog" pattern by default. <br>
The trigger element of the eui-dialog needs to have an <code class="eui-u-text-code">aria-haspopup</code> set to dialog in order for the screen reader users to be aware that a dialog popup is about to open. A corresponding <code class="eui-u-text-code">aria-modal</code> attribute is attached to the <code class="eui-u-text-code">eui-dialog-container</code> to inform assistive technologies that content outside the dialog is inert. <br>
Once the dialog opens it sets the focus automatically on the first focusable element, usually the close icon button. It contains a value for <code class="eui-u-text-code">aria-labelledby</code> that refers to the element containing the title of the dialog if the dialog has a visible label and also a value set for <code class="eui-u-text-code">aria-describedby</code> that refers to the element containing the dialog message.</p>


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
            <td>Close the dialog window</td>
        </tr>
    </tbody>
</table>
<br>
<!-- LEFT blank showcase central link provided in showcase doc-page component -->
