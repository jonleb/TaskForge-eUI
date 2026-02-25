import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';
import {  EclMegaMenuItem, EUI_ECL_MEGA_MENU } from '@eui/ecl/components/ecl-mega-menu';
import { EclSiteHeaderLogoClickEvent, EclSiteHeaderLanguageClickEvent,
  EclSiteHeaderLanguageSelectedEvent, EclSiteHeaderSearchEvent, 
  EUI_ECL_SITE_HEADER} from '@eui/ecl/components/ecl-site-header';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_ICON, ...EUI_ECL_LINK, ...EUI_ECL_SITE_HEADER, ...EUI_ECL_MEGA_MENU],
})
export class DefaultComponent {
    
    languageCode = 'en';
    linkExtraAttributes = {
        name: 'data-test',
        value: 'data-test-1',
    }

    onMegaMenuItemSelect(item: EclMegaMenuItem): void {
        console.log(item);
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
