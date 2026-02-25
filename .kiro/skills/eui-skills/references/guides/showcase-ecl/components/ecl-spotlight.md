# ecl-spotlight

## Overview

<more-info componentPartUrl="spotlight/usage/"></more-info>

## API

API content

## Samples

### [Default](samples/ecl-spotlight/Default)

```html
<section eclSpotlight hasAnchor header="In focus" spotlightTitle="Proin molestie sapien ut blandit" copyright="Copyright">
  <a href="/example#azr8o" eclSpotlightLink>
      <picture eclSpotlightPicture>
        <source srcset="https://inno-ecl.s3.amazonaws.com/media/examples/example-image6.jpg"
          media="all and (min-width: 1368px)">
        <source srcset="https://inno-ecl.s3.amazonaws.com/media/examples/example-image4.jpg"
          media="all and (min-width: 1140px)">
        <source srcset="https://inno-ecl.s3.amazonaws.com/media/examples/example-image3.jpg"
          media="all and (min-width: 996px)">
        <source srcset="https://inno-ecl.s3.amazonaws.com/media/examples/example-image2.jpg"
          media="all and (min-width: 768px)"><img eclSpotlightImage
          src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg" alt="alternative text">
      </picture>
  </a>
</section>
```

```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EUI_ECL_SPOTLIGHT } from '@eui/ecl/components/ecl-spotlight';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_SPOTLIGHT],
})
export class DefaultComponent {}
```
