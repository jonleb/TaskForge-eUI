import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EclGalleryShareEvent, EUI_ECL_GALLERY } from '@eui/ecl/components/ecl-gallery';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';
import { EUI_ECL_NOTIFICATION } from '@eui/ecl/components/ecl-notification';
import { EUI_ECL_SELECT } from '@eui/ecl/components/ecl-select';

@Component({
    // tslint:disable-next-line
    selector: 'grid',
    templateUrl: 'component.html',
    imports: [RouterLink, FormsModule, ...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_GALLERY, ...EUI_ECL_ICON, ...EUI_ECL_LINK,
        ...EUI_ECL_NOTIFICATION, ...EUI_ECL_SELECT],
})
export class GridComponent {
    gridTemplate = '0';
    ratio = '3-2';
    columns = 2;

    onShare(evt: EclGalleryShareEvent) {
        console.log('sharing..', evt);
    }
}
