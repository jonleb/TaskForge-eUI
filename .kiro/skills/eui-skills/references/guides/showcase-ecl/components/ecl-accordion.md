# ecl-accordion

## Overview

The accordion component is used to generate vertically stacked content in a page. It is intended to save vertical space by hiding content, reducing scrolling.
<br>
<more-info componentPartUrl="accordion/usage/"></more-info>

## API

API content

## Samples

### [Default](samples/ecl-accordion/Default)

```html
<ecl-accordion>
    <ecl-accordion-item (toggle)="onItemToggle($event)"
        isExpanded
        label="Delivery of last pending proposals, a common Destiny of unity, the hour of European Democracy">
        The College of Commissioners held today the first weekly meeting of 2019 which was devoted to discussing the
        challenges of this new year. Commissioners used the opportunity to take stock and discuss the year ahead,
        including the European elections in May and other important milestones ahead.
    </ecl-accordion-item>

    <ecl-accordion-item label="Spring 2019 Economic Forecast: Growth continues at a more moderate pace">
        The European economy is forecast to continue expanding for the seventh year in a row in 2019, with real GDP expected to
        grow in all EU Member States. As global uncertainties continue to weigh, domestic dynamics are set to support the
        European economy. Growth is expected to gather pace again next year.
    </ecl-accordion-item>

    <ecl-accordion-item
        label="Delivery of last pending proposals, a common Destiny of unity, the hour of European Democracy">
        In the modern global economy trade is essential for growth, jobs and competiveness, and the EU is committed to
        maintaining an open and rules-based trading system. With the rising threat of protectionism and weakened
        commitment of large players to global trade governance, the EU must take the lead.
    </ecl-accordion-item>
</ecl-accordion>

<h6 class="section-title">With '&#64;for' block</h6>
<ecl-accordion>
    @for (item of items;track item.id ) {
    <ecl-accordion-item (toggle)="onItemToggle($event)" label="{{item.label}}" tabindex="0" [isExpanded]="item.isExpanded">
        {{item.text}}
    </ecl-accordion-item>
    }
</ecl-accordion>
```

```typescript
import { Component } from '@angular/core';
import { EclAccordionToggleEvent, EUI_ECL_ACCORDION } from '@eui/ecl/components/ecl-accordion';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_ACCORDION],
})
export class DefaultComponent {

    items = [
        {
            id: '1', label: `Delivery of last pending proposals, a common Destiny of unity, the hour of European Democracy`, text: `The College of Commissioners held today the first weekly meeting of 2019 which was devoted to discussing the
        challenges of this new year. Commissioners used the opportunity to take stock and discuss the year ahead,
        including the European elections in May and other important milestones ahead.`, isExpanded: true
        },
        {
            id: '2', label: `Spring 2019 Economic Forecast: Growth continues at a more moderate pace`, text: `The European economy is forecast to continue expanding for the seventh year in a row in 2019, with real GDP expected to
            grow in all EU Member States. As global uncertainties continue to weigh, domestic dynamics are set to support the
            European economy. Growth is expected to gather pace again next year.`, isExpanded: false
        },
        {
            id: '3', label: `Delivery of last pending proposals, a common Destiny of unity, the hour of European Democracy`, text: `In the modern global economy trade is essential for growth, jobs and competiveness, and the EU is committed to
            maintaining an open and rules-based trading system. With the rising threat of protectionism and weakened
            commitment of large players to global trade governance, the EU must take the lead.`, isExpanded: false
        }
    ];

    onItemToggle(etv: EclAccordionToggleEvent): void {
        console.log(etv);
    }
}
```
