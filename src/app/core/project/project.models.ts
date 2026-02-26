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
