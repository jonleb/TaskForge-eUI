import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { describe, it, beforeEach, afterEach, expect } from 'vitest';
import { AuthService } from './auth.service';
import { LoginResponse } from './auth.models';
import { TranslateTestingModule } from '../../testing/test-providers';

describe('AuthService', () => {
    let service: AuthService;
    let httpMock: HttpTestingController;

    const mockLoginResponse: LoginResponse = {
        accessToken: btoa(JSON.stringify({ userId: '1', role: 'SUPER_ADMIN', exp: Date.now() + 3600000 })),
        user: {
            userId: '1',
            firstName: 'Super',
            lastName: 'Admin',
            email: 'superadmin@taskforge.local',
            role: 'SUPER_ADMIN',
        },
    };

    beforeEach(() => {
        localStorage.clear();

        TestBed.configureTestingModule({
            imports: [TranslateTestingModule],
            providers: [
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
                AuthService,
            ],
        });

        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
        localStorage.clear();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('login()', () => {
        it('should POST to /api/auth/login and store token in localStorage', () => {
            service.login('superadmin', 'SecurePassword!123').subscribe();

            const req = httpMock.expectOne('/api/auth/login');
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual({ username: 'superadmin', password: 'SecurePassword!123' });
            req.flush(mockLoginResponse);

            expect(localStorage.getItem('auth_token')).toBe(mockLoginResponse.accessToken);
        });

        it('should update isAuthenticated$ to true on success', () => {
            let authState = false;
            service.isAuthenticated$.subscribe(val => authState = val);

            service.login('superadmin', 'SecurePassword!123').subscribe();
            httpMock.expectOne('/api/auth/login').flush(mockLoginResponse);

            expect(authState).toBe(true);
        });

        it('should return user data from response', () => {
            let response: LoginResponse | undefined;
            service.login('superadmin', 'SecurePassword!123').subscribe(res => response = res);
            httpMock.expectOne('/api/auth/login').flush(mockLoginResponse);

            expect(response?.user.role).toBe('SUPER_ADMIN');
            expect(response?.user.firstName).toBe('Super');
            expect(response?.accessToken).toBeDefined();
        });
    });

    describe('logout()', () => {
        it('should POST to /api/auth/logout', () => {
            service.logout().subscribe();

            const req = httpMock.expectOne('/api/auth/logout');
            expect(req.request.method).toBe('POST');
            req.flush(null);
        });

        it('should remove token from localStorage', () => {
            localStorage.setItem('auth_token', 'some-token');
            service.logout().subscribe();
            httpMock.expectOne('/api/auth/logout').flush(null);

            expect(localStorage.getItem('auth_token')).toBeNull();
        });

        it('should update isAuthenticated$ to false', () => {
            let authState = true;
            service.isAuthenticated$.subscribe(val => authState = val);

            service.logout().subscribe();
            httpMock.expectOne('/api/auth/logout').flush(null);

            expect(authState).toBe(false);
        });

        it('should clear token even when API call fails', () => {
            localStorage.setItem('auth_token', 'some-token');
            let authState = true;
            service.isAuthenticated$.subscribe(val => authState = val);

            service.logout().subscribe();
            httpMock.expectOne('/api/auth/logout').error(new ProgressEvent('Network error'));

            expect(localStorage.getItem('auth_token')).toBeNull();
            expect(authState).toBe(false);
        });
    });

    describe('getToken()', () => {
        it('should return token from localStorage', () => {
            localStorage.setItem('auth_token', 'my-token');
            expect(service.getToken()).toBe('my-token');
        });

        it('should return null when no token exists', () => {
            expect(service.getToken()).toBeNull();
        });
    });

    describe('isAuthenticated()', () => {
        it('should return true for valid non-expired token', () => {
            const token = btoa(JSON.stringify({ userId: '1', role: 'SUPER_ADMIN', exp: Date.now() + 3600000 }));
            localStorage.setItem('auth_token', token);
            expect(service.isAuthenticated()).toBe(true);
        });

        it('should return false for expired token', () => {
            const token = btoa(JSON.stringify({ userId: '1', role: 'SUPER_ADMIN', exp: Date.now() - 1000 }));
            localStorage.setItem('auth_token', token);
            expect(service.isAuthenticated()).toBe(false);
        });

        it('should return false when no token exists', () => {
            expect(service.isAuthenticated()).toBe(false);
        });

        it('should return false for malformed token', () => {
            localStorage.setItem('auth_token', 'not-valid-base64-json');
            expect(service.isAuthenticated()).toBe(false);
        });
    });

    describe('getCurrentUser()', () => {
        it('should GET /api/auth/me', () => {
            const mockProfile = {
                userId: '1',
                firstName: 'Super',
                lastName: 'Admin',
                email: 'superadmin@taskforge.local',
                role: 'SUPER_ADMIN',
            };

            service.getCurrentUser().subscribe(user => {
                expect(user).toEqual(mockProfile);
            });

            const req = httpMock.expectOne('/api/auth/me');
            expect(req.request.method).toBe('GET');
            req.flush(mockProfile);
        });
    });
});
