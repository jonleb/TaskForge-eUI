# eui-chip-list

## Overview

<p class="eui-u-text-paragraph">Multiple eui-chips displayed dynamically as a group of multiple interactive elements.</p>

<eui-alert>
    <eui-alert-title>Migrate from legacy eui-chip-list (v19 and before)</eui-alert-title>
    <div tabindex="0" style="overflow-y: auto;">
        <ul>
            <li><code class="eui-u-text-code">&#64;Input() Colors variants, sizes variants and outline</code> have been removed. Those properties need to be set directly on <code class="eui-u-text-code">eui-chip</code>.</li>
            <li><code class="eui-u-text-code">&#64;Input() chipsLabelTruncateCount</code> has been removed. This needs to be done with <code class="eui-u-text-code">euiTruncate pipe</code> on chip label. (<a href="/eui-showcase-ux-components-21.x/style-guide/components/eui-chip-list#truncateTagsLabel">sample</a>).</li>
            <li><code class="eui-u-text-code">Drag and Drop features</code> needs to be implemented on application side with <a href="https://material.angular.dev/cdk/drag-drop/overview" target="_blank">CDK Drag and Drop Directives</a>. (<a href="/eui-showcase-ux-components-21.x/style-guide/components/eui-chip-list#drag-n-drop">samples</a>).</li>
            <li><code class="eui-u-text-code">&#64;Input() isChipsRemovable</code> has been removed. This property needs to be set directly on <code class="eui-u-text-code">eui-chip</code> with <code class="eui-u-text-code">&#64;Input() isChipRemovable</code>.</li>
            <li><code class="eui-u-text-code">&#64;Input() maxVisibleChipsCount, isMaxVisibleChipsOpened, toggleLinkMoreLabel, toggleLinkLessLabel</code> have been removed. This feature need to be implemented on application side. (<a href="/eui-showcase-ux-components-21.x/style-guide/components/eui-chip-list#max-visible-chips">sample</a>).</li>
            <li><code class="eui-u-text-code">&#64;Input() isChipsSorted, chipsSortOrder</code> have been removed. This feature need to be implemented on application side. (<a href="/eui-showcase-ux-components-21.x/style-guide/components/eui-chip-list#sorting">sample</a>).</li>
            <li><code class="eui-u-text-code">&#64;Output() chipRemove</code> has been removed. This property needs to be set directly on <code class="eui-u-text-code">eui-chip</code> with <code class="eui-u-text-code">&#64;Output() remove</code>.</li>
        </ul>
    </div>
</eui-alert>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | ariaLabel | string | 'eUI Chip list' |

## Samples

### [Default](samples/eui-chip-list/Default)

```html
<eui-chip-list>
    @for (chip of chips; track chip.id) {
        <eui-chip [euiVariant]="chip.variant"><span euiLabel>{{ chip.label }}</span></eui-chip>
    }
</eui-chip-list>
```

```typescript
import { Component } from "@angular/core";

import { EUI_CHIP_LIST } from "@eui/components/eui-chip-list";
import { EUI_CHIP } from "@eui/components/eui-chip";
import { EUI_LABEL } from "@eui/components/eui-label";

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CHIP_LIST,
        ...EUI_CHIP,
        ...EUI_LABEL,
    ],
})
export class DefaultComponent {
    public chips = [
        { id: 1, label: 'Chip label', variant: 'primary' },
        { id: 2, label: 'Chip label', variant: 'secondary' },
        { id: 3, label: 'Chip label', variant: 'info' },
        { id: 4, label: 'Chip label', variant: 'success' },
        { id: 5, label: 'Chip label', variant: 'warning' },
        { id: 6, label: 'Chip label', variant: 'danger' },
        { id: 7, label: 'Chip label', variant: 'accent' },
    ];
}
```

### Other examples

- [Variants: Colors](samples/eui-chip-list/color)
- [Variants: Outline](samples/eui-chip-list/outline)
- [Misc: Icon](samples/eui-chip-list/iconClass)
- [Misc: Long labels](samples/eui-chip-list/long-labels)
- [Misc: Drag and Drop](samples/eui-chip-list/drag-n-drop)
- [Misc: Max visible chips](samples/eui-chip-list/max-visible-chips)
- [Misc: Remove chip](samples/eui-chip-list/remove-chip)
- [Misc: Sorting](samples/eui-chip-list/sorting)
- [Misc: Tooltip](samples/eui-chip-list/tooltip)
- [Misc: Truncated labels](samples/eui-chip-list/truncateTagsLabel)

## Accessibility

<p class="eui-u-text-paragraph"><code class="eui-u-text-code">eui-chip-list</code>  behaves as a <code class="eui-u-text-code">role="listbox"</code> including <code class="eui-u-text-code">eui-chip</code> components that behave as <code class="eui-u-text-code">role='option'</code>. <br>
An <code class="eui-u-text-code">&#64;Input() ariaLabel ='eUI Chip List';</code> is exposed in order to announce the chip selection to the screen reader users.</p>

<!-- LEFT blank showcase central link provided in showcase doc-page component -->
