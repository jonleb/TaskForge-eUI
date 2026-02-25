# ecl-banner

## Overview

Banners are a component that score highly in the visual hierarchy, used to convey a message to the user. They typically consist of an image, with heading, additional information and CTA.
<br>
<more-info componentPartUrl="banner/usage/"></more-info>

## API

API content

## Samples

### With picture

```html
<div class="row eui-u-mb-s">
  <div eclFormGroup class="col-md-3 eui-u-p-s">
    <label eclFormLabel>Font size:</label>
    <select eclSelect [(ngModel)]="fontSize" aria-label="Font size">
      <option value="m">medium</option>
      <option value="l">large</option>
    </select>
  </div>
  <div eclFormGroup class="col-md-3 eui-u-p-s">
    <label eclFormLabel>Font color:</label>
    <select eclSelect [(ngModel)]="fontColor" aria-label="Font color">
      <option value="dark">dark</option>
      <option value="light">light</option>
    </select>
  </div>
  <div eclFormGroup class="col-md-4 eui-u-p-s">
    <label eclFormLabel>Box background:</label>
    <select eclSelect [(ngModel)]="boxBackground" aria-label="Box background">
      <option value="light">light</option>
      <option value="dark">dark</option>
      <option value="none">none</option>
    </select>
  </div>
</div>
<div class="row eui-u-mb-s">
  <div eclFormGroup class="col-md-4 eui-u-p-s">
    <label eclFormLabel>Horizontal alignment:</label>
    <select eclSelect [(ngModel)]="horizontalAlignment" aria-label="Horizontal alignment">
      <option value="left">left</option>
      <option value="center">center</option>
      <option value="right">right</option>
    </select>
  </div>
  <div eclFormGroup class="col-md-4 eui-u-p-s">
    <label eclFormLabel>Vertical alignment:</label>
    <select eclSelect [(ngModel)]="verticalAlignment" aria-label="Vertical alignment">
      <option value="top">top</option>
      <option value="center">center</option>
      <option value="bottom">bottom</option>
    </select>
  </div>
</div>

<ecl-banner copyright="Copyright or credit" [fontSize]="fontSize" [boxBackground]="boxBackground"
  [horizontalAlignment]="horizontalAlignment" [verticalAlignment]="verticalAlignment" [fontColor]="fontColor">
    <picture eclBannerPicture>
      <img eclBannerImage src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image8.jpg" alt="alternative text"/>
    </picture>
    <a routerLink="/" eclLink variant="cta">
      <span eclLinkLabel>CTA link</span>
        <ecl-icon icon="corner-arrow" size="xs" ariaHidden="true" transform="rotate-90">
        </ecl-icon>
    </a>
  <div eclBannerTitle>
    <span eclBannerTitleText><a eclBannerTitleLink href="/test" target="_blank">Lorem ipsum dolor sit amet consectetuer
      adipiscing</a></span>
  </div>
  <p eclBannerDescription>
    <span eclBannerDescriptionText>
      <a eclLink eclBannerDescriptionLink href="/test" target="_blank">
        Lorem ipsum dolor sit amet,
        consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
      </a></span>
  </p>
</ecl-banner>
```

```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EUI_ECL_BANNER } from '@eui/ecl/components/ecl-banner';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_SELECT } from '@eui/ecl/components/ecl-select';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [RouterLink, FormsModule, ...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_SELECT, ...EUI_ECL_BANNER, ...EUI_ECL_ICON],
})
export class DefaultComponent {

    boxBackground = 'light';
    fontColor = 'dark';
    fontSize = 'm';
    horizontalAlignment = 'left';
    verticalAlignment = 'top';
}
```
