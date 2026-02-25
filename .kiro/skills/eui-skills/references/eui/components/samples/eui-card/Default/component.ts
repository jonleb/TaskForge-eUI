import { Component } from '@angular/core';

import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_LIST } from '@eui/components/eui-list';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';
import { EUI_ICON_TOGGLE } from '@eui/components/eui-icon-toggle';
import { EuiTooltipDirective } from '@eui/components/directives';

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CARD,
        ...EUI_CHIP,
        ...EUI_ICON,
        ...EUI_BUTTON,
        ...EUI_LIST,
        ...EUI_LABEL,
        ...EUI_DROPDOWN,
        ...EUI_ICON_TOGGLE,
        EuiTooltipDirective,
    ],
})
export class DefaultComponent {

    public cardTitle = 'Card Title goes here';
    public cardSubtitle = 'Card subtitle text label';
    public cardContentStyle = 'height: 10rem';
    public isChecked = true;

    public onCardTitleLinkClicked(event: Event): void {
        alert('Title clicked !');
        if (event) {
            event.preventDefault();
            event.stopPropagation();
            event.cancelBubble = true;
        }
    }

    public onMenuItemClicked(event: Event, index: number): void {
        alert('you clicked on menu item ' + index);
    }
    public onFavouriteToggle(isChecked: boolean) {
        this.isChecked = isChecked;
    }
}
