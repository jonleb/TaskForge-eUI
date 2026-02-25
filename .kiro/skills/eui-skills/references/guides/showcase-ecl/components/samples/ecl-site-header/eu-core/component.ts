import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EUI_ECL_MENU } from '@eui/ecl/components/ecl-menu';
import { EUI_ECL_NOTIFICATION } from '@eui/ecl/components/ecl-notification';
import {
    EclSiteHeaderLanguageClickEvent,
    EclSiteHeaderLanguageSelectedEvent,
    EclSiteHeaderLoginEvent,
    EclSiteHeaderLogoClickEvent,
    EclSiteHeaderSearchEvent,
    EUI_ECL_SITE_HEADER,
} from '@eui/ecl/components/ecl-site-header';

@Component({
    // tslint:disable-next-line
    selector: 'eu-core',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_SITE_HEADER, ...EUI_ECL_MENU, ...EUI_ECL_NOTIFICATION],
})
export class EUCoreComponent {
    isLoggedIn = false;

    onLogin(evt: EclSiteHeaderLoginEvent) {
        this.isLoggedIn = true;
        console.log(evt);
    }

    onLogout(evt: MouseEvent) {
        this.isLoggedIn = false;
        evt.preventDefault();
        console.log('logout');
    }

    onLanguageClick(evt: EclSiteHeaderLanguageClickEvent) {
        console.log(evt);
    }

    onLanguageSelected(evt: EclSiteHeaderLanguageSelectedEvent) {
        console.log(evt);
    }

    onSearch(evt: EclSiteHeaderSearchEvent) {
        console.log(evt);
    }

    onLogoClick(evt: EclSiteHeaderLogoClickEvent) {
        console.log(evt);
    }
}
