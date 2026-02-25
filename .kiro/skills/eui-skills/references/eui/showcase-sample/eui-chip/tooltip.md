---
description: This sample shows tooltip integration on chips with different positions and content alignments.
id: tooltip
---

```html
<div class="doc-sample-section-title">Default</div>
<eui-chip euiTooltip="Info about the action">Chip label</eui-chip>&nbsp;

<div class="doc-sample-section-title">Position</div>
<eui-chip euiTooltip="Above" position="above">Above</eui-chip>&nbsp;
<eui-chip euiTooltip="Below" position="below">Below</eui-chip>&nbsp;
<eui-chip euiTooltip="Left" position="left">Left</eui-chip>&nbsp;
<eui-chip euiTooltip="Right" position="right">Right</eui-chip>&nbsp;
<eui-chip euiTooltip="Before" position="before">Before</eui-chip>&nbsp;
<eui-chip euiTooltip="After" position="after">After</eui-chip>&nbsp;

<div class="doc-sample-section-title">Content alignment</div>
<eui-chip euiTooltip="{{ bigContentLatin }}" contentAlignment="center">Center</eui-chip>&nbsp;
<eui-chip euiTooltip="{{ bigContentLatin }}" contentAlignment="left">Left</eui-chip>&nbsp;
<eui-chip euiTooltip="{{ bigContentLatin }}" contentAlignment="right">Right</eui-chip>&nbsp;
<eui-chip euiTooltip="{{ bigContentLatin }}" contentAlignment="justify">Justify</eui-chip>&nbsp;
```

```typescript
import { ChangeDetectionStrategy, Component } from "@angular/core";

import { EUI_CHIP } from "@eui/components/eui-chip";
import { EuiTooltipDirective } from "@eui/components/directives";
import { EUI_LABEL } from "@eui/components/eui-label";


@Component({
    // eslint-disable-next-line
    selector: 'tooltip',
    templateUrl: 'component.html',
    imports: [...EUI_CHIP, ...EUI_LABEL, EuiTooltipDirective],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipComponent {

    public bigContentLatin = `Nunc sit amet lectus mattis, aliquam mi quis, iaculis est.
    Donec nec diam tristique, egestas lorem nec, varius neque.
    Aenean consequat nisi in sem porttitor, a eleifend lorem tincidunt.
    Phasellus scelerisque tellus eu imperdiet dictum.

    Sed vitae tellus ac nisl facilisis posuere.
    Mauris cursus dui nec arcu molestie sodales.
    Morbi vel enim semper, luctus odio vitae, lacinia nisl.
    Sed sollicitudin ex et nibh bibendum, id blandit nunc pretium.
    Nunc venenatis eros a leo tincidunt gravida.`;
}
```

