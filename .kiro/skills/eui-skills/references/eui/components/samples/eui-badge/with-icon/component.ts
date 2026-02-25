import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EuiMaxLengthDirective } from '@eui/components/directives';
import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';

@Component({
    // eslint-disable-next-line
    selector: 'with-icon',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
        ...EUI_BADGE,
        ...EUI_ICON,
        ...EUI_INPUT_TEXT,
        ...EUI_INPUT_NUMBER,
        ...EUI_LABEL,
        EuiMaxLengthDirective,
    ]
})
export class WithIconComponent {

    badgeLabel = '9';
    tooltipNA = 'This composition is not available and is not recommended ! &#13; The icon is too small and will be fully covered by the badge.';

    sizes = [
        { size: 's',   iconSizes: [
            { s:'s', v:true }, { s:'m', v:true }, { s:'l', v:false },
        ] },
        { size: 'm',   iconSizes: [
            { s:'s', v:false }, { s:'m', v:true }, { s:'l', v:true },
        ] },
    ];

    iconSizes = [ 's', 'm', 'l' ];
}
