import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { describe, it, beforeEach, afterEach, expect } from 'vitest';
import { TicketsService } from './tickets.service';
import { TicketsListParams } from './tickets.models';

describe('TicketsService', () => {
    let service: TicketsService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
                TicketsService,
            ],
        });
        service = TestBed.inject(TicketsService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    describe('getTickets', () => {
        it('should call GET /api/tickets with no params', () => {
            const mockResponse = { data: [], total: 0, page: 1, limit: 10 };
            service.getTickets().subscribe(res => {
                expect(res).toEqual(mockResponse);
            });
            const req = httpMock.expectOne('/api/tickets');
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('should pass query params when provided', () => {
            const params: TicketsListParams = {
                project_id: 'p1',
                status: 'TO_DO,IN_PROGRESS',
                type: 'BUG',
                priority: 'HIGH',
                assignee_id: '4',
                sprint_id: 'open',
                q: 'search term',
                _page: 2,
                _limit: 25,
                _sort: 'title',
                _order: 'asc',
            };
            service.getTickets(params).subscribe();
            const req = httpMock.expectOne(r => r.url === '/api/tickets');
            expect(req.request.params.get('project_id')).toBe('p1');
            expect(req.request.params.get('status')).toBe('TO_DO,IN_PROGRESS');
            expect(req.request.params.get('type')).toBe('BUG');
            expect(req.request.params.get('priority')).toBe('HIGH');
            expect(req.request.params.get('assignee_id')).toBe('4');
            expect(req.request.params.get('sprint_id')).toBe('open');
            expect(req.request.params.get('q')).toBe('search term');
            expect(req.request.params.get('_page')).toBe('2');
            expect(req.request.params.get('_limit')).toBe('25');
            expect(req.request.params.get('_sort')).toBe('title');
            expect(req.request.params.get('_order')).toBe('asc');
            req.flush({ data: [], total: 0, page: 2, limit: 25 });
        });

        it('should skip undefined and null param values', () => {
            const params: TicketsListParams = { project_id: 'p1', status: undefined };
            service.getTickets(params).subscribe();
            const req = httpMock.expectOne(r => r.url === '/api/tickets');
            expect(req.request.params.get('project_id')).toBe('p1');
            expect(req.request.params.has('status')).toBe(false);
            req.flush({ data: [], total: 0, page: 1, limit: 10 });
        });

        it('should return BacklogListResponse shape', () => {
            const mockData = {
                data: [{ id: 't1', title: 'Ticket 1', type: 'BUG', status: 'TO_DO' }],
                total: 1,
                page: 1,
                limit: 10,
            };
            service.getTickets().subscribe(res => {
                expect(res.data).toHaveLength(1);
                expect(res.total).toBe(1);
                expect(res.page).toBe(1);
                expect(res.limit).toBe(10);
            });
            httpMock.expectOne('/api/tickets').flush(mockData);
        });

        it('should propagate HTTP errors', () => {
            service.getTickets().subscribe({
                error: (err) => {
                    expect(err.status).toBe(500);
                },
            });
            httpMock.expectOne('/api/tickets').flush('Server error', { status: 500, statusText: 'Internal Server Error' });
        });
    });

    describe('getUserProjects', () => {
        it('should call GET /api/user/projects', () => {
            const mockProjects = [{ id: 'p1', name: 'Project 1' }];
            service.getUserProjects().subscribe(res => {
                expect(res).toEqual(mockProjects);
            });
            const req = httpMock.expectOne('/api/user/projects');
            expect(req.request.method).toBe('GET');
            req.flush(mockProjects);
        });

        it('should return Project[] shape', () => {
            const mockProjects = [
                { id: 'p1', name: 'Alpha', key: 'ALP' },
                { id: 'p2', name: 'Beta', key: 'BET' },
            ];
            service.getUserProjects().subscribe(res => {
                expect(res).toHaveLength(2);
                expect(res[0].name).toBe('Alpha');
            });
            httpMock.expectOne('/api/user/projects').flush(mockProjects);
        });

        it('should propagate HTTP errors', () => {
            service.getUserProjects().subscribe({
                error: (err) => {
                    expect(err.status).toBe(403);
                },
            });
            httpMock.expectOne('/api/user/projects').flush('Forbidden', { status: 403, statusText: 'Forbidden' });
        });
    });
});
