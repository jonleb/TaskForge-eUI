import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';
import { EUI_ECL_LIST } from '@eui/ecl/components/ecl-list';
import { EUI_ECL_NOTIFICATION } from '@eui/ecl/components/ecl-notification';

@Component({
    // tslint:disable-next-line
    selector: 'description-list',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_ICON, ...EUI_ECL_LINK, ...EUI_ECL_LIST, ...EUI_ECL_NOTIFICATION],
})
export class DescriptionListComponent {
    taxonomyItems = [
        { text: 'Taxonomy item'},
        { text: 'Taxonomy item', routerLink : '/'},
        { text: 'Taxonomy item'},
        { text: 'Taxonomy item'},
        { text: 'Taxonomy item', routerLink : '/'},
        { text: 'Taxonomy item', routerLink : '/'},
    ];

    tagItems = [
        { text: 'Link tag', routerLink : '/'},
        { text: 'Long link tag', routerLink : '/'},
        { text: 'Link tag', routerLink : '/'},
        { text: 'Link tag', routerLink : '/'},
        { text: 'Link tag', routerLink : '/'},
        { text: 'Long link tag', routerLink : '/'},
        { text: 'Link tag', routerLink : '/'}
    ];
}
