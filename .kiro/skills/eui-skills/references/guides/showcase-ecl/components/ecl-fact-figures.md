# ecl-fact-figures

## Overview

The facts and figures component is used to deliver numerical representations of facts that are easier portrayed visually through the use of statistics.
<br>
<more-info componentPartUrl="fact-figures/usage/"></more-info>

## API

API content

## Samples

### [Default](samples/ecl-fact-figures/Default)

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
<div eclFactFigures columns="1" [fontSize]="fontSize">
  <div eclFactFiguresItem eclValue="00.0 million" eclTitle="Lorem ipsum">
    <ecl-icon icon="infographic"
              size="l"></ecl-icon>
    <div eclFactFiguresDescription>Nunc condimentum sapien ut nibh finibus suscipit vitae at justo. Morbi
      quis odio faucibus, commodo tortor id, elementum libero.</div>
  </div>
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
</div>
<h6 class="section-title">With 2 columns</h6>
<div eclFactFigures columns="2" [fontSize]="fontSize">
  <div eclFactFiguresItem eclValue="00.0 million" eclTitle="Lorem ipsum">
    <ecl-icon icon="infographic"
              size="l"></ecl-icon>
    <div eclFactFiguresDescription>Nunc condimentum sapien ut nibh finibus suscipit vitae at justo. Morbi
      quis odio faucibus, commodo tortor id, elementum libero.</div>
  </div>
  <div eclFactFiguresItem eclValue="00.0 million" eclTitle="Sed hendrerit">
    <ecl-icon icon="spreadsheet"
              size="l"></ecl-icon>
    <div eclFactFiguresDescription>Turpis varius congue venenatis, erat dui feugiat felis.</div>
  </div>
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
</div>

<h6 class="section-title">With 3 columns</h6>
<div eclFactFigures columns="3">
  <div eclFactFiguresItem eclValue="00.0 million" eclTitle="Lorem ipsum">
    <ecl-icon icon="infographic"
              size="l"></ecl-icon>
    <div eclFactFiguresDescription>Nunc condimentum sapien ut nibh finibus suscipit vitae at justo. Morbi
      quis odio faucibus, commodo tortor id, elementum libero.</div>
  </div>
  <div eclFactFiguresItem eclValue="00.0 million" eclTitle="Sed hendrerit">
    <ecl-icon icon="spreadsheet"
              size="l"></ecl-icon>
    <div eclFactFiguresDescription>Turpis varius congue venenatis, erat dui feugiat felis.</div>
  </div>
  <div eclFactFiguresItem eclValue="00.0 million" eclTitle="Donec suscipit interdum augue, ac dapibus eros finibus a.">
    <ecl-icon icon="growth"
              size="l"></ecl-icon>
    <div eclFactFiguresDescription>Cras vestibulum efficitur mi, quis porta tellus rutrum ut. Quisque at
      pulvinar sem.</div>
  </div>
  <div eclFactFiguresItem eclValue="00.0 million" eclTitle="Aenean dapibus">
    <ecl-icon icon="digital"
              size="l"></ecl-icon>
    <div eclFactFiguresDescription>Aliquam lacinia diam eu sem malesuada, in interdum ante bibendum.
    </div>
  </div>
  <div eclFactFiguresItem eclValue="00.0 million" eclTitle="Aliquam faucibus nulla eget eleifend">
    <ecl-icon icon="regulation"
              size="l"></ecl-icon>
    <div eclFactFiguresDescription>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
      inceptos himenaeos. Duis nec lectus tortor.</div>
  </div>
  <div eclFactFiguresItem eclValue="00.0 million" eclTitle="Nam lacinia nisl eget diam mattis">
    <ecl-icon icon="image"
              size="l"></ecl-icon>
    <div eclFactFiguresDescription>Sed efficitur bibendum rutrum. Nunc feugiat congue augue ac
      consectetur.</div>
  </div>
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
</div>

<h6 class="section-title">Centered with 4 columns</h6>
<div eclFactFigures columns="4" isCentered>
  <div eclFactFiguresItem eclValue="00.0 million" eclTitle="Lorem ipsum">
    <ecl-icon icon="infographic"
              size="l"></ecl-icon>
    <div eclFactFiguresDescription>Nunc condimentum sapien ut nibh finibus suscipit vitae at justo. Morbi
      quis odio faucibus, commodo tortor id, elementum libero.</div>
  </div>
  <div eclFactFiguresItem eclValue="00.0 million" eclTitle="Sed hendrerit">
    <ecl-icon icon="spreadsheet"
              size="l"></ecl-icon>
    <div eclFactFiguresDescription>Turpis varius congue venenatis, erat dui feugiat felis.
    </div>
  </div>
  <div eclFactFiguresItem eclValue="00.0 million" eclTitle="Donec suscipit interdum augue, ac dapibus eros finibus a.">
    <ecl-icon icon="growth"
              size="l"></ecl-icon>
    <div eclFactFiguresDescription>Cras vestibulum efficitur mi, quis porta tellus rutrum ut. Quisque at
      pulvinar sem.</div>
  </div>
  <div eclFactFiguresItem eclValue="00.0 million" eclTitle="Aenean dapibus">
    <ecl-icon icon="digital"
              size="l"></ecl-icon>
    <div eclFactFiguresDescription>Aliquam lacinia diam eu sem malesuada, in interdum ante bibendum.
    </div>
  </div>
  <div eclFactFiguresItem eclValue="00.0 million" eclTitle="Aliquam faucibus nulla eget eleifend">
    <ecl-icon icon="regulation"
              size="l"></ecl-icon>
    <div eclFactFiguresDescription>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
      inceptos himenaeos. Duis nec lectus tortor.</div>
  </div>
  <div eclFactFiguresItem eclValue="00.0 million" eclTitle="Nam lacinia nisl eget diam mattis">
    <ecl-icon icon="image"
              size="l"></ecl-icon>
    <div eclFactFiguresDescription>Sed efficitur bibendum rutrum. Nunc feugiat congue augue ac
      consectetur.</div>
  </div>
  <div eclFactFiguresItem eclValue="00.0 million" eclTitle="Donec suscipit interdum augue, ac dapibus eros finibus a">
    <ecl-icon icon="global"
              size="l"></ecl-icon>
    <div eclFactFiguresDescription>Cras vestibulum efficitur mi, quis porta tellus rutrum ut. Quisque at pulvinar
      sem.</div>
  </div>
  <div eclFactFiguresItem eclValue="00.0 million" eclTitle="Aenean dapibus">
    <ecl-icon icon="video"
              size="l"></ecl-icon>
    <div eclFactFiguresDescription>Aliquam lacinia diam eu sem malesuada, in interdum ante bibendum.
    </div>
  </div>
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
</div>
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
