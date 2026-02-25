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
