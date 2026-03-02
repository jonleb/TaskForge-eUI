import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, beforeEach, afterEach, expect, vi, beforeAll } from 'vitest';

beforeAll(() => {
    globalThis.ResizeObserver ??= class {
        observe() {}
        unobserve() {}
        disconnect() {}
    } as unknown as typeof ResizeObserver;
});

import { of, throwError, Subject } from 'rxjs';
import { EuiGrowlService } from '@eui/core';
import {
    TranslateTestingModule, provideEuiCoreMocks, createGrowlServiceMock,
} from '../../testing/test-providers';
import { TicketsComponent } from './tickets.component';
import { TicketsService } from '../../core/tickets';
import { PermissionService } from '../../core/auth';
import { BacklogItem, BacklogListResponse, Project } from '../../core/project';

const mockProjects: Project[] = [
    { id: '1', key: 'TF', name: 'TaskForge', description: '', created_by: '1', created_at: '', updated_at: '', is_active: true },
    { id: '2', key: 'DEMO', name: 'Demo Project', description: '', created_by: '1', created_at: '', updated_at: '', is_active: true },
];

const mockItems: BacklogItem[] = [
    { id: 'b1', projectId: '1', type: 'STORY', title: 'Login page', description: 'Implement login', status: 'TO_DO', priority: 'HIGH', assignee_id: '2', epic_id: null, ticket_number: 1, created_by: '1', created_at: '2026-01-01' },
    { id: 'b2', projectId: '2', type: 'BUG', title: 'Fix crash', description: null, status: 'IN_PROGRESS', priority: 'CRITICAL', assignee_id: null, epic_id: null, ticket_number: 5, created_by: '1', created_at: '2026-01-02' },
];

const mockResp: BacklogListResponse = { data: mockItems, total: 2, page: 1, limit: 10 };
const emptyResp: BacklogListResponse = { data: [], total: 0, page: 1, limit: 10 };

describe('TicketsComponent', () => {
    let fixture: ComponentFixture<TicketsComponent>;
    let component: TicketsComponent;
    let ticketsSvc: Record<string, ReturnType<typeof vi.fn>>;
    let perm: Record<string, ReturnType<typeof vi.fn>>;
    let growl: ReturnType<typeof createGrowlServiceMock>;

    beforeEach(async () => {
        ticketsSvc = {
            getTickets: vi.fn().mockReturnValue(of({ ...mockResp })),
            getUserProjects: vi.fn().mockReturnValue(of(mockProjects)),
        };
        perm = {
            isSuperAdmin: vi.fn().mockReturnValue(true),
            getUserId: vi.fn().mockReturnValue('1'),
            hasGlobalRole: vi.fn().mockReturnValue(true),
            getGlobalRole: vi.fn().mockReturnValue('SUPER_ADMIN'),
            getOriginalRole: vi.fn().mockReturnValue('SUPER_ADMIN'),
            setUser: vi.fn(), clear: vi.fn(), showAccessDenied: vi.fn(),
            hasProjectRole: vi.fn().mockReturnValue(of(true)),
        };
        growl = createGrowlServiceMock();

        await TestBed.configureTestingModule({
            imports: [TicketsComponent, TranslateTestingModule],
            providers: [
                ...provideEuiCoreMocks(),
                { provide: TicketsService, useValue: ticketsSvc },
                { provide: PermissionService, useValue: perm },
                { provide: EuiGrowlService, useValue: growl },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(TicketsComponent);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        // Ensure all subscriptions (including NEVER) are cleaned up before Angular teardown
        component.ngOnDestroy();
    });

    it('should truncate long descriptions', () => {
        fixture.detectChanges();
        const long = 'A'.repeat(200);
        const result = component.truncateDescription(long);
        expect(result.length).toBeLessThan(200);
        expect(result).toContain('…');
    });

    it('should return empty string for null description', () => {
        fixture.detectChanges();
        expect(component.truncateDescription(null)).toBe('');
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should load tickets on init', () => {
        fixture.detectChanges();
        expect(ticketsSvc.getTickets).toHaveBeenCalled();
        expect(component.items).toEqual(mockItems);
        expect(component.total).toBe(2);
        expect(component.isLoading).toBe(false);
    });

    it('should load user projects on init', () => {
        fixture.detectChanges();
        expect(ticketsSvc.getUserProjects).toHaveBeenCalled();
        expect(component.projectMap.size).toBe(2);
    });

    it('should display ticket cards', () => {
        fixture.detectChanges();
        const cards = fixture.nativeElement.querySelectorAll('eui-content-card');
        expect(cards.length).toBe(2);
    });

    it('should show project key prefix in card subtitle', () => {
        fixture.detectChanges();
        const subtitles = fixture.nativeElement.querySelectorAll('eui-content-card-header-subtitle');
        expect(subtitles[0].textContent).toContain('TF-1');
        expect(subtitles[1].textContent).toContain('DEMO-5');
    });

    it('should show type chip', () => {
        fixture.detectChanges();
        const starts = fixture.nativeElement.querySelectorAll('eui-content-card-header-start eui-chip');
        expect(starts[0].textContent).toContain('workflow.ticket-type.STORY');
    });

    it('should show status chip', () => {
        fixture.detectChanges();
        const ends = fixture.nativeElement.querySelectorAll('eui-content-card-header-end eui-chip');
        expect(ends[0].textContent).toContain('workflow.status.TO_DO');
    });

    it('should show priority chip when priority exists', () => {
        fixture.detectChanges();
        const metadata = fixture.nativeElement.querySelectorAll('eui-content-card-header-metadata');
        expect(metadata[0].textContent).toContain('ticket.priority.HIGH');
    });

    it('should link cards to ticket detail', () => {
        fixture.detectChanges();
        const links = fixture.nativeElement.querySelectorAll('a.card-link');
        expect(links[0].getAttribute('href')).toBe('/screen/projects/1/backlog/1');
        expect(links[1].getAttribute('href')).toBe('/screen/projects/2/backlog/5');
    });

    it('should trigger debounced search on text input', () => {
        vi.useFakeTimers();
        fixture.detectChanges();
        ticketsSvc.getTickets.mockClear();

        component.onFilterChange('test');
        vi.advanceTimersByTime(350);
        fixture.detectChanges();

        expect(ticketsSvc.getTickets).toHaveBeenCalledWith(expect.objectContaining({ q: 'test', _page: 1 }));
        vi.useRealTimers();
    });

    it('should trigger immediate search on onSearchSubmit', () => {
        fixture.detectChanges();
        ticketsSvc.getTickets.mockClear();
        component.searchValue = 'immediate';
        component.onSearchSubmit();
        expect(ticketsSvc.getTickets).toHaveBeenCalledWith(expect.objectContaining({ q: 'immediate', _page: 1 }));
    });

    it('should update page on pagination', () => {
        fixture.detectChanges();
        component.ngAfterViewInit();
        ticketsSvc.getTickets.mockClear();

        component.onPageChange({ page: 2, pageSize: 25 });
        expect(ticketsSvc.getTickets).toHaveBeenCalledWith(expect.objectContaining({ _page: 3, _limit: 25 }));
    });

    it('should ignore paginator init event before AfterViewInit', () => {
        fixture.detectChanges();
        ticketsSvc.getTickets.mockClear();
        // Reset paginatorReady to simulate a call before AfterViewInit
        (component as any).paginatorReady = false;
        component.onPageChange({ page: 0, pageSize: 10 });
        expect(ticketsSvc.getTickets).not.toHaveBeenCalled();
    });

    it('should show loading state', () => {
        // Use a Subject so we can control when it emits; component stays in loading state
        const pending$ = new Subject<BacklogListResponse>();
        ticketsSvc.getTickets.mockReturnValue(pending$.asObservable());
        fixture.detectChanges();
        const bar = fixture.nativeElement.querySelector('eui-progress-bar');
        expect(bar).toBeTruthy();
        // Complete the subject to avoid cleanup errors
        pending$.complete();
    });

    it('should show empty state when no results', () => {
        ticketsSvc.getTickets.mockReturnValue(of(emptyResp));
        fixture.detectChanges();
        const output = fixture.nativeElement.querySelector('output.empty-state');
        expect(output).toBeTruthy();
        expect(output.textContent).toContain('tickets.no-items');
    });

    it('should show error state and retry button', () => {
        ticketsSvc.getTickets.mockReturnValue(throwError(() => ({ status: 500 })));
        fixture.detectChanges();
        expect(component.hasError).toBe(true);
        const retryBtn = fixture.nativeElement.querySelector('output.empty-state button');
        expect(retryBtn).toBeTruthy();
    });

    it('should retry loading on retry()', () => {
        ticketsSvc.getTickets.mockReturnValue(throwError(() => ({ status: 500 })));
        fixture.detectChanges();
        ticketsSvc.getTickets.mockReturnValue(of(mockResp));
        component.retry();
        fixture.detectChanges();
        expect(component.hasError).toBe(false);
        expect(component.items.length).toBe(2);
    });

    it('should toggle filter column collapse', () => {
        fixture.detectChanges();
        component.onFilterColumnCollapse(true);
        expect(component.isFilterCollapsed).toBe(true);
        component.onFilterColumnCollapse(false);
        expect(component.isFilterCollapsed).toBe(false);
    });

    it('should have aria-live on result count', () => {
        fixture.detectChanges();
        const liveEl = fixture.nativeElement.querySelector('[aria-live="polite"]');
        expect(liveEl).toBeTruthy();
    });

    it('should send multi-value status param', () => {
        fixture.detectChanges();
        ticketsSvc.getTickets.mockClear();
        component.statusChecks.TO_DO = true;
        component.statusChecks.DONE = true;
        component.onStatusCheckChange();
        expect(ticketsSvc.getTickets).toHaveBeenCalledWith(expect.objectContaining({ status: 'TO_DO,DONE' }));
    });

    it('should send multi-value type param', () => {
        fixture.detectChanges();
        ticketsSvc.getTickets.mockClear();
        component.typeChecks.BUG = true;
        component.onTypeCheckChange();
        expect(ticketsSvc.getTickets).toHaveBeenCalledWith(expect.objectContaining({ type: 'BUG' }));
    });

    it('should send multi-value priority param', () => {
        fixture.detectChanges();
        ticketsSvc.getTickets.mockClear();
        component.priorityChecks.HIGH = true;
        component.priorityChecks.CRITICAL = true;
        component.onPriorityCheckChange();
        expect(ticketsSvc.getTickets).toHaveBeenCalledWith(expect.objectContaining({ priority: 'CRITICAL,HIGH' }));
    });

    it('should build activeFilterChips from selected statuses', () => {
        fixture.detectChanges();
        component.statusChecks.TO_DO = true;
        component.onStatusCheckChange();
        const chips = component.activeFilterChips;
        expect(chips.some(c => c.dimension === 'status' && c.value === 'TO_DO')).toBe(true);
    });

    it('should clear all filters on clearAllFilters()', () => {
        fixture.detectChanges();
        component.searchValue = 'test';
        component.statusChecks.TO_DO = true;
        component.onStatusCheckChange();
        ticketsSvc.getTickets.mockClear();

        component.clearAllFilters();
        expect(component.searchValue).toBe('');
        expect(component.selectedStatuses.size).toBe(0);
        expect(ticketsSvc.getTickets).toHaveBeenCalledWith(expect.objectContaining({ _page: 1 }));
    });

    it('should remove chip and uncheck filter', () => {
        fixture.detectChanges();
        component.statusChecks.TO_DO = true;
        component.onStatusCheckChange();
        ticketsSvc.getTickets.mockClear();

        const chip = component.activeFilterChips.find(c => c.value === 'TO_DO')!;
        component.onChipRemove(chip);
        expect(component.statusChecks.TO_DO).toBe(false);
        expect(component.selectedStatuses.has('TO_DO')).toBe(false);
    });

    it('should resolve project key via getProjectKey', () => {
        fixture.detectChanges();
        expect(component.getProjectKey(mockItems[0])).toBe('TF');
        expect(component.getProjectKey(mockItems[1])).toBe('DEMO');
    });
});
