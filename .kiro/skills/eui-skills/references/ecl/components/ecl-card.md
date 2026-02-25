# ecl-card

## Overview

Cards component is used as an entry point to more detailed information. The component can include various sets of elements to serve users' specific needs.
<br>
<more-info componentPartUrl="card/usage/"></more-info>

## API

API content

## Samples

### Default

```html
<ecl-card>
    <picture eclCardPicture hasZoom aria-label="card image">
        <img eclCardImage src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg" alt="card image" />
    </picture>
    <ecl-card-body>
        <ecl-content-block>
            <ul eclContentBlockLabels>
                <li eclContentBlockLabel aria-label="Labels">
                    <span eclLabel variant="highlight">highlight</span>
                </li>
                <li eclContentBlockLabel>
                    <span eclLabel variant="medium">call status: upcoming</span>
                </li>
            </ul>

            <ul eclContentBlockPrimaryMetas>
                <li eclContentBlockPrimaryMeta>PRIMARY META</li>
                <li eclContentBlockPrimaryMeta>DD Month Year</li>
            </ul>

            <div eclContentBlockTitle>
                <a eclLink routerLink="/" variant="standalone">Title</a>
            </div>

            <div eclContentBlockDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus gravida ipsum ut lorem cursus, quis tincidunt sem
                viverra. Nunc vestibulum, mauris quis porta venenatis, justo odio commodo tellus
            </div>

            <ul eclContentBlockSecondaryMetas>
                <li eclContentBlockSecondaryMeta>
                    <ecl-icon icon="calendar" size="s" eclContentBlockSecondaryMetaIcon></ecl-icon>
                    <span eclContentBlockSecondaryMetaLabel>2018/10/22</span>
                </li>
                <li eclContentBlockSecondaryMeta>
                    <ecl-icon icon="location" size="s" eclContentBlockSecondaryMetaIcon></ecl-icon>
                    <span eclContentBlockSecondaryMetaLabel>Luxembourg</span>
                </li>
            </ul>
        </ecl-content-block>
    </ecl-card-body>
</ecl-card>
```

```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EUI_ECL_CARD } from '@eui/ecl/components/ecl-card';
import { EUI_ECL_CONTENT_BLOCK } from '@eui/ecl/components/ecl-content-block';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LABEL } from '@eui/ecl/components/ecl-label';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_CARD, ...EUI_ECL_CONTENT_BLOCK, ...EUI_ECL_ICON, ...EUI_ECL_LABEL, ...EUI_ECL_LINK],
})
export class DefaultComponent {}
```
