import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest';
import { ProjectContextService } from './project-context.service';
import { ProjectService } from './project.service';
import { Project } from './project.models';

const mockProject: Project = {
    id: '1',
    key: 'TF',
    name: 'TaskForge Core',
    description: 'Main product',
    created_by: '1',
    created_at: '2025-01-20T09:00:00.000Z',
    updated_at: '2025-06-01T10:00:00.000Z',
    is_active: true,
};

describe('ProjectContextService', () => {
    let service: ProjectContextService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        sessionStorage.clear();

        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
                ProjectService,
                ProjectContextService,
            ],
        });

        service = TestBed.inject(ProjectContextService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
        sessionStorage.clear();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // ─── setProject() ────────────────────────────────────────────────

    describe('setProject()', () => {
        it('should update currentProject$ and persist to sessionStorage', () => {
            service.setProject(mockProject);

            expect(service.getCurrentProject()).toEqual(mockProject);
            expect(service.getProjectId()).toBe('1');
            expect(sessionStorage.getItem('selectedProjectId')).toBe('1');
        });

        it('should emit the project on currentProject$', () => {
            const emitted: (Project | null)[] = [];
            service.currentProject$.subscribe(p => emitted.push(p));

            service.setProject(mockProject);

            expect(emitted).toEqual([null, mockProject]);
        });
    });

    // ─── clearProject() ──────────────────────────────────────────────

    describe('clearProject()', () => {
        it('should reset state and remove from sessionStorage', () => {
            service.setProject(mockProject);
            service.clearProject();

            expect(service.getCurrentProject()).toBeNull();
            expect(service.getProjectId()).toBeNull();
            expect(sessionStorage.getItem('selectedProjectId')).toBeNull();
        });

        it('should be a no-op when no project is active', () => {
            service.clearProject();

            expect(service.getCurrentProject()).toBeNull();
            expect(sessionStorage.getItem('selectedProjectId')).toBeNull();
        });
    });

    // ─── getProjectId() / getCurrentProject() ────────────────────────

    describe('synchronous accessors', () => {
        it('should return null when no project is set', () => {
            expect(service.getProjectId()).toBeNull();
            expect(service.getCurrentProject()).toBeNull();
        });

        it('should return current values after setProject()', () => {
            service.setProject(mockProject);

            expect(service.getProjectId()).toBe('1');
            expect(service.getCurrentProject()?.name).toBe('TaskForge Core');
        });
    });

    // ─── restoreProject() ────────────────────────────────────────────

    describe('restoreProject()', () => {
        it('should return null when no stored ID in sessionStorage', () => {
            let result: Project | null = undefined as any;
            service.restoreProject().subscribe(p => result = p);

            expect(result).toBeNull();
            expect(service.getCurrentProject()).toBeNull();
        });

        it('should fetch and set project when valid ID is stored', () => {
            sessionStorage.setItem('selectedProjectId', '1');

            let result: Project | null = undefined as any;
            service.restoreProject().subscribe(p => result = p);

            const req = httpMock.expectOne('/api/projects/1');
            expect(req.request.method).toBe('GET');
            req.flush(mockProject);

            expect(result).toEqual(mockProject);
            expect(service.getCurrentProject()).toEqual(mockProject);
            expect(service.getProjectId()).toBe('1');
        });

        it('should clear storage and return null on 404', () => {
            sessionStorage.setItem('selectedProjectId', '999');

            let result: Project | null = undefined as any;
            service.restoreProject().subscribe(p => result = p);

            const req = httpMock.expectOne('/api/projects/999');
            req.flush({ message: 'Not found' }, { status: 404, statusText: 'Not Found' });

            expect(result).toBeNull();
            expect(service.getCurrentProject()).toBeNull();
            expect(sessionStorage.getItem('selectedProjectId')).toBeNull();
        });

        it('should clear storage and return null on 403', () => {
            sessionStorage.setItem('selectedProjectId', '3');

            let result: Project | null = undefined as any;
            service.restoreProject().subscribe(p => result = p);

            const req = httpMock.expectOne('/api/projects/3');
            req.flush({ message: 'Forbidden' }, { status: 403, statusText: 'Forbidden' });

            expect(result).toBeNull();
            expect(service.getCurrentProject()).toBeNull();
            expect(sessionStorage.getItem('selectedProjectId')).toBeNull();
        });
    });
});
