# ecl-media-container

## Overview

<more-info componentPartUrl="media/media-container/usage/"></more-info>

## API

API content

## Samples

### Default

```html
<ecl-media-container>
    <picture eclMediaContainerPicture>
        <img eclMediaContainerImage src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg" alt="EC Logo">
    </picture>
    Lorem ipsum dolor sit amet consectetur adipiscing elite tempored incididunt ut labore et dolore magna aliqua lorem
    ipsum dolor sit amet consectetur adipiscing<br/>©Copyright
</ecl-media-container>
```

```typescript
import { Component } from '@angular/core';
import { EUI_ECL_MEDIA_CONTAINER } from '@eui/ecl/components/ecl-media-container';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_MEDIA_CONTAINER],
})
export class DefaultComponent {}
```
