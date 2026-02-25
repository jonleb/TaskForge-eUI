# ecl-divider

## Overview

<more-info componentPartUrl="divider/usage/"></more-info>

## API

API content

## Samples

### [Default](samples/ecl-divider/Default)

```html
<ul eclUnorderedList>
    <li eclUnorderedListItem>Unordered list</li>
    <li eclUnorderedListItem>Unordered list
        <ul eclUnorderedList>
            <li eclUnorderedListItem>Nested unordered list</li>
            <li eclUnorderedListItem>Nested unordered list</li>
        </ul>
    </li>
</ul>
<hr eclDivider>
<ul eclOrderedList>
    <li eclOrderedListItem>Ordered list</li>
    <li eclOrderedListItem>Ordered list
        <ul eclOrderedList>
            <li eclOrderedListItem>Nested ordered list</li>
            <li eclOrderedListItem>Nested ordered list</li>
        </ul>
    </li>
</ul>
<hr eclDivider>
<dl eclDescriptionList>
  <dt eclDescriptionListTerm>Description term</dt>
  <dd eclDescriptionListDefinition>Description definition</dd>
  <dt eclDescriptionListTerm>Description term</dt>
  <dd eclDescriptionListDefinition>Description definition</dd>
</dl>
<hr eclDivider>
```

```typescript
import { Component } from '@angular/core';
import { EUI_ECL_LIST } from '@eui/ecl/components/ecl-list';
import { EUI_ECL_DIVIDER } from '@eui/ecl/components/ecl-divider';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_DIVIDER, ...EUI_ECL_LIST],
})
export class DefaultComponent {}
```
