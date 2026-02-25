import { Component } from '@angular/core';

import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';

@Component({
    // eslint-disable-next-line
    selector: 'header-multilines',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CARD,
        ...EUI_SLIDE_TOGGLE,
    ],
})
export class HeaderMultilinesComponent {

    public isMulti = true;
    public cardTitle = `Card title - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris feugiat, risus sit amet ultricies finibus, diam dolor congue leo, vel vehicula nisl metus eget eros`;
    public cardSubtitle = `Card subtitle - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Vivamus sed felis ac risus gravida auctor. Praesent vitae neque nec elit maximus lacinia.
                            Sed fringilla sodales est. In ut fermentum diam, ac venenatis lorem.
                            Quisque enim orci, dictum vitae vehicula pretium, rhoncus a nibh.`;

    public onChangeMulti(e: boolean): void {
        this.isMulti = e;
    }
}
