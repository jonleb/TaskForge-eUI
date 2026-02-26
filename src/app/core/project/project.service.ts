import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project, ProjectMember, CreateProjectPayload } from './project.models';

@Injectable({ providedIn: 'root' })
export class ProjectService {
    private readonly http = inject(HttpClient);

    getProjects(): Observable<Project[]> {
        return this.http.get<Project[]>('/api/projects');
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
