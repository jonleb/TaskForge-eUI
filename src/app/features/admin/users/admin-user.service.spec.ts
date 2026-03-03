import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { describe, it, beforeEach, afterEach, expect } from 'vitest';
import { AdminUserService } from './admin-user.service';
import {
    AdminUser,
    AdminUserListResponse,
    CreateUserRequest,
    CreateUserResponse,
    ResetPasswordResponse,
} from './admin-user.models';

const mockUser: AdminUser = {
    id: '1',
    username: 'superadmin',
    email: 'superadmin@taskforge.local',
    role: 'SUPER_ADMIN',
    global_role: 'SUPER_ADMIN',
    firstName: 'Super',
    lastName: 'Admin',
    is_active: true,
    created_at: '2025-01-15T10:00:00.000Z',
    updated_at: '2025-01-15T10:00:00.000Z',
};

const mockListResponse: AdminUserListResponse = {
    data: [mockUser],
    total: 1,
    page: 1,
    limit: 10,
};

const mockCreateResponse: CreateUserResponse = {
    user: { ...mockUser, id: '99', username: 'newuser' },
    temporaryPassword: 'aB3dEf7hIj2k',
};

const mockResetResponse: ResetPasswordResponse = {
    temporaryPassword: 'xY9zAb3cDe4f',
};

describe('AdminUserService', () => {
    let service: AdminUserService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
                AdminUserService,
            ],
        });

        service = TestBed.inject(AdminUserService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // ─── getUsers() ──────────────────────────────────────────────────────────

    describe('getUsers()', () => {
        it('should GET /api/admin/users with no query params when called with empty object', () => {
            service.getUsers().subscribe(res => {
                expect(res).toEqual(mockListResponse);
            });

            const req = httpMock.expectOne('/api/admin/users');
            expect(req.request.method).toBe('GET');
            expect(req.request.params.keys().length).toBe(0);
            req.flush(mockListResponse);
        });

        it('should pass _page and _limit as query params', () => {
            service.getUsers({ _page: 2, _limit: 25 }).subscribe();

            const req = httpMock.expectOne(r => r.url === '/api/admin/users');
            expect(req.request.params.get('_page')).toBe('2');
            expect(req.request.params.get('_limit')).toBe('25');
            req.flush(mockListResponse);
        });

        it('should pass q as query param for search', () => {
            service.getUsers({ q: 'admin' }).subscribe();

            const req = httpMock.expectOne(r => r.url === '/api/admin/users');
            expect(req.request.params.get('q')).toBe('admin');
            req.flush(mockListResponse);
        });

        it('should pass is_active as query param for status filter', () => {
            service.getUsers({ is_active: 'true' }).subscribe();

            const req = httpMock.expectOne(r => r.url === '/api/admin/users');
            expect(req.request.params.get('is_active')).toBe('true');
            req.flush(mockListResponse);
        });

        it('should pass _sort and _order as query params', () => {
            service.getUsers({ _sort: 'username', _order: 'asc' }).subscribe();

            const req = httpMock.expectOne(r => r.url === '/api/admin/users');
            expect(req.request.params.get('_sort')).toBe('username');
            expect(req.request.params.get('_order')).toBe('asc');
            req.flush(mockListResponse);
        });

        it('should pass all params together', () => {
            service.getUsers({
                _page: 1,
                _limit: 10,
                _sort: 'email',
                _order: 'desc',
                q: 'test',
                is_active: 'false',
            }).subscribe();

            const req = httpMock.expectOne(r => r.url === '/api/admin/users');
            expect(req.request.params.get('_page')).toBe('1');
            expect(req.request.params.get('_limit')).toBe('10');
            expect(req.request.params.get('_sort')).toBe('email');
            expect(req.request.params.get('_order')).toBe('desc');
            expect(req.request.params.get('q')).toBe('test');
            expect(req.request.params.get('is_active')).toBe('false');
            req.flush(mockListResponse);
        });

        it('should skip undefined and empty string params', () => {
            service.getUsers({ _page: 1, q: '', _sort: undefined }).subscribe();

            const req = httpMock.expectOne(r => r.url === '/api/admin/users');
            expect(req.request.params.get('_page')).toBe('1');
            expect(req.request.params.has('q')).toBe(false);
            expect(req.request.params.has('_sort')).toBe(false);
            req.flush(mockListResponse);
        });
    });

    // ─── getUser() ───────────────────────────────────────────────────────────

    describe('getUser()', () => {
        it('should GET /api/admin/users/:userId', () => {
            service.getUser('1').subscribe(user => {
                expect(user).toEqual(mockUser);
            });

            const req = httpMock.expectOne('/api/admin/users/1');
            expect(req.request.method).toBe('GET');
            req.flush(mockUser);
        });
    });

    // ─── createUser() ────────────────────────────────────────────────────────

    describe('createUser()', () => {
        it('should POST /api/admin/users with request body', () => {
            const body: CreateUserRequest = {
                username: 'newuser',
                firstName: 'New',
                lastName: 'User',
                email: 'new@taskforge.local',
                role: 'DEVELOPER',
            };

            service.createUser(body).subscribe(res => {
                expect(res.user).toBeDefined();
                expect(res.temporaryPassword).toBe('aB3dEf7hIj2k');
            });

            const req = httpMock.expectOne('/api/admin/users');
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual(body);
            req.flush(mockCreateResponse);
        });
    });

    // ─── resetPassword() ─────────────────────────────────────────────────────

    describe('resetPassword()', () => {
        it('should POST /api/admin/users/:userId/reset-password with empty body', () => {
            service.resetPassword('5').subscribe(res => {
                expect(res.temporaryPassword).toBe('xY9zAb3cDe4f');
            });

            const req = httpMock.expectOne('/api/admin/users/5/reset-password');
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual({});
            req.flush(mockResetResponse);
        });
    });

    // ─── deactivateUser() ────────────────────────────────────────────────────

    describe('deactivateUser()', () => {
        it('should PATCH /api/admin/users/:userId/deactivate with empty body', () => {
            const deactivatedUser: AdminUser = { ...mockUser, id: '21', is_active: false };

            service.deactivateUser('21').subscribe(user => {
                expect(user.is_active).toBe(false);
            });

            const req = httpMock.expectOne('/api/admin/users/21/deactivate');
            expect(req.request.method).toBe('PATCH');
            expect(req.request.body).toEqual({});
            req.flush(deactivatedUser);
        });
    });

    // ─── reactivateUser() ────────────────────────────────────────────────────

    describe('reactivateUser()', () => {
        it('should PATCH /api/admin/users/:userId/reactivate with empty body', () => {
            const reactivatedUser: AdminUser = { ...mockUser, id: '7', is_active: true };

            service.reactivateUser('7').subscribe(user => {
                expect(user.is_active).toBe(true);
            });

            const req = httpMock.expectOne('/api/admin/users/7/reactivate');
            expect(req.request.method).toBe('PATCH');
            expect(req.request.body).toEqual({});
            req.flush(reactivatedUser);
        });
    });
});
