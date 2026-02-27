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

export interface UpsertMemberPayload {
    userId: string;
    role: string;
}

export interface MemberCandidate {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export const PROJECT_ROLES = [
    'PROJECT_ADMIN',
    'PRODUCT_OWNER',
    'DEVELOPER',
    'REPORTER',
    'VIEWER',
] as const;

export type ProjectRole = typeof PROJECT_ROLES[number];

export type TicketType = 'STORY' | 'BUG' | 'TASK' | 'EPIC';
export type WorkflowStatus = 'TO_DO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';

export interface Workflow {
    id: string;
    projectId: string;
    ticketType: TicketType;
    statuses: WorkflowStatus[];
    transitions: Record<WorkflowStatus, WorkflowStatus[]>;
    created_at: string;
}

export interface BacklogItem {
    id: string;
    projectId: string;
    type: TicketType;
    title: string;
    description: string;
    status: WorkflowStatus;
    priority: TicketPriority | null;
    assignee_id: string | null;
    epic_id: string | null;
    ticket_number: number;
    created_by: string;
    created_at: string;
}

export type TicketPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export const TICKET_PRIORITIES: TicketPriority[] = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

/** Ticket types that can be created by users (excludes EPIC) */
export const CREATABLE_TICKET_TYPES: TicketType[] = ['STORY', 'BUG', 'TASK'];

export interface CreateTicketPayload {
    type: TicketType;
    title: string;
    description?: string;
    priority: TicketPriority;
    assignee_id?: string | null;
    epic_id?: string | null;
}

export const TICKET_TYPES: TicketType[] = ['STORY', 'BUG', 'TASK', 'EPIC'];
export const WORKFLOW_STATUSES: WorkflowStatus[] = ['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'];
