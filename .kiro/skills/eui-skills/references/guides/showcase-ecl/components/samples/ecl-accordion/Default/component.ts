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
