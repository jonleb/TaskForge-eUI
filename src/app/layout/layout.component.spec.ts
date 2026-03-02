import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { BehaviorSubject, of } from 'rxjs';
import { TranslateTestingModule, provideEuiCoreMocks } from '../testing/test-providers';
import { LayoutComponent } from './layout.component';
import { AuthService, PermissionService } from '../core/auth';
import { ProjectContextService, Project } from '../core/project';
import { TranslateService } from '@ngx-translate/core';

describe('LayoutComponent', () => {
    let component: LayoutComponent;
    let fixture: ComponentFixture<LayoutComponent>;
    let authServiceMock: { logout: ReturnType<typeof vi.fn> };
    let permissionServiceMock: { setUser: ReturnType<typeof vi.fn>; clear: ReturnType<typeof vi.fn>; hasGlobalRole: ReturnType<typeof vi.fn>; getGlobalRole: ReturnType<typeof vi.fn>; getOriginalRole: ReturnType<typeof vi.fn> };
    let projectContextMock: { currentProject$: BehaviorSubject<Project | null> };
    let router: Router;

    beforeEach(async () => {
        localStorage.removeItem('preferred_language');
        authServiceMock = {
            logout: vi.fn(),
        };
        permissionServiceMock = {
            setUser: vi.fn(),
            clear: vi.fn(),
            hasGlobalRole: vi.fn().mockReturnValue(false),
            getGlobalRole: vi.fn().mockReturnValue('USER'),
            getOriginalRole: vi.fn().mockReturnValue('USER'),
        };
        projectContextMock = {
            currentProject$: new BehaviorSubject<Project | null>(null),
        };

        await TestBed.configureTestingModule({
            imports: [
                LayoutComponent,
                TranslateTestingModule,
            ],
            providers: [
                ...provideEuiCoreMocks(),
                { provide: AuthService, useValue: authServiceMock },
                { provide: PermissionService, useValue: permissionServiceMock },
                { provide: ProjectContextService, useValue: projectContextMock },
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

    it('should read userRole from permissionService.getOriginalRole() on init', () => {
        permissionServiceMock.getOriginalRole.mockReturnValue('PRODUCT_OWNER');

        component.ngOnInit();

        expect(permissionServiceMock.getOriginalRole).toHaveBeenCalled();
        expect(component.userRole).toBe('PRODUCT_OWNER');
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

        component.ngOnInit();

        const labels = component.sidebarItems.map(i => i.label);
        // Users item (role-gated) should be visible when role matches
        expect(labels).toContain('nav.users');
        expect(labels).toContain('nav.home');
    });

    it('should hide role-gated items when user lacks required role', () => {
        permissionServiceMock.hasGlobalRole.mockReturnValue(false);

        component.ngOnInit();

        const labels = component.sidebarItems.map(i => i.label);
        expect(labels).not.toContain('nav.users');
        expect(labels).toContain('nav.home');
    });

    it('should show items without metadata.roles to all users', () => {
        permissionServiceMock.hasGlobalRole.mockReturnValue(false);

        component.ngOnInit();

        // All default items have no roles, so all should be visible
        expect(component.sidebarItems.length).toBe(2);
    });

    it('should filter sidebar with default role when permissionService returns USER', () => {
        permissionServiceMock.getGlobalRole.mockReturnValue('USER');
        permissionServiceMock.hasGlobalRole.mockReturnValue(false);

        component.ngOnInit();

        const labels = component.sidebarItems.map(i => i.label);
        expect(labels).not.toContain('nav.users');
        expect(labels).toContain('nav.home');
    });

    it('should switch to project-scoped sidebar when a project is set', () => {
        component.ngOnInit();

        projectContextMock.currentProject$.next({
            id: '1', key: 'TF', name: 'TaskForge Core',
            description: '', created_by: '1',
            created_at: '', updated_at: '', is_active: true,
        });

        const labels = component.sidebarItems.map(i => i.label);
        expect(labels).toContain('nav.dashboard');
        expect(labels).toContain('nav.members');
        expect(labels).toContain('nav.backlog');
        expect(labels).toContain('nav.board');
        expect(labels).toContain('nav.settings');
        expect(labels).toContain('nav.all-projects');
    });

    it('should revert to global sidebar when project is cleared', () => {
        permissionServiceMock.hasGlobalRole.mockReturnValue(false);
        component.ngOnInit();

        projectContextMock.currentProject$.next({
            id: '1', key: 'TF', name: 'TaskForge Core',
            description: '', created_by: '1',
            created_at: '', updated_at: '', is_active: true,
        });
        expect(component.sidebarItems.map(i => i.label)).toContain('nav.dashboard');

        projectContextMock.currentProject$.next(null);
        const labels = component.sidebarItems.map(i => i.label);
        expect(labels).toContain('nav.home');
        expect(labels).toContain('nav.projects');
        expect(labels).not.toContain('nav.dashboard');
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
        expect(urls).toContain('screen/projects/42/members');
        expect(urls).toContain('screen/projects/42/backlog');
        expect(urls).toContain('screen/projects/42/board');
        expect(urls).toContain('screen/projects/42/settings');
    });

    it('should save selected language to localStorage on language change', () => {
        component.ngOnInit();

        const translate = TestBed.inject(TranslateService);
        translate.use('fr');

        expect(localStorage.getItem('preferred_language')).toBe('fr');
    });
});
