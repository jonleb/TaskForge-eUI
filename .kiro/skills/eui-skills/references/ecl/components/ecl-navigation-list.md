# ecl-navigation-list

## Overview

Navigation lists provide users with a quick way to scan through items and access the information they are looking for, supporting the information architecture.
<br>
<more-info componentPartUrl="navigation/navigation-list/usage/"></more-info>

## API

API content

## Samples

### Default

```html
<ecl-navigation-list columns="3">
    <ecl-navigation-list-item>
        <picture eclNavigationListPicture><img eclNavigationListImage
                 src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg"
                 alt="Alt text for the image"></picture>
        <ecl-content-block>
            <div eclContentBlockTitle>
                <a eclLink routerLink="/" variant="standalone">Title 1</a>
            </div>

            <div eclContentBlockDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus gravida ipsum ut lorem cursus, quis tincidunt sem viverra. Nunc vestibulum, mauris quis porta venenatis, justo odio commodo tellus
            </div>

            <div eclContentBlockLinksContainer>
                <ul eclContentBlockLinks>
                    <li eclContentBlockLink>
                        <a eclLink variant="standalone" routerLink="/">Primary link 1</a>
                    </li>
                    <li eclContentBlockLink>
                        <a eclLink variant="standalone" routerLink="/">Primary link 2</a>
                    </li>
                    <li eclContentBlockLink>
                        <a eclLink variant="standalone" routerLink="/">Primary link 3</a>
                    </li>
                    <li eclContentBlockLink>
                        <a eclLink variant="standalone" routerLink="/">Primary link 4</a>
                    </li>
                </ul>
                <ul eclContentBlockLinks>
                    <li eclContentBlockLink>
                        <a eclLink variant="standalone" routerLink="/">Secondary link 1</a>
                    </li>
                    <li eclContentBlockLink>
                        <a eclLink variant="standalone" routerLink="/">Secondary link 2</a>
                    </li>
                </ul>
            </div>
        </ecl-content-block>
    </ecl-navigation-list-item>
    <ecl-navigation-list-item>
        <picture eclNavigationListPicture><img eclNavigationListImage
            src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg"
            alt="Alt text for the image"></picture>
        <ecl-content-block>
            <div eclContentBlockTitle>
                <a eclLink routerLink="/" variant="standalone">Title 2</a>
            </div>

            <div eclContentBlockDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus gravida ipsum ut lorem cursus, quis tincidunt sem viverra. Nunc vestibulum, mauris quis porta venenatis, justo odio commodo tellus
            </div>

            <div eclContentBlockLinksContainer>
                <ul eclContentBlockLinks>
                    <li eclContentBlockLink>
                        <a eclLink variant="standalone" routerLink="/">Primary link 1</a>
                    </li>
                    <li eclContentBlockLink>
                        <a eclLink variant="standalone" routerLink="/">Primary link 2</a>
                    </li>
                    <li eclContentBlockLink>
                        <a eclLink variant="standalone" routerLink="/">Primary link 3</a>
                    </li>
                    <li eclContentBlockLink>
                        <a eclLink variant="standalone" routerLink="/">Primary link 4</a>
                    </li>
                </ul>
                <ul eclContentBlockLinks>
                    <li eclContentBlockLink>
                        <a eclLink variant="standalone" routerLink="/">Secondary link 1</a>
                    </li>
                    <li eclContentBlockLink>
                        <a eclLink variant="standalone" routerLink="/">Secondary link 2</a>
                    </li>
                </ul>
            </div>
        </ecl-content-block>
    </ecl-navigation-list-item>
    <ecl-navigation-list-item>
        <picture eclNavigationListPicture><img eclNavigationListImage
            src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg"
            alt="Alt text for the image"></picture>
        <ecl-content-block>
            <div eclContentBlockTitle>
                <a eclLink routerLink="/" variant="standalone">Title 3</a>
            </div>

            <div eclContentBlockDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus gravida ipsum ut lorem cursus, quis tincidunt sem viverra. Nunc vestibulum, mauris quis porta venenatis, justo odio commodo tellus
            </div>

            <div eclContentBlockLinksContainer>
                <ul eclContentBlockLinks>
                    <li eclContentBlockLink>
                        <a eclLink variant="standalone" routerLink="/">Primary link 1</a>
                    </li>
                    <li eclContentBlockLink>
                        <a eclLink variant="standalone" routerLink="/">Primary link 2</a>
                    </li>
                    <li eclContentBlockLink>
                        <a eclLink variant="standalone" routerLink="/">Primary link 3</a>
                    </li>
                    <li eclContentBlockLink>
                        <a eclLink variant="standalone" routerLink="/">Primary link 4</a>
                    </li>
                </ul>
                <ul eclContentBlockLinks>
                    <li eclContentBlockLink>
                        <a eclLink variant="standalone" routerLink="/">Secondary link 1</a>
                    </li>
                    <li eclContentBlockLink>
                        <a eclLink variant="standalone" routerLink="/">Secondary link 2</a>
                    </li>
                </ul>
            </div>
        </ecl-content-block>
    </ecl-navigation-list-item>
</ecl-navigation-list>
```

```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EUI_ECL_CONTENT_BLOCK } from '@eui/ecl/components/ecl-content-block';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';
import { EUI_ECL_NAVIGATION_LIST } from '@eui/ecl/components/ecl-navigation-list';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_NAVIGATION_LIST, ...EUI_ECL_CONTENT_BLOCK, ...EUI_ECL_LINK],
})
export class DefaultComponent {}
```
