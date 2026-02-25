---
description: Places the popover inside a scrollable container to show overlay behavior in overflowed areas.
id: in-overflowed-area
---

```html
<p class="eui-u-text-paragraph">This sample shows how the overlay component get relative scrolling reference from scrollable container.<br/>
    Please note that the container needs <code class="eui-u-text-code">cdkScrollable</code> from <code class="eui-u-text-code">ScrollingModule</code>.</p>
    
<pre class="eui-u-text-pre">
<code class="eui-u-text-code">
import &#123; ScrollingModule &#125; from '&#64;angular/cdk/scrolling';
</code>
</pre>

<div style="width: 300px; height: 300px; overflow: auto" cdkScrollable (scroll)="onScroll()">
    <div style="height:500px">
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <button euiButton euiRounded euiBasicButton euiIconButton euiSizeS aria-label="Popover Icon Button" (click)="openPopover($event)">
            <eui-icon-svg icon="eui-circle-fill" size="m" fillColor="secondary" />
        </button>
        <eui-popover #popover [title]="'This is popover title'">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus corporis commodi.
        </eui-popover>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>&nbsp;
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, viewChild } from "@angular/core";

import { EUI_POPOVER, EuiPopoverComponent } from "@eui/components/eui-popover";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'in-overflowed-area',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON,
        ...EUI_BUTTON,
        ...EUI_POPOVER,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InOverflowedAreaComponent {

    readonly popover = viewChild<EuiPopoverComponent>('popover');

    private cd = inject(ChangeDetectorRef);

    public openPopover(e: any) {
        this.popover().openPopover(e.target);
    }

    public onScroll(): void {
        this.cd.detectChanges();
    }

}
```

