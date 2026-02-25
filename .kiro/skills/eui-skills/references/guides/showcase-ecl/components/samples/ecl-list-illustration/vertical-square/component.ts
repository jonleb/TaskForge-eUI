import { Component } from '@angular/core';
import { EUI_ECL_LIST_ILUSTRATION } from '@eui/ecl/components/ecl-list-illustration';

@Component({
    // tslint:disable-next-line
    selector: 'vertical-square',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_LIST_ILUSTRATION],
})
export class VerticalSquareComponent {

    texts = [
        {
        'title': 'List with illustration item 1',
        'value': '3.2 million',
        'description': `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            eleifend quam leo, at malesuada ex viverra vitae. Nullam id felis eu lorem condimentum rutrum vitae ut
            felis. Nam ultricies, metus vel aliquam euismod, lacus dolor sodales neque, in laoreet tellus erat posuere purus.
            Fusce sit amet sem dui. In nec lacinia eros.` },
        {
        'title': 'List with illustration item 2',
        'value': '3.2 million',
        'description': `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            eleifend quam leo, at malesuada ex viverra vitae. Nullam id felis eu lorem condimentum rutrum vitae ut
            felis. Nam ultricies, metus vel aliquam euismod, lacus dolor sodales neque, in laoreet tellus erat posuere purus.
            Fusce sit amet sem dui. In nec lacinia eros.` },
        {
        'title': 'List with illustration item 3',
        'value': '3.2 million',
        'description': `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            eleifend quam leo, at malesuada ex viverra vitae. Nullam id felis eu lorem condimentum rutrum vitae ut
            felis. Nam ultricies, metus vel aliquam euismod, lacus dolor sodales neque, in laoreet tellus erat posuere purus.
            Fusce sit amet sem dui. In nec lacinia eros.` },
        {
        'title': 'List with illustration item 4',
        'value': '3.2 million',
        'description': `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            eleifend quam leo, at malesuada ex viverra vitae. Nullam id felis eu lorem condimentum rutrum vitae ut
            felis. Nam ultricies, metus vel aliquam euismod, lacus dolor sodales neque, in laoreet tellus erat posuere purus.
            Fusce sit amet sem dui. In nec lacinia eros.` },
    ];
}
