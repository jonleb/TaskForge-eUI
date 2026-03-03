export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    user: UserProfile;
}

export interface UserProfile {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export interface TokenPayload {
    userId: string;
    role: string;
    exp: number;
}

export type GlobalRole = 'SUPER_ADMIN' | 'USER';
export type ProjectRole = 'PROJECT_ADMIN' | 'PRODUCT_OWNER' | 'DEVELOPER' | 'REPORTER' | 'VIEWER';

export interface ProjectMembership {
    projectId: string;
    projectKey: string;
    role: ProjectRole;
}
