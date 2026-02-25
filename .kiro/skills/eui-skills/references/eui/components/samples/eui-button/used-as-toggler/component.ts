import { Component } from '@angular/core';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_ICON_BUTTON_EXPANDER } from '@eui/components/eui-icon-button-expander';

@Component({
    // eslint-disable-next-line
    selector: 'used-as-toggler',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_ICON_BUTTON_EXPANDER,
    ]
})
export class UsedAsTogglerComponent {

    public isCollapsed = false;
    public isCollapsed2 = false;
    public isCollapsed3 = false;

    public isToggled1 = true;
    public isToggled2 = false;


    public onToggle(event: Event) {
        this.isCollapsed = !this.isCollapsed;
    }

    public onToggle2(event: Event) {
        this.isCollapsed2 = !this.isCollapsed2;
    }

    public onToggle3(event: Event) {
        this.isCollapsed3 = !this.isCollapsed3;
    }

    public onToggle1a(event: Event) {
        this.isToggled1 = !this.isToggled1;
    }    
    public onToggle1b(event: Event) {
        this.isToggled2 = !this.isToggled2;
    }    
}
