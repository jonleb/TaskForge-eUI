export interface TicketsListParams {
    project_id?: string;
    assignee_id?: string;
    sprint_id?: string;
    q?: string;
    type?: string;
    status?: string;
    priority?: string;
    _sort?: string;
    _order?: 'asc' | 'desc';
    _page?: number;
    _limit?: number;
}
