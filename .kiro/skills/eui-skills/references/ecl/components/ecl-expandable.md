# ecl-expandable

## Overview

The expandable component is a progressive disclosure component. Such components truncate information for the general layout/design and are intended to deliver additional content depending on users' interests. They help keep the interface clean and reduce scrolling by saving vertical space, while being indicative of the additional content that is available through extra interaction.
<br>
<more-info componentPartUrl="expandable/usage/"></more-info>

## API

API content

## Samples

### Default

```html
<ecl-expandable (toggle)="onToggle($event)">
  <p class="ecl-u-type-paragraph-m">
    The EU is building an energy union that ensures Europe’s energy supply is safe,
    viable and accessible to all. In doing so, it can boost the economy and attract investments that can create new jobs
    opportunities.
  </p>
</ecl-expandable>

<h6 class="section-title">Expanded by default</h6>

<ecl-expandable isExpanded>
  <p class="ecl-u-type-paragraph-m">
    The EU is building an energy union that ensures Europe’s energy supply is safe,
    viable and accessible to all. In doing so, it can boost the economy and attract investments that can create new jobs
    opportunities.
  </p>
</ecl-expandable>

<h6 class="section-title">Custom Labels</h6>

<ecl-expandable collapsedLabel="More" expandedLabel="{{ 'foo' | translate }}">
  <p class="ecl-u-type-paragraph-m">
    The EU is building an energy union that ensures Europe’s energy supply is safe,
    viable and accessible to all. In doing so, it can boost the economy and attract investments that can create new jobs
    opportunities.
  </p>
</ecl-expandable>
```

```typescript
import { Component } from '@angular/core';
import { EclExpandableToggleEvent, EUI_ECL_EXPANDABLE } from '@eui/ecl/components/ecl-expandable';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ECL_EXPANDABLE, 
        TranslateModule,
    ],
})
export class DefaultComponent {

    onToggle(e: EclExpandableToggleEvent) {
        console.log('toggle event', e)
    }
}
```
