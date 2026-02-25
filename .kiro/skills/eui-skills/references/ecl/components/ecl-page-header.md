# ecl-page-header

## Overview

The Page header component provides basic structure and guidance and ensures that users are met with an easily recognisable and uniform design layout, as well as a content pattern through which information about the current page is presented. It is always placed just below the Site header.
<br>
<more-info componentPartUrl="site-wide/page-header/usage/"></more-info>

## API

API content

## Samples

### Default

```html
<ecl-page-header>
    <ecl-breadcrumb>
        <ecl-breadcrumb-segment>Home</ecl-breadcrumb-segment>
        <ecl-breadcrumb-segment>About the European Commission</ecl-breadcrumb-segment>
        <ecl-breadcrumb-segment>Organisational structure</ecl-breadcrumb-segment>
        <ecl-breadcrumb-segment>How the Commission is organised</ecl-breadcrumb-segment>
        <ecl-breadcrumb-segment isCurrentPage> News</ecl-breadcrumb-segment>
    </ecl-breadcrumb>

    <div eclPageHeaderInfo>
        <ul eclPageHeaderMeta>
            <li eclPageHeaderMetaItem>META INFO</li>
            <li eclPageHeaderMetaItem>DD Month YYYY</li>
        </ul>
        <h1 eclPageHeaderTitle>Page title</h1>
    </div>
    <div eclPageHeaderDescriptionContainer>
        <p eclPageHeaderDescription>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec ullamcorper mi. Morbi interdum
            fermentum tempus. Nam nec rhoncus risus,<a eclLink routerLink="/">
            eget dictum elit</a>. Vestibulum gravida tincidunt venenatis.
        </p>
    </div>
</ecl-page-header>

<h6 class="section-title">Page header with background image</h6>
<ecl-page-header>
    <picture eclPageHeaderBackgroundPicture>
        <img eclPageHeaderBackgroundImage
             src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image2.jpg"
             alt="Europe map"/>
    </picture>
    <ecl-breadcrumb>
        <ecl-breadcrumb-segment>Home</ecl-breadcrumb-segment>
        <ecl-breadcrumb-segment>About the European Commission</ecl-breadcrumb-segment>
        <ecl-breadcrumb-segment>Organisational structure</ecl-breadcrumb-segment>
        <ecl-breadcrumb-segment>How the Commission is organised</ecl-breadcrumb-segment>
        <ecl-breadcrumb-segment isCurrentPage> News</ecl-breadcrumb-segment>
    </ecl-breadcrumb>

    <div eclPageHeaderInfo>
        <ul eclPageHeaderMeta>
            <li eclPageHeaderMetaItem>META INFO</li>
            <li eclPageHeaderMetaItem>DD Month YYYY</li>
        </ul>
        <h1 eclPageHeaderTitle>Page title</h1>
    </div>
    <div eclPageHeaderDescriptionContainer>
        <p eclPageHeaderDescription>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec ullamcorper mi. Morbi interdum
            fermentum tempus. Nam nec rhoncus risus, <a eclLink routerLink="/">
            eget dictum elit</a>. Vestibulum gravida tincidunt venenatis.
        </p>
    </div>
</ecl-page-header>

<h6 class="section-title">Page header with thumbnail</h6>
<ecl-page-header>
    <ecl-breadcrumb>
        <ecl-breadcrumb-segment>Home</ecl-breadcrumb-segment>
        <ecl-breadcrumb-segment>About the European Commission</ecl-breadcrumb-segment>
        <ecl-breadcrumb-segment>Organisational structure</ecl-breadcrumb-segment>
        <ecl-breadcrumb-segment>How the Commission is organised</ecl-breadcrumb-segment>
        <ecl-breadcrumb-segment isCurrentPage> News</ecl-breadcrumb-segment>
    </ecl-breadcrumb>

    <div eclPageHeaderInfo>
        <ul eclPageHeaderMeta>
            <li eclPageHeaderMetaItem>META INFO</li>
            <li eclPageHeaderMetaItem>DD Month YYYY</li>
        </ul>
        <h1 eclPageHeaderTitle>Page title</h1>
    </div>
    <div eclPageHeaderDescriptionContainer>
        <picture eclPageHeaderDescriptionPicture>
            <img eclPageHeaderDescriptionImage
                 src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image2.jpg"
                 alt="Europe map">
        </picture>
        <p eclPageHeaderDescription>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec ullamcorper mi. Morbi interdum
            fermentum tempus. Nam nec rhoncus risus, <a eclLink routerLink="/">
            eget dictum elit</a>. Vestibulum gravida tincidunt venenatis.
        </p>
    </div>
</ecl-page-header>
```

```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EUI_ECL_BREADCRUMB } from '@eui/ecl/components/ecl-breadcrumb';
import { EUI_ECL_PAGE_HEADER } from '@eui/ecl/components/ecl-page-header';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_BREADCRUMB, ...EUI_ECL_PAGE_HEADER],
})
export class DefaultComponent {}
```
