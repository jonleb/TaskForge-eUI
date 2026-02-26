import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { CONFIG_TOKEN, I18nService, I18nState, UserService, EuiAppConfig } from '@eui/core';
import { LayoutComponent } from './layout.component';
import { AuthService, PermissionService } from '../core/auth';
import { ProjectContextService, Project } from '../core/project';

// eslint-disable-next-line
type SpyObj<T> = { [K in keyof T]: T[K] extends (...args: any[]) => any ? ReturnType<typeof vi.fn> : T[K] };

describe('LayoutComponent', () => {
    let component: LayoutComponent;
    let fixture: ComponentFixture<LayoutComponent>;
    let authServiceMock: { logout: ReturnType<typeof vi.fn>; getCurrentUser: ReturnType<typeof vi.fn> };
    let permissionServiceMock: { setUser: ReturnType<typeof vi.fn>; clear: ReturnType<typeof vi.fn>; hasGlobalRole: ReturnType<typeof vi.fn> };
    let projectContextMock: { currentProject$: BehaviorSubject<Project | null> };
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
        permissionServiceMock = {
            setUser: vi.fn(),
            clear: vi.fn(),
            hasGlobalRole: vi.fn().mockReturnValue(false),
        };
        projectContextMock = {
            currentProject$: new BehaviorSubject<Project | null>(null),
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
                { provide: PermissionService, useValue: permissionServiceMock },
                { provide: ProjectContextService, useValue: projectContextMock },
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

    it('should call permissionService.setUser() on init', () => {
        component.ngOnInit();

        expect(permissionServiceMock.setUser).toHaveBeenCalledWith(mockUserProfile);
    });

    it('should call permissionService.clear() on logout', () => {
        authServiceMock.logout.mockReturnValue(of(undefined));

        component.logout();

        expect(permissionServiceMock.clear).toHaveBeenCalled();
    });

    it('should populate sidebarItems after ngOnInit', () => {
        permissionServiceMock.hasGlobalRole.mockReturnValue(true);

        component.ngOnInit();

        expect(component.sidebarItems.length).toBeGreaterThan(0);
    });

    it('should show all items when user has matching role', () => {
        permissionServiceMock.hasGlobalRole.mockReturnValue(true);
        // Add a role-gated item to test filtering
        (component as any).allSidebarItems.push({ label: 'Admin', url: 'screen/admin', metadata: { roles: ['SUPER_ADMIN'] } });

        component.ngOnInit();

        const labels = component.sidebarItems.map(i => i.label);
        expect(labels).toContain('Admin');
        expect(labels).toContain('Home');
    });

    it('should hide role-gated items when user lacks required role', () => {
        permissionServiceMock.hasGlobalRole.mockReturnValue(false);
        (component as any).allSidebarItems.push({ label: 'Admin', url: 'screen/admin', metadata: { roles: ['SUPER_ADMIN'] } });

        component.ngOnInit();

        const labels = component.sidebarItems.map(i => i.label);
        expect(labels).not.toContain('Admin');
        expect(labels).toContain('Home');
    });

    it('should show items without metadata.roles to all users', () => {
        permissionServiceMock.hasGlobalRole.mockReturnValue(false);

        component.ngOnInit();

        // All default items have no roles, so all should be visible
        expect(component.sidebarItems.length).toBe(2);
    });

    it('should filter sidebar on error (show only unrestricted items)', () => {
        authServiceMock.getCurrentUser.mockReturnValue(throwError(() => new Error('fail')));
        (component as any).allSidebarItems.push({ label: 'Admin', url: 'screen/admin', metadata: { roles: ['SUPER_ADMIN'] } });

        component.ngOnInit();

        const labels = component.sidebarItems.map(i => i.label);
        expect(labels).not.toContain('Admin');
        expect(labels).toContain('Home');
    });

    it('should switch to project-scoped sidebar when a project is set', () => {
        component.ngOnInit();

        projectContextMock.currentProject$.next({
            id: '1', key: 'TF', name: 'TaskForge Core',
            description: '', created_by: '1',
            created_at: '', updated_at: '', is_active: true,
        });

        const labels = component.sidebarItems.map(i => i.label);
        expect(labels).toContain('Dashboard');
        expect(labels).toContain('Backlog');
        expect(labels).toContain('Board');
        expect(labels).toContain('Settings');
        expect(labels).toContain('← All Projects');
    });

    it('should revert to global sidebar when project is cleared', () => {
        permissionServiceMock.hasGlobalRole.mockReturnValue(false);
        component.ngOnInit();

        projectContextMock.currentProject$.next({
            id: '1', key: 'TF', name: 'TaskForge Core',
            description: '', created_by: '1',
            created_at: '', updated_at: '', is_active: true,
        });
        expect(component.sidebarItems.map(i => i.label)).toContain('Dashboard');

        projectContextMock.currentProject$.next(null);
        const labels = component.sidebarItems.map(i => i.label);
        expect(labels).toContain('Home');
        expect(labels).toContain('Projects');
        expect(labels).not.toContain('Dashboard');
    });

    it('should build correct project-scoped URLs', () => {
        component.ngOnInit();

        projectContextMock.currentProject$.next({
            id: '42', key: 'DEMO', name: 'Demo',
            description: '', created_by: '1',
            created_at: '', updated_at: '', is_active: true,
        });

        const urls = component.sidebarItems.map(i => i.url);
        expect(urls).toContain('screen/projects/42');
        expect(urls).toContain('screen/projects/42/backlog');
        expect(urls).toContain('screen/projects/42/board');
        expect(urls).toContain('screen/projects/42/settings');
    });
});
