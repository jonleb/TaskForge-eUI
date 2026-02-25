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
