---
description: Uses additional chip-list content to expand or collapse the list and control visible chip count.
id: max-visible-chips
---

```html
<eui-chip-list>
    @for (chip of chips; let i = $index; track chip.id) {
        @if (isMaxVisibleChipsOpened || i <= maxVisibleChipsCount) {
            <eui-chip [data]="{ id: chip.id }" [euiVariant]="chip.variant">{{ chip.label }}</eui-chip>
        }
    }
    <eui-chip-list-additional-content>
        @if (maxVisibleChipsCount && chips && chips.length > maxVisibleChipsCount) {
            <button
                euiButton
                euiBasicButton
                euiSecondary
                euiSizeS
                type="button"
                class="eui-chip-list__expand-button"
                [aria-label]="isMaxVisibleChipsOpened ? 'Collapse tags' : 'Expand tags'"
                (click)="toggleTags()">

                @if (isMaxVisibleChipsOpened) {
                    <eui-icon-svg icon="eui-chevron-left"/>
                } @else {
                    <eui-icon-svg icon="eui-chevron-right"/>
                }
            </button>
        }
    </eui-chip-list-additional-content>
</eui-chip-list>

<br/>

<eui-chip-list>
    @for (chip of chips; let i = $index; track chip.id) {
        @if (isMaxVisibleChipsOpened || i <= maxVisibleChipsCount) {
            <eui-chip [data]="{ id: chip.id }" [euiVariant]="chip.variant">{{ chip.label }}</eui-chip>
        }
    }
    <eui-chip-list-additional-content>
        @if (maxVisibleChipsCount && chips && chips.length > maxVisibleChipsCount) {
            <button
                euiButton
                euiBasicButton
                euiSecondary
                euiSizeS
                type="button"
                class="eui-chip-list__expand-button"
                (click)="toggleTags()">

                @if (isMaxVisibleChipsOpened) {
                    <eui-icon-svg icon="eui-chevron-left" aria-label="Collapse icon" />
                    Less
                } @else {
                    More
                    <eui-icon-svg icon="eui-chevron-right" aria-label="Expand icon" />
                }
            </button>
        }
    </eui-chip-list-additional-content>
</eui-chip-list>
```

```typescript
import { ChangeDetectionStrategy, Component } from "@angular/core";

import { EUI_CHIP_LIST } from "@eui/components/eui-chip-list";
import { EUI_CHIP } from "@eui/components/eui-chip";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_ICON } from "@eui/components/eui-icon";


@Component({
    // eslint-disable-next-line
    selector: 'max-visible-chips',
    templateUrl: 'component.html',
    imports: [...EUI_CHIP_LIST, ...EUI_CHIP, ...EUI_BUTTON, ...EUI_ICON],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaxVisibleChipsComponent {
    public chips = [
        { id: 1, label: 'Chip label', variant: 'primary' },
        { id: 2, label: 'Chip label', variant: 'secondary' },
        { id: 3, label: 'Chip label', variant: 'info' },
        { id: 4, label: 'Chip label', variant: 'success' },
        { id: 5, label: 'Chip label', variant: 'warning' },
        { id: 6, label: 'Chip label', variant: 'danger' },
        { id: 7, label: 'Chip label', variant: 'accent' },
    ];

    public maxVisibleChipsCount = 2;
    public isMaxVisibleChipsOpened = false;

    public toggleTags(): void {
        this.isMaxVisibleChipsOpened = !this.isMaxVisibleChipsOpened;
    }
}
```

