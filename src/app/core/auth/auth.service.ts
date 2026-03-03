import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { LoginResponse, UserProfile, TokenPayload } from './auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private static readonly TOKEN_KEY = 'auth_token';
    private static readonly LOGIN_URL = '/api/auth/login';
    private static readonly LOGOUT_URL = '/api/auth/logout';
    private static readonly ME_URL = '/api/auth/me';

    private readonly http = inject(HttpClient);

    isAuthenticated$ = new BehaviorSubject<boolean>(this.isAuthenticated());

    login(username: string, password: string): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(AuthService.LOGIN_URL, { username, password }).pipe(
            tap(response => {
                localStorage.setItem(AuthService.TOKEN_KEY, response.accessToken);
                this.isAuthenticated$.next(true);
            }),
        );
    }

    logout(): Observable<void> {
        return this.http.post<void>(AuthService.LOGOUT_URL, {}).pipe(
            catchError(() => of(undefined as unknown as void)),
            finalize(() => {
                localStorage.removeItem(AuthService.TOKEN_KEY);
                this.isAuthenticated$.next(false);
            }),
        );
    }

    getToken(): string | null {
        return localStorage.getItem(AuthService.TOKEN_KEY);
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) return false;

        try {
            const payload: TokenPayload = JSON.parse(atob(token));
            return payload.exp > Date.now();
        } catch {
            return false;
        }
    }

    getCurrentUser(): Observable<UserProfile> {
        return this.http.get<UserProfile>(AuthService.ME_URL);
    }
}
