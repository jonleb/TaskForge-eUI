import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { describe, it, beforeEach, afterEach, expect } from 'vitest';
import { ProjectService } from './project.service';
import { Project, ProjectMember, ProjectListResponse } from './project.models';

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

const mockMember: ProjectMember = {
    id: '1',
    userId: '2',
    role: 'PROJECT_ADMIN',
    joined_at: '2025-01-20T09:00:00.000Z',
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob.smith@taskforge.local',
};

const mockListResponse: ProjectListResponse = {
    data: [mockProject],
    total: 1,
    page: 1,
    limit: 10,
};

describe('ProjectService', () => {
    let service: ProjectService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
                ProjectService,
            ],
        });

        service = TestBed.inject(ProjectService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getProjects()', () => {
        it('should GET /api/projects and return ProjectListResponse', () => {
            service.getProjects().subscribe(res => {
                expect(res.data).toEqual([mockProject]);
                expect(res.total).toBe(1);
                expect(res.page).toBe(1);
                expect(res.limit).toBe(10);
            });

            const req = httpMock.expectOne('/api/projects');
            expect(req.request.method).toBe('GET');
            req.flush(mockListResponse);
        });

        it('should pass query params when provided', () => {
            service.getProjects({ _page: 2, _limit: 25, _sort: 'key', _order: 'desc' }).subscribe(res => {
                expect(res.data).toEqual([mockProject]);
            });

            const req = httpMock.expectOne(r => r.url === '/api/projects');
            expect(req.request.params.get('_page')).toBe('2');
            expect(req.request.params.get('_limit')).toBe('25');
            expect(req.request.params.get('_sort')).toBe('key');
            expect(req.request.params.get('_order')).toBe('desc');
            req.flush(mockListResponse);
        });

        it('should pass search and filter params', () => {
            service.getProjects({ q: 'task', is_active: 'true' }).subscribe();

            const req = httpMock.expectOne(r => r.url === '/api/projects');
            expect(req.request.params.get('q')).toBe('task');
            expect(req.request.params.get('is_active')).toBe('true');
            req.flush(mockListResponse);
        });

        it('should omit undefined params', () => {
            service.getProjects({ _page: 1 }).subscribe();

            const req = httpMock.expectOne(r => r.url === '/api/projects');
            expect(req.request.params.get('_page')).toBe('1');
            expect(req.request.params.has('q')).toBe(false);
            expect(req.request.params.has('is_active')).toBe(false);
            req.flush(mockListResponse);
        });

        it('should return empty response', () => {
            const emptyResponse: ProjectListResponse = { data: [], total: 0, page: 1, limit: 10 };

            service.getProjects().subscribe(res => {
                expect(res.data).toEqual([]);
                expect(res.total).toBe(0);
            });

            const req = httpMock.expectOne('/api/projects');
            req.flush(emptyResponse);
        });
    });

    describe('getProject()', () => {
        it('should GET /api/projects/:projectId and return typed object', () => {
            service.getProject('1').subscribe(project => {
                expect(project).toEqual(mockProject);
                expect(project.name).toBe('TaskForge Core');
            });

            const req = httpMock.expectOne('/api/projects/1');
            expect(req.request.method).toBe('GET');
            req.flush(mockProject);
        });

        it('should propagate 404 errors', () => {
            service.getProject('999').subscribe({
                error: err => {
                    expect(err.status).toBe(404);
                },
            });

            const req = httpMock.expectOne('/api/projects/999');
            req.flush({ message: 'Project not found' }, { status: 404, statusText: 'Not Found' });
        });

        it('should propagate 403 errors', () => {
            service.getProject('3').subscribe({
                error: err => {
                    expect(err.status).toBe(403);
                },
            });

            const req = httpMock.expectOne('/api/projects/3');
            req.flush({ message: 'Forbidden' }, { status: 403, statusText: 'Forbidden' });
        });
    });

    describe('getProjectMembers()', () => {
        it('should GET /api/projects/:projectId/members and return enriched members', () => {
            const mockMembers: ProjectMember[] = [mockMember];

            service.getProjectMembers('1').subscribe(members => {
                expect(members).toEqual(mockMembers);
                expect(members[0].firstName).toBe('Bob');
                expect(members[0].role).toBe('PROJECT_ADMIN');
            });

            const req = httpMock.expectOne('/api/projects/1/members');
            expect(req.request.method).toBe('GET');
            req.flush(mockMembers);
        });

        it('should return empty array when project has no members', () => {
            service.getProjectMembers('2').subscribe(members => {
                expect(members).toEqual([]);
            });

            const req = httpMock.expectOne('/api/projects/2/members');
            req.flush([]);
        });
    });

    describe('createProject()', () => {
        it('should POST /api/projects with correct payload', () => {
            const payload = { name: 'New Project', description: 'Desc', key: 'NP' };

            service.createProject(payload).subscribe(project => {
                expect(project.key).toBe('NP');
                expect(project.name).toBe('New Project');
            });

            const req = httpMock.expectOne('/api/projects');
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual(payload);
            req.flush({ ...mockProject, id: '4', key: 'NP', name: 'New Project' });
        });

        it('should send payload without key when key is omitted', () => {
            const payload = { name: 'Auto Key Project' };

            service.createProject(payload).subscribe(project => {
                expect(project.name).toBe('Auto Key Project');
            });

            const req = httpMock.expectOne('/api/projects');
            expect(req.request.body).toEqual({ name: 'Auto Key Project' });
            req.flush({ ...mockProject, id: '5', key: 'AKP', name: 'Auto Key Project' });
        });
    });
});
