import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { authGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('authGuard', () => {
    let authServiceMock: { isAuthenticated: ReturnType<typeof vi.fn> };

    const mockRoute = {} as ActivatedRouteSnapshot;
    const mockState = {} as RouterStateSnapshot;

    beforeEach(() => {
        authServiceMock = {
            isAuthenticated: vi.fn(),
        };

        TestBed.configureTestingModule({
            providers: [
                { provide: AuthService, useValue: authServiceMock },
            ],
        });
    });

    it('should return true when user is authenticated', () => {
        authServiceMock.isAuthenticated.mockReturnValue(true);

        const result = TestBed.runInInjectionContext(() => authGuard(mockRoute, mockState));

        expect(result).toBe(true);
    });

    it('should return UrlTree to /login when user is not authenticated', () => {
        authServiceMock.isAuthenticated.mockReturnValue(false);

        const result = TestBed.runInInjectionContext(() => authGuard(mockRoute, mockState));

        expect(result).toBeInstanceOf(UrlTree);
        expect((result as UrlTree).toString()).toBe('/login');
    });
});
