---
description: Demonstrates dynamic updates of variants and the closeable state via bindings.
id: misc-options
---

```html
<eui-alert [euiVariant]="variant()" [isCloseable]="closeableState()">
    <eui-alert-title>Alert title</eui-alert-title>
    sample text
</eui-alert>



<eui-alert [euiDanger]="variantColor() === 'danger'" [euiSuccess]="variantColor() === 'success'" [euiWarning]="variantColor() === 'warning'">
    <eui-alert-title>Alert title</eui-alert-title>
    sample text
</eui-alert>
```

```typescript
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // eslint-disable-next-line
    selector: 'misc-options',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ALERT,
        ...EUI_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiscOptionsComponent {
    variant = signal('info');
    closeableState = signal(false);
    mutedState = signal(false);
    variantColor = signal('info');

    onUpdateVariant(): void {
        this.variant.set(this.variant() === 'info' ? 'danger' : 'info');
    }

    onUpdateCloseable(): void {
        this.closeableState.update(v => !v);
    }

    onUpdateMuted(): void {
        this.mutedState.update(v => !v);
    }

    onUpdateColor(color: string): void {
        this.variantColor.set(color);
    }
}
```

