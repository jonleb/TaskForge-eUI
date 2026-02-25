# ecl-news-ticker

## Overview

The News ticker component allows for the display of bite-sized pieces of information. As the name suggests, it is used to highlight the crucial and potentially urgent news, in a cycling way.
<br>
<more-info componentPartUrl="news-ticker/usage/"></more-info>

## API

API content

## Samples

### Default

```html
<ecl-news-ticker (itemSwitch)="onItemSwitch($event)">
    <ecl-news-ticker-item>
        <ecl-icon icon="euro" size="l" eclNewsTickerIcon></ecl-icon>
        <a eclLink routerLink="/">Lorem ipsum dolor sit amet, consectetur adipiscing elit</a>
    </ecl-news-ticker-item>
    <ecl-news-ticker-item>
        <ecl-icon icon="global" size="l" eclNewsTickerIcon></ecl-icon>
        <a eclLink routerLink="/">
            <ecl-icon icon="external" size="2xs" role="img" ariaHidden="false">
                <title>
                    Link to an external domain
                </title>
            </ecl-icon>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            ut aliquip ex ea commodo consequat
        </a>
    </ecl-news-ticker-item>
    <ecl-news-ticker-item>
        <img eclNewsTickerIcon src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image4.jpg"
            alt="Alternative text for the image" title="title of the image">
        <a eclLink routerLink="/">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
        </a>
    </ecl-news-ticker-item>
    <ecl-news-ticker-item>
        <ecl-icon icon="information-outline" size="l" eclNewsTickerIcon></ecl-icon>
        <a eclLink routerLink="/">Excepteur sint occaecat cupidatat officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
            ut aliquip ex ea commodo consequat.</a>
    </ecl-news-ticker-item>
    <ecl-news-ticker-item>
        <ecl-icon icon="livestreaming" size="l" eclNewsTickerIcon></ecl-icon>
        <a eclLink routerLink="/">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium</a>
    </ecl-news-ticker-item>
    <ecl-news-ticker-item>
        <ecl-icon icon="euro" size="l" eclNewsTickerIcon></ecl-icon>
        <a eclLink routerLink="/">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores</a>
    </ecl-news-ticker-item>
</ecl-news-ticker>

<h6 class="section-title">With &#64;for block</h6>
<ecl-news-ticker (itemSwitch)="onItemSwitch($event)">
    @for (item of items; track $index) {
    <ecl-news-ticker-item >
        <ecl-icon [icon]="item.icon" size="l" eclNewsTickerIcon></ecl-icon>
        <a eclLink [routerLink]="item.routrerLink">{{item.text}}</a>
    </ecl-news-ticker-item>
    }
</ecl-news-ticker>
```

```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';
import { EclNewsTickerItemEvent, EUI_ECL_NEWS_TICKER } from '@eui/ecl/components/ecl-news-ticker';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_ICON, ...EUI_ECL_LINK, ...EUI_ECL_NEWS_TICKER],
})
export class DefaultComponent {

    items = [
        { routrerLink: '/', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', icon: 'euro' },
        { routrerLink: '/', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore', icon: 'global' },
        { routrerLink: '/', text: 'Excepteur sint occaecat cupidatat officia deserunt mollit anim id est laborum', icon: 'information-outline' },
        { routrerLink: '/', text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem', icon: 'livestreaming' },
        { routrerLink: '/', text: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit', icon: 'euro' },
    ]

    onItemSwitch(evt: EclNewsTickerItemEvent) {
        console.log(evt);
    }
}
```
