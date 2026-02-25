# ecl-mega-menu

## Overview

<more-info componentPartUrl="navigation/mega-menu/usage/"></more-info>

## API

API content

## Samples

### [Default](samples/ecl-mega-menu/Default)

```html
<ecl-site-header (logoClick)="onLogoClick($event)">
    <div eclSiteHeaderEnvironment>Environment</div>

    <ecl-site-header-action>
        <ecl-site-header-language (languageClick)="onLanguageClick($event)"
            (languageSelected)="onLanguageSelected($event)">
        </ecl-site-header-language>

        <ecl-site-header-search (search)="onSearch($event)"></ecl-site-header-search>
    </ecl-site-header-action>

    <nav eclMegaMenu id="mega-menu-id" aria-label="Main navigation" (megaMenuItemSelect)="onMegaMenuItemSelect($event)">
        <ul eclMegaMenuList>
            <li eclMegaMenuItem routerLink="/" label="Home" [linkExtraAttributes]="linkExtraAttributes"></li>
            <li eclMegaMenuItem label="News and media">
                <div eclMegaMenuInfo title="About the News and Media">
                    Description text, lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
                <ul eclMegaMenuSublist>
                    <li eclMegaMenuSubitem label="Item 2.1" buttonId="item-2-1-id">
                        <ul eclMegaMenuSublist>
                            <li eclMegaMenuSubitem routerLink="/" label="Item 2.1 subitem 1"></li>
                            <li eclMegaMenuSubitem routerLink="/" label="Item 2.1 subitem 2" isExternal></li>
                            <li eclMegaMenuSubitem routerLink="/" label="Item 2.1 subitem 3"></li>
                            <li eclMegaMenuSubitem routerLink="/" label="Item 2.1 subitem 4"></li>
                            <li eclMegaMenuSubitem routerLink="/" label="Item 2.1 subitem 5"></li>
                            <li eclMegaMenuSubitem isSeeAll>
                                <a eclLink variant="standalone" routerLink="/" aria-describedby="item-2-1-id">
                                    <span eclLinkLabel>View all</span>
                                    <ecl-icon icon="arrow-left" size="xs" transform="rotate-180"></ecl-icon>
                                </a>
                            </li>
                        </ul>
                        <div eclMegaMenuFeatured>
                            <ul eclMegaMenuFeaturedList
                                aria-labelledby="ecl-mega-menu-featured-title-item-2-1-id item-2-1-id">
                                <li eclMegaMenuFeaturedListItem isImageOnly>
                                    <a routerLink="/" eclLink variant="standalone">
                                        <picture eclMegaMenuFeaturedPicture>
                                            <img eclMegaMenuFeaturedImage
                                                src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg"
                                                alt="Jean Monnet banner">
                                        </picture>
                                    </a>
                                </li>
                                <li eclMegaMenuFeaturedListItem>
                                    <a routerLink="/" eclLink variant="standalone">
                                        <span eclLinkLabel>Featured link 1</span>
                                        <ecl-icon icon="external" size="xs">
                                        </ecl-icon>
                                    </a>
                                    <div eclMegaMenuFeaturedListItemDescription>
                                        <p>Description text, lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li eclMegaMenuSubitem routerLink="/" label="Item 2.2"></li>
                    <li eclMegaMenuSubitem label="Item 2.3 that has a very long label">
                        <ul eclMegaMenuSublist>
                            <li eclMegaMenuSubitem routerLink="/" label="Item 2.3 subitem 1"></li>
                            <li eclMegaMenuSubitem routerLink="/" label="Item 2.3 subitem 2"></li>
                            <li eclMegaMenuSubitem routerLink="/" label="Item 2.3 subitem 3"></li>
                            <li eclMegaMenuSpacer></li>
                            <li eclMegaMenuSubitem isSeeAll>
                                <a eclLink variant="standalone" routerLink="/"
                                    aria-describedby="research-and-innovation-id">
                                    <span eclLinkLabel>See all pages</span>
                                    <ecl-icon icon="arrow-left" size="xs" transform="rotate-180"></ecl-icon>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li eclMegaMenuSpacer></li>
                    <li eclMegaMenuSubitem isSeeAll>
                        <a eclLink variant="standalone" routerLink="/" aria-describedby="research-and-innovation-id">
                            <span eclLinkLabel>Discover more</span>
                            <ecl-icon icon="arrow-left" size="xs" transform="rotate-180"></ecl-icon>
                        </a>
                    </li>
                </ul>
                <div eclMegaMenuFeatured>
                    <ul eclMegaMenuFeaturedList aria-labelledby="ecl-mega-menu-featured-title-item-2-1-id item-2-1-id">
                        <li eclMegaMenuFeaturedListItem isCombo>
                            <a routerLink="/" eclLink variant="standalone">
                                <picture eclMegaMenuFeaturedPicture>
                                    <img eclMegaMenuFeaturedImage
                                        src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image4.jpg"
                                        alt="Jean Monnet banner">
                                </picture>
                                I belong to news & media
                            </a>
                            <div eclMegaMenuFeaturedListItemDescription>
                                <p>Description text, lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </li>
                    </ul>
                </div>

            </li>
            <li eclMegaMenuItem label="About the European Commission">
                <div eclMegaMenuInfo title="About the European Commission">
                    Description text, lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
                <ul eclMegaMenuSublist>
                    <li eclMegaMenuSubitem routerLink="/" label="Item 3.1"></li>
                    <li eclMegaMenuSubitem routerLink="/" label="Item 3.2"></li>
                    <li eclMegaMenuSubitem routerLink="/" label="Item 3.3"></li>
                    <li eclMegaMenuSubitem routerLink="/" label="Item 3.4"></li>
                    <li eclMegaMenuSubitem routerLink="/" label="Item 3.5"></li>
                    <li eclMegaMenuSubitem routerLink="/" label="Item 3.6"></li>
                    <li eclMegaMenuSubitem routerLink="/" label="Item 3.7"></li>
                    <li eclMegaMenuSubitem routerLink="/" label="Item 3.8"></li>
                    <li eclMegaMenuSubitem routerLink="/" label="Item 3.9"></li>
                    <li eclMegaMenuSubitem routerLink="/" label="Item 3.10"></li>
                    <li eclMegaMenuSubitem routerLink="/" label="Item 3.11"></li>
                    <li eclMegaMenuSubitem routerLink="/" label="Item 3.12"></li>
                    <li eclMegaMenuSpacer></li>
                    <li eclMegaMenuSubitem isSeeAll>
                        <a eclLink variant="standalone" routerLink="/" aria-describedby="research-and-innovation-id">
                            <span eclLinkLabel>Discover more</span>
                            <ecl-icon icon="arrow-left" size="xs" transform="rotate-180"></ecl-icon>
                        </a>
                    </li>
                </ul>
            </li>
            <li eclMegaMenuItem label="Key priorities">Key priorities
                <div eclMegaMenuInfo title="About the European Commission">
                    Description text, lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
                <ul eclMegaMenuSublist>
                    <li eclMegaMenuSubitem label="Aid, Development cooperation, Fundamental rights">
                        <ul eclMegaMenuSublist>
                            <li eclMegaMenuSubitem routerLink="/" label="A lonely item"></li>
                        </ul>
                    </li>
                    <li eclMegaMenuSubitem routerLink="/" label="Energy, Climate change, Environment"></li>
                    <li eclMegaMenuSubitem routerLink="/" label="Law"></li>
                    <li eclMegaMenuSubitem routerLink="/" label="EU regional and urban development"></li>
                    <li eclMegaMenuSubitem label="Research and innovation" buttonId="research-and-innovation-id">
                        <ul eclMegaMenuSublist>
                            <li eclMegaMenuSubitem routerLink="/" label="How we provide aid"></li>
                            <li eclMegaMenuSubitem routerLink="/" label="Who we work with"></li>
                            <li eclMegaMenuSubitem routerLink="/" label="Get involved in EU humanitarian aid"></li>
                            <li eclMegaMenuSpacer></li>
                            <li eclMegaMenuSubitem isSeeAll>
                                <a eclLink variant="standalone" routerLink="/"
                                    aria-describedby="research-and-innovation-id">
                                    <span eclLinkLabel>See all pages</span>
                                    <ecl-icon icon="arrow-left" size="xs" transform="rotate-180"></ecl-icon>
                                </a>
                            </li>
                        </ul>
                        <div eclMegaMenuFeatured title="Featured items"
                            titleId="ecl-mega-menu-featured-title-research-and-innovation-id">

                            <ul eclMegaMenuFeaturedList aria-labelledby="ecl-mega-menu-featured-title-research-and-innovation-id
                                research-and-innovation-id">
                                <li eclMegaMenuFeaturedListItem>
                                    <a routerLink="/" eclLink variant="standalone">
                                        <picture eclMegaMenuFeaturedPicture>
                                            <img eclMegaMenuFeaturedImage
                                                src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg"
                                                alt="Jean Monnet banner">
                                        </picture>
                                    </a>
                                </li>
                                <li eclMegaMenuFeaturedListItem>
                                    <a routerLink="/" eclLink variant="standalone">Featured link 1</a>
                                </li>
                                <li eclMegaMenuFeaturedListItem>
                                    <a routerLink="/" eclLink variant="standalone">Featured link 2</a>
                                </li>
                                <li eclMegaMenuFeaturedListItem>
                                    <a routerLink="/" eclLink variant="standalone">Featured link 3</a>
                                </li>
                                <li eclMegaMenuFeaturedListItem>
                                    <a routerLink="/" eclLink variant="standalone">Featured link 4</a>
                                </li>
                                <li eclMegaMenuFeaturedListItem>
                                    <a routerLink="/" eclLink variant="standalone">Featured link 5</a>
                                </li>
                                <li eclMegaMenuFeaturedListItem>
                                    <a routerLink="/" eclLink variant="standalone">Featured link 6</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li eclMegaMenuSubitem label="Food, Farming, Fisheries"></li>
                    <li eclMegaMenuSpacer></li>
                    <li eclMegaMenuSubitem isSeeAll>
                        <a eclLink variant="standalone" routerLink="/" aria-describedby="research-and-innovation-id">
                            <span eclLinkLabel>Discover more</span>
                            <ecl-icon icon="arrow-left" size="xs" transform="rotate-180"></ecl-icon>
                        </a>
                    </li>
                </ul>
                <div eclMegaMenuFeatured>
                    <ul eclMegaMenuFeaturedList aria-labelledby="ecl-mega-menu-featured-title-item-2-1-id item-2-1-id">
                        <li eclMegaMenuFeaturedListItem isCombo>
                            <a routerLink="/" eclLink variant="standalone">
                                <picture eclMegaMenuFeaturedPicture>
                                    <img eclMegaMenuFeaturedImage
                                        src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image6.jpg"
                                        alt="Jean Monnet banner">
                                </picture>
                                I belong to key priorities
                            </a>
                            <div eclMegaMenuFeaturedListItemDescription>
                                <p>Description text, lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </li>
            <li eclMegaMenuItem label="Engage">
                <div eclMegaMenuContainer>
                    <h2 class="ecl-u-mt-none ecl-u-mt-l-l">Minimal demo content for the container option</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer placerat magna quis ultricies
                        hendrerit.
                        Suspendisse fermentum elit id hendrerit suscipit.</p>
                </div>
            </li>
            <li eclMegaMenuItem routerLink="/" isPromotional label="SOTEU"></li>
        </ul>
    </nav>
</ecl-site-header>
<div style="height: 500px;"></div>
```

```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';
import {  EclMegaMenuItem, EUI_ECL_MEGA_MENU } from '@eui/ecl/components/ecl-mega-menu';
import { EclSiteHeaderLogoClickEvent, EclSiteHeaderLanguageClickEvent,
  EclSiteHeaderLanguageSelectedEvent, EclSiteHeaderSearchEvent, 
  EUI_ECL_SITE_HEADER} from '@eui/ecl/components/ecl-site-header';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_ICON, ...EUI_ECL_LINK, ...EUI_ECL_SITE_HEADER, ...EUI_ECL_MEGA_MENU],
})
export class DefaultComponent {
    
    languageCode = 'en';
    linkExtraAttributes = {
        name: 'data-test',
        value: 'data-test-1',
    }

    onMegaMenuItemSelect(item: EclMegaMenuItem): void {
        console.log(item);
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
