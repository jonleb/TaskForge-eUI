---
description: Basic accordion with multiple items in single-expansion mode, including a disabled item.
id: _default
---

```html
<eui-accordion>
    @for(item of mock(); track $index) {
        <eui-accordion-item [euiDisabled]="item?.disabled">
            <eui-accordion-item-header>{{ item.title }}</eui-accordion-item-header>
            {{ item.content }}
        </eui-accordion-item>
    }
</eui-accordion>
```

```typescript
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { EUI_ACCORDION } from '@eui/components/eui-accordion';
import { FakerService } from '../../../../faker.service';

@Component({
    selector: 'overview-default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ACCORDION,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewDefaultComponent {
    faker = inject(FakerService).instance;
    mock = computed(() => {
        return Array(3)
            .fill(null)
            .map((v, i, a) => ({
                title: this.faker().book.title(),
                content: this.faker().lorem.paragraphs(2),
                disabled: i >= a.length - 1,
            }));
    });
}
```

