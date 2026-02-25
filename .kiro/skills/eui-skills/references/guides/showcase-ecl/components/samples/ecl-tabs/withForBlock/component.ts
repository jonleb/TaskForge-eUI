import { Component } from '@angular/core';
import { EclTabSelectEvent, EUI_ECL_TABS } from '@eui/ecl/components/ecl-tabs';

@Component({
    // tslint:disable-next-line
    selector: 'withForBlock',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_TABS],
})
export class WithForBlockComponent {

    tabs = [
        { label: 'Item 1', id: 'tab1', content: 'Some content 1', isActive: false },
        { label: 'Item 2', id: 'tab2', content: 'Some content 2', isActive: false },
        { label: 'Item 3', id: 'tab3', content: 'Some content 3', isActive: true },
        { label: 'Item 4', id: 'tab4', content: 'Some content 4', isActive: false },
        { label: 'Item 5', id: 'tab5', content: `The College of Commissioners held today the first weekly meeting of 2019 which 
            was devoted to discussing the challenges of this new year. Commissioners used the opportunity to take stock and discuss 
            the year ahead, including the European elections in May and other important milestones ahead.`, isActive: false },
        { label: 'Item with a very long label 6', id: 'tab6', content: 'Some content 6', isActive: false },
        { label: 'Item 7', id: 'tab7', content: 'Some content 7', isActive: false },
    ];

    onTabSelect(evt: EclTabSelectEvent) {
        console.log('tab selected', evt)
    }
}
