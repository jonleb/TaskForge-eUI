import { Component } from '@angular/core';
import { EUI_ECL_BUTTON } from '@eui/ecl/components/ecl-button';
import { EUI_ECL_LOADING_INDICATOR } from '@eui/ecl/components/ecl-loading-indicator';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [TranslateModule, ...EUI_ECL_BUTTON, ...EUI_ECL_LOADING_INDICATOR],
})
export class DefaultComponent {

    isVisible = true;

    onClick() {
        this.isVisible = !this.isVisible;
    }
}
