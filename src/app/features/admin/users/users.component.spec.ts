import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest';
import { TranslateModule } from '@ngx-translate/core';
import { CONFIG_TOKEN, I18nService, I18nState } from '@eui/core';
import { Observable, of } from 'rxjs';
import { UsersComponent } from './users.component';
import { AdminUserListResponse } from './admin-user.models';

const mockListResponse: AdminUserListResponse = {
    data: [
        {
            id: '1', username: 'superadmin', email: 'superadmin@taskforge.local',
            role: 'SUPER_ADMIN', global_role: 'SUPER_ADMIN',
            firstName: 'Super', lastName: 'Admin',
            is_active: true, created_at: '2025-01-15T10:00:00.000Z', updated_at: '2025-01-15T10:00:00.000Z',
        },
        {
            id: '7', username: 'inactive_user', email: 'inactive@taskforge.local',
            role: 'DEVELOPER', global_role: 'DEVELOPER',
            firstName: 'Inactive', lastName: 'User',
            is_active: false, created_at: '2025-04-10T12:00:00.000Z', updated_at: '2025-04-10T12:00:00.000Z',
        },
    ],
    total: 2, page: 1, limit: 10,
};

const emptyResponse: AdminUserListResponse = {
    data: [], total: 0, page: 1, limit: 10,
};

describe('UsersComponent', () => {
    let component: UsersComponent;
    let fixture: ComponentFixture<UsersComponent>;
    let httpMock: HttpTestingController;

    type GetStateReturnType<T> = T extends keyof I18nState ? Observable<I18nState[T]> : Observable<I18nState>;

    const i18nServiceMock = {
        init: () => { /* noop */ },
        getState: <K extends keyof I18nState>(key?: K): GetStateReturnType<K> => {
            if (typeof key === 'string') {
                return of({ activeLang: 'en' }[key]) as GetStateReturnType<K>;
            }
            return of({ activeLang: 'en' }) as GetStateReturnType<K>;
        },
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UsersComponent, TranslateModule.forRoot()],
            providers: [
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
                { provide: I18nService, useValue: i18nServiceMock },
                { provide: CONFIG_TOKEN, useValue: { global: {}, modules: {} } },
            ],
        }).compileComponents();

        httpMock = TestBed.inject(HttpTestingController);
        fixture = TestBed.createComponent(UsersComponent);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        httpMock.verify();
    });

    /** Flush the initial getUsers() call that fires on ngOnInit */
    function initWithData(response: AdminUserListResponse = mockListResponse): void {
        fixture.detectChanges(); // triggers ngOnInit
        const req = httpMock.expectOne(r => r.url === '/api/admin/users');
        req.flush(response);
        fixture.detectChanges();
    }

    // ─── Component creation ──────────────────────────────────────────────

    it('should create the component', () => {
        initWithData();
        expect(component).toBeTruthy();
    });

    // ─── Page structure ──────────────────────────────────────────────────

    it('should render eui-page-header with "User Administration"', () => {
        initWithData();
        const header = fixture.nativeElement.querySelector('eui-page-header');
        expect(header).toBeTruthy();
        expect(header.getAttribute('label')).toBe('User Administration');
    });

    it('should render eui-table-filter', () => {
        initWithData();
        const filter = fixture.nativeElement.querySelector('eui-table-filter');
        expect(filter).toBeTruthy();
    });

    it('should render eui-paginator', () => {
        initWithData();
        const paginator = fixture.nativeElement.querySelector('eui-paginator');
        expect(paginator).toBeTruthy();
    });

    // ─── Data loading ────────────────────────────────────────────────────

    it('should call adminUserService.getUsers() on init', () => {
        fixture.detectChanges();
        const req = httpMock.expectOne(r => r.url === '/api/admin/users');
        expect(req.request.method).toBe('GET');
        req.flush(mockListResponse);
    });

    it('should display users in the table when data is loaded', () => {
        initWithData();
        const rows = fixture.nativeElement.querySelectorAll('table tbody tr');
        expect(rows.length).toBe(2);
    });

    it('should display "No users found" when data is empty', () => {
        initWithData(emptyResponse);
        const noData = fixture.nativeElement.querySelector('table');
        expect(noData.textContent).toContain('No users found');
    });

    it('should show result count with aria-live="polite"', () => {
        initWithData();
        const liveRegion = fixture.nativeElement.querySelector('[aria-live="polite"]');
        expect(liveRegion).toBeTruthy();
        expect(liveRegion.textContent).toContain('Showing 2 of 2 users');
    });

    // ─── Search ──────────────────────────────────────────────────────────

    it('should call loadUsers when filter changes (after debounce)', () => {
        vi.useFakeTimers();
        initWithData();

        component.onFilterChange('admin');
        vi.advanceTimersByTime(300);

        const req = httpMock.expectOne(r =>
            r.url === '/api/admin/users' && r.params.get('q') === 'admin'
        );
        req.flush(mockListResponse);
        fixture.detectChanges();

        expect(component.params.q).toBe('admin');
        vi.useRealTimers();
    });

    it('should reset page to 1 on search', () => {
        vi.useFakeTimers();
        initWithData();
        component.params = { ...component.params, _page: 3 };

        component.onFilterChange('test');
        vi.advanceTimersByTime(300);

        const req = httpMock.expectOne(r => r.url === '/api/admin/users');
        expect(req.request.params.get('_page')).toBe('1');
        req.flush(mockListResponse);

        expect(component.params._page).toBe(1);
        vi.useRealTimers();
    });

    // ─── Sorting ─────────────────────────────────────────────────────────

    it('should call loadUsers with sort params on sortChange', () => {
        initWithData();

        component.onSortChange([{ sort: 'username', order: 'asc' }]);

        const req = httpMock.expectOne(r =>
            r.url === '/api/admin/users' &&
            r.params.get('_sort') === 'username' &&
            r.params.get('_order') === 'asc'
        );
        req.flush(mockListResponse);

        expect(component.params._sort).toBe('username');
        expect(component.params._order).toBe('asc');
    });

    it('should reset page to 1 on sort change', () => {
        initWithData();
        component.params = { ...component.params, _page: 5 };

        component.onSortChange([{ sort: 'email', order: 'desc' }]);

        const req = httpMock.expectOne(r => r.url === '/api/admin/users');
        expect(req.request.params.get('_page')).toBe('1');
        req.flush(mockListResponse);

        expect(component.params._page).toBe(1);
    });

    // ─── Pagination ──────────────────────────────────────────────────────

    it('should call loadUsers with updated page on pageChange', () => {
        initWithData();

        component.onPageChange({ page: 2, pageSize: 10 });

        const req = httpMock.expectOne(r =>
            r.url === '/api/admin/users' && r.params.get('_page') === '3'
        );
        req.flush(mockListResponse);
    });

    it('should convert 0-indexed paginator page to 1-indexed API page', () => {
        initWithData();

        component.onPageChange({ page: 0, pageSize: 25 });

        const req = httpMock.expectOne(r => r.url === '/api/admin/users');
        expect(req.request.params.get('_page')).toBe('1');
        expect(req.request.params.get('_limit')).toBe('25');
        req.flush(mockListResponse);
    });

    // ─── Table structure (a11y) ──────────────────────────────────────────

    it('should have an accessible label on the table', () => {
        initWithData();
        const table = fixture.nativeElement.querySelector('table');
        expect(table).toBeTruthy();
        // eUI table strips <caption>, so we use aria-label instead
        expect(table.getAttribute('aria-label')).toBe('List of platform users');
    });

    it('should have scope="col" on all th elements', () => {
        initWithData();
        const ths = fixture.nativeElement.querySelectorAll('table th');
        ths.forEach((th: HTMLElement) => {
            expect(th.getAttribute('scope')).toBe('col');
        });
    });

    it('should have data-col-label on all td elements', () => {
        initWithData();
        const tds = fixture.nativeElement.querySelectorAll('table tbody td');
        tds.forEach((td: HTMLElement) => {
            expect(td.getAttribute('data-col-label')).toBeTruthy();
        });
    });

    it('should display status as "Active"/"Inactive" text', () => {
        initWithData();
        const statusCells = fixture.nativeElement.querySelectorAll('td[data-col-label="Status"]');
        expect(statusCells[0].textContent.trim()).toBe('Active');
        expect(statusCells[1].textContent.trim()).toBe('Inactive');
    });

    it('should have aria-label on action buttons', () => {
        initWithData();
        // Select only action buttons inside table body rows (not header sort buttons)
        const actionButtons = fixture.nativeElement.querySelectorAll('tbody eui-icon-button button');
        expect(actionButtons.length).toBeGreaterThan(0);
        actionButtons.forEach((btn: HTMLElement) => {
            expect(btn.getAttribute('aria-label')).toBeTruthy();
        });
    });
});
