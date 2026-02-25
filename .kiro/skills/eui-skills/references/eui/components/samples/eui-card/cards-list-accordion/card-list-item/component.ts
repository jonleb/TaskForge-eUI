import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { EuiTooltipDirective } from '@eui/components/directives';
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';
import { EUI_ICON } from '@eui/components/eui-icon';

@Component({
    // eslint-disable-next-line
    selector: 'card-list-item-accordion',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
        ...EUI_CARD,
        EuiTooltipDirective,
        ...EUI_ICON,
        ...EUI_CHIP,
        ...EUI_DROPDOWN,
        RouterModule,
        DatePipe,
    ]
})
export class CardListItemAccordionComponent {

    @Input() data: any;
    @Input() isCollapsible = true;
    @Input() isCollapsed = true;

    @Output() collapse = new EventEmitter<boolean>();

    constructor( ) {
    }

    public onCardTitleLinkClicked(event: Event) {
        alert('Title clicked !');
        if (event) {
            event.preventDefault();
            event.stopPropagation();
            event.cancelBubble = true;
        }
    }

    public onCollapse(event: boolean) {
        this.collapse.emit(event);
    }
}
