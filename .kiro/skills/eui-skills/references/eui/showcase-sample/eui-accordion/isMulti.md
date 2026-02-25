---
description: Enables multi-expansion mode so several items can stay open at once.
id: isMulti
---

```html
<eui-accordion isMulti>
    @for(item of mock(); track $index) {
        <eui-accordion-item>
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
    // eslint-disable-next-line
    selector: 'isMulti',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ACCORDION,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsMultiComponent {
    faker = inject(FakerService).instance;
    mock = computed(() => Array(3)
        .fill(null)
        .map(() => ({
            title: this.faker().book.title(),
            content: this.faker().lorem.paragraphs(2),
        })));
}
```

