# ecl-fact-figures

## Overview

The facts and figures component is used to deliver numerical representations of facts that are easier portrayed visually through the use of statistics.
<br>
<more-info componentPartUrl="fact-figures/usage/"></more-info>

## API

API content

## Samples

### Default

```html
<div eclFormGroup>
  <label eclFormLabel>Font size: </label>
  <select eclSelect [(ngModel)]="fontSize" aria-label="Font size">
    <option value="l">Large</option>
    <option value="m">Medium</option>
  </select>
</div>
<br>

<h6 class="section-title">With 1 column</h6>
<ecl-fact-figures columns="1" [fontSize]="fontSize">
  <ecl-fact-figures-item>
    <ecl-icon icon="infographic"
              size="l"></ecl-icon>
    <ecl-fact-figures-value>00.0 million</ecl-fact-figures-value>
    <ecl-fact-figures-title>Lorem ipsum</ecl-fact-figures-title>
    <ecl-fact-figures-description>Nunc condimentum sapien ut nibh finibus suscipit vitae at justo. Morbi
      quis odio faucibus, commodo tortor id, elementum libero.</ecl-fact-figures-description>
  </ecl-fact-figures-item>
  <ecl-fact-figures-view-all>
    <a eclLink
       variant="standalone"
       routerLink="/"
       aria-label="View all">
      <span eclLinkLabel>View all</span>
      <ecl-icon isFlipHorizontal
                icon="arrow-left"
                size="xs"></ecl-icon>
    </a>
  </ecl-fact-figures-view-all>
</ecl-fact-figures>
<h6 class="section-title">With 2 columns</h6>
<ecl-fact-figures columns="2" [fontSize]="fontSize">
  <ecl-fact-figures-item>
    <ecl-icon icon="infographic"
              size="l"></ecl-icon>
    <ecl-fact-figures-value>00.0 million</ecl-fact-figures-value>
    <ecl-fact-figures-title>Lorem ipsum</ecl-fact-figures-title>
    <ecl-fact-figures-description>Nunc condimentum sapien ut nibh finibus suscipit vitae at justo. Morbi
      quis odio faucibus, commodo tortor id, elementum libero.</ecl-fact-figures-description>
  </ecl-fact-figures-item>
  <ecl-fact-figures-item>
    <ecl-icon icon="spreadsheet"
              size="l"></ecl-icon>
    <ecl-fact-figures-value>00.0 million</ecl-fact-figures-value>
    <ecl-fact-figures-title>Sed hendrerit</ecl-fact-figures-title>
    <ecl-fact-figures-description>Turpis varius congue venenatis, erat dui feugiat felis.</ecl-fact-figures-description>
  </ecl-fact-figures-item>
  <ecl-fact-figures-view-all>
    <a eclLink
       variant="standalone"
       routerLink="/"
       aria-label="View all">
      <span eclLinkLabel>View all</span>
      <ecl-icon isFlipHorizontal
                icon="arrow-left"
                size="xs"></ecl-icon>
    </a>
  </ecl-fact-figures-view-all>
</ecl-fact-figures>
<h6 class="section-title">With 3 columns</h6>
<ecl-fact-figures columns="3">
  <ecl-fact-figures-item>
    <ecl-icon icon="infographic"
              size="l"></ecl-icon>
    <ecl-fact-figures-value>00.0 million</ecl-fact-figures-value>
    <ecl-fact-figures-title>Lorem ipsum</ecl-fact-figures-title>
    <ecl-fact-figures-description>Nunc condimentum sapien ut nibh finibus suscipit vitae at justo. Morbi
      quis odio faucibus, commodo tortor id, elementum libero.</ecl-fact-figures-description>
  </ecl-fact-figures-item>
  <ecl-fact-figures-item>
    <ecl-icon icon="spreadsheet"
              size="l"></ecl-icon>
    <ecl-fact-figures-value>00.0 million</ecl-fact-figures-value>
    <ecl-fact-figures-title>Sed hendrerit</ecl-fact-figures-title>
    <ecl-fact-figures-description>Turpis varius congue venenatis, erat dui feugiat felis.</ecl-fact-figures-description>
  </ecl-fact-figures-item>
  <ecl-fact-figures-item>
    <ecl-icon icon="growth"
              size="l"></ecl-icon>
    <ecl-fact-figures-value>00.0 million</ecl-fact-figures-value>
    <ecl-fact-figures-title>Donec suscipit interdum augue, ac dapibus eros finibus a.</ecl-fact-figures-title>
    <ecl-fact-figures-description>Cras vestibulum efficitur mi, quis porta tellus rutrum ut. Quisque at
      pulvinar sem.</ecl-fact-figures-description>
  </ecl-fact-figures-item>
  <ecl-fact-figures-item>
    <ecl-icon icon="digital"
              size="l"></ecl-icon>
    <ecl-fact-figures-value>00.0 million</ecl-fact-figures-value>
    <ecl-fact-figures-title>Aenean dapibus</ecl-fact-figures-title>
    <ecl-fact-figures-description>Aliquam lacinia diam eu sem malesuada, in interdum ante bibendum.
    </ecl-fact-figures-description>
  </ecl-fact-figures-item>
  <ecl-fact-figures-item>
    <ecl-icon icon="regulation"
              size="l"></ecl-icon>
    <ecl-fact-figures-value>00.0 million</ecl-fact-figures-value>
    <ecl-fact-figures-title>Aliquam faucibus nulla eget eleifend</ecl-fact-figures-title>
    <ecl-fact-figures-description>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
      inceptos himenaeos. Duis nec lectus tortor.</ecl-fact-figures-description>
  </ecl-fact-figures-item>
  <ecl-fact-figures-item>
    <ecl-icon icon="image"
              size="l"></ecl-icon>
    <ecl-fact-figures-value>00.0 million</ecl-fact-figures-value>
    <ecl-fact-figures-title>Nam lacinia nisl eget diam mattis</ecl-fact-figures-title>
    <ecl-fact-figures-description>Sed efficitur bibendum rutrum. Nunc feugiat congue augue ac
      consectetur.</ecl-fact-figures-description>
  </ecl-fact-figures-item>
  <ecl-fact-figures-view-all>
    <a eclLink
       variant="standalone"
       routerLink="/"
       aria-label="View all">
      <span eclLinkLabel>View all</span>
      <ecl-icon isFlipHorizontal
                icon="arrow-left"
                size="xs"></ecl-icon>
    </a>
  </ecl-fact-figures-view-all>
</ecl-fact-figures>

<h6 class="section-title">Centered with 4 columns</h6>
<ecl-fact-figures columns="4" isCentered>
  <ecl-fact-figures-item>
    <ecl-icon icon="infographic"
              size="l"></ecl-icon>
    <ecl-fact-figures-value>00.0 million</ecl-fact-figures-value>
    <ecl-fact-figures-title>Lorem ipsum</ecl-fact-figures-title>
    <ecl-fact-figures-description>Nunc condimentum sapien ut nibh finibus suscipit vitae at justo. Morbi
      quis odio faucibus, commodo tortor id, elementum libero.</ecl-fact-figures-description>
  </ecl-fact-figures-item>
  <ecl-fact-figures-item>
    <ecl-icon icon="spreadsheet"
              size="l"></ecl-icon>
    <ecl-fact-figures-value>00.0 million</ecl-fact-figures-value>
    <ecl-fact-figures-title>Sed hendrerit</ecl-fact-figures-title>
    <ecl-fact-figures-description>Turpis varius congue venenatis, erat dui feugiat felis.
    </ecl-fact-figures-description>
  </ecl-fact-figures-item>
  <ecl-fact-figures-item>
    <ecl-icon icon="growth"
              size="l"></ecl-icon>
    <ecl-fact-figures-value>00.0 million</ecl-fact-figures-value>
    <ecl-fact-figures-title>Donec suscipit interdum augue, ac dapibus eros finibus a.</ecl-fact-figures-title>
    <ecl-fact-figures-description>Cras vestibulum efficitur mi, quis porta tellus rutrum ut. Quisque at
      pulvinar sem.</ecl-fact-figures-description>
  </ecl-fact-figures-item>
  <ecl-fact-figures-item>
    <ecl-icon icon="digital"
              size="l"></ecl-icon>
    <ecl-fact-figures-value>00.0 million</ecl-fact-figures-value>
    <ecl-fact-figures-title>Aenean dapibus</ecl-fact-figures-title>
    <ecl-fact-figures-description>Aliquam lacinia diam eu sem malesuada, in interdum ante bibendum.
    </ecl-fact-figures-description>
  </ecl-fact-figures-item>
  <ecl-fact-figures-item>
    <ecl-icon icon="regulation"
              size="l"></ecl-icon>
    <ecl-fact-figures-value>00.0 million</ecl-fact-figures-value>
    <ecl-fact-figures-title>Aliquam faucibus nulla eget eleifend</ecl-fact-figures-title>
    <ecl-fact-figures-description>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
      inceptos himenaeos. Duis nec lectus tortor.</ecl-fact-figures-description>
  </ecl-fact-figures-item>
  <ecl-fact-figures-item>
    <ecl-icon icon="image"
              size="l"></ecl-icon>
    <ecl-fact-figures-value>00.0 million</ecl-fact-figures-value>
    <ecl-fact-figures-title>Nam lacinia nisl eget diam mattis</ecl-fact-figures-title>
    <ecl-fact-figures-description>Sed efficitur bibendum rutrum. Nunc feugiat congue augue ac
      consectetur.</ecl-fact-figures-description>
  </ecl-fact-figures-item>
  <ecl-fact-figures-item>
    <ecl-icon icon="global"
              size="l"></ecl-icon>
    <ecl-fact-figures-value>00.0 million</ecl-fact-figures-value>
    <ecl-fact-figures-title>Donec suscipit interdum augue, ac dapibus eros finibus a</ecl-fact-figures-title>
    <ecl-fact-figures-description>Cras vestibulum efficitur mi, quis porta tellus rutrum ut. Quisque at pulvinar
      sem.</ecl-fact-figures-description>
  </ecl-fact-figures-item>
  <ecl-fact-figures-item>
    <ecl-icon icon="video"
              size="l"></ecl-icon>
    <ecl-fact-figures-value>00.0 million</ecl-fact-figures-value>
    <ecl-fact-figures-title>Aenean dapibus</ecl-fact-figures-title>
    <ecl-fact-figures-description>Aliquam lacinia diam eu sem malesuada, in interdum ante bibendum.
    </ecl-fact-figures-description>
  </ecl-fact-figures-item>
  <ecl-fact-figures-view-all>
    <a eclLink
       routerLink="/"
       aria-label="View all">
      <span eclLinkLabel>View all</span>
      <ecl-icon isFlipHorizontal
                icon="arrow-left"
                size="xs"></ecl-icon>
    </a>
  </ecl-fact-figures-view-all>
</ecl-fact-figures>
```

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EUI_ECL_FACT_FIGURES } from '@eui/ecl/components/ecl-fact-figures';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_HELP_BLOCK } from '@eui/ecl/components/ecl-help-block';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';
import { EUI_ECL_SELECT } from '@eui/ecl/components/ecl-select';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [RouterLink, FormsModule, ...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_ICON, ...EUI_ECL_HELP_BLOCK, ...EUI_ECL_FACT_FIGURES,
        ...EUI_ECL_LINK, ...EUI_ECL_SELECT],
})
export class DefaultComponent {
    fontSize: 'm' | 'l' = 'l';
}
```
