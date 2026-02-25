# eui-dialog-service

## Overview

<p class="eui-u-text-paragraph">The <code class="eui-u-text-code">eui-dialog</code> component is a type of modal window that appears in front of the app content to inform users about a task, provide additional (critical) information or require decisions.</p>

<div class="doc-sample-section-title">Usage</div>
<p class="eui-u-text-paragraph"><code class="eui-u-text-code">eui-dialog</code> can now be used as a Template driven approach by declaring the <code class="eui-u-text-code">&lt;eui-dialog&gt;&lt;/eui-dialog&gt;</code> directly into the view and using the typical <code class="eui-u-text-code">&#64;Input</code> and <code class="eui-u-text-code">&#64;Output</code> properties.
<br/>
It can also be used, as in the previous version, by dynamically injectig the modal dialog into the DOM via the provided <strong>EuiDialogService</strong>.<br/>
<br/>
Documentation about usage in <strong>template driven</strong> available <a href="/eui-showcase-ux-components-21.x/style-guide/components/eui-dialog-template">here</a>.
</p>

## Samples

### [Default](samples/eui-dialog-service/Default)

```html
<button euiButton type="button" (click)="openWithService()" aria-haspopup="dialog">Open Dialog</button>
```

```typescript
import { Component } from "@angular/core";

import { EUI_DIALOG, EuiDialogConfig, EuiDialogService } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_DIALOG, ...EUI_BUTTON],
})
export class DefaultComponent {

    constructor(private euiDialogService: EuiDialogService) {}

    public openWithService(): void {
        const config = new EuiDialogConfig({
            title: 'Dialog title',
            content: 'Dialog content',
            open: () => {
                console.log('open from user config');
            },
            clickOutside: (instances) => {
                console.log('instances', instances);
                console.log('clickOutside from user config');
            },
            close: (instances) => {
                console.log('instances', instances);
                console.log('close from user config');
            },
            dismiss: (instances) => {
                console.log('instances', instances);
                console.log('dismiss from user config');
            },
            accept: (instances) => {
                console.log('instances', instances);
                console.log('accept from user config');
            },
        });

        this.euiDialogService.openDialog(config);
    }

}
```

### Other examples

- [Options: Alignment](samples/eui-dialog-service/alignment)
- [Options: Button label](samples/eui-dialog-service/button-label)
- [Options: classList](samples/eui-dialog-service/classlist)
- [Options: Closing](samples/eui-dialog-service/closing)
- [Options: Hide buttons](samples/eui-dialog-service/hide-buttons)
- [Options: No body padding](samples/eui-dialog-service/no-body-padding)
- [Options: No footer](samples/eui-dialog-service/no-footer)
- [Options: Scrolling](samples/eui-dialog-service/scrolling)
- [Options: Sizes](samples/eui-dialog-service/sizes)
- [Main features: Component injection](samples/eui-dialog-service/component-injection-service)
- [Main features: Disable buttons](samples/eui-dialog-service/disable-buttons)
- [Main features: Draggable](samples/eui-dialog-service/draggable)
- [Main features: Providers](samples/eui-dialog-service/providers)
- [Event handlers: Events](samples/eui-dialog-service/event-handler)
- [Event handlers: Handle events](samples/eui-dialog-service/handle-events)
- [Misc: Change title dynamically](samples/eui-dialog-service/change-title)
- [Misc: Multiple dialog with service](samples/eui-dialog-service/multiple-dialog-service)
- [Misc: With eui-block-content](samples/eui-dialog-service/with-eui-block-content)
- [Misc: With eui-block-document](samples/eui-dialog-service/with-eui-block-document)
- [Misc: With eui-editor](samples/eui-dialog-service/with-eui-editor)
- [Misc: With eui-list](samples/eui-dialog-service/with-eui-list)
- [Misc: With eui-message-box](samples/eui-dialog-service/with-msg-box)
- [Misc: With overlay component](samples/eui-dialog-service/with-overlay-component)
- [Misc: With selectable options](samples/eui-dialog-service/with-selectable-options)

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
