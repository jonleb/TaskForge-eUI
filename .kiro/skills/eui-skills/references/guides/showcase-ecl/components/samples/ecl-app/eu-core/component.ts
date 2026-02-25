import { Component } from '@angular/core';
import { EclAppLanguageDismissEvent, EUI_ECL_APP } from '@eui/ecl/components/ecl-app';
import { EUI_ECL_BREADCRUMB } from '@eui/ecl/components/ecl-breadcrumb';
import { EUI_ECL_PAGE_HEADER } from '@eui/ecl/components/ecl-page-header';
import { EUI_ECL_SITE_FOOTER } from '@eui/ecl/components/ecl-site-footer';
import {
    EclSiteHeaderLanguageClickEvent,
    EclSiteHeaderSearchEvent,
    EUI_ECL_SITE_HEADER,
} from '@eui/ecl/components/ecl-site-header';
import { DocPageComponent } from '@eui/showcase';

@Component({
    // tslint:disable-next-line
    selector: 'eu-core',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_APP, ...EUI_ECL_BREADCRUMB, ...EUI_ECL_SITE_FOOTER, ...EUI_ECL_PAGE_HEADER, ...EUI_ECL_SITE_HEADER],
})
export class EUCoreComponent {
    isLoggedIn = false;

    constructor(
        private docPageComponent: DocPageComponent) { }

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
