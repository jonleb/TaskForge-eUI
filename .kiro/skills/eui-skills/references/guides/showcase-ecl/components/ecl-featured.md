# ecl-featured

## Overview

Featured item is a component that makes use of the Media container to add visual support to a piece of content.

Optionally, it can be used as an entry point for other pages (through its CTA), or to highlight and further differentiate from other articles on the page (through its highlight stylisation).
<br>
<more-info componentPartUrl="media/featured-item/usage/"></more-info>

## API

API content

## Samples

### [Default](samples/ecl-featured/Default)

```html
<ecl-featured>
    <ecl-featured-item>
        <ecl-media-container>
            <picture eclMediaContainerPicture>
                <img eclMediaContainerImage src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg" alt="EC Logo">
            </picture>
            Lorem ipsum dolor sit amet consectetur adipiscing elite tempored incididunt ut labore et dolore magna aliqua lorem
            ipsum dolor sit amet consectetur adipiscing<br />©Copyright
        </ecl-media-container>
    </ecl-featured-item>
    <ecl-featured-item eclTitle="Title: Ut enim ad minim
          veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo" titleId="title-id-example">
        <ecl-featured-item-description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur.
        </ecl-featured-item-description>
        <a routerLink="/" eclLink variant="standalone" eclFeaturedItemLink aria-describedby="title-id-example">
            <span eclLinkLabel>Read more</span>
            <ecl-icon icon="arrow-left" transform="flip-horizontal" size="s" role="img" ariaHidden="false">
            </ecl-icon>
        </a>
    </ecl-featured-item>
</ecl-featured>

<h6 class="section-title">Default right-aligned</h6>
<ecl-featured position="right">
    <ecl-featured-item>
        <ecl-media-container>
            <picture eclMediaContainerPicture>
                <img eclMediaContainerImage src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg" alt="EC Logo">
            </picture>
            Lorem ipsum dolor sit amet consectetur adipiscing elite tempored incididunt ut labore et dolore magna aliqua lorem
            ipsum dolor sit amet consectetur adipiscing<br />©Copyright
        </ecl-media-container>
    </ecl-featured-item>
    <ecl-featured-item eclTitle="Title: Ut enim ad minim
          veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo" titleId="title-id-example2">
        <ecl-featured-item-description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur.
        </ecl-featured-item-description>
        <a routerLink="/" eclLink variant="standalone" eclFeaturedItemLink aria-describedby="title-id-example2">
            <span eclLinkLabel>Read more</span>
            <ecl-icon icon="arrow-left" transform="flip-horizontal" size="s" role="img" ariaHidden="false">
            </ecl-icon>
        </a>
    </ecl-featured-item>
</ecl-featured>
```

```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EUI_ECL_FEATURED } from '@eui/ecl/components/ecl-featured';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';
import { EUI_ECL_MEDIA_CONTAINER } from '@eui/ecl/components/ecl-media-container';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_FEATURED, ...EUI_ECL_ICON, ...EUI_ECL_LINK, ...EUI_ECL_MEDIA_CONTAINER],
})
export class DefaultComponent {}
```

### Other examples

- [Highlighted](samples/ecl-featured/highlighted)
