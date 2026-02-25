# ecl-tabs

## Overview

Tabs organize content across different screens, data sets, and other interactions.
<br>
<more-info componentPartUrl="navigation/tabs/usage/"></more-info>

## API

API content

## Samples

### Default

```html
<div eclTabs (tabSelect)="onTabSelect($event)">
    <div eclTab id="tab1">
        <ecl-tab-label>Item 1</ecl-tab-label>
        Content 1
    </div>
    <div eclTab isActive id="tab2">
        <ecl-tab-label>Item 2</ecl-tab-label>
        Content 2
    </div>
    <div eclTab id="tab3">
        <ecl-tab-label>Item 3</ecl-tab-label>
        Content 3
    </div>
    <div eclTab id="tab4">
        <ecl-tab-label>Item 4</ecl-tab-label>
        Content 4
    </div>
    <div eclTab id="tab5">
        <ecl-tab-label>Item 5</ecl-tab-label>
        Content 5
    </div>
    <div eclTab id="tab6">
        <ecl-tab-label>Item 6 with a very long label</ecl-tab-label>
        Content 6
    </div>
    <div eclTab id="tab7">
        <ecl-tab-label>Item 7</ecl-tab-label>
        Content 7
    </div>
</div>
```

```typescript
import { Component } from '@angular/core';
import { EclTabSelectEvent, EUI_ECL_TABS } from '@eui/ecl/components/ecl-tabs';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_TABS],
})
export class DefaultComponent {

    onTabSelect(evt: EclTabSelectEvent) {
        console.log('tab selected', evt)
    }
}
```
