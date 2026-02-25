import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CONFIG_TOKEN, I18nService, UserService } from '@eui/core';
import { EuiAppConfig } from '@eui/core';
import { of, throwError } from 'rxjs';
import { AppStarterService } from './app-starter.service';
import { EuiServiceStatus } from '@eui/base';
import { AuthService } from './core/auth';
import { UserProfile } from './core/auth/auth.models';
import { describe, it, beforeEach, expect, vi } from 'vitest';

// eslint-disable-next-line
type SpyObj<T> = { [K in keyof T]: T[K] extends (...args: any[]) => any ? ReturnType<typeof vi.fn> : T[K] };

describe('AppStarterService', () => {
    let service: AppStarterService;
    let userServiceMock: SpyObj<UserService>;
    let i18nServiceMock: SpyObj<I18nService>;
    let authServiceMock: {
        isAuthenticated: ReturnType<typeof vi.fn>;
        getCurrentUser: ReturnType<typeof vi.fn>;
    };
    let configMock: EuiAppConfig;

    const mockProfile: UserProfile = {
        userId: '1',
        firstName: 'Super',
        lastName: 'Admin',
        email: 'superadmin@taskforge.local',
        role: 'SUPER_ADMIN',
    };

    beforeEach(() => {
        userServiceMock = { init: vi.fn() } as SpyObj<UserService>;
        i18nServiceMock = { init: vi.fn() } as SpyObj<I18nService>;
        authServiceMock = {
            isAuthenticated: vi.fn().mockReturnValue(false),
            getCurrentUser: vi.fn(),
        };
        configMock = { global: {}, modules: { core: { base: 'localhost:3000', userDetails: 'dummy' } } };

        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
                AppStarterService,
                { provide: UserService, useValue: userServiceMock },
                { provide: I18nService, useValue: i18nServiceMock },
                { provide: CONFIG_TOKEN, useValue: configMock },
                { provide: AuthService, useValue: authServiceMock },
            ],
        });

        service = TestBed.inject(AppStarterService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call start method and initialize user and i18n services', () => {
        vi.mocked(userServiceMock.init).mockReturnValue(of({} as EuiServiceStatus));
        vi.mocked(i18nServiceMock.init).mockReturnValue(of({} as EuiServiceStatus));

        service.start().subscribe(() => {
            expect(userServiceMock.init).toHaveBeenCalled();
            expect(i18nServiceMock.init).toHaveBeenCalled();
        });
    });

    it('should return anonymous user when not authenticated', () => {
        authServiceMock.isAuthenticated.mockReturnValue(false);
        vi.mocked(userServiceMock.init).mockReturnValue(of({} as EuiServiceStatus));

        service.initUserService().subscribe(() => {
            expect(authServiceMock.getCurrentUser).not.toHaveBeenCalled();
            expect(userServiceMock.init).toHaveBeenCalledWith(
                expect.objectContaining({ userId: 'anonymous', firstName: 'Guest' })
            );
        });
    });

    it('should use AuthService.getCurrentUser() when authenticated', () => {
        authServiceMock.isAuthenticated.mockReturnValue(true);
        authServiceMock.getCurrentUser.mockReturnValue(of(mockProfile));
        vi.mocked(userServiceMock.init).mockReturnValue(of({} as EuiServiceStatus));

        service.initUserService().subscribe(() => {
            expect(authServiceMock.getCurrentUser).toHaveBeenCalled();
            expect(userServiceMock.init).toHaveBeenCalledWith(
                expect.objectContaining({
                    userId: '1',
                    firstName: 'Super',
                    lastName: 'Admin',
                    fullName: 'Super Admin',
                })
            );
        });
    });

    it('should fall back to anonymous user when getCurrentUser() fails', () => {
        authServiceMock.isAuthenticated.mockReturnValue(true);
        authServiceMock.getCurrentUser.mockReturnValue(throwError(() => new Error('Network error')));
        vi.mocked(userServiceMock.init).mockReturnValue(of({} as EuiServiceStatus));

        service.initUserService().subscribe(() => {
            expect(userServiceMock.init).toHaveBeenCalledWith(
                expect.objectContaining({ userId: 'anonymous', firstName: 'Guest' })
            );
        });
    });
});
