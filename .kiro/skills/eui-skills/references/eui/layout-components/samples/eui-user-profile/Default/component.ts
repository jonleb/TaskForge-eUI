import { Component, ViewChild } from '@angular/core';
import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_BUTTON } from '@eui/components/eui-button';

import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_USER_PROFILE, EuiUserProfileComponent } from '@eui/components/eui-user-profile';

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_USER_PROFILE, ...EUI_ICON, ...EUI_ALERT, ...EUI_BUTTON],
})
export class DefaultComponent {

    @ViewChild('userProfile') userProfile: EuiUserProfileComponent;

    onItemClick(e: string) {
        alert(`Item clicked: ${e}`);
        this.userProfile.closeDropdown();
    }
}

