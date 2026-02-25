---
description: Template-driven message boxes with accept or dismiss buttons disabled via inputs.
id: disable-buttons
---

```html
<button euiButton type="button" (click)="openMessageBoxNoDismissButton()" aria-haspopup="dialog">Open MessageBox - No dismiss button</button>&nbsp;
<button euiButton type="button" (click)="openMessageBoxNoAcceptButton()" aria-haspopup="dialog">Open MessageBox - No accept button</button>

<eui-message-box #messageBoxNoDismissButton [title]="'Message Box title'" [hasDismissButton]="false">
    <p class="eui-u-text-paragraph">Message Box content</p>
</eui-message-box>

<eui-message-box #messageBoxNoAcceptButton [title]="'Message Box title'" [hasAcceptButton]="false">
    <p class="eui-u-text-paragraph">Message Box content</p>
</eui-message-box>
```

```typescript
import { Component, ChangeDetectionStrategy, viewChild } from "@angular/core";

import { EuiMessageBoxComponent, EUI_MESSAGE_BOX } from "@eui/components/eui-message-box";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'disable-buttons',
    templateUrl: 'component.html',
    imports: [...EUI_MESSAGE_BOX, ...EUI_BUTTON],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisableButtonsComponent {

    readonly messageBoxNoDismissButton = viewChild<EuiMessageBoxComponent>('messageBoxNoDismissButton');
    readonly messageBoxNoAcceptButton = viewChild<EuiMessageBoxComponent>('messageBoxNoAcceptButton');

    public openMessageBoxNoDismissButton(): void {
        this.messageBoxNoDismissButton().openMessageBox();
    }

    public openMessageBoxNoAcceptButton(): void {
        this.messageBoxNoAcceptButton().openMessageBox();
    }

}
```

