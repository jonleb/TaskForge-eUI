import { Component } from '@angular/core';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_TOGGLE_GROUP, EuiToggleGroupItemComponent } from '@eui/components/eui-toggle-group';

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_TOGGLE_GROUP,
        ...EUI_ICON,
    ],
})
export class DefaultComponent {
    clickedItem: EuiToggleGroupItemComponent;

    onItemClick(event: EuiToggleGroupItemComponent) {
        this.clickedItem = event;
    }   
    
    public items = [
        { label: 'Item 1', id: '1' },
        { label: 'Item 2', id: '2' },
        { label: 'Item 3', id: '3' },
        { label: 'Item 4', id: '4', active: true },
    ];    
}
