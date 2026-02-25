---
description: Uses custom SVG icons and colors to toggle folder open/closed states.
id: custom-icon
---

```html
<div class="eui-u-flex eui-u-flex-column">
    <div class="eui-u-flex">
        <eui-icon-toggle keyboardAccessKey="x" iconSvgNameOn="folder-open:regular" iconSvgNameOff="folder:regular"
                        iconSvgFillColorOff="secondary" iconSvgFillColorOn="primary"
                        (toggle)="onOpenFolderToggle1($event)" />
        <span class="eui-u-ml-m">Folder 1</span>
        @if (isFolderOpen1) {
            <span>&nbsp;opened</span>
        }
        @if (!isFolderOpen1) {
            <span>&nbsp;closed</span>
        }
    </div>
    <div class="eui-u-flex">
        <eui-icon-toggle keyboardAccessKey="o" iconSvgNameOn="folder-open:regular" iconSvgNameOff="folder:regular"
                        iconSvgFillColorOff="secondary" iconSvgFillColorOn="primary"
                        (toggle)="onOpenFolderToggle2($event)" />
        <span class="eui-u-ml-m">Folder 2</span>
        @if (isFolderOpen2) {
            <span>&nbsp;opened</span>
        }
        @if (!isFolderOpen2) {
            <span>&nbsp;closed</span>
        }
    </div>
</div>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_ICON_TOGGLE } from '@eui/components/eui-icon-toggle';

@Component({
    selector: 'custom-icon',
    templateUrl: 'component.html',
    imports: [...EUI_ICON_TOGGLE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomIconComponent {
    public isFolderOpen1 = false;
    public isFolderOpen2 = false;

    public onOpenFolderToggle1(event: boolean) {
        this.isFolderOpen1 = !this.isFolderOpen1;
    }

    public onOpenFolderToggle2(event: boolean) {
        this.isFolderOpen2 = !this.isFolderOpen2;
    }

}
```

