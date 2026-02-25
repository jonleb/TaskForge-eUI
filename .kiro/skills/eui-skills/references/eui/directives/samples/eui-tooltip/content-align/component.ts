import { Component } from '@angular/core';

import { EuiTooltipDirective } from '@eui/components/directives';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'content-align',
    templateUrl: 'component.html',
    imports: [
        EuiTooltipDirective,
        ...EUI_BUTTON,
    ],
})
export class ContentAlignmentComponent {

    public bigContentLatin = `Nunc sit amet lectus mattis, aliquam mi quis, iaculis est.
    Donec nec diam tristique, egestas lorem nec, varius neque.
    Aenean consequat nisi in sem porttitor, a eleifend lorem tincidunt.
    Phasellus scelerisque tellus eu imperdiet dictum.

    Sed vitae tellus ac nisl facilisis posuere.
    Mauris cursus dui nec arcu molestie sodales.
    Morbi vel enim semper, luctus odio vitae, lacinia nisl.
    Sed sollicitudin ex et nibh bibendum, id blandit nunc pretium.
    Nunc venenatis eros a leo tincidunt gravida.`;

    /* eslint-disable max-len */
    public bigContentEnglish = `Contrary to popular belief, Lorem Ipsum is not simply random text.
    It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
    Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.

    Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
    This book is a treatise on the theory of ethics, very popular during the Renaissance.
    The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
    Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`;
    /* eslint-enable max-len */
}
