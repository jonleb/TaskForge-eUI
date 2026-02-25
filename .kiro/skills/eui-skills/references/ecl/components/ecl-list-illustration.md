# ecl-list-illustration

## Overview

The list with illustrations component is used for illustrative purposes only, allowing a multi-column layout display of content with an image, illustration or icon.

The one-column layout also offers an optional zebra pattern, allowing users to easily scan through long lists.
<br>
<more-info componentPartUrl="list-illustration/usage/"></more-info>

## API

API content

## Samples

### Vertical list with images (large)

```html
<div eclFormGroup>
    <label eclFormLabel>Font size: </label>
    <select eclSelect [(ngModel)]="fontSize" aria-label="Font size">
        <option value="l">Large</option>
        <option value="m">Medium</option>
    </select>
</div>
<br>

<ecl-list-illustration isZebra [fontSize]="fontSize">
    <ecl-list-illustration-item eclTitle="List with illustration item 1"
                                eclValue="3.2 million">
        <picture eclListIllustrationPicture>
            <img eclListIllustrationImage
                 src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg"
                 alt="Image alternative text">
        </picture>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        eleifend quam leo, at malesuada ex viverra vitae. Nullam id felis eu lorem condimentum rutrum vitae ut
        felis.
        Nam ultricies, metus vel aliquam euismod, lacus dolor sodales neque, in laoreet tellus erat posuere purus.
        Fusce
        sit amet sem dui. In nec lacinia eros.
    </ecl-list-illustration-item>
    <ecl-list-illustration-item eclTitle="List with illustration item 2" eclValue="3.2 million">
        <picture eclListIllustrationPicture>
            <img eclListIllustrationImage
                 src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg"
                 alt="Image alternative text">
        </picture>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        eleifend quam leo, at malesuada ex viverra vitae. Nullam id felis eu lorem condimentum rutrum vitae ut
        felis.
        Nam ultricies, metus vel aliquam euismod, lacus dolor sodales neque, in laoreet tellus erat posuere purus.
        Fusce
        sit amet sem dui. In nec lacinia eros.
    </ecl-list-illustration-item>
    <ecl-list-illustration-item eclTitle="List with illustration item 3" eclValue="3.2 million">
        <picture eclListIllustrationPicture>
            <img eclListIllustrationImage
                 src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg"
                 alt="Image alternative text">
        </picture>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        eleifend quam leo, at malesuada ex viverra vitae. Nullam id felis eu lorem condimentum rutrum vitae ut
        felis.
        Nam ultricies, metus vel aliquam euismod, lacus dolor sodales neque, in laoreet tellus erat posuere purus.
        Fusce
        sit amet sem dui. In nec lacinia eros.
    </ecl-list-illustration-item>
    <ecl-list-illustration-item eclTitle="List with illustration item 4" eclValue="3.2 million">
        <picture eclListIllustrationPicture>
            <img eclListIllustrationImage
                 src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg"
                 alt="Image alternative text">
        </picture>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        eleifend quam leo, at malesuada ex viverra vitae. Nullam id felis eu lorem condimentum rutrum vitae ut
        felis.
        Nam ultricies, metus vel aliquam euismod, lacus dolor sodales neque, in laoreet tellus erat posuere purus.
        Fusce
        sit amet sem dui. In nec lacinia eros.
    </ecl-list-illustration-item>
</ecl-list-illustration>
```

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_LIST_ILUSTRATION } from '@eui/ecl/components/ecl-list-illustration';
import { EUI_ECL_SELECT } from '@eui/ecl/components/ecl-select';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [FormsModule, ...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_LIST_ILUSTRATION, ...EUI_ECL_SELECT],
})
export class DefaultComponent {
    fontSize: 'm' | 'l' = 'l';
}
```
