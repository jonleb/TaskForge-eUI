---
description: Template-driven message boxes showcasing variant styles (primary, secondary, info, success, warning, danger).
id: color
---

```html
<div class="eui-u-flex eui-u-flex-wrap">
    <button euiButton type="button" euiPrimary (click)="openMessageBoxPrimary()" class="eui-u-mr-m eui-u-mb-m" aria-haspopup="dialog">Open Message Box Primary</button>
    <button euiButton type="button" euiSecondary (click)="openMessageBoxSecondary()" class="eui-u-mr-m eui-u-mb-m" aria-haspopup="dialog">Open Message Box Secondary</button>
    <button euiButton type="button" euiInfo (click)="openMessageBoxInfo()" class="eui-u-mr-m eui-u-mb-m" aria-haspopup="dialog">Open Message Box Info</button>
    <button euiButton type="button" euiSuccess (click)="openMessageBoxSuccess()" class="eui-u-mr-m eui-u-mb-m" aria-haspopup="dialog">Open Message Box Success</button>
    <button euiButton type="button" euiWarning (click)="openMessageBoxWarning()" class="eui-u-mr-m eui-u-mb-m" aria-haspopup="dialog">Open Message Box Warning</button>
    <button euiButton type="button" euiDanger (click)="openMessageBoxDanger()" class="eui-u-mr-m eui-u-mb-m" aria-haspopup="dialog">Open Message Box Danger</button>
</div>

<eui-message-box #messageBoxPrimary [title]="'Message Box Primary'" euiVariant="primary">
    Message Box content
</eui-message-box>

<eui-message-box #messageBoxSecondary [title]="'Message Box Secondary'" euiVariant="secondary">
    Message Box content
</eui-message-box>

<eui-message-box #messageBoxInfo [title]="'Message Box Info'" euiVariant="info">
    Message Box content
</eui-message-box>

<eui-message-box #messageBoxSuccess [title]="'Message Box Success'" euiVariant="success">
    Message Box content
</eui-message-box>

<eui-message-box #messageBoxWarning [title]="'Message Box Warning'" euiVariant="warning">
    Message Box content
</eui-message-box>

<eui-message-box #messageBoxDanger [title]="'Message Box Danger'" euiVariant="danger">
    Message Box content
</eui-message-box>
```

```typescript
import { Component, ChangeDetectionStrategy, viewChild } from "@angular/core";

import { EuiMessageBoxComponent, EUI_MESSAGE_BOX } from "@eui/components/eui-message-box";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'color',
    templateUrl: 'component.html',
    imports: [...EUI_MESSAGE_BOX, ...EUI_BUTTON],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorComponent {

    readonly messageBoxPrimary = viewChild<EuiMessageBoxComponent>('messageBoxPrimary');
    readonly messageBoxSecondary = viewChild<EuiMessageBoxComponent>('messageBoxSecondary');
    readonly messageBoxInfo = viewChild<EuiMessageBoxComponent>('messageBoxInfo');
    readonly messageBoxSuccess = viewChild<EuiMessageBoxComponent>('messageBoxSuccess');
    readonly messageBoxWarning = viewChild<EuiMessageBoxComponent>('messageBoxWarning');
    readonly messageBoxDanger = viewChild<EuiMessageBoxComponent>('messageBoxDanger');

    public openMessageBoxPrimary(): void {
        this.messageBoxPrimary().openMessageBox();
    }

    public openMessageBoxSecondary(): void {
        this.messageBoxSecondary().openMessageBox();
    }

    public openMessageBoxInfo(): void {
        this.messageBoxInfo().openMessageBox();
    }

    public openMessageBoxSuccess(): void {
        this.messageBoxSuccess().openMessageBox();
    }

    public openMessageBoxWarning(): void {
        this.messageBoxWarning().openMessageBox();
    }

    public openMessageBoxDanger(): void {
        this.messageBoxDanger().openMessageBox();
    }

}
```

