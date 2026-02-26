import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project, ProjectMember, CreateProjectPayload, ProjectListParams, ProjectListResponse } from './project.models';

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
}
