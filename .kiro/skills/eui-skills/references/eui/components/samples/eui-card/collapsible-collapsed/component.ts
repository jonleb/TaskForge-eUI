import { Component } from '@angular/core';

import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // eslint-disable-next-line
    selector: 'collapsible-collapsed',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CARD,
        ...EUI_BUTTON,
    ],
})
export class CollapsibleCollapsedComponent {

    public isCollapsible = true;
    public isCollapsed = false;
    public hasLeftExpander = false;

    constructor( ) {}

    public toggleIsCollapsible(): void {
        this.isCollapsible = !this.isCollapsible;
    }

    public toggleIsCollapsed(): void {
        this.isCollapsed = !this.isCollapsed;
    }

    public toggleHasLeftExpander(): void {
        this.hasLeftExpander = !this.hasLeftExpander;
    }
}
