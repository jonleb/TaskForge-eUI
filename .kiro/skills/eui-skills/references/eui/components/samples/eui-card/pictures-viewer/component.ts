import { Component, OnInit } from '@angular/core';

import { EUI_CARD } from '@eui/components/eui-card';
import { EuiTooltipDirective } from '@eui/components/directives';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_ALERT } from '@eui/components/eui-alert';

@Component({
    // eslint-disable-next-line
    selector: 'pic-viewer-composition',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CARD,
        EuiTooltipDirective,
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_ALERT,
    ],
})
export class PicViewerCompositionComponent implements OnInit {

    public images = [
        { id: 1, category: 'Dog Breed', legend: 'Shiba Inu face', url: './assets/images/cards/shiba1.jpg', active: true },
        { id: 2, category: 'Dog Breed', legend: 'Shiba Inu | Dog Breed', url: './assets/images/cards/shiba2.jpg' },
        { id: 3, category: 'Dog Breed', legend: 'Shiba Inu posing', url: './assets/images/cards/shiba3.jpg' },
    ];
    public picture: { id: number; category: string; legend: string; url: string; active?: boolean };
    public index = 1;

    constructor( ) { }

    ngOnInit() {
        this.picture = this._getImage(1);
    }

    public showPicture(index: number): void {
        this.index += index;
        if (this.index > 0 && this.index < this.images.length + 1) {
            this.picture = this._getImage(this.index);
        } else {
            this.index = 1;
            this.picture = this._getImage(this.index);
        }
    }

    private _getImage(id: number): { id: number; category: string; legend: string; url: string; active?: boolean } {
        return this.images.slice(0).find(picture => picture.id === id);
    }
}
