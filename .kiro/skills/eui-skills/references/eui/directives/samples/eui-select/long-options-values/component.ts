import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';

import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_ALERT} from '@eui/components/eui-alert';
import { FormsModule } from '@angular/forms';
import { EuiTruncatePipe } from '@eui/components/pipes';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';

@Component({
    selector: 'long-options-values',
    templateUrl: 'component.html',
    imports: [FormsModule, ...EUI_SELECT, ...EUI_LABEL, ...EUI_ALERT, EuiTruncatePipe, ...EUI_INPUT_GROUP, JsonPipe],
})
export class LongOptionsValuesComponent {

    public longValue = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar nulla nunc, a ultricies turpis hendrerit ut. Mauris consectetur sapien sapien, ut eleifend mi consectetur ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    public longValue2 = 'Morbi sollicitudin ante ac tortor condimentum convallis. Nullam aliquet finibus felis. Phasellus nec condimentum dolor. Pellentesque aliquet enim non tellus bibendum condimentum. Morbi sodales tincidunt purus, vitae eleifend nulla tempor vel.';

    get superLongText() {
        return 'Super long text '.repeat(20);
    }

    get superLongPlaceholder() {
        return 'Super long placeholder '.repeat(20);
    }
}
