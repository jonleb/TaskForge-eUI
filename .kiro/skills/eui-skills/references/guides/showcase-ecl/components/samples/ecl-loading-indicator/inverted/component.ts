import { Component } from '@angular/core';
import { EUI_ECL_LOADING_INDICATOR } from '@eui/ecl/components/ecl-loading-indicator';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    // tslint:disable-next-line
    selector: 'inverted',
    templateUrl: 'component.html',
    imports: [TranslateModule, ...EUI_ECL_LOADING_INDICATOR],
})
export class InvertedComponent {}
