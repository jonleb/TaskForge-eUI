import { Component } from '@angular/core';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';
import { EclMenuItemSelectEvent, EclMenuItem, EUI_ECL_MENU } from '@eui/ecl/components/ecl-menu';
import { EclSiteHeaderLogoClickEvent, EclSiteHeaderLanguageClickEvent, EclSiteHeaderLanguageSelectedEvent,
    EclSiteHeaderSearchEvent, 
    EUI_ECL_SITE_HEADER} from '@eui/ecl/components/ecl-site-header';

@Component({
    // tslint:disable-next-line
    selector: 'overflow',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_SITE_HEADER, ...EUI_ECL_LINK, ...EUI_ECL_MENU, ...EUI_ECL_ICON],
})
export class OverflowComponent {
    dynamicSubitems: Array<EclMenuItem> = [
        { id: '1', label: 'Item 7.1' },
        { id: '2', label: 'Item 7.2' },
        { id: '3', label: 'Item 7.3' },
        { id: '4', label: 'Item 7.4 with a very long label' },
        { id: '5', label: 'Item 7.5' },
        { id: '6', label: 'Item 7.6' },
        { id: '7', label: 'Item 7.7' },
        { id: '8', label: 'Item 7.8' },
        { id: '9', label: 'Item 7.9' },
        { id: '10', label: 'Item 7.10' },
        { id: '11', label: 'Item 7.11' },
        { id: '12', label: 'Item 7.12' },
        { id: '13', label: 'Item 7.13' },
        { id: '14', label: 'Item 7.14' },
        { id: '15', label: 'Item 7.15' },
        { id: '16', label: 'Item 7.16' },
    ];
    languageCode = 'en';

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
