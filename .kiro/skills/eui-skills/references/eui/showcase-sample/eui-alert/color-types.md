---
description: Demonstrates the semantic color variants, with and without a close button and a title.
id: color-types
---

```html
@for (type of ['success', 'info', 'warning', 'danger']; track $index) {
    <eui-alert isCloseable
               [euiSuccess]="type === 'success'"
               [euiWarning]="type === 'warning'"
               [euiDanger]="type === 'danger'"
               [euiInfo]="type === 'info'">
        {{ mockText() }}
    </eui-alert>
    <br>
}


@for (type of ['success', 'info', 'warning', 'danger']; track $index) {
    <eui-alert isCloseable
               [euiSuccess]="type === 'success'"
               [euiWarning]="type === 'warning'"
               [euiDanger]="type === 'danger'"
               [euiInfo]="type === 'info'">
        {{ mockText() }}
    </eui-alert>
    <br>
}


@for (type of ['success', 'info', 'warning', 'danger']; track $index) {
    <eui-alert [euiSuccess]="type === 'success'"
               [euiWarning]="type === 'warning'"
               [euiDanger]="type === 'danger'"
               [euiInfo]="type === 'info'">
    <eui-alert-title>Alert title</eui-alert-title>
        {{ mockText() }}
    </eui-alert>
    <br>
}
```

```typescript
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { EUI_ALERT } from '@eui/components/eui-alert';
import { FakerService } from '../../../../faker.service';

@Component({
    // eslint-disable-next-line
    selector: 'color-types',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ALERT,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorTypesComponent {
    faker = inject(FakerService).instance;
    mockText = computed(() => this.faker().lorem.sentence());
}
```

