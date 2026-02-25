# ecl-breadcrumb

## Overview

The Breadcrumb informs the users on their current location relative to the homepage of the website and allows them to navigate to higher levels. It is a series links except the last item in the group, which is the current page.
<br>
<more-info componentPartUrl="navigation/breadcrumb/usage/"></more-info>

## API

API content

## Samples

### Default

```html
<h6 class="section-title">Long breadcrumb</h6>
<ecl-breadcrumb>
    <ol eclBreadcrumbContainer>
        <li eclBreadcrumbSegment href="http://ec.europa.eu">Home</li>
        <li eclBreadcrumbSegment routerLink="about">About the European Commission</li>
        <li eclBreadcrumbSegment routerLink="structure">Organisational structure</li>
        <li eclBreadcrumbSegment routerLink="org">How the Commission is organized</li>
        <li eclBreadcrumbSegment routerLink="dt-department">Digital Transformation Department</li>
        <li eclBreadcrumbSegment routerLink="infsystem-logistics">Information Systems and Logistics</li>
        <li eclBreadcrumbSegment routerLink="financial-government">Financial Government of the Institutions</li>
        <li eclBreadcrumbSegment routerLink="financing-it-services">Financing of IT Services</li>
        <li eclBreadcrumbSegment routerLink="details">Details of the Funds Granted This Year</li>
        <li eclBreadcrumbSegment isCurrentPage>News</li>
    </ol>
</ecl-breadcrumb>
```

```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EUI_ECL_BREADCRUMB } from '@eui/ecl/components/ecl-breadcrumb';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_BREADCRUMB],
})
export class DefaultComponent {}
```
