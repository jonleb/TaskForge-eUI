import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { EuiGrowlService } from '@eui/core';
import { TranslateTestingModule } from '../../testing/test-providers';
import { roleGuard } from './role.guard';
import { PermissionService } from './permission.service';

describe('roleGuard', () => {
    let permissionServiceMock: { hasGlobalRole: ReturnType<typeof vi.fn> };
    let growlServiceMock: { growl: ReturnType<typeof vi.fn> };

    const mockState = {} as RouterStateSnapshot;

    function createRoute(data: Record<string, unknown> = {}): ActivatedRouteSnapshot {
        return { data } as unknown as ActivatedRouteSnapshot;
    }

    beforeEach(() => {
        permissionServiceMock = {
            hasGlobalRole: vi.fn(),
        };
        growlServiceMock = {
            growl: vi.fn(),
        };

        TestBed.configureTestingModule({
            imports: [TranslateTestingModule],
            providers: [
                { provide: PermissionService, useValue: permissionServiceMock },
                { provide: EuiGrowlService, useValue: growlServiceMock },
            ],
        });
    });

    it('should return true when user has required SUPER_ADMIN role', () => {
        permissionServiceMock.hasGlobalRole.mockReturnValue(true);
        const route = createRoute({ roles: ['SUPER_ADMIN'] });

        const result = TestBed.runInInjectionContext(() => roleGuard(route, mockState));

        expect(result).toBe(true);
        expect(growlServiceMock.growl).not.toHaveBeenCalled();
    });

    it('should redirect to /screen/home when user lacks required role', () => {
        permissionServiceMock.hasGlobalRole.mockReturnValue(false);
        const route = createRoute({ roles: ['SUPER_ADMIN'] });

        const result = TestBed.runInInjectionContext(() => roleGuard(route, mockState));

        expect(result).toBeInstanceOf(UrlTree);
        expect((result as UrlTree).toString()).toBe('/screen/home');
    });

    it('should show warning growl when access is denied', () => {
        permissionServiceMock.hasGlobalRole.mockReturnValue(false);
        const route = createRoute({ roles: ['SUPER_ADMIN'] });

        TestBed.runInInjectionContext(() => roleGuard(route, mockState));

        expect(growlServiceMock.growl).toHaveBeenCalledWith({
            severity: 'warning',
            summary: 'auth.access-denied-summary',
            detail: 'auth.access-denied-detail',
        });
    });

    it('should pass through when no roles are defined on route', () => {
        const route = createRoute({});

        const result = TestBed.runInInjectionContext(() => roleGuard(route, mockState));

        expect(result).toBe(true);
        expect(permissionServiceMock.hasGlobalRole).not.toHaveBeenCalled();
    });

    it('should pass through when roles array is empty', () => {
        const route = createRoute({ roles: [] });

        const result = TestBed.runInInjectionContext(() => roleGuard(route, mockState));

        expect(result).toBe(true);
        expect(permissionServiceMock.hasGlobalRole).not.toHaveBeenCalled();
    });

    it('should allow access when multiple roles are accepted and user matches one', () => {
        permissionServiceMock.hasGlobalRole.mockReturnValue(true);
        const route = createRoute({ roles: ['SUPER_ADMIN', 'USER'] });

        const result = TestBed.runInInjectionContext(() => roleGuard(route, mockState));

        expect(result).toBe(true);
        expect(permissionServiceMock.hasGlobalRole).toHaveBeenCalledWith('SUPER_ADMIN', 'USER');
    });
});
