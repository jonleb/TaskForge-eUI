# ecl-blockquote

## Overview

The blockquotes component is used to capture users' attention of an excerpt, testimonial, or a quote cited from the article or other sources. The design style makes the quoted section more distinguishable than the rest of the content in the web page.
<br>
<more-info componentPartUrl="blockquote/usage/"></more-info>

## API

API content

## Samples

### Default

```html
<figure eclBlockquote
    author="Someone">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    sodales, nisl tincidunt hendrerit elementum, purus risus tempus dui, sit amet cursus massa odio non lacus.
</figure>

<h6 class="section-title">With image</h6>
<figure eclBlockquote
        author="Someone">
    <picture eclBlockquotePicture>
        <img eclBlockquoteImage
             src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image-square.jpg"
             alt="Image alternative text" />
    </picture>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    sodales, nisl tincidunt hendrerit elementum, purus risus tempus dui, sit amet cursus massa odio non lacus.
</figure>
```

```typescript
import { Component } from '@angular/core';
import { EUI_ECL_BLOCKQUOTE } from '@eui/ecl/components/ecl-blockquote';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_BLOCKQUOTE],
})
export class DefaultComponent { }
```
