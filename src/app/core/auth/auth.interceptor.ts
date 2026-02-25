import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const authService = inject(AuthService);
    const router = inject(Router);

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
                router.navigate(['/login']);
            }
            return throwError(() => error);
        }),
    );
};
