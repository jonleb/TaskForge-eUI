import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ProjectService } from './project.service';
import { Project } from './project.models';

const STORAGE_KEY = 'selectedProjectId';

@Injectable({ providedIn: 'root' })
export class ProjectContextService {
    private readonly projectService = inject(ProjectService);
    private readonly projectSubject = new BehaviorSubject<Project | null>(null);

    readonly currentProject$: Observable<Project | null> = this.projectSubject.asObservable();

    setProject(project: Project): void {
        this.projectSubject.next(project);
        sessionStorage.setItem(STORAGE_KEY, project.id);
    }

    clearProject(): void {
        this.projectSubject.next(null);
        sessionStorage.removeItem(STORAGE_KEY);
    }

    getProjectId(): string | null {
        return this.projectSubject.value?.id ?? null;
    }

    getCurrentProject(): Project | null {
        return this.projectSubject.value;
    }

    restoreProject(): Observable<Project | null> {
        const storedId = sessionStorage.getItem(STORAGE_KEY);
        if (!storedId) {
            return of(null);
        }

        return this.projectService.getProject(storedId).pipe(
            tap(project => this.projectSubject.next(project)),
            catchError(() => {
                sessionStorage.removeItem(STORAGE_KEY);
                this.projectSubject.next(null);
                return of(null);
            }),
        );
    }
}
