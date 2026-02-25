import { Component } from '@angular/core';

import { EUI_CARD } from '@eui/components/eui-card';

import { SampleComponent } from './component/sample.component';

@Component({
    // eslint-disable-next-line
    selector: 'component-in-content',
    templateUrl: 'component.html',
    imports: [
        SampleComponent,
        ...EUI_CARD,
    ]
})
export class ComponentInContentComponent {
}
