import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project, ProjectMember, CreateProjectPayload, UpdateProjectPayload, UserInfo, ProjectListParams, ProjectListResponse, UpsertMemberPayload, MemberCandidate, Workflow, BacklogItem, CreateTicketPayload, BacklogListParams, BacklogListResponse, UpdateTicketPayload, TicketComment, ActivityEntry, UpdateWorkflowPayload, LinkType, TicketLink, CreateTicketLinkPayload, ReorderPayload, Sprint, CreateSprintPayload, UpdateSprintPayload, SprintStatusPayload, SprintItemsPayload } from './project.models';

@Injectable({ providedIn: 'root' })
export class ProjectService {
    private readonly http = inject(HttpClient);

    getProjects(params?: ProjectListParams): Observable<ProjectListResponse> {
        let httpParams = new HttpParams();
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    httpParams = httpParams.set(key, String(value));
                }
            });
        }
        return this.http.get<ProjectListResponse>('/api/projects', { params: httpParams });
    }

    getProject(projectId: string): Observable<Project> {
        return this.http.get<Project>(`/api/projects/${projectId}`);
    }

    getProjectMembers(projectId: string): Observable<ProjectMember[]> {
        return this.http.get<ProjectMember[]>(`/api/projects/${projectId}/members`);
    }

    createProject(payload: CreateProjectPayload): Observable<Project> {
        return this.http.post<Project>('/api/projects', payload);
    }

    updateProject(projectId: string, payload: UpdateProjectPayload): Observable<Project> {
        return this.http.patch<Project>(`/api/projects/${projectId}`, payload);
    }

    getUser(userId: string): Observable<UserInfo> {
        return this.http.get<UserInfo>(`/api/users/${userId}`);
    }

    upsertMember(projectId: string, payload: UpsertMemberPayload): Observable<ProjectMember> {
        return this.http.put<ProjectMember>(`/api/projects/${projectId}/members`, payload);
    }

    removeMember(projectId: string, userId: string): Observable<void> {
        return this.http.delete<void>(`/api/projects/${projectId}/members/${userId}`);
    }

    searchCandidates(projectId: string, query: string): Observable<MemberCandidate[]> {
        const params = new HttpParams().set('q', query);
        return this.http.get<MemberCandidate[]>(`/api/projects/${projectId}/members/candidates`, { params });
    }

    getWorkflows(projectId: string): Observable<Workflow[]> {
        return this.http.get<Workflow[]>(`/api/projects/${projectId}/workflows`);
    }

    updateWorkflow(projectId: string, workflowId: string, payload: UpdateWorkflowPayload): Observable<Workflow> {
        return this.http.put<Workflow>(`/api/projects/${projectId}/workflows/${workflowId}`, payload);
    }

    getBacklog(projectId: string, params?: BacklogListParams): Observable<BacklogListResponse> {
        let httpParams = new HttpParams();
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    httpParams = httpParams.set(key, String(value));
                }
            });
        }
        return this.http.get<BacklogListResponse>(`/api/projects/${projectId}/backlog`, { params: httpParams });
    }

    createTicket(projectId: string, payload: CreateTicketPayload): Observable<BacklogItem> {
        return this.http.post<BacklogItem>(`/api/projects/${projectId}/backlog`, payload);
    }

    getEpics(projectId: string): Observable<BacklogItem[]> {
        return this.getBacklog(projectId, { type: 'EPIC', _limit: 100 }).pipe(
            map(res => res.data),
        );
    }

    getTicket(projectId: string, ticketNumber: number): Observable<BacklogItem> {
        return this.http.get<BacklogItem>(`/api/projects/${projectId}/backlog/${ticketNumber}`);
    }

    updateTicket(projectId: string, ticketNumber: number, payload: UpdateTicketPayload): Observable<BacklogItem> {
        return this.http.patch<BacklogItem>(`/api/projects/${projectId}/backlog/${ticketNumber}`, payload);
    }

    getComments(projectId: string, ticketNumber: number): Observable<TicketComment[]> {
        return this.http.get<TicketComment[]>(`/api/projects/${projectId}/backlog/${ticketNumber}/comments`);
    }

    addComment(projectId: string, ticketNumber: number, content: string): Observable<TicketComment> {
        return this.http.post<TicketComment>(`/api/projects/${projectId}/backlog/${ticketNumber}/comments`, { content });
    }

    getActivity(projectId: string, ticketNumber: number): Observable<ActivityEntry[]> {
        return this.http.get<ActivityEntry[]>(`/api/projects/${projectId}/backlog/${ticketNumber}/activity`);
    }

    getLinkTypes(): Observable<LinkType[]> {
        return this.http.get<LinkType[]>('/api/link-types');
    }

    getTicketLinks(projectId: string, ticketNumber: number): Observable<TicketLink[]> {
        return this.http.get<TicketLink[]>(`/api/projects/${projectId}/backlog/${ticketNumber}/links`);
    }

    createTicketLink(projectId: string, ticketNumber: number, payload: CreateTicketLinkPayload): Observable<TicketLink> {
        return this.http.post<TicketLink>(`/api/projects/${projectId}/backlog/${ticketNumber}/links`, payload);
    }

    deleteTicketLink(projectId: string, ticketNumber: number, linkId: string): Observable<void> {
        return this.http.delete<void>(`/api/projects/${projectId}/backlog/${ticketNumber}/links/${linkId}`);
    }

    reorderBacklog(projectId: string, payload: ReorderPayload): Observable<{ updated: number }> {
        return this.http.put<{ updated: number }>(`/api/projects/${projectId}/backlog/reorder`, payload);
    }


    getSprints(projectId: string, status?: string): Observable<Sprint[]> {
        let params = new HttpParams();
        if (status) {
            params = params.set('status', status);
        }
        return this.http.get<Sprint[]>(`/api/projects/${projectId}/sprints`, { params });
    }

    createSprint(projectId: string, payload: CreateSprintPayload): Observable<Sprint> {
        return this.http.post<Sprint>(`/api/projects/${projectId}/sprints`, payload);
    }

    updateSprint(projectId: string, sprintId: string, payload: UpdateSprintPayload): Observable<Sprint> {
        return this.http.patch<Sprint>(`/api/projects/${projectId}/sprints/${sprintId}`, payload);
    }

    updateSprintStatus(projectId: string, sprintId: string, payload: SprintStatusPayload): Observable<Sprint> {
        return this.http.patch<Sprint>(`/api/projects/${projectId}/sprints/${sprintId}/status`, payload);
    }

    assignSprintItems(projectId: string, sprintId: string, payload: SprintItemsPayload): Observable<{ assigned: number }> {
        return this.http.put<{ assigned: number }>(`/api/projects/${projectId}/sprints/${sprintId}/items`, payload);
    }

    removeSprintItem(projectId: string, sprintId: string, ticketNumber: number): Observable<{ removed: boolean }> {
        return this.http.delete<{ removed: boolean }>(`/api/projects/${projectId}/sprints/${sprintId}/items/${ticketNumber}`);
    }

}
