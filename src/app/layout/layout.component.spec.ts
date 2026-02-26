import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { BehaviorSubject, of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { provideEuiCoreMocks } from '../testing/test-providers';
import { LayoutComponent } from './layout.component';
import { AuthService, PermissionService } from '../core/auth';
import { ProjectContextService, Project } from '../core/project';

describe('LayoutComponent', () => {
    let component: LayoutComponent;
    let fixture: ComponentFixture<LayoutComponent>;
    let authServiceMock: { logout: ReturnType<typeof vi.fn> };
    let permissionServiceMock: { setUser: ReturnType<typeof vi.fn>; clear: ReturnType<typeof vi.fn>; hasGlobalRole: ReturnType<typeof vi.fn>; getGlobalRole: ReturnType<typeof vi.fn>; getOriginalRole: ReturnType<typeof vi.fn> };
    let projectContextMock: { currentProject$: BehaviorSubject<Project | null> };
    let router: Router;

    beforeEach(async () => {
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
                TranslateModule.forRoot(),
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

    it('should filter sidebar with default role when permissionService returns USER', () => {
        permissionServiceMock.getGlobalRole.mockReturnValue('USER');
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
