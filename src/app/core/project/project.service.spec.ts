import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { describe, it, beforeEach, afterEach, expect } from 'vitest';
import { ProjectService } from './project.service';
import { Project, ProjectMember, ProjectListResponse, UserInfo, MemberCandidate, Workflow, BacklogItem, CreateTicketPayload, BacklogListResponse, UpdateTicketPayload, TicketComment, ActivityEntry, Sprint, CreateSprintPayload, SprintStatusPayload, SprintItemsPayload } from './project.models';

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

    describe('updateWorkflow()', () => {
        it('should PUT /api/projects/:id/workflows/:workflowId with payload', () => {
            const payload = {
                statuses: ['TO_DO', 'IN_PROGRESS', 'DONE'],
                transitions: { TO_DO: ['IN_PROGRESS'], IN_PROGRESS: ['DONE', 'TO_DO'], DONE: [] as string[] },
            };

            service.updateWorkflow('1', '4', payload).subscribe(workflow => {
                expect(workflow.statuses).toEqual(payload.statuses);
                expect(workflow.updated_at).toBeDefined();
            });

            const req = httpMock.expectOne('/api/projects/1/workflows/4');
            expect(req.request.method).toBe('PUT');
            expect(req.request.body).toEqual(payload);
            req.flush({
                id: '4', projectId: '1', ticketType: 'EPIC',
                statuses: payload.statuses, transitions: payload.transitions,
                created_at: '2025-01-20T09:00:00.000Z', updated_at: '2026-02-28T10:00:00.000Z',
            });
        });

        it('should propagate 409 conflict errors', () => {
            const payload = {
                statuses: ['TO_DO', 'DONE'],
                transitions: { TO_DO: ['DONE'], DONE: [] as string[] },
            };

            service.updateWorkflow('1', '1', payload).subscribe({
                error: err => {
                    expect(err.status).toBe(409);
                },
            });

            const req = httpMock.expectOne('/api/projects/1/workflows/1');
            req.flush({ message: 'Cannot remove statuses currently in use' }, { status: 409, statusText: 'Conflict' });
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

        it('should pass multi-value comma-separated status param', () => {
            service.getBacklog('1', { status: 'TO_DO,IN_PROGRESS' }).subscribe();

            const req = httpMock.expectOne(r => r.url === '/api/projects/1/backlog');
            expect(req.request.params.get('status')).toBe('TO_DO,IN_PROGRESS');
            req.flush(mockBacklogResponse);
        });

        it('should pass multi-value comma-separated type param', () => {
            service.getBacklog('1', { type: 'STORY,BUG' }).subscribe();

            const req = httpMock.expectOne(r => r.url === '/api/projects/1/backlog');
            expect(req.request.params.get('type')).toBe('STORY,BUG');
            req.flush(mockBacklogResponse);
        });

        it('should pass multi-value comma-separated priority param', () => {
            service.getBacklog('1', { priority: 'HIGH,CRITICAL' }).subscribe();

            const req = httpMock.expectOne(r => r.url === '/api/projects/1/backlog');
            expect(req.request.params.get('priority')).toBe('HIGH,CRITICAL');
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

    describe('getTicket()', () => {
        it('should GET /api/projects/:id/backlog/:ticketNumber', () => {
            const mockItem: BacklogItem = {
                id: '17', projectId: '1', type: 'STORY', title: 'Auth flow',
                description: 'Desc', status: 'TO_DO', priority: 'HIGH',
                assignee_id: '2', epic_id: null, ticket_number: 2,
                created_by: '1', created_at: '2026-01-05T09:00:00.000Z',
            };

            service.getTicket('1', 2).subscribe(item => {
                expect(item).toEqual(mockItem);
            });

            const req = httpMock.expectOne('/api/projects/1/backlog/2');
            expect(req.request.method).toBe('GET');
            req.flush(mockItem);
        });
    });

    describe('updateTicket()', () => {
        it('should PATCH /api/projects/:id/backlog/:ticketNumber with payload', () => {
            const payload = { title: 'Updated title', status: 'IN_PROGRESS' as const };

            service.updateTicket('1', 2, payload).subscribe(item => {
                expect(item.title).toBe('Updated title');
            });

            const req = httpMock.expectOne('/api/projects/1/backlog/2');
            expect(req.request.method).toBe('PATCH');
            expect(req.request.body).toEqual(payload);
            req.flush({ id: '17', projectId: '1', type: 'STORY', title: 'Updated title',
                description: '', status: 'IN_PROGRESS', priority: 'HIGH',
                assignee_id: '2', epic_id: null, ticket_number: 2,
                created_by: '1', created_at: '2026-01-05T09:00:00.000Z' });
        });
    });

    describe('getComments()', () => {
        it('should GET /api/projects/:id/backlog/:ticketNumber/comments', () => {
            service.getComments('1', 2).subscribe(comments => {
                expect(comments).toEqual([]);
            });

            const req = httpMock.expectOne('/api/projects/1/backlog/2/comments');
            expect(req.request.method).toBe('GET');
            req.flush([]);
        });
    });

    describe('addComment()', () => {
        it('should POST /api/projects/:id/backlog/:ticketNumber/comments with content', () => {
            service.addComment('1', 2, 'Test comment').subscribe(comment => {
                expect(comment.content).toBe('Test comment');
            });

            const req = httpMock.expectOne('/api/projects/1/backlog/2/comments');
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual({ content: 'Test comment' });
            req.flush({ id: '1', projectId: '1', ticketId: '17', ticketNumber: 2,
                authorId: '1', authorName: 'Super Admin', content: 'Test comment',
                created_at: '2026-02-27T10:00:00.000Z' });
        });
    });

    describe('getActivity()', () => {
        it('should GET /api/projects/:id/backlog/:ticketNumber/activity', () => {
            service.getActivity('1', 2).subscribe(entries => {
                expect(entries).toEqual([]);
            });

            const req = httpMock.expectOne('/api/projects/1/backlog/2/activity');
            expect(req.request.method).toBe('GET');
            req.flush([]);
        });
    });

    describe('getLinkTypes()', () => {
        it('should GET /api/link-types', () => {
            service.getLinkTypes().subscribe(types => {
                expect(types.length).toBe(1);
                expect(types[0].name).toBe('BLOCKS');
            });

            const req = httpMock.expectOne('/api/link-types');
            expect(req.request.method).toBe('GET');
            req.flush([{ id: '1', name: 'BLOCKS', inward: 'is blocked by', outward: 'blocks', scope: 'GLOBAL', created_at: '2025-01-01T00:00:00.000Z' }]);
        });
    });

    describe('getTicketLinks()', () => {
        it('should GET /api/projects/:id/backlog/:num/links', () => {
            service.getTicketLinks('1', 2).subscribe(links => {
                expect(links).toEqual([]);
            });

            const req = httpMock.expectOne('/api/projects/1/backlog/2/links');
            expect(req.request.method).toBe('GET');
            req.flush([]);
        });
    });

    describe('createTicketLink()', () => {
        it('should POST /api/projects/:id/backlog/:num/links with payload', () => {
            const payload = { linkTypeId: '1', targetTicketNumber: 3 };

            service.createTicketLink('1', 2, payload).subscribe(link => {
                expect(link.linkTypeId).toBe('1');
            });

            const req = httpMock.expectOne('/api/projects/1/backlog/2/links');
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual(payload);
            req.flush({ id: '1', projectId: '1', linkTypeId: '1', sourceTicketNumber: 2, targetTicketNumber: 3, targetProjectId: '1', created_by: '1', created_at: '2026-02-28T10:00:00.000Z' });
        });
    });

    describe('deleteTicketLink()', () => {
        it('should DELETE /api/projects/:id/backlog/:num/links/:linkId', () => {
            service.deleteTicketLink('1', 2, '5').subscribe();

            const req = httpMock.expectOne('/api/projects/1/backlog/2/links/5');
            expect(req.request.method).toBe('DELETE');
            req.flush(null, { status: 204, statusText: 'No Content' });
        });
    });

    describe('reorderBacklog()', () => {
        it('should PUT /api/projects/:id/backlog/reorder with correct payload', () => {
            const payload = { items: [{ ticket_number: 1, position: 2 }, { ticket_number: 2, position: 1 }] };

            service.reorderBacklog('1', payload).subscribe(res => {
                expect(res.updated).toBe(2);
            });

            const req = httpMock.expectOne('/api/projects/1/backlog/reorder');
            expect(req.request.method).toBe('PUT');
            expect(req.request.body).toEqual(payload);
            req.flush({ updated: 2 });
        });

        it('should propagate error on reorder failure', () => {
            const payload = { items: [] };

            service.reorderBacklog('1', payload).subscribe({
                error: err => {
                    expect(err.status).toBe(400);
                },
            });

            const req = httpMock.expectOne('/api/projects/1/backlog/reorder');
            req.flush({ message: 'items array is empty' }, { status: 400, statusText: 'Bad Request' });
        });
    });

    describe('getSprints()', () => {
        const mockSprint: Sprint = {
            id: 'sp-1', projectId: '1', name: 'Sprint 1', goal: 'Goal',
            status: 'PLANNED', start_date: null, end_date: null,
            created_by: '1', created_at: '2026-02-01T00:00:00.000Z', updated_at: '2026-02-01T00:00:00.000Z',
        };

        it('should GET /api/projects/:id/sprints and return Sprint[]', () => {
            service.getSprints('1').subscribe(sprints => {
                expect(sprints).toEqual([mockSprint]);
            });

            const req = httpMock.expectOne('/api/projects/1/sprints');
            expect(req.request.method).toBe('GET');
            req.flush([mockSprint]);
        });

        it('should pass status query param when provided', () => {
            service.getSprints('1', 'ACTIVE').subscribe();

            const req = httpMock.expectOne(r => r.url === '/api/projects/1/sprints');
            expect(req.request.params.get('status')).toBe('ACTIVE');
            req.flush([]);
        });
    });

    describe('createSprint()', () => {
        it('should POST /api/projects/:id/sprints with payload', () => {
            const payload: CreateSprintPayload = { name: 'Sprint 2', goal: 'Ship it' };

            service.createSprint('1', payload).subscribe(sprint => {
                expect(sprint.name).toBe('Sprint 2');
            });

            const req = httpMock.expectOne('/api/projects/1/sprints');
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual(payload);
            req.flush({ id: 'sp-new', projectId: '1', name: 'Sprint 2', goal: 'Ship it',
                status: 'PLANNED', start_date: null, end_date: null,
                created_by: '1', created_at: '2026-02-28T00:00:00.000Z', updated_at: '2026-02-28T00:00:00.000Z' });
        });

        it('should propagate 400 errors', () => {
            service.createSprint('1', { name: '' }).subscribe({
                error: err => expect(err.status).toBe(400),
            });

            const req = httpMock.expectOne('/api/projects/1/sprints');
            req.flush({ message: 'name is required' }, { status: 400, statusText: 'Bad Request' });
        });
    });

    describe('updateSprint()', () => {
        it('should PATCH /api/projects/:id/sprints/:sprintId with payload', () => {
            const payload = { name: 'Renamed Sprint' };

            service.updateSprint('1', 'sp-1', payload).subscribe(sprint => {
                expect(sprint.name).toBe('Renamed Sprint');
            });

            const req = httpMock.expectOne('/api/projects/1/sprints/sp-1');
            expect(req.request.method).toBe('PATCH');
            expect(req.request.body).toEqual(payload);
            req.flush({ id: 'sp-1', projectId: '1', name: 'Renamed Sprint', goal: '',
                status: 'PLANNED', start_date: null, end_date: null,
                created_by: '1', created_at: '2026-02-01T00:00:00.000Z', updated_at: '2026-02-28T00:00:00.000Z' });
        });
    });

    describe('updateSprintStatus()', () => {
        it('should PATCH /api/projects/:id/sprints/:sprintId/status with payload', () => {
            const payload: SprintStatusPayload = { status: 'ACTIVE' };

            service.updateSprintStatus('1', 'sp-1', payload).subscribe(sprint => {
                expect(sprint.status).toBe('ACTIVE');
            });

            const req = httpMock.expectOne('/api/projects/1/sprints/sp-1/status');
            expect(req.request.method).toBe('PATCH');
            expect(req.request.body).toEqual(payload);
            req.flush({ id: 'sp-1', projectId: '1', name: 'Sprint 1', goal: '',
                status: 'ACTIVE', start_date: '2026-02-28T00:00:00.000Z', end_date: null,
                created_by: '1', created_at: '2026-02-01T00:00:00.000Z', updated_at: '2026-02-28T00:00:00.000Z' });
        });
    });

    describe('assignSprintItems()', () => {
        it('should PUT /api/projects/:id/sprints/:sprintId/items with payload', () => {
            const payload: SprintItemsPayload = { ticket_numbers: [3, 5] };

            service.assignSprintItems('1', 'sp-1', payload).subscribe(res => {
                expect(res.assigned).toBe(2);
            });

            const req = httpMock.expectOne('/api/projects/1/sprints/sp-1/items');
            expect(req.request.method).toBe('PUT');
            expect(req.request.body).toEqual(payload);
            req.flush({ assigned: 2 });
        });
    });

    describe('removeSprintItem()', () => {
        it('should DELETE /api/projects/:id/sprints/:sprintId/items/:ticketNumber', () => {
            service.removeSprintItem('1', 'sp-1', 3).subscribe(res => {
                expect(res.removed).toBe(true);
            });

            const req = httpMock.expectOne('/api/projects/1/sprints/sp-1/items/3');
            expect(req.request.method).toBe('DELETE');
            req.flush({ removed: true });
        });
    });
});
