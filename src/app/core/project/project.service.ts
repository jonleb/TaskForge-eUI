import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project, ProjectMember, CreateProjectPayload, UpdateProjectPayload, UserInfo, ProjectListParams, ProjectListResponse, UpsertMemberPayload, MemberCandidate, Workflow, BacklogItem, TicketType } from './project.models';

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

    getBacklog(projectId: string, type?: TicketType): Observable<BacklogItem[]> {
        let params = new HttpParams();
        if (type) {
            params = params.set('type', type);
        }
        return this.http.get<BacklogItem[]>(`/api/projects/${projectId}/backlog`, { params });
    }
}
