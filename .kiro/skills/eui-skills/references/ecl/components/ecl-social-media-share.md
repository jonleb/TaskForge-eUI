# ecl-social-media-share

## Overview

<ecl-notification variant="warning" [isCloseable]="false">
    This component itself is no longer supported by ECL and the <a target="_blank" href="https://webgate.ec.europa.eu/fpfis/wikis/display/webtools/Social+bookmarking+and+networking">Webtools Social bookmarking and networking</a> widget should be used instead.
</ecl-notification>
<br>
<more-info componentPartUrl="social-media-share/usage/"></more-info>

## API

API content

## Samples

### Default

```html
<h6 class="section-title">Default</h6>
<ecl-social-media-share description="Share this page">
  <ecl-social-media-share-item icon="twitter-color"
                               href="https://x.com">X</ecl-social-media-share-item>
  <ecl-social-media-share-item icon="facebook-color"
                               href="https://facebook.com">Facebook</ecl-social-media-share-item>
  <ecl-social-media-share-item icon="instagram-color"
                               href="https://instagram.com">Instagram</ecl-social-media-share-item>
  <ecl-social-media-share-item icon="linkedin-color"
                               href="https//linkedin.com">Linkedin</ecl-social-media-share-item>
  <ecl-social-media-share-item>
    <a eclLink
       variant="standalone"
       href="https://telegram.com"
       eclSocialMediaShareLink>
      <ecl-icon size="m"
                iconSet="social-media"
                icon="telegram-color"></ecl-icon>
      <span eclLinkLabel>
        Telegram
      </span>
    </a>
  </ecl-social-media-share-item>
  <ecl-social-media-share-item>
    <ecl-popover>
      <a eclLink
         eclPopoverToggle
         variant="standalone"
         eclSocialMediaShareLink>
        <ecl-icon iconSet="default"
                  size="m"
                  icon="share"></ecl-icon>
        <span eclLinkLabel>
          Other social networks
        </span>
      </a>
      <div eclPopoverContent>
        <ul eclPopoverList>
            @for (item of items; track item.name) {
            <li eclPopoverItem>
                <a eclLink
                   eclPopoverLink
                   routerLink="/">
                    <ecl-icon iconSet="social-media"
                              [icon]="item.icon"
                              size="m">
                    </ecl-icon>
                    <span eclLinkLabel>{{ item.name }}</span>
                </a>
            </li>
            }
        </ul>
      </div>
    </ecl-popover>
  </ecl-social-media-share-item>
</ecl-social-media-share>

<h6 class="section-title">Vertical</h6>
<ecl-social-media-share description="Share this page"
                        isVertical>
  <ecl-social-media-share-item icon="twitter-color"
                               href="https://twitter.com">X</ecl-social-media-share-item>
  <ecl-social-media-share-item icon="facebook-color"
                               href="https://facebook.com">Facebook</ecl-social-media-share-item>
  <ecl-social-media-share-item icon="instagram-color"
                               href="https://instagram.com">Instagram</ecl-social-media-share-item>
  <ecl-social-media-share-item icon="linkedin-color"
                               href="https://linkedin.com">Linkedin</ecl-social-media-share-item>
  <ecl-social-media-share-item icon="telegram-color"
                               href="https://telegram.com">Telegram</ecl-social-media-share-item>
  <ecl-social-media-share-item>
    <ecl-popover>
      <a eclLink
         eclPopoverToggle
         variant="standalone"
         eclSocialMediaShareLink>
        <ecl-icon iconSet="default"
                  size="m"
                  icon="share"></ecl-icon>
        <span eclLinkLabel>
          Other social networks
        </span>
      </a>
      <div eclPopoverContent>
        <ul eclPopoverList>
            @for (item of items; track item.name) {
            <li eclPopoverItem>
                <a eclLink
                   eclPopoverLink
                   routerLink="/">
                    <ecl-icon iconSet="social-media"
                              [icon]="item.icon"
                              size="m">
                    </ecl-icon>
                    <span eclLinkLabel>{{ item.name }}</span>
                </a>
            </li>
            }
        </ul>
      </div>
    </ecl-popover>
  </ecl-social-media-share-item>
</ecl-social-media-share>
```

```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';
import { EUI_ECL_POPOVER } from '@eui/ecl/components/ecl-popover';
import { EUI_ECL_SOCIAL_MEDIA_SHARE } from '@eui/ecl/components/ecl-social-media-share';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_ICON, ...EUI_ECL_POPOVER, ...EUI_ECL_SOCIAL_MEDIA_SHARE, ...EUI_ECL_LINK],
})
export class DefaultComponent {

    items = [
        { name: 'Pinterest', icon: 'pinterest-color' },
        { name: 'Mastodon', icon: 'mastodon-color' },
        { name: 'Reddit', icon: 'reddit-color' },
        { name: 'YouTube', icon: 'youtube-color' },
        { name: 'Flickr', icon: 'flickr-color' },
        { name: 'Skype', icon: 'skype-color' },
    ];
}
```
