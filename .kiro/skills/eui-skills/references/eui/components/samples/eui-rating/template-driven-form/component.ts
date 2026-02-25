import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EUI_RATING } from '@eui/components/eui-rating';

@Component({
    // eslint-disable-next-line
    selector: 'template-driven-form',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
        ...EUI_RATING,
    ],
})
export class TemplateDrivenFormComponent {
    protected rating = 2;
}
