import { Component } from "@angular/core";

import { EUI_CHIP } from "@eui/components/eui-chip";
import { EuiTooltipDirective } from "@eui/components/directives";
import { EUI_LABEL } from "@eui/components/eui-label";

@Component({
    // eslint-disable-next-line
    selector: 'tooltip',
    templateUrl: 'component.html',
    imports: [...EUI_CHIP, ...EUI_LABEL, EuiTooltipDirective],
})
export class TooltipComponent {

    public bigContentLatin = `Nunc sit amet lectus mattis, aliquam mi quis, iaculis est.
    Donec nec diam tristique, egestas lorem nec, varius neque.
    Aenean consequat nisi in sem porttitor, a eleifend lorem tincidunt.
    Phasellus scelerisque tellus eu imperdiet dictum.

    Sed vitae tellus ac nisl facilisis posuere.
    Mauris cursus dui nec arcu molestie sodales.
    Morbi vel enim semper, luctus odio vitae, lacinia nisl.
    Sed sollicitudin ex et nibh bibendum, id blandit nunc pretium.
    Nunc venenatis eros a leo tincidunt gravida.`;
}
