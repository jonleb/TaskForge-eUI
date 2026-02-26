import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest';
import { EuiGrowlService } from '@eui/core';
import { PermissionService } from './permission.service';
import { UserProfile } from './auth.models';

describe('PermissionService', () => {
    let service: PermissionService;
    let httpMock: HttpTestingController;
    let growlServiceMock: { growl: ReturnType<typeof vi.fn> };

    const superAdminProfile: UserProfile = {
        userId: '1',
        firstName: 'Super',
        lastName: 'Admin',
        email: 'superadmin@taskforge.local',
        role: 'SUPER_ADMIN',
    };

    const developerProfile: UserProfile = {
        userId: '4',
        firstName: 'Dev',
        lastName: 'Eloper',
        email: 'developer@taskforge.local',
        role: 'DEVELOPER',
    };

    beforeEach(() => {
        growlServiceMock = { growl: vi.fn() };

        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
                PermissionService,
                { provide: EuiGrowlService, useValue: growlServiceMock },
            ],
        });

        service = TestBed.inject(PermissionService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('setUser()', () => {
        it('should set globalRole to SUPER_ADMIN for SUPER_ADMIN user', () => {
            service.setUser(superAdminProfile);
            expect(service.getGlobalRole()).toBe('SUPER_ADMIN');
            expect(service.getUserId()).toBe('1');
        });

        it('should set globalRole to USER for non-SUPER_ADMIN user', () => {
            service.setUser(developerProfile);
            expect(service.getGlobalRole()).toBe('USER');
            expect(service.getUserId()).toBe('4');
        });

        it('should store original role from profile', () => {
            service.setUser(developerProfile);
            expect(service.getOriginalRole()).toBe('DEVELOPER');
        });

        it('should store SUPER_ADMIN as original role', () => {
            service.setUser(superAdminProfile);
            expect(service.getOriginalRole()).toBe('SUPER_ADMIN');
        });
    });

    describe('isSuperAdmin()', () => {
        it('should return true for SUPER_ADMIN', () => {
            service.setUser(superAdminProfile);
            expect(service.isSuperAdmin()).toBe(true);
        });

        it('should return false for regular user', () => {
            service.setUser(developerProfile);
            expect(service.isSuperAdmin()).toBe(false);
        });
    });

    describe('hasGlobalRole()', () => {
        it('should return true when user has SUPER_ADMIN role', () => {
            service.setUser(superAdminProfile);
            expect(service.hasGlobalRole('SUPER_ADMIN')).toBe(true);
        });

        it('should return false when SUPER_ADMIN user checks for USER role', () => {
            service.setUser(superAdminProfile);
            expect(service.hasGlobalRole('USER')).toBe(false);
        });

        it('should return true when regular user checks for USER role', () => {
            service.setUser(developerProfile);
            expect(service.hasGlobalRole('USER')).toBe(true);
        });

        it('should return false when regular user checks for SUPER_ADMIN role', () => {
            service.setUser(developerProfile);
            expect(service.hasGlobalRole('SUPER_ADMIN')).toBe(false);
        });

        it('should accept multiple roles', () => {
            service.setUser(developerProfile);
            expect(service.hasGlobalRole('SUPER_ADMIN', 'USER')).toBe(true);
        });
    });

    describe('hasProjectRole()', () => {
        it('should return true immediately for SUPER_ADMIN without HTTP call', () => {
            service.setUser(superAdminProfile);

            let result: boolean | undefined;
            service.hasProjectRole('1', 'DEVELOPER').subscribe(v => result = v);

            // No HTTP request should be made
            httpMock.expectNone('/api/projects/1/members');
            expect(result).toBe(true);
        });

        it('should return true when user has matching project role', () => {
            service.setUser(developerProfile);

            let result: boolean | undefined;
            service.hasProjectRole('1', 'DEVELOPER', 'REPORTER').subscribe(v => result = v);

            const req = httpMock.expectOne('/api/projects/1/members');
            req.flush([
                { userId: '4', role: 'DEVELOPER' },
                { userId: '5', role: 'REPORTER' },
            ]);

            expect(result).toBe(true);
        });

        it('should return false when user is not a project member', () => {
            service.setUser(developerProfile);

            let result: boolean | undefined;
            service.hasProjectRole('2', 'DEVELOPER').subscribe(v => result = v);

            const req = httpMock.expectOne('/api/projects/2/members');
            req.flush([
                { userId: '5', role: 'REPORTER' },
            ]);

            expect(result).toBe(false);
        });

        it('should return false when user has wrong project role', () => {
            service.setUser(developerProfile);

            let result: boolean | undefined;
            service.hasProjectRole('1', 'PROJECT_ADMIN').subscribe(v => result = v);

            const req = httpMock.expectOne('/api/projects/1/members');
            req.flush([
                { userId: '4', role: 'DEVELOPER' },
            ]);

            expect(result).toBe(false);
        });

        it('should return false when API call fails', () => {
            service.setUser(developerProfile);

            let result: boolean | undefined;
            service.hasProjectRole('1', 'DEVELOPER').subscribe(v => result = v);

            const req = httpMock.expectOne('/api/projects/1/members');
            req.error(new ProgressEvent('Network error'));

            expect(result).toBe(false);
        });
    });

    describe('clear()', () => {
        it('should reset state to defaults', () => {
            service.setUser(superAdminProfile);
            expect(service.isSuperAdmin()).toBe(true);
            expect(service.getUserId()).toBe('1');

            service.clear();

            expect(service.isSuperAdmin()).toBe(false);
            expect(service.getGlobalRole()).toBe('USER');
            expect(service.getOriginalRole()).toBe('');
            expect(service.getUserId()).toBe('');
        });
    });

    describe('showAccessDenied()', () => {
        it('should show growl with default message when no message provided', () => {
            service.showAccessDenied();

            expect(growlServiceMock.growl).toHaveBeenCalledWith({
                severity: 'warning',
                summary: 'Access denied',
                detail: 'You do not have permission to perform this action.',
            });
        });

        it('should show growl with custom message when provided', () => {
            service.showAccessDenied('Cannot delete this project.');

            expect(growlServiceMock.growl).toHaveBeenCalledWith({
                severity: 'warning',
                summary: 'Access denied',
                detail: 'Cannot delete this project.',
            });
        });
    });
});
