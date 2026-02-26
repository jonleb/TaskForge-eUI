import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { describe, it, beforeEach, afterEach, expect } from 'vitest';
import { ProjectService } from './project.service';
import { Project, ProjectMember } from './project.models';

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
        it('should GET /api/projects and return typed array', () => {
            const mockProjects: Project[] = [mockProject];

            service.getProjects().subscribe(projects => {
                expect(projects).toEqual(mockProjects);
                expect(projects.length).toBe(1);
                expect(projects[0].key).toBe('TF');
            });

            const req = httpMock.expectOne('/api/projects');
            expect(req.request.method).toBe('GET');
            req.flush(mockProjects);
        });

        it('should return empty array when no projects', () => {
            service.getProjects().subscribe(projects => {
                expect(projects).toEqual([]);
            });

            const req = httpMock.expectOne('/api/projects');
            req.flush([]);
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
});
