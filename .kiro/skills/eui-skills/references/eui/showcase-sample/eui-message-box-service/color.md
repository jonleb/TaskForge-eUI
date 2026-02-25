---
description: Demonstrates service-based Message Box variants by passing a color variant in the config.
id: color
---

```html
<button euiButton type="button" euiPrimary (click)="openWithService('primary')" class="eui-u-mr-m eui-u-mb-m" aria-haspopup="dialog">Open Message Box Primary</button>
<button euiButton type="button" euiSecondary (click)="openWithService('secondary')" class="eui-u-mr-m eui-u-mb-m" aria-haspopup="dialog">Open Message Box Secondary</button>
<button euiButton type="button" euiInfo (click)="openWithService('info')" class="eui-u-mr-m eui-u-mb-m" aria-haspopup="dialog">Open Message Box Info</button>
<button euiButton type="button" euiSuccess (click)="openWithService('success')" class="eui-u-mr-m eui-u-mb-m" aria-haspopup="dialog">Open Message Box Success</button>
<button euiButton type="button" euiWarning (click)="openWithService('warning')" class="eui-u-mr-m eui-u-mb-m" aria-haspopup="dialog">Open Message Box Warning</button>
<button euiButton type="button" euiDanger (click)="openWithService('danger')" class="eui-u-mr-m eui-u-mb-m" aria-haspopup="dialog">Open Message Box Danger</button>
```

```typescript
import { Component, inject, ChangeDetectionStrategy } from "@angular/core";

import { EuiMessageBoxConfig, EUI_MESSAGE_BOX, EuiMessageBoxService } from "@eui/components/eui-message-box";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'color',
    templateUrl: 'component.html',
    imports: [...EUI_MESSAGE_BOX, ...EUI_BUTTON],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorComponent {

    private euiMessageBoxService = inject(EuiMessageBoxService);

    public openWithService(variant: ('primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger')): void {
        const config = new EuiMessageBoxConfig({
            title: 'Message Box title',
            content: 'Message Box content',
            variant,
        });

        this.euiMessageBoxService.openMessageBox(config);
    }
}
```

