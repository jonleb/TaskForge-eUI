# ecl-menu

## Overview

<more-info componentPartUrl="navigation/menu/usage/"></more-info>

## API

API content

## Samples

### [Default](samples/ecl-menu/Default)

```html
<ecl-site-header (logoClick)="onLogoClick($event)">
    <div eclSiteHeaderEnvironment>Environment</div>

    <ecl-site-header-action>
        <ecl-site-header-language (languageClick)="onLanguageClick($event)" (languageSelected)="onLanguageSelected($event)">
        </ecl-site-header-language>

        <ecl-site-header-search (search)="onSearch($event)"></ecl-site-header-search>
    </ecl-site-header-action>

    <ecl-menu siteName="Site name" (menuItemSelect)="onMenuItemSelected($event)" aria-label="Main navigation">
        <ecl-menu-item label="Home" routerLink="/"></ecl-menu-item>
        <ecl-menu-item label="Principles, countries, history" toggleAriaLabel="Custom aria label" [linkExtraAttributes]="linkExtraAttributes">
            <ecl-menu-mega>
                <ecl-menu-mega-item [linkExtraAttributes]="linkExtraAttributes" label="Item 1.1"></ecl-menu-mega-item>
                <ecl-menu-mega-item label="Item 1.2"></ecl-menu-mega-item>
                <ecl-menu-mega-item href="http://ec.europa.eu" label="Item 1.3" isCurrent></ecl-menu-mega-item>
                <ecl-menu-mega-item href="http://ec.europa.eu" label="Item 1.4"></ecl-menu-mega-item>
                <ecl-menu-mega-item href="http://ec.europa.eu" label="Item 1.5"></ecl-menu-mega-item>
                <ecl-menu-mega-item href="http://ec.europa.eu" label="Item 1.6"></ecl-menu-mega-item>
                <ecl-menu-mega-item href="http://ec.europa.eu">
                    Item 1.7
                    <ecl-icon icon="external" size="2xs" role="img" ariaHidden="false">
                        <title>
                            Link to an external domain
                        </title>
                    </ecl-icon>
                </ecl-menu-mega-item>
            </ecl-menu-mega>
    
        </ecl-menu-item>
    
        <ecl-menu-item label="Institutions, law, budget">
            <ecl-menu-mega>
                <ecl-menu-mega-item label="Item 2.1"></ecl-menu-mega-item>
                <ecl-menu-mega-item label="Item 2.2"></ecl-menu-mega-item>
                <ecl-menu-mega-item label="Item 2.3"></ecl-menu-mega-item>
            </ecl-menu-mega>
        </ecl-menu-item>
    
        <ecl-menu-item label="Priorities and actions">
            <ecl-menu-mega>
                <ecl-menu-mega-item label="Item 3.1"></ecl-menu-mega-item>
                <ecl-menu-mega-item label="Item 3.2"></ecl-menu-mega-item>
                <ecl-menu-mega-item label="Item 3.3"></ecl-menu-mega-item>
            </ecl-menu-mega>
        </ecl-menu-item>
    
        <ecl-menu-item label="Live, work, study">
            <ecl-menu-mega>
                <ecl-menu-mega-item label="Item 4.1"></ecl-menu-mega-item>
                <ecl-menu-mega-item label="Item 4.2"></ecl-menu-mega-item>
                <ecl-menu-mega-item label="Item 4.3 with a very long label"></ecl-menu-mega-item>
                <ecl-menu-mega-item label="Item 4.4"></ecl-menu-mega-item>
                <ecl-menu-mega-item label="Item 4.5"></ecl-menu-mega-item>
                <ecl-menu-mega-item label="Item 4.6"></ecl-menu-mega-item>
                <ecl-menu-mega-item label="Item 4.7"></ecl-menu-mega-item>
                <ecl-menu-mega-item label="Item 4.8"></ecl-menu-mega-item>
                <ecl-menu-mega-item label="Item 4.9"></ecl-menu-mega-item>
                <ecl-menu-mega-item label="Item 4.10"></ecl-menu-mega-item>
                <ecl-menu-mega-item label="Item 4.11"></ecl-menu-mega-item>
                <ecl-menu-mega-item label="Item 4.12"></ecl-menu-mega-item>
                <ecl-menu-mega-item label="Item 4.13"></ecl-menu-mega-item>
                <ecl-menu-mega-item label="Item 4.14"></ecl-menu-mega-item>
                <ecl-menu-mega-item isSeeAll>
                    <a eclLink routerLink="/" variant="standalone">
                        <span eclLinkLabel>See all pages</span>
                        <ecl-icon icon="arrow-left" size="xs" transform="rotate-180" ariaHidden="false" role="img">
                        </ecl-icon>
                    </a>
                </ecl-menu-mega-item>
            </ecl-menu-mega>
        </ecl-menu-item>
        <ecl-menu-item label="News and events">
            <ecl-menu-mega>
                <ecl-menu-mega-item label="Item 5.1"></ecl-menu-mega-item>
                <ecl-menu-mega-item label="Item 5.2"></ecl-menu-mega-item>
                <ecl-menu-mega-item label="Item 5.3"></ecl-menu-mega-item>
                <ecl-menu-mega-item label="Item 5.4"></ecl-menu-mega-item>
                <ecl-menu-mega-item label="Item 5.5"></ecl-menu-mega-item>
                <ecl-menu-mega-item label="Item 5.6"></ecl-menu-mega-item>
                <ecl-menu-mega-item label="Item 5.7"></ecl-menu-mega-item>
                <ecl-menu-mega-item label="Item 5.8"></ecl-menu-mega-item>
                <ecl-menu-mega-item label="Item 5.9 with a very long label"></ecl-menu-mega-item>
            </ecl-menu-mega>
        </ecl-menu-item>
    </ecl-menu>
</ecl-site-header>
```

```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';
import { EclMenuItemSelectEvent, EUI_ECL_MENU } from '@eui/ecl/components/ecl-menu';
import {
  EclSiteHeaderLanguageClickEvent,
  EclSiteHeaderLanguageSelectedEvent,
  EclSiteHeaderLogoClickEvent,
  EclSiteHeaderSearchEvent,
  EUI_ECL_SITE_HEADER
} from '@eui/ecl/components/ecl-site-header';

@Component({
  // tslint:disable-next-line
  selector: 'Default',
  templateUrl: 'component.html',
  imports: [RouterLink, ...EUI_ECL_SITE_HEADER, ...EUI_ECL_LINK, ...EUI_ECL_MENU, ...EUI_ECL_ICON],
})
export class DefaultComponent {

  languageCode = 'en';
  linkExtraAttributes = {
    name: 'data-test',
    value: 'data-test-1',
  }
  onMenuItemSelected(evt: EclMenuItemSelectEvent) {
    console.log('menu item selected', evt);
  }

  onLogoClick(evt: EclSiteHeaderLogoClickEvent): void {
    console.log(evt);
  }

  onLanguageClick(evt: EclSiteHeaderLanguageClickEvent): void {
    console.log(evt);
  }

  onLanguageSelected(evt: EclSiteHeaderLanguageSelectedEvent): void {
    console.log(evt.language);
    this.languageCode = evt.language.code;
  }

  onSearch(evt: EclSiteHeaderSearchEvent): void {
    console.log(evt);
  }
}
```

### Other examples

- [Overflow management](samples/ecl-menu/overflow)
