import { Component } from '@angular/core';
import { EUI_ICON_BUTTON_EXPANDER } from '@eui/components/eui-icon-button-expander';

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON_BUTTON_EXPANDER,
    ],
})
export class DefaultComponent {
    isExpanded1 = false;
    isExpanded2 = false;
    isExpanded3 = false;

    onToggle1(): void {
        this.isExpanded1 = !this.isExpanded1;
    }

    onToggle2(): void {
        this.isExpanded2 = !this.isExpanded2;
    }    
}
