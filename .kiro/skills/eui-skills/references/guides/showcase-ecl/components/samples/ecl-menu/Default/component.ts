import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';
import { EclMenuItemSelectEvent, EUI_ECL_MENU } from '@eui/ecl/components/ecl-menu';
import {
  EclSiteHeaderLanguageClickEvent,
  EclSiteHeaderLanguageSelectedEvent,
  EclSiteHeaderLogoClickEvent,
  EclSiteHeaderSearchEvent,
  EUI_ECL_SITE_HEADER
} from '@eui/ecl/components/ecl-site-header';

@Component({
  // tslint:disable-next-line
  selector: 'Default',
  templateUrl: 'component.html',
  imports: [RouterLink, ...EUI_ECL_SITE_HEADER, ...EUI_ECL_LINK, ...EUI_ECL_MENU, ...EUI_ECL_ICON],
})
export class DefaultComponent {

  languageCode = 'en';
  linkExtraAttributes = {
    name: 'data-test',
    value: 'data-test-1',
  }
  onMenuItemSelected(evt: EclMenuItemSelectEvent) {
    console.log('menu item selected', evt);
  }

  onLogoClick(evt: EclSiteHeaderLogoClickEvent): void {
    console.log(evt);
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
}
