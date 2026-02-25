export type UserRole = 'SUPER_ADMIN' | 'PROJECT_ADMIN' | 'PRODUCT_OWNER' | 'DEVELOPER' | 'REPORTER' | 'VIEWER';

export interface AdminUser {
    id: string;
    username: string;
    email: string;
    role: UserRole;
    global_role: string;
    firstName: string;
    lastName: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface AdminUserListParams {
    _page?: number;
    _limit?: number;
    _sort?: string;
    _order?: 'asc' | 'desc';
    q?: string;
    is_active?: 'true' | 'false';
}

export interface AdminUserListResponse {
    data: AdminUser[];
    total: number;
    page: number;
    limit: number;
}

export interface CreateUserRequest {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
}

export interface CreateUserResponse {
    user: AdminUser;
    temporaryPassword: string;
}

export interface ResetPasswordResponse {
    temporaryPassword: string;
}
