import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { Observable, of, throwError } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { CONFIG_TOKEN, I18nService, I18nState, UserService, EuiAppConfig } from '@eui/core';
import { LayoutComponent } from './layout.component';
import { AuthService } from '../core/auth';

// eslint-disable-next-line
type SpyObj<T> = { [K in keyof T]: T[K] extends (...args: any[]) => any ? ReturnType<typeof vi.fn> : T[K] };

describe('LayoutComponent', () => {
    let component: LayoutComponent;
    let fixture: ComponentFixture<LayoutComponent>;
    let authServiceMock: { logout: ReturnType<typeof vi.fn>; getCurrentUser: ReturnType<typeof vi.fn> };
    let router: Router;
    let userServiceMock: SpyObj<UserService>;
    let i18nServiceMock: SpyObj<I18nService>;
    let configMock: EuiAppConfig;

    const mockUserProfile = {
        userId: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'DEVELOPER',
    };

    beforeEach(async () => {
        type GetStateReturnType<T> = T extends keyof I18nState ? Observable<I18nState[T]> : Observable<I18nState>;

        authServiceMock = {
            logout: vi.fn(),
            getCurrentUser: vi.fn().mockReturnValue(of(mockUserProfile)),
        };
        userServiceMock = { init: vi.fn() } as SpyObj<UserService>;
        i18nServiceMock = {
            init: vi.fn(),
            getState: vi.fn(<K extends keyof I18nState>(key?: K): GetStateReturnType<K> => {
                if (typeof key === 'string') {
                    return of({ activeLang: 'en' }[key]) as GetStateReturnType<K>;
                }
                return of({ activeLang: 'en' }) as GetStateReturnType<K>;
            })
        } as SpyObj<I18nService>;
        configMock = { global: {}, modules: { core: { base: 'localhost:3000', userDetails: 'dummy' } } };

        await TestBed.configureTestingModule({
            imports: [
                LayoutComponent,
                TranslateModule.forRoot(),
            ],
            providers: [
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
                provideRouter([]),
                { provide: AuthService, useValue: authServiceMock },
                { provide: UserService, useValue: userServiceMock },
                { provide: I18nService, useValue: i18nServiceMock },
                { provide: CONFIG_TOKEN, useValue: configMock },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(LayoutComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        vi.spyOn(router, 'navigate').mockResolvedValue(true);
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should call AuthService.logout() when logout() is called', () => {
        authServiceMock.logout.mockReturnValue(of(undefined));

        component.logout();

        expect(authServiceMock.logout).toHaveBeenCalled();
    });

    it('should navigate to /login after logout completes', () => {
        authServiceMock.logout.mockReturnValue(of(undefined));

        component.logout();

        expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should fetch current user and set userRole on init', () => {
        component.ngOnInit();

        expect(authServiceMock.getCurrentUser).toHaveBeenCalled();
        expect(component.userRole).toBe('DEVELOPER');
    });

    it('should set userRole to empty string when getCurrentUser fails', () => {
        authServiceMock.getCurrentUser.mockReturnValue(throwError(() => new Error('Network error')));

        component.ngOnInit();

        expect(component.userRole).toBe('');
    });
});
