import { Component } from '@angular/core';
import { EclFileItemsToggleEvent, EUI_ECL_FILE } from '@eui/ecl/components/ecl-file';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';

@Component({
    // tslint:disable-next-line
    selector: 'with-thumbnail',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_FILE, ...EUI_ECL_ICON, ...EUI_ECL_LINK],
})
export class WithThumbnailComponent {

    onToggle(evt: EclFileItemsToggleEvent) {
        console.log('toggle', evt);
    }

    onItemDownload(evt: Event) {
        console.log('download', evt);
    }
}
