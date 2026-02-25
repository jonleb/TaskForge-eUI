import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { EclAppLanguageDismissEvent, EUI_ECL_APP } from '@eui/ecl/components/ecl-app';
import { EUI_ECL_BREADCRUMB } from '@eui/ecl/components/ecl-breadcrumb';
import { EUI_ECL_PAGE_HEADER } from '@eui/ecl/components/ecl-page-header';
import { EUI_ECL_SITE_FOOTER } from '@eui/ecl/components/ecl-site-footer';
import {
    EclSiteHeaderLanguageClickEvent,
    EclSiteHeaderLoginEvent,
    EclSiteHeaderSearchEvent,
    EUI_ECL_SITE_HEADER,
} from '@eui/ecl/components/ecl-site-header';
import { DocPageComponent } from '@eui/showcase';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_MENU } from '@eui/ecl/components/ecl-menu';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';

@Component({
    // tslint:disable-next-line
    selector: 'eu-harmonised',
    templateUrl: 'component.html',
    imports: [RouterLink, TranslateModule, ...EUI_ECL_APP, ...EUI_ECL_BREADCRUMB, ...EUI_ECL_SITE_FOOTER, ...EUI_ECL_PAGE_HEADER, ...EUI_ECL_ICON,
        ...EUI_ECL_SITE_HEADER, ...EUI_ECL_LINK, ...EUI_ECL_MENU],
})
export class EUHarmonisedComponent {
    isLoggedIn = false;

    constructor(
        private docPageComponent: DocPageComponent) { }

    onLogin(evt: EclSiteHeaderLoginEvent) {
        this.isLoggedIn = true;
        console.log(evt);
    }

    onLogout(evt: MouseEvent) {
        this.isLoggedIn = false;
        evt.preventDefault();
        console.log('logout');
    }

    onSearch(evt: EclSiteHeaderSearchEvent) {
        console.log(evt);
    }

    onLanguageClick(evt: EclSiteHeaderLanguageClickEvent) {
        console.log(evt);
        this.docPageComponent.isNavigationVisible = false;
    }

    onLanguageDismiss(evt: EclAppLanguageDismissEvent) {
        console.log('language dismiss', evt);
        this.docPageComponent.isNavigationVisible = true;
    }
}
