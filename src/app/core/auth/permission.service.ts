import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EuiGrowlService } from '@eui/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GlobalRole, ProjectRole, UserProfile } from './auth.models';

interface ProjectMemberResponse {
    userId: string;
    role: string;
}

@Injectable({ providedIn: 'root' })
export class PermissionService {
    private readonly http = inject(HttpClient);
    private readonly growlService = inject(EuiGrowlService);
    private readonly translate = inject(TranslateService);

    private globalRole: GlobalRole = 'USER';
    private originalRole = '';
    private userId = '';

    setUser(profile: UserProfile): void {
        this.userId = profile.userId;
        this.originalRole = profile.role;
        this.globalRole = profile.role === 'SUPER_ADMIN' ? 'SUPER_ADMIN' : 'USER';
    }

    isSuperAdmin(): boolean {
        return this.globalRole === 'SUPER_ADMIN';
    }

    hasGlobalRole(...roles: GlobalRole[]): boolean {
        return roles.includes(this.globalRole);
    }

    hasProjectRole(projectId: string, ...roles: ProjectRole[]): Observable<boolean> {
        if (this.isSuperAdmin()) {
            return of(true);
        }

        return this.http.get<ProjectMemberResponse[]>(`/api/projects/${projectId}/members`).pipe(
            map(members => {
                const member = members.find(m => m.userId === this.userId);
                return !!member && roles.includes(member.role as ProjectRole);
            }),
            catchError(() => of(false)),
        );
    }

    getGlobalRole(): GlobalRole {
        return this.globalRole;
    }

    getOriginalRole(): string {
        return this.originalRole;
    }

    getUserId(): string {
        return this.userId;
    }

    showAccessDenied(message?: string): void {
        this.growlService.growl({
            severity: 'warning',
            summary: this.translate.instant('auth.access-denied-summary'),
            detail: message || this.translate.instant('auth.access-denied-action'),
        });
    }

    clear(): void {
        this.globalRole = 'USER';
        this.originalRole = '';
        this.userId = '';
    }
}
