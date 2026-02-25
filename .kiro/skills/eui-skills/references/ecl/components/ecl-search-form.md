# ecl-search-form

## Overview

<more-info componentPartUrl="forms/search-form/usage/"></more-info>

## API

API content

## Samples

### Default

```html
<ecl-search-form 
    (search)="onSearch($event)"></ecl-search-form>

<h6 class="section-title">Custom Placeholder</h6>
<ecl-search-form 
    placeholder="Find users, events and more"
    (search)="onSearch($event)"></ecl-search-form>

<h6 class="section-title">Custom Button Label</h6>
<ecl-search-form 
    searchButtonLabel="Find.."
    (search)="onSearch($event)"></ecl-search-form>

<h6 class="section-title">Custom Button Icon (mobile only)</h6>
<ecl-search-form 
    searchButtonIcon="data"
    (search)="onSearch($event)"></ecl-search-form>

<h6 class="section-title">Extra classes for button and input</h6>
<ecl-search-form [buttonExtraClassses]="buttonExtraClassses" [inputExtraClassses]="inputExtraClassses"
    (search)="onSearch($event)"></ecl-search-form>
```

```typescript
import { Component } from '@angular/core';
import { EclSearchFormEvent, EUI_ECL_SEARCH_FORM } from '@eui/ecl/components/ecl-search-form';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_SEARCH_FORM],
})
export class DefaultComponent {

    buttonExtraClassses = 'button-extra-class';
    inputExtraClassses = 'input-extra-class';

    onSearch(evt: EclSearchFormEvent) {
        console.log('search performed', evt);
    }
}
```
