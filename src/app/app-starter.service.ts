import { inject, Injectable } from '@angular/core';
import {
    UserService,
    I18nService,
    UserDetails,
    UserPreferences,
    EuiServiceStatus,
} from '@eui/core';
import { catchError, map, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './core/auth';

@Injectable({
    providedIn: 'root',
})
export class AppStarterService {
    defaultUserPreferences: UserPreferences | undefined;
    private readonly userService = inject(UserService);
    private readonly i18nService = inject(I18nService);
    private readonly authService = inject(AuthService);

    start(): Observable<EuiServiceStatus> {
        return this.initUserService().pipe(
            switchMap(() => this.i18nService.init()),
        );
    }

    initUserService(): Observable<EuiServiceStatus> {
        return this.fetchUserDetails().pipe(
            switchMap((userDetails) => this.userService.init(userDetails))
        );
    }

    private fetchUserDetails(): Observable<UserDetails> {
        const anonymousUser: UserDetails = {
            userId: 'anonymous',
            firstName: 'Guest',
            lastName: '',
            fullName: 'Guest',
        };

        if (!this.authService.isAuthenticated()) {
            return of(anonymousUser);
        }

        return this.authService.getCurrentUser().pipe(
            map(profile => ({
                userId: profile.userId,
                firstName: profile.firstName,
                lastName: profile.lastName,
                fullName: `${profile.firstName} ${profile.lastName}`,
            })),
            catchError(() => of(anonymousUser)),
        );
    }
}
