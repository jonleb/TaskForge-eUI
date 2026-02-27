import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { describe, it, beforeEach, afterEach, expect } from 'vitest';
import { ProjectService } from './project.service';
import { Project, ProjectMember, ProjectListResponse, UserInfo, MemberCandidate, Workflow, BacklogItem, CreateTicketPayload, BacklogListResponse } from './project.models';

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

    describe('updateProject()', () => {
        it('should PATCH /api/projects/:id with payload and return updated project', () => {
            const payload = { name: 'Updated Name', description: 'New desc' };

            service.updateProject('1', payload).subscribe(project => {
                expect(project.name).toBe('Updated Name');
                expect(project.description).toBe('New desc');
            });

            const req = httpMock.expectOne('/api/projects/1');
            expect(req.request.method).toBe('PATCH');
            expect(req.request.body).toEqual(payload);
            req.flush({ ...mockProject, name: 'Updated Name', description: 'New desc' });
        });
    });

    describe('getUser()', () => {
        it('should GET /api/users/:userId and return UserInfo', () => {
            const mockUser: UserInfo = { id: '1', firstName: 'Super', lastName: 'Admin', email: 'superadmin@taskforge.local' };

            service.getUser('1').subscribe(user => {
                expect(user).toEqual(mockUser);
                expect(user.firstName).toBe('Super');
            });

            const req = httpMock.expectOne('/api/users/1');
            expect(req.request.method).toBe('GET');
            req.flush(mockUser);
        });
    });

    describe('upsertMember()', () => {
        it('should PUT /api/projects/:projectId/members with payload', () => {
            const payload = { userId: '23', role: 'REPORTER' };

            service.upsertMember('1', payload).subscribe(member => {
                expect(member.userId).toBe('23');
                expect(member.role).toBe('REPORTER');
                expect(member.firstName).toBe('Rachel');
            });

            const req = httpMock.expectOne('/api/projects/1/members');
            expect(req.request.method).toBe('PUT');
            expect(req.request.body).toEqual(payload);
            req.flush({ ...mockMember, userId: '23', role: 'REPORTER', firstName: 'Rachel', lastName: 'Moore', email: 'rachel.moore@taskforge.local' });
        });

        it('should propagate 400 errors', () => {
            service.upsertMember('1', { userId: '', role: 'DEVELOPER' }).subscribe({
                error: err => {
                    expect(err.status).toBe(400);
                },
            });

            const req = httpMock.expectOne('/api/projects/1/members');
            req.flush({ message: 'userId is required' }, { status: 400, statusText: 'Bad Request' });
        });

        it('should propagate 403 errors', () => {
            service.upsertMember('1', { userId: '8', role: 'DEVELOPER' }).subscribe({
                error: err => {
                    expect(err.status).toBe(403);
                },
            });

            const req = httpMock.expectOne('/api/projects/1/members');
            req.flush({ message: 'Cannot modify membership of a super administrator' }, { status: 403, statusText: 'Forbidden' });
        });
    });

    describe('removeMember()', () => {
        it('should DELETE /api/projects/:projectId/members/:userId', () => {
            service.removeMember('1', '4').subscribe();

            const req = httpMock.expectOne('/api/projects/1/members/4');
            expect(req.request.method).toBe('DELETE');
            req.flush(null, { status: 204, statusText: 'No Content' });
        });

        it('should propagate 404 errors', () => {
            service.removeMember('1', '999').subscribe({
                error: err => {
                    expect(err.status).toBe(404);
                },
            });

            const req = httpMock.expectOne('/api/projects/1/members/999');
            req.flush({ message: 'Member not found' }, { status: 404, statusText: 'Not Found' });
        });

        it('should propagate 403 errors', () => {
            service.removeMember('1', '8').subscribe({
                error: err => {
                    expect(err.status).toBe(403);
                },
            });

            const req = httpMock.expectOne('/api/projects/1/members/8');
            req.flush({ message: 'Cannot modify membership of a super administrator' }, { status: 403, statusText: 'Forbidden' });
        });
    });

    describe('searchCandidates()', () => {
        const mockCandidate: MemberCandidate = {
            id: '23',
            firstName: 'Rachel',
            lastName: 'Moore',
            email: 'rachel.moore@taskforge.local',
            role: 'VIEWER',
        };

        it('should GET /api/projects/:projectId/members/candidates with q param', () => {
            service.searchCandidates('1', 'leo').subscribe(candidates => {
                expect(candidates).toEqual([mockCandidate]);
            });

            const req = httpMock.expectOne(r => r.url === '/api/projects/1/members/candidates');
            expect(req.request.method).toBe('GET');
            expect(req.request.params.get('q')).toBe('leo');
            req.flush([mockCandidate]);
        });

        it('should return typed MemberCandidate array', () => {
            service.searchCandidates('1', 'rachel').subscribe(candidates => {
                expect(candidates.length).toBe(1);
                expect(candidates[0].firstName).toBe('Rachel');
                expect(candidates[0].email).toBe('rachel.moore@taskforge.local');
                expect(candidates[0].role).toBe('VIEWER');
            });

            const req = httpMock.expectOne(r => r.url === '/api/projects/1/members/candidates');
            req.flush([mockCandidate]);
        });

        it('should return empty array', () => {
            service.searchCandidates('1', 'zz').subscribe(candidates => {
                expect(candidates).toEqual([]);
            });

            const req = httpMock.expectOne(r => r.url === '/api/projects/1/members/candidates');
            req.flush([]);
        });
    });

    describe('getWorkflows()', () => {
        const mockWorkflow: Workflow = {
            id: '1',
            projectId: '1',
            ticketType: 'STORY',
            statuses: ['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'],
            transitions: {
                TO_DO: ['IN_PROGRESS'],
                IN_PROGRESS: ['IN_REVIEW', 'TO_DO'],
                IN_REVIEW: ['DONE', 'IN_PROGRESS'],
                DONE: [],
            },
            created_at: '2025-01-20T09:00:00.000Z',
        };

        it('should GET /api/projects/:id/workflows and return Workflow[]', () => {
            service.getWorkflows('1').subscribe(workflows => {
                expect(workflows).toEqual([mockWorkflow]);
                expect(workflows[0].ticketType).toBe('STORY');
            });

            const req = httpMock.expectOne('/api/projects/1/workflows');
            expect(req.request.method).toBe('GET');
            req.flush([mockWorkflow]);
        });
    });

    describe('getBacklog()', () => {
        const mockBacklogItem: BacklogItem = {
            id: '1',
            projectId: '1',
            type: 'EPIC',
            title: 'Maintenance',
            description: 'Default epic for maintenance and operational tasks',
            status: 'TO_DO',
            priority: null,
            assignee_id: null,
            epic_id: null,
            ticket_number: 1,
            created_by: 'system',
            created_at: '2025-01-20T09:00:00.000Z',
        };

        const mockBacklogResponse: BacklogListResponse = {
            data: [mockBacklogItem],
            total: 1,
            page: 1,
            limit: 10,
        };

        it('should GET /api/projects/:id/backlog and return BacklogListResponse', () => {
            service.getBacklog('1').subscribe(res => {
                expect(res.data).toEqual([mockBacklogItem]);
                expect(res.total).toBe(1);
                expect(res.page).toBe(1);
                expect(res.limit).toBe(10);
            });

            const req = httpMock.expectOne('/api/projects/1/backlog');
            expect(req.request.method).toBe('GET');
            req.flush(mockBacklogResponse);
        });

        it('should pass params as query string when provided', () => {
            service.getBacklog('1', { type: 'EPIC', _page: 2, _limit: 25, q: 'test' }).subscribe();

            const req = httpMock.expectOne(r => r.url === '/api/projects/1/backlog');
            expect(req.request.params.get('type')).toBe('EPIC');
            expect(req.request.params.get('_page')).toBe('2');
            expect(req.request.params.get('_limit')).toBe('25');
            expect(req.request.params.get('q')).toBe('test');
            req.flush(mockBacklogResponse);
        });
    });

    describe('createTicket()', () => {
        it('should POST to /api/projects/:id/backlog with payload', () => {
            const payload: CreateTicketPayload = {
                type: 'STORY',
                title: 'New story',
                description: 'A description',
                priority: 'MEDIUM',
                assignee_id: '2',
                epic_id: '1',
            };
            const mockResponse: BacklogItem = {
                id: '17',
                projectId: '1',
                type: 'STORY',
                title: 'New story',
                description: 'A description',
                status: 'TO_DO',
                priority: 'MEDIUM',
                assignee_id: '2',
                epic_id: '1',
                ticket_number: 2,
                created_by: '1',
                created_at: '2026-02-27T10:00:00.000Z',
            };

            service.createTicket('1', payload).subscribe(item => {
                expect(item).toEqual(mockResponse);
                expect(item.ticket_number).toBe(2);
            });

            const req = httpMock.expectOne('/api/projects/1/backlog');
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual(payload);
            req.flush(mockResponse);
        });
    });

    describe('getEpics()', () => {
        it('should call getBacklog with type EPIC and _limit 100, and return unwrapped data', () => {
            const mockEpic: BacklogItem = {
                id: '1',
                projectId: '1',
                type: 'EPIC',
                title: 'Maintenance',
                description: 'Default epic',
                status: 'TO_DO',
                priority: null,
                assignee_id: null,
                epic_id: null,
                ticket_number: 1,
                created_by: 'system',
                created_at: '2025-01-20T09:00:00.000Z',
            };

            service.getEpics('1').subscribe(items => {
                expect(items).toEqual([mockEpic]);
                expect(items[0].type).toBe('EPIC');
            });

            const req = httpMock.expectOne(r => r.url === '/api/projects/1/backlog');
            expect(req.request.params.get('type')).toBe('EPIC');
            expect(req.request.params.get('_limit')).toBe('100');
            req.flush({ data: [mockEpic], total: 1, page: 1, limit: 100 });
        });
    });
});
