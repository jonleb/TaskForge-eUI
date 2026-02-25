---
description: Listens to toggleItem to capture which item changed and its expanded state.
id: event
---

```html
<eui-accordion>
    @for(item of mock(); track $index) {
        <eui-accordion-item [isExpanded]="item.isExpanded" (toggleItem)="onToggleItem($index + 1, $event)">
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
    selector: 'event',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ACCORDION,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventComponent {
    faker = inject(FakerService).instance;
    mock = computed(() => Array(3)
        .fill(null)
        .map((v, i, a) => ({
            title: this.faker().book.title(),
            content: this.faker().lorem.paragraphs(2),
            isExpanded: i >= a.length - 1,
        })));
    accordionId: number;
    accordionExpanded: boolean;

    onToggleItem(id: number, isExpanded: boolean): void {
        this.accordionId = id;
        this.accordionExpanded = isExpanded;
    }
}
```

