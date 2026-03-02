import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BacklogListResponse, Project } from '../project/project.models';
import { TicketsListParams } from './tickets.models';

@Injectable({ providedIn: 'root' })
export class TicketsService {
    private readonly http = inject(HttpClient);

    getTickets(params?: TicketsListParams): Observable<BacklogListResponse> {
        let httpParams = new HttpParams();
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    httpParams = httpParams.set(key, String(value));
                }
            });
        }
        return this.http.get<BacklogListResponse>('/api/tickets', { params: httpParams });
    }

    getUserProjects(): Observable<Project[]> {
        return this.http.get<Project[]>('/api/user/projects');
    }
}
