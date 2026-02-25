# ecl-page-header

## Overview

The Page header component provides basic structure and guidance and ensures that users are met with an easily recognisable and uniform design layout, as well as a content pattern through which information about the current page is presented. It is always placed just below the Site header.
<br>
<more-info componentPartUrl="site-wide/page-header/usage/"></more-info>

## API

API content

## Samples

### [Default](samples/ecl-page-header/Default)

```html
<ecl-page-header>
    <div eclPageHeaderExpandable>
        <div eclPageHeaderExpandableHeader><strong>LOREM IPSUM</strong> - dolor sit amet,
            consectetur <a eclLink href="/example">adipiscing</a> elit.</div>
        <ul>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Morbi faucibus justo eget ante hendrerit sagittis
                <ul>
                    <li>consectetur adipiscing</li>
                    <li>Maecenas non convallis dolor</li>
                </ul>
            </li>
            <li>Integer dignissim imperdiet</li>
        </ul>
    </div>
    <ecl-breadcrumb>
        <ol eclBreadcrumbContainer>
            <li eclBreadcrumbSegment href="http://ec.europa.eu">Home</li>
            <li eclBreadcrumbSegment routerLink="about">About the European Commission</li>
            <li eclBreadcrumbSegment routerLink="structure">Organisational structure</li>
            <li eclBreadcrumbSegment routerLink="org">How the Commission is organized</li>
            <li eclBreadcrumbSegment isCurrentPage>News</li>
        </ol>
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
        <img eclPageHeaderBackgroundImage src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image2.jpg"
            alt="Europe map" />
    </picture>
    <ecl-breadcrumb>
        <ol eclBreadcrumbContainer>
            <li eclBreadcrumbSegment href="http://ec.europa.eu">Home</li>
            <li eclBreadcrumbSegment routerLink="about">About the European Commission</li>
            <li eclBreadcrumbSegment routerLink="structure">Organisational structure</li>
            <li eclBreadcrumbSegment routerLink="org">How the Commission is organized</li>
            <li eclBreadcrumbSegment isCurrentPage>News</li>
        </ol>
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
        <ol eclBreadcrumbContainer>
            <li eclBreadcrumbSegment href="http://ec.europa.eu">Home</li>
            <li eclBreadcrumbSegment routerLink="about">About the European Commission</li>
            <li eclBreadcrumbSegment routerLink="structure">Organisational structure</li>
            <li eclBreadcrumbSegment routerLink="org">How the Commission is organized</li>
            <li eclBreadcrumbSegment isCurrentPage>News</li>
        </ol>
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
            <img eclPageHeaderDescriptionImage src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image2.jpg"
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
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';
import { EUI_ECL_BREADCRUMB } from '@eui/ecl/components/ecl-breadcrumb';
import { EUI_ECL_PAGE_HEADER } from '@eui/ecl/components/ecl-page-header';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_BREADCRUMB, ...EUI_ECL_PAGE_HEADER, ...EUI_ECL_LINK],
})
export class DefaultComponent {}
```
