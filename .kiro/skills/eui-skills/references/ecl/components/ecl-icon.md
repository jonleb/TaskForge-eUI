# ecl-icon

## Overview

<p>All ECL icons can be found here:
    <a href="https://ec.europa.eu/component-library/v4.8.1/ec/guidelines/iconography/" eclLink>see EC icons</a> and
    <a href="https://ec.europa.eu/component-library/v4.8.1/eu/guidelines/iconography/" eclLink>see EU icons</a>.
</p>
<p>Please note, the ecl icon is using notion of icon sets.</p>
<p>ECL comes with preinstalled sets of icons: <strong>default, social, social-media, flag</strong></p>
<p>By default the <code>default</code> set is active, so no need to explicitly use it, please check demo below for <code>iconSet</code> usage</p>
<more-info componentPartUrl="icon/usage/"></more-info>

## API

API content

## Samples

### Default

```html
<div><ecl-icon icon="audio" size="m"></ecl-icon></div>
<h6 class="section-title">Color</h6>
<div><ecl-icon icon="audio" size="m" color="primary"></ecl-icon></div>

<h6 class="section-title">Inverted</h6>
<div>
    <div>
        <ecl-icon icon="audio" size="m" color="inverted"></ecl-icon>
    </div>
</div>


<h6 class="section-title">Size</h6>
<div><ecl-icon icon="audio" size="2xs"></ecl-icon>
<ecl-icon icon="audio" size="xs"></ecl-icon>
<ecl-icon icon="audio" size="s"></ecl-icon>
<ecl-icon icon="audio" size="m"></ecl-icon>
<ecl-icon icon="audio" size="l"></ecl-icon>
<ecl-icon icon="audio" size="xl"></ecl-icon>
<ecl-icon icon="audio" size="2xl"></ecl-icon>
<ecl-icon icon="audio" size="fluid"></ecl-icon></div>

<h6 class="section-title">Rotation</h6>
<div><ecl-icon icon="audio" size="m" transform="rotate-0"></ecl-icon>
<ecl-icon icon="audio" size="m" transform="rotate-90"></ecl-icon>
<ecl-icon icon="audio" size="m" transform="rotate-180"></ecl-icon>
<ecl-icon icon="audio" size="m" transform="rotate-270"></ecl-icon></div>

<h6 class="section-title">Flip Options</h6>
<div><ecl-icon icon="audio" size="m" transform="flip-horizontal"></ecl-icon>
<ecl-icon icon="audio" size="m" transform="flip-vertical"></ecl-icon></div>

<h6 class="section-title">Accessibility</h6>
<div><ecl-icon icon="audio" size="m" focusable="false" ariaHidden="false" ariaLabelledby="example-title example-desc" role="img">
    <title id="example-title">Title</title>
</ecl-icon></div>
```

```typescript
import { Component } from '@angular/core';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        EUI_ECL_ICON, 
        TranslateModule,
    ],
})
export class DefaultComponent {}
```
