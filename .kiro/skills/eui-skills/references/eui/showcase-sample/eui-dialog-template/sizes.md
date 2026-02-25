---
description: Template-driven dialogs opened via ViewChild showing width/height sizing, mobile custom size, and fullscreen mode.
id: sizes
---

```html
<div class="eui-u-flex eui-u-flex-wrap">
    <button euiButton type="button" (click)="openDialog1()" class="eui-u-mr-m eui-u-mb-m" aria-haspopup="dialog">Open Dialog (50% width)</button>
    <button euiButton type="button" (click)="openDialog2()" class="eui-u-mr-m eui-u-mb-m" aria-haspopup="dialog">Open Dialog (50% height)</button>
    <button euiButton type="button" (click)="openDialog3()" class="eui-u-mr-m eui-u-mb-m" aria-haspopup="dialog">Open Dialog (100% width, 100% height)</button>
    <button euiButton type="button" (click)="openDialog4()" class="eui-u-mr-m eui-u-mb-m" aria-haspopup="dialog">Open custom size Dialog</button>
    <button euiButton type="button" (click)="openDialog5()" class="eui-u-mr-m eui-u-mb-m" aria-haspopup="dialog">Open Dialog (fullscreen)</button>
</div>

<eui-dialog #dialog1 [title]="'Dialog title'" [width]="'50vw'">
    @if (dialog1.isOpen) {
        <eui-showcase-doc-lorem-ipsum [textSize]="'small'" />
    }
</eui-dialog>

<eui-dialog #dialog2 [title]="'Dialog title'" [height]="'50vh'">
    @if (dialog2.isOpen) {
        <eui-showcase-doc-lorem-ipsum [textSize]="'medium'" />
    }
</eui-dialog>

<eui-dialog #dialog3 [title]="'Dialog title'" [height]="'100vh'" [width]="'100vw'">
    @if (dialog3.isOpen) {
        <eui-showcase-doc-lorem-ipsum [textSize]="'large'" />
    }
</eui-dialog>

<eui-dialog #dialog4 [title]="'Welcome to EU Sign'" [width]="'320px'" [hasMobileCustomSize]="true">
    <eui-dialog-header>
        <div class="eui-u-f-2xl eui-u-text-center">
            <span class="eui-u-c-primary"><strong>Welcome</strong></span> to EU Sign
        </div>
    </eui-dialog-header>

    <div class="eui-u-text-center eui-u-m-m">
        Please connect to your EU Login account to access EU Sign.
    </div>

    <eui-dialog-footer>
        <button euiButton type="button" euiPrimary (click)="onDialogLogin()">Log in</button>
    </eui-dialog-footer>
</eui-dialog>

<eui-dialog #dialog5 [title]="'Dialog title in full screen'" [isFullScreen]="true">
    @if (dialog5.isOpen) {
        <eui-showcase-doc-lorem-ipsum [textSize]="'large'" />
    }
</eui-dialog>
```

```typescript
import { Component, ChangeDetectionStrategy, viewChild } from "@angular/core";

import { EUI_DIALOG, EuiDialogComponent } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_INPUT_GROUP } from "@eui/components/eui-input-group";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_SELECT } from "@eui/components/eui-select";
import { EUI_SHOWCASE } from "@eui/showcase";

@Component({
    selector: 'sizes',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
        ...EUI_INPUT_GROUP,
        ...EUI_LABEL,
        ...EUI_SELECT,
        ...EUI_SHOWCASE,
        ...EUI_DIALOG,
    ],
    styles: ['ul li {list-style: initial}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesComponent {

    readonly dialog1 = viewChild<EuiDialogComponent>('dialog1');
    readonly dialog2 = viewChild<EuiDialogComponent>('dialog2');
    readonly dialog3 = viewChild<EuiDialogComponent>('dialog3');
    readonly dialog4 = viewChild<EuiDialogComponent>('dialog4');
    readonly dialog5 = viewChild<EuiDialogComponent>('dialog5');

    public openDialog1(): void {
        this.dialog1().openDialog();
    }

    public openDialog2(): void {
        this.dialog2().openDialog();
    }

    public openDialog3(): void {
        this.dialog3().openDialog();
    }

    public openDialog4(): void {
        this.dialog4().openDialog();
    }

    public openDialog5(): void {
        this.dialog5().openDialog();
    }
    public onDialogLogin(): void {
        this.dialog4().closeDialog();
    }

}
```

