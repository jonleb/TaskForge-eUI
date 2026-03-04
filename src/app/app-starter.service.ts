import { inject, Injectable } from '@angular/core';
import {
    UserService,
    I18nService,
    UserDetails,
    UserPreferences,
    EuiServiceStatus,
} from '@eui/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, PermissionService } from './core/auth';
import { ProjectContextService } from './core/project';

const LANG_STORAGE_KEY = 'taskforge_lang';

@Injectable({
    providedIn: 'root',
})
export class AppStarterService {
    defaultUserPreferences: UserPreferences | undefined;
    private readonly userService = inject(UserService);
    private readonly i18nService = inject(I18nService);
    private readonly authService = inject(AuthService);
    private readonly permissionService = inject(PermissionService);
    private readonly projectContext = inject(ProjectContextService);
    private readonly translate = inject(TranslateService);

    start(): Observable<EuiServiceStatus> {
        return this.initUserService().pipe(
            switchMap(() => this.i18nService.init()),
            tap(() => this.restoreLanguage()),
            switchMap(status => this.projectContext.restoreProject().pipe(map(() => status))),
        );
    }

    private restoreLanguage(): void {
        const savedLang = localStorage.getItem(LANG_STORAGE_KEY);
        if (savedLang && savedLang !== this.translate.currentLang) {
            this.translate.use(savedLang);
        }
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
            map(profile => {
                this.permissionService.setUser(profile);
                return {
                    userId: profile.userId,
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    fullName: `${profile.firstName} ${profile.lastName}`,
                };
            }),
            catchError(() => of(anonymousUser)),
        );
    }
}
