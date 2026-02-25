# ecl-social-media-follow

## Overview

Social Media Follow component allows users to follow/join the social media pages of EU institutions. It showcases the most popular ones, while the rest can be found on the Europa site by clicking the "other social networks" link.
<br>
<more-info componentPartUrl="social-media-follow/usage/"></more-info>
<br>
<ecl-notification variant="warning" isCloseable="false">
    Color variants are deprecated and will be removed in the next version.
</ecl-notification>

## API

API content

## Samples

### Default

```html
<div eclFormGroup class="col-md-4 eui-u-mb-m">
  <label eclFormLabel>Horizontal alignment:</label>
  <select eclSelect [(ngModel)]="horizontalAlignment" aria-label="Horizontal alignment">
    <option value="left">left</option>
    <option value="right">right</option>
  </select>
</div>
<ecl-social-media-follow description="Follow us" [horizontalAlignment]="horizontalAlignment">
  <ecl-social-media-follow-item icon="facebook" href="http://facebook.com">Facebook</ecl-social-media-follow-item>
  <ecl-social-media-follow-item icon="instagram"
    href="http://instagram.com">Instagram</ecl-social-media-follow-item>
  <ecl-social-media-follow-item icon="linkedin" href="http://linkedin.com">Linkedin</ecl-social-media-follow-item>
  <ecl-social-media-follow-item icon="mastodon" href="http://mastodon.com">Mastodon</ecl-social-media-follow-item>
  <ecl-social-media-follow-item icon="telegram" href="http://telegram.com">Telegram</ecl-social-media-follow-item>
  <ecl-social-media-follow-item icon="chain" routerLink="/">Other</ecl-social-media-follow-item>
</ecl-social-media-follow>

<h6 class="section-title">Default - color (deprecated)</h6>
<ecl-social-media-follow description="Follow us">
  <ecl-social-media-follow-item icon="facebook-color" href="http://facebook.com">Facebook</ecl-social-media-follow-item>
  <ecl-social-media-follow-item icon="instagram-color"
    href="http://instagram.com">Instagram</ecl-social-media-follow-item>
  <ecl-social-media-follow-item icon="linkedin-color" href="http://linkedin.com">Linkedin</ecl-social-media-follow-item>
  <ecl-social-media-follow-item icon="mastodon-color" href="http://mastodon.com">Mastodon</ecl-social-media-follow-item>
  <ecl-social-media-follow-item>
    <a eclLink variant="standalone" href="http://telegram.com" eclSocialMediaFollowLink>
      <ecl-icon size="m" iconSet="social-media" icon="telegram-color"></ecl-icon>
      <span eclLinkLabel>
        Telegram
      </span>
    </a>
  </ecl-social-media-follow-item>
  <ecl-social-media-follow-item>
    <a eclLink routerLink="/" variant="standalone" eclSocialMediaFollowLink>
      <ecl-icon iconSet="default" size="m" icon="chain"></ecl-icon>
      <span eclLinkLabel>
        Other
      </span>
    </a>
  </ecl-social-media-follow-item>
</ecl-social-media-follow>
```

```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';
import { EUI_ECL_SELECT } from '@eui/ecl/components/ecl-select';
import { EUI_ECL_SOCIAL_MEDIA_FOLLOW } from '@eui/ecl/components/ecl-social-media-follow';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_ICON, ...EUI_ECL_SELECT, ...EUI_ECL_SOCIAL_MEDIA_FOLLOW,
        ...EUI_ECL_LINK, FormsModule],
})
export class DefaultComponent {
    horizontalAlignment = 'left';
}
```
