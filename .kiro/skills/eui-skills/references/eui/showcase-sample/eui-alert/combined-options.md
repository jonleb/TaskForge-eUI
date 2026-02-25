---
description: Composes alerts with long content, titles, closeable state, and richer body elements.
id: combined-options
---

```html
<eui-alert>
    {{ longText() }}
</eui-alert>

<eui-alert isCloseable>
    {{ longText() }}
</eui-alert>



<eui-alert isCloseable>
    <eui-alert-title>{{ title() }}</eui-alert-title>
    {{ shortText() }}
</eui-alert>



<eui-alert isCloseable>
    <eui-alert-title>{{ longTitle() }}</eui-alert-title>
    {{ shortText() }}
</eui-alert>



<eui-alert>
    <eui-alert-title>{{ title() }}</eui-alert-title>
    <p class="eui-u-text-paragraph">{{ shortText() }}</p>
    <p class="eui-u-text-paragraph">{{ shortText() }}</p>
</eui-alert>



<eui-alert>
    <eui-alert-title>{{ title() }}</eui-alert-title>
    <p class="eui-u-text-paragraph">{{ shortText() }}</p>

    <div class="eui-u-flex eui-u-flex-gap-s">
        <button euiButton euiPrimary euiSizeS>Primary action</button>
        <button euiButton euiSecondary euiSizeS>Secondary action</button>
    </div>
</eui-alert>



<eui-alert>
    <eui-alert-title>{{ title() }}</eui-alert-title>
    <p class="eui-u-text-paragraph">{{ shortText() }}</p>
    <div class="eui-u-display-flex eui-u-flex-column eui-u-flex-gap-s">
        <a class="eui-u-text-link-neutral-underline">Link 1</a>
        <a class="eui-u-text-link-neutral-underline">Link 2</a>
    </div>
</eui-alert>
<!-- EXCLUDE_END -->
```

```typescript
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { FakerService } from '../../../../faker.service';

@Component({
    // eslint-disable-next-line
    selector: 'combined-options',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ALERT,
        ...EUI_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CombinedOptionsComponent {
    faker = inject(FakerService).instance;
    longText = computed(() => this.faker().lorem.paragraphs(2));
    shortText = computed(() => this.faker().lorem.sentence());
    title = computed(() => this.faker().lorem.words(3));
    longTitle = computed(() => this.faker().lorem.sentences(3));
}
```

