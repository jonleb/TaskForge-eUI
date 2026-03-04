import { Injectable, inject, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subscription, timer } from 'rxjs';
import { tap, catchError, finalize, switchMap } from 'rxjs/operators';
import { LoginResponse, UserProfile, TokenPayload } from './auth.models';

const TOKEN_KEY = 'auth_token';
const REMEMBER_KEY = 'auth_remember';
const REFRESH_URL = '/api/auth/refresh';
/** Refresh token when less than 5 minutes remain */
const REFRESH_THRESHOLD_MS = 5 * 60 * 1000;
/** Check token expiry every 60 seconds */
const REFRESH_CHECK_INTERVAL_MS = 60 * 1000;

@Injectable({ providedIn: 'root' })
export class AuthService {
    private static readonly LOGIN_URL = '/api/auth/login';
    private static readonly LOGOUT_URL = '/api/auth/logout';
    private static readonly ME_URL = '/api/auth/me';

    private readonly http = inject(HttpClient);
    private readonly zone = inject(NgZone);
    private refreshSub: Subscription | null = null;

    isAuthenticated$ = new BehaviorSubject<boolean>(this.isAuthenticated());

    login(username: string, password: string, rememberMe = false): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(AuthService.LOGIN_URL, { username, password, rememberMe }).pipe(
            tap(response => {
                this.setRememberMe(rememberMe);
                this.storeToken(response.accessToken);
                this.isAuthenticated$.next(true);
                this.startRefreshTimer();
            }),
        );
    }

    logout(): Observable<void> {
        return this.http.post<void>(AuthService.LOGOUT_URL, {}).pipe(
            catchError(() => of(undefined as unknown as void)),
            finalize(() => {
                this.stopRefreshTimer();
                this.clearToken();
                this.isAuthenticated$.next(false);
            }),
        );
    }

    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
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

    /** Start periodic token refresh to prevent mid-session disconnects */
    startRefreshTimer(): void {
        this.stopRefreshTimer();
        // Run timer outside Angular zone to avoid triggering change detection
        this.zone.runOutsideAngular(() => {
            this.refreshSub = timer(REFRESH_CHECK_INTERVAL_MS, REFRESH_CHECK_INTERVAL_MS).pipe(
                switchMap(() => {
                    const token = this.getToken();
                    if (!token) return of(null);

                    try {
                        const payload: TokenPayload = JSON.parse(atob(token));
                        const timeLeft = payload.exp - Date.now();
                        if (timeLeft > 0 && timeLeft < REFRESH_THRESHOLD_MS) {
                            return this.refreshToken();
                        }
                    } catch { /* ignore */ }
                    return of(null);
                }),
            ).subscribe();
        });
    }

    private refreshToken(): Observable<{ accessToken: string } | null> {
        return this.http.post<{ accessToken: string }>(REFRESH_URL, {}).pipe(
            tap(response => {
                if (response?.accessToken) {
                    this.storeToken(response.accessToken);
                }
            }),
            catchError(() => of(null)),
        );
    }

    private stopRefreshTimer(): void {
        this.refreshSub?.unsubscribe();
        this.refreshSub = null;
    }

    private isRememberMe(): boolean {
        return localStorage.getItem(REMEMBER_KEY) === 'true';
    }

    private setRememberMe(value: boolean): void {
        if (value) {
            localStorage.setItem(REMEMBER_KEY, 'true');
        } else {
            localStorage.removeItem(REMEMBER_KEY);
        }
    }

    private storeToken(token: string): void {
        if (this.isRememberMe()) {
            localStorage.setItem(TOKEN_KEY, token);
            sessionStorage.removeItem(TOKEN_KEY);
        } else {
            sessionStorage.setItem(TOKEN_KEY, token);
            localStorage.removeItem(TOKEN_KEY);
        }
    }

    private clearToken(): void {
        localStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REMEMBER_KEY);
    }
}
