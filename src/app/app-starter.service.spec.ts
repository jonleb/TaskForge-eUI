import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CONFIG_TOKEN, I18nService, UserService } from '@eui/core';
import { of, throwError } from 'rxjs';
import { AppStarterService } from './app-starter.service';
import { EuiServiceStatus } from '@eui/base';
import { AuthService, PermissionService } from './core/auth';
import { ProjectContextService } from './core/project';
import { UserProfile } from './core/auth/auth.models';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { createI18nServiceMock, TEST_CONFIG, TranslateTestingModule } from './testing/test-providers';

// eslint-disable-next-line
type SpyObj<T> = { [K in keyof T]: T[K] extends (...args: any[]) => any ? ReturnType<typeof vi.fn> : T[K] };

describe('AppStarterService', () => {
    let service: AppStarterService;
    let userServiceMock: SpyObj<UserService>;
    let i18nServiceMock: ReturnType<typeof createI18nServiceMock>;
    let authServiceMock: {
        isAuthenticated: ReturnType<typeof vi.fn>;
        getCurrentUser: ReturnType<typeof vi.fn>;
    };
    let permissionServiceMock: {
        setUser: ReturnType<typeof vi.fn>;
        clear: ReturnType<typeof vi.fn>;
    };
    let projectContextMock: {
        restoreProject: ReturnType<typeof vi.fn>;
    };

    const mockProfile: UserProfile = {
        userId: '1',
        firstName: 'Super',
        lastName: 'Admin',
        email: 'superadmin@taskforge.local',
        role: 'SUPER_ADMIN',
    };

    beforeEach(() => {
        userServiceMock = { init: vi.fn() } as SpyObj<UserService>;
        i18nServiceMock = createI18nServiceMock();
        authServiceMock = {
            isAuthenticated: vi.fn().mockReturnValue(false),
            getCurrentUser: vi.fn(),
        };
        permissionServiceMock = {
            setUser: vi.fn(),
            clear: vi.fn(),
        };
        projectContextMock = {
            restoreProject: vi.fn().mockReturnValue(of(null)),
        };

        TestBed.configureTestingModule({
            imports: [TranslateTestingModule],
            providers: [
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
                AppStarterService,
                { provide: UserService, useValue: userServiceMock },
                { provide: I18nService, useValue: i18nServiceMock },
                { provide: CONFIG_TOKEN, useValue: TEST_CONFIG },
                { provide: AuthService, useValue: authServiceMock },
                { provide: PermissionService, useValue: permissionServiceMock },
                { provide: ProjectContextService, useValue: projectContextMock },
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

    it('should call permissionService.setUser() when authenticated', () => {
        authServiceMock.isAuthenticated.mockReturnValue(true);
        authServiceMock.getCurrentUser.mockReturnValue(of(mockProfile));
        vi.mocked(userServiceMock.init).mockReturnValue(of({} as EuiServiceStatus));

        service.initUserService().subscribe(() => {
            expect(permissionServiceMock.setUser).toHaveBeenCalledWith(mockProfile);
        });
    });

    it('should not call permissionService.setUser() when not authenticated', () => {
        authServiceMock.isAuthenticated.mockReturnValue(false);
        vi.mocked(userServiceMock.init).mockReturnValue(of({} as EuiServiceStatus));

        service.initUserService().subscribe(() => {
            expect(permissionServiceMock.setUser).not.toHaveBeenCalled();
        });
    });

    // ─── Project context restore ─────────────────────────────────────

    it('should call restoreProject() during start()', () => {
        vi.mocked(userServiceMock.init).mockReturnValue(of({} as EuiServiceStatus));
        vi.mocked(i18nServiceMock.init).mockReturnValue(of({} as EuiServiceStatus));

        service.start().subscribe(() => {
            expect(projectContextMock.restoreProject).toHaveBeenCalled();
        });
    });

    it('should complete start() even when restoreProject() returns null', () => {
        vi.mocked(userServiceMock.init).mockReturnValue(of({} as EuiServiceStatus));
        vi.mocked(i18nServiceMock.init).mockReturnValue(of({} as EuiServiceStatus));
        projectContextMock.restoreProject.mockReturnValue(of(null));

        let completed = false;
        service.start().subscribe({
            next: status => {
                expect(status).toBeTruthy();
            },
            complete: () => { completed = true; },
        });

        expect(completed).toBe(true);
    });

    it('should preserve i18n status through restoreProject() chain', () => {
        const mockStatus = { status: 'ok' } as unknown as EuiServiceStatus;
        vi.mocked(userServiceMock.init).mockReturnValue(of({} as EuiServiceStatus));
        vi.mocked(i18nServiceMock.init).mockReturnValue(of(mockStatus));

        let result: EuiServiceStatus | undefined;
        service.start().subscribe(status => { result = status; });

        expect(result).toBe(mockStatus);
    });
});
