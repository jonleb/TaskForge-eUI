---
description: Shows dynamic sizing, custom mobile size, and full-screen dialog modes.
id: sizes
---

```html
<button euiButton type="button" (click)="openWithService()" class="eui-u-mr-m eui-u-mb-m" aria-haspopup="dialog">Open Dialog (dynamic)</button>
<button euiButton type="button" (click)="openCustomSizeWithService()" class="eui-u-mr-m eui-u-mb-m" aria-haspopup="dialog">Open custom size Dialog (dynamic)</button>
<button euiButton type="button" (click)="openFullScreenWithService()" class="eui-u-mr-m eui-u-mb-m" aria-haspopup="dialog">Open Dialog (fullscreen)</button>
```

```typescript
import { Component, inject, ChangeDetectionStrategy } from "@angular/core";

import { EuiDialogConfig, EuiDialogService } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'sizes',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
    ],
    styles: ['ul li {list-style: initial}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesComponent {

    private euiDialogService = inject(EuiDialogService);

    public openWithService(): void {
        const config = new EuiDialogConfig({
            title: 'Dialog with dynamic height & width sizes',
            content: 'Dialog content',
            height: '50vh',
            width: '50vw',
        });

        this.euiDialogService.openDialog(config);
    }

    public openCustomSizeWithService(): void {
        const config = new EuiDialogConfig({
            title: 'Custom size Dialog',
            content: 'Dialog content',
            height: 'auto',
            width: '320px',
            hasMobileCustomSize: true,
        });

        this.euiDialogService.openDialog(config);
    }

    public openFullScreenWithService(): void {
        const config = new EuiDialogConfig({
            title: 'Fullscreen Dialog',
            content: 'Dialog content screen',
            isFullScreen: true,
        });

        this.euiDialogService.openDialog(config);
    }
}
```

