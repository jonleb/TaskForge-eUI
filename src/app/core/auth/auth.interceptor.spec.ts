import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { Router } from '@angular/router';
import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest';
import { BehaviorSubject } from 'rxjs';
import { authInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';
import { PermissionService } from './permission.service';
import { EuiGrowlService } from '@eui/core';

describe('authInterceptor', () => {
    let httpMock: HttpTestingController;
    let http: HttpClient;
    let authServiceMock: { getToken: ReturnType<typeof vi.fn>; isAuthenticated$: BehaviorSubject<boolean> };
    let routerMock: { navigate: ReturnType<typeof vi.fn> };
    let growlServiceMock: { growl: ReturnType<typeof vi.fn> };
    let permissionServiceMock: { showAccessDenied: ReturnType<typeof vi.fn> };

    beforeEach(() => {
        localStorage.clear();
        authServiceMock = {
            getToken: vi.fn().mockReturnValue(null),
            isAuthenticated$: new BehaviorSubject<boolean>(false),
        };
        routerMock = { navigate: vi.fn() };
        growlServiceMock = { growl: vi.fn() };
        permissionServiceMock = { showAccessDenied: vi.fn() };

        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(withInterceptors([authInterceptor])),
                provideHttpClientTesting(),
                { provide: AuthService, useValue: authServiceMock },
                { provide: Router, useValue: routerMock },
                { provide: EuiGrowlService, useValue: growlServiceMock },
                { provide: PermissionService, useValue: permissionServiceMock },
            ],
        });

        http = TestBed.inject(HttpClient);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
        localStorage.clear();
    });

    it('should add Authorization header when token exists', () => {
        authServiceMock.getToken.mockReturnValue('valid-token');

        http.get('/api/users').subscribe();

        const req = httpMock.expectOne('/api/users');
        expect(req.request.headers.get('Authorization')).toBe('Bearer valid-token');
        req.flush([]);
    });

    it('should NOT add Authorization header to /api/auth/login requests', () => {
        authServiceMock.getToken.mockReturnValue('valid-token');

        http.post('/api/auth/login', { username: 'test', password: 'test' }).subscribe();

        const req = httpMock.expectOne('/api/auth/login');
        expect(req.request.headers.has('Authorization')).toBe(false);
        req.flush({});
    });

    it('should NOT add Authorization header when no token exists', () => {
        authServiceMock.getToken.mockReturnValue(null);

        http.get('/api/users').subscribe();

        const req = httpMock.expectOne('/api/users');
        expect(req.request.headers.has('Authorization')).toBe(false);
        req.flush([]);
    });

    it('should redirect to /login on 401 response', () => {
        authServiceMock.getToken.mockReturnValue('expired-token');

        http.get('/api/users').subscribe({ error: () => {} });

        httpMock.expectOne('/api/users').flush(
            { message: 'Session expired or invalid' },
            { status: 401, statusText: 'Unauthorized' },
        );

        expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should clear token on 401 response', () => {
        localStorage.setItem('auth_token', 'expired-token');
        authServiceMock.getToken.mockReturnValue('expired-token');

        http.get('/api/users').subscribe({ error: () => {} });

        httpMock.expectOne('/api/users').flush(
            { message: 'Session expired or invalid' },
            { status: 401, statusText: 'Unauthorized' },
        );

        expect(localStorage.getItem('auth_token')).toBeNull();
    });

    it('should update isAuthenticated$ to false on 401 response', () => {
        authServiceMock.isAuthenticated$.next(true);
        authServiceMock.getToken.mockReturnValue('expired-token');

        http.get('/api/users').subscribe({ error: () => {} });

        httpMock.expectOne('/api/users').flush(
            { message: 'Session expired or invalid' },
            { status: 401, statusText: 'Unauthorized' },
        );

        expect(authServiceMock.isAuthenticated$.getValue()).toBe(false);
    });

    it('should pass through non-401 errors without redirecting', () => {
        authServiceMock.getToken.mockReturnValue('valid-token');

        http.get('/api/users').subscribe({ error: () => {} });

        httpMock.expectOne('/api/users').flush(
            { message: 'Server error' },
            { status: 500, statusText: 'Internal Server Error' },
        );

        expect(routerMock.navigate).not.toHaveBeenCalled();
    });

    it('should show growl notification on 401 response', () => {
        authServiceMock.getToken.mockReturnValue('expired-token');

        http.get('/api/users').subscribe({ error: () => {} });

        httpMock.expectOne('/api/users').flush(
            { message: 'Session expired or invalid' },
            { status: 401, statusText: 'Unauthorized' },
        );

        expect(growlServiceMock.growl).toHaveBeenCalledWith(
            expect.objectContaining({
                severity: 'warning',
                summary: 'Session expired',
            }),
        );
    });

    describe('403 Forbidden handling', () => {
        it('should call showAccessDenied on 403 response', () => {
            authServiceMock.getToken.mockReturnValue('valid-token');

            http.get('/api/admin/users').subscribe({ error: () => {} });

            httpMock.expectOne('/api/admin/users').flush(
                { message: 'Forbidden' },
                { status: 403, statusText: 'Forbidden' },
            );

            expect(permissionServiceMock.showAccessDenied).toHaveBeenCalledWith('Forbidden');
        });

        it('should use default message when backend provides no message', () => {
            authServiceMock.getToken.mockReturnValue('valid-token');

            http.get('/api/admin/users').subscribe({ error: () => {} });

            httpMock.expectOne('/api/admin/users').flush(
                null,
                { status: 403, statusText: 'Forbidden' },
            );

            expect(permissionServiceMock.showAccessDenied).toHaveBeenCalledWith(
                'You do not have permission to perform this action.',
            );
        });

        it('should NOT clear token on 403 response', () => {
            localStorage.setItem('auth_token', 'valid-token');
            authServiceMock.getToken.mockReturnValue('valid-token');

            http.get('/api/admin/users').subscribe({ error: () => {} });

            httpMock.expectOne('/api/admin/users').flush(
                { message: 'Forbidden' },
                { status: 403, statusText: 'Forbidden' },
            );

            expect(localStorage.getItem('auth_token')).toBe('valid-token');
        });

        it('should NOT update isAuthenticated$ on 403 response', () => {
            authServiceMock.isAuthenticated$.next(true);
            authServiceMock.getToken.mockReturnValue('valid-token');

            http.get('/api/admin/users').subscribe({ error: () => {} });

            httpMock.expectOne('/api/admin/users').flush(
                { message: 'Forbidden' },
                { status: 403, statusText: 'Forbidden' },
            );

            expect(authServiceMock.isAuthenticated$.getValue()).toBe(true);
        });

        it('should NOT redirect on 403 response', () => {
            authServiceMock.getToken.mockReturnValue('valid-token');

            http.get('/api/admin/users').subscribe({ error: () => {} });

            httpMock.expectOne('/api/admin/users').flush(
                { message: 'Forbidden' },
                { status: 403, statusText: 'Forbidden' },
            );

            expect(routerMock.navigate).not.toHaveBeenCalled();
        });

        it('should propagate 403 error to subscriber', () => {
            authServiceMock.getToken.mockReturnValue('valid-token');
            let receivedError: any;

            http.get('/api/admin/users').subscribe({
                error: (err) => { receivedError = err; },
            });

            httpMock.expectOne('/api/admin/users').flush(
                { message: 'Forbidden' },
                { status: 403, statusText: 'Forbidden' },
            );

            expect(receivedError).toBeTruthy();
            expect(receivedError.status).toBe(403);
        });
    });
});
