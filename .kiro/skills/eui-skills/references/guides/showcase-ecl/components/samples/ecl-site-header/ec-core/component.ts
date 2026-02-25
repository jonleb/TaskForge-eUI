import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';
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
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';

@Component({
    // tslint:disable-next-line
    selector: 'ec-core',
    templateUrl: 'component.html',
    imports: [RouterLink, TranslateModule, ...EUI_ECL_SITE_HEADER, ...EUI_ECL_ICON, ...EUI_ECL_LINK, ...EUI_ECL_MENU, ...EUI_ECL_NOTIFICATION],
})
export class ECCoreComponent {
    isLoggedIn = false;
    languageCode = 'en';

    onLogin(evt: EclSiteHeaderLoginEvent): void {
        this.isLoggedIn = true;
        console.log(evt);
    }

    onLogout(evt: MouseEvent): void {
        this.isLoggedIn = false;
        evt.preventDefault();
        console.log('logout');
    }

    onLanguageClick(evt: EclSiteHeaderLanguageClickEvent): void {
        console.log(evt);
    }

    onLanguageSelected(evt: EclSiteHeaderLanguageSelectedEvent): void {
        console.log(evt.language);
        this.languageCode = evt.language.code;
    }

    onSearch(evt: EclSiteHeaderSearchEvent): void {
        console.log(evt);
    }

    onLogoClick(evt: EclSiteHeaderLogoClickEvent): void {
        console.log(evt);
    }

    onPictureClick(evt: Event): void {
        console.log(evt);
    }
}
