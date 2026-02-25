---
description: Responsive layout with custom content blocks and a "show more" group toggle.
id: responsive-layout
---

```html
<eui-timeline>
    <eui-timeline-item date="19 mars 2024 - am" dateStyleClass="eui-u-p-2xs eui-u-text-right eui-u-c-bg-secondary-bg">
        <div class="my-timeline-item-custom">
            <div class="eui-u-f-l-bold-compact">Item title 1 - Long label lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
            <div class="eui-u-f-m-compact">sub label content of the timeline item</div>
            <a class="eui-u-text-link" routerLink=".">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</a>
        </div>
    </eui-timeline-item>

    <eui-timeline-item date="18 mars 2024 - pm" dateStyleClass="eui-u-p-2xs eui-u-text-right eui-u-c-bg-secondary-bg">
        <div class="my-timeline-item-custom">
            <div class="eui-u-f-l-bold-compact">Item title 2 - Long label morbi facilisis, massa in dignissim interdum, risus urna condimentum ipsum, id molestie lectus orci vel massa</div>
            <div class="eui-u-f-m-compact">sub label content of the timeline item</div>
            <a class="eui-u-text-link-external" href="https://google.com" target="_blank">Morbi facilisis, massa in dignissim interdum, risus urna condimentum ipsum, id molestie lectus orci vel massa.</a>
        </div>
    </eui-timeline-item>

    <eui-timeline-item date="16 mars 2024 - pm" dateStyleClass="eui-u-p-2xs eui-u-text-right eui-u-c-bg-secondary-bg">
        <div class="my-timeline-item-custom">
            <div class="eui-u-f-l-bold-compact">Item title 3 - Long label Curabitur placerat sit amet libero vitae volutpat</div>
            <div class="eui-u-f-m-compact">sub label content of the timeline item</div>
            <a class="eui-u-text-link" routerLink=".">Curabitur placerat sit amet libero vitae volutpat.</a>
        </div>
    </eui-timeline-item>

    <eui-timeline-item isGroup>
        <button euiButton euiSizeS euiPrimary (click)="toggleShowMore($event)">
            <span euiLabel>
                @if (!showMore) {
                    <span>Show 2 more items</span>
                }
                @if (showMore) {
                    <span>Hide 2 items</span>
                }
            </span>
            <eui-icon-svg [icon]="showMore ? 'eui-chevron-up' : 'eui-chevron-down'" class="eui-u-ml-xs" />
        </button>
    </eui-timeline-item>
</eui-timeline>

@if (showMore) {
    <eui-timeline>
        <eui-timeline-item date="15 mars 2024 - am" dateStyleClass="eui-u-p-2xs eui-u-text-right eui-u-c-bg-secondary-bg">
            <div class="my-timeline-item-custom">
                <div class="eui-u-f-l-bold-compact">Item title 4 - Long label Nulla a ex lorem. Mauris in auctor neque, non faucibus lorem</div>
                <div class="eui-u-f-m-compact">sub label content of the timeline item</div>
                <a class="eui-u-text-link" routerLink=".">Nulla a ex lorem. Mauris in auctor neque, non faucibus lorem.</a>
            </div>
        </eui-timeline-item>

        <eui-timeline-item date="14 mars 2024 - am" dateStyleClass="eui-u-p-2xs eui-u-text-right eui-u-c-bg-secondary-bg">
            <div class="my-timeline-item-custom">
                <div class="eui-u-f-l-bold-compact">Item title 5 - Long label Aenean dignissim sodales felis, non congue mauris pharetra et. Curabitur nec purus et metus finibus cursus. Morbi sed augue est</div>
                <div class="eui-u-f-m-compact">sub label content of the timeline item</div>
                <a class="eui-u-text-link" routerLink=".">Aenean dignissim sodales felis, non congue mauris pharetra et. Curabitur nec purus et metus finibus cursus. Morbi sed augue est.</a>
            </div>
        </eui-timeline-item>
    </eui-timeline>
}
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_TIMELINE } from '@eui/components/eui-timeline';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_ICON } from '@eui/components/eui-icon';

@Component({
    selector: 'responsive-layout',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
        ...EUI_TIMELINE,
        ...EUI_LABEL,
        ...EUI_ICON,
    ],
    styles: [`
    .my-timeline-item-custom {
        background: var(--eui-c-white);
        border: 1px solid var(--eui-c-neutral-lightest);
        border-radius: var(--eui-s-s);
        padding: var(--eui-s-s);
    }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResponsiveLayoutComponent {

    public showMore = false;

    public toggleShowMore(event: Event) {
        this.showMore = !this.showMore;
    }
}
```

