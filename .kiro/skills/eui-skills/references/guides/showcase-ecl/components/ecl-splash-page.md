# ecl-splash-page

## Overview

<br>
<more-info componentPartUrl="splash-page/usage/"></more-info>

## API

API content

## Samples

### [Default](samples/ecl-splash-page/Default)

```html
<div eclSplashPage>
    @if (eclThemeService.isEC$ | async) {
    <a href="/" eclSplashPageLogoLink>
        <picture eclSplashPagePicture>
            <source srcset="./assets/images/ecl/ec/logo/positive/logo-ec--{{  languageCode }}.svg"
                media="(min-width: 768px)">
            <img eclSplashPageLogoImage src="./assets/images/ecl/ec/logo/positive/logo-ec--{{  languageCode }}.svg"
                alt="European Commission">
        </picture>
    </a>
    }
    @if (eclThemeService.isEU$ | async) {
        <a href="/" eclSplashPageLogoLink>
            <picture eclSplashPagePicture>
                <source srcset="./assets/images/ecl/eu/logo/standard-version/positive/logo-eu--{{  languageCode }}.svg"
                    media="(min-width: 768px)">
                <img eclSplashPageLogoImage src="./assets/images/ecl/eu/logo/condensed-version/positive/logo-eu--{{  languageCode }}.svg"
                    alt="European Commission">
            </picture>
        </a>
        }
    <div eclSplashPageLanguageContainer title="{{ 'ecl.language-list.SELECT-LANGUAGE' | translate }}">
        <div eclSplashPageLanguageCategory title="{{ 'ecl.language-list.EU-LANGUAGES' | translate }}">
            <ul eclSplashPageLanguageList>
                @for (item of euLanguages; track item) {
                    <li eclSplashPageLanguageItem>
                        <a eclSplashPageLanguageLink href="/" [lang]="item" hreflang="{{item}}"></a>
                    </li>
                }
            </ul>
        </div>
        <div eclSplashPageLanguageCategory title="{{ 'ecl.language-list.NON-EU-LANGUAGES' | translate }}">
            <ul eclSplashPageLanguageList>
                @for (item of nonEuLanguages; track item) {
                    <li eclSplashPageLanguageItem>
                        <a eclSplashPageLanguageLink href="/" [lang]="item" hreflang="{{item}}"></a>
                    </li>
                }
            </ul>
        </div>
    </div>
</div>
```

```typescript
import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';
import { I18nService } from '@eui/core';
import { EclThemeService } from '@eui/ecl/core';
import { EUI_ECL_SPLASH_PAGE } from '@eui/ecl/components/ecl-splash-page';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [AsyncPipe, ...EUI_ECL_SPLASH_PAGE, TranslateModule],
})
export class DefaultComponent implements OnInit {
    euLanguages = ['bg', 'cs', 'da', 'de', 'et', 'el', 'en', 'es', 'fi', 'fr', 'ga', 'hr', 'hu', 'it', 'lt', 'lv',
        'mt', 'nl', 'pl', 'pt', 'ro', 'sk', 'sl', 'sv'];
    nonEuLanguages = ['ar', 'ca', 'is', 'lb', 'ja', 'nb', 'ru', 'tr', 'uk'];
    languageCode: string;
    protected destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(private i18nService: I18nService, public eclThemeService: EclThemeService) {}

    ngOnInit(): void {
        this.i18nService.getState().pipe(takeUntil(this.destroy$)).subscribe((lang) => {
            this.languageCode = lang.activeLang;
            // this.cd.detectChanges();
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
```
