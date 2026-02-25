import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    AdminUser,
    AdminUserListParams,
    AdminUserListResponse,
    CreateUserRequest,
    CreateUserResponse,
    ResetPasswordResponse,
} from './admin-user.models';

@Injectable({ providedIn: 'root' })
export class AdminUserService {
    private static readonly BASE_URL = '/api/admin/users';

    private readonly http = inject(HttpClient);

    getUsers(params: AdminUserListParams = {}): Observable<AdminUserListResponse> {
        let httpParams = new HttpParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                httpParams = httpParams.set(key, String(value));
            }
        });
        return this.http.get<AdminUserListResponse>(AdminUserService.BASE_URL, { params: httpParams });
    }

    getUser(userId: string): Observable<AdminUser> {
        return this.http.get<AdminUser>(`${AdminUserService.BASE_URL}/${userId}`);
    }

    createUser(data: CreateUserRequest): Observable<CreateUserResponse> {
        return this.http.post<CreateUserResponse>(AdminUserService.BASE_URL, data);
    }

    resetPassword(userId: string): Observable<ResetPasswordResponse> {
        return this.http.post<ResetPasswordResponse>(
            `${AdminUserService.BASE_URL}/${userId}/reset-password`,
            {},
        );
    }

    deactivateUser(userId: string): Observable<AdminUser> {
        return this.http.patch<AdminUser>(
            `${AdminUserService.BASE_URL}/${userId}/deactivate`,
            {},
        );
    }

    reactivateUser(userId: string): Observable<AdminUser> {
        return this.http.patch<AdminUser>(
            `${AdminUserService.BASE_URL}/${userId}/reactivate`,
            {},
        );
    }
}
