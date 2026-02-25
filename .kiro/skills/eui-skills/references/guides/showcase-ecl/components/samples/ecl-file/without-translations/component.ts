import { Component } from '@angular/core';
import { EUI_ECL_FILE } from '@eui/ecl/components/ecl-file';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';

@Component({
    // tslint:disable-next-line
    selector: 'without-translations',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_FILE, ...EUI_ECL_ICON, ...EUI_ECL_LINK],
})
export class WithoutTranslationsComponent {

    onItemDownload(evt: Event) {
        console.log('download', evt);
    }
}
