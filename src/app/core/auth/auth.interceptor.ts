import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { EuiGrowlService } from '@eui/core';
import { catchError, throwError } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth.service';
import { PermissionService } from './permission.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const growlService = inject(EuiGrowlService);
    const permissionService = inject(PermissionService);
    const translate = inject(TranslateService);

    const isLoginRequest = req.url.includes('/api/auth/login');

    // Don't attach token to login requests — login is public
    if (!isLoginRequest) {
        const token = authService.getToken();
        if (token) {
            req = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` },
            });
        }
    }

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            // Login errors are handled by the login component — skip interceptor handling
            if (isLoginRequest) {
                return throwError(() => error);
            }

            if (error.status === 401) {
                localStorage.removeItem('auth_token');
                authService.isAuthenticated$.next(false);
                growlService.growl({
                    severity: 'warning',
                    summary: translate.instant('auth.session-expired-summary'),
                    detail: translate.instant('auth.session-expired-detail'),
                });
                router.navigate(['/login']);
            }

            if (error.status === 403) {
                permissionService.showAccessDenied(
                    error.error?.message || translate.instant('auth.access-denied-action'),
                );
            }

            return throwError(() => error);
        }),
    );
};
