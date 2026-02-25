import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_ALERT } from '@eui/components/eui-alert';

@Component({
    // tslint:disable-next-line
    selector: 'placeholder',
    templateUrl: 'component.html',
    imports: [FormsModule, ...EUI_SELECT, ...EUI_ALERT],
})
export class PlaceholderComponent {
    public options: {value: string; label: string; selected?: boolean; disabled?: boolean}[] = [
        { value: 'angular', label: 'Angular', selected: true },
        { value: 'react', label: 'React', disabled: true },
        { value: 'vue', label: 'Vue' },
    ];
}
