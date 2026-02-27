/**
 * Shared TestBed provider factories to reduce boilerplate across spec files.
 *
 * Usage:
 *   providers: [
 *       ...provideEuiCoreMocks(),
 *       // ...your feature-specific mocks
 *   ]
 */
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { Observable, of } from 'rxjs';
import { CONFIG_TOKEN, I18nService, I18nState, UserService, EuiAppConfig } from '@eui/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

/**
 * TranslateLoader that returns the key itself as the translation value.
 * This makes tests work with `translate.instant('key')` returning 'key',
 * and `{{ 'key' | translate }}` rendering 'key'.
 *
 * For tests that need to assert on actual English text, use the `instant` spy approach.
 */
class PassthroughTranslateLoader implements TranslateLoader {
    getTranslation(): Observable<Record<string, string>> {
        // Return empty — TranslateService falls back to returning the key itself
        return of({});
    }
}

/** Pre-configured TranslateModule for tests — keys pass through as-is. */
export const TranslateTestingModule = TranslateModule.forRoot({
    loader: { provide: TranslateLoader, useClass: PassthroughTranslateLoader },
    fallbackLang: 'en',
});

/** Typed I18nService mock that satisfies the generic getState<K>() overload. */
export function createI18nServiceMock() {
    type GetStateReturn<T> = T extends keyof I18nState ? Observable<I18nState[T]> : Observable<I18nState>;
    return {
        init: vi.fn(),
        getState: vi.fn(<K extends keyof I18nState>(key?: K): GetStateReturn<K> => {
            if (typeof key === 'string') {
                return of({ activeLang: 'en' }[key]) as GetStateReturn<K>;
            }
            return of({ activeLang: 'en' }) as GetStateReturn<K>;
        }),
    };
}

/** Standard CONFIG_TOKEN value for tests. */
export const TEST_CONFIG: EuiAppConfig = {
    global: {},
    modules: { core: { base: 'localhost', userDetails: 'dummy' } },
};

/** EuiGrowlService mock with a spied growl() method. */
export function createGrowlServiceMock() {
    return { growl: vi.fn() };
}

/** EuiBreadcrumbService mock. */
export function createBreadcrumbServiceMock() {
    return { setBreadcrumb: vi.fn(), breadcrumbs$: of([]) };
}

/**
 * Common eUI core providers needed by most component specs.
 * Includes: HttpClient, HttpClientTesting, Router, I18nService, CONFIG_TOKEN, UserService.
 */
export function provideEuiCoreMocks() {
    return [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: I18nService, useValue: createI18nServiceMock() },
        { provide: CONFIG_TOKEN, useValue: TEST_CONFIG },
        { provide: UserService, useValue: { init: vi.fn() } },
    ];
}
