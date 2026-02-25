import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { EuiGrowlService } from '@eui/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { PermissionService } from './permission.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const growlService = inject(EuiGrowlService);
    const permissionService = inject(PermissionService);

    // Don't attach token to login requests — login is public
    if (req.url.includes('/api/auth/login')) {
        return next(req);
    }

    // Attach Bearer token if available
    const token = authService.getToken();
    if (token) {
        req = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
        });
    }

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                localStorage.removeItem('auth_token');
                authService.isAuthenticated$.next(false);
                growlService.growl({
                    severity: 'warning',
                    summary: 'Session expired',
                    detail: 'Your session has expired. Please sign in again.',
                });
                router.navigate(['/login']);
            }

            if (error.status === 403) {
                permissionService.showAccessDenied(
                    error.error?.message || 'You do not have permission to perform this action.',
                );
            }

            return throwError(() => error);
        }),
    );
};
