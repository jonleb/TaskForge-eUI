import { Component, inject } from '@angular/core';

import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_ICON_BUTTON } from '@eui/components/eui-icon-button';
import { EUI_LANGUAGE_SELECTOR } from '@eui/components/eui-language-selector';
import { EUI_USER_PROFILE } from '@eui/components/eui-user-profile';
import { EUI_LAYOUT } from '@eui/components/layout';
import { EuiAppShellService, EuiEuLanguages } from '@eui/core';

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_LAYOUT, ...EUI_LANGUAGE_SELECTOR, ...EUI_ICON, ...EUI_USER_PROFILE, ...EUI_BADGE, ...EUI_ICON_BUTTON, ...EUI_ALERT, ...EUI_BUTTON],
})
export class DefaultComponent {
    public many = true;
    private appShell: EuiAppShellService = inject(EuiAppShellService);

    notificationItemsMetadata = [
        {
            label: 'Notification label', subLabel: 'this is the description of the notification - subLabel - and this can be very huge too',
            metadata: {
                date: new Date(), read: false, important: true,
            },
        },
        {
            label: 'Notification label', subLabel: 'this is the description of the notification - subLabel - and this can be very huge too',
            metadata: {
                date: new Date(), read: true,
            },
        },
        {
            label: 'Notification label', subLabel: 'this is the description of the notification - subLabel - and this can be very huge too',
            metadata: {
                date: new Date(), read: true, important: true,
            },
        },
        {
            label: 'Notification label',
            subLabel: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            metadata: {
                date: new Date(),
            },
        },
    ];

    /**
     * Sets the active language and updates the languages list in the app shell state.
     * @param many - If true, sets a larger set of languages; if false, sets a smaller set with only English and French.
     */
    setLanguages(many: boolean) {
        this.appShell.setState({
            ...this.appShell.state,
            activeLanguage: 'en',
            languages: many? EuiEuLanguages.getLanguages(): EuiEuLanguages.getLanguages(['en', 'fr']),
        });
        this.many = !many;
    }
}

