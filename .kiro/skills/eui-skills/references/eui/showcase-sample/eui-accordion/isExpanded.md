---
description: Sets an item expanded by default using the isExpanded input.
id: isExpanded
---

```html
<eui-accordion>
    @for(item of mock(); track $index) {
        <eui-accordion-item [isExpanded]="item.isExpanded">
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
    selector: 'isExpanded',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ACCORDION,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsExpandedComponent {
    faker = inject(FakerService).instance;
    mock = computed(() => Array(3)
        .fill(null)
        .map((v, i, a) => ({
            title: this.faker().book.title(),
            content: this.faker().lorem.paragraphs(2),
            isExpanded: i === 0,
        })));
}
```

