export interface Project {
    id: string;
    key: string;
    name: string;
    description: string;
    created_by: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
}

export interface ProjectMember {
    id: string;
    userId: string;
    role: string;
    joined_at: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface CreateProjectPayload {
    name: string;
    description?: string;
    key?: string;
}

export interface UpdateProjectPayload {
    name?: string;
    description?: string;
}

export interface UserInfo {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface ProjectListParams {
    _page?: number;
    _limit?: number;
    _sort?: string;
    _order?: 'asc' | 'desc';
    q?: string;
    is_active?: 'true' | 'false';
}

export interface ProjectListResponse {
    data: Project[];
    total: number;
    page: number;
    limit: number;
}
