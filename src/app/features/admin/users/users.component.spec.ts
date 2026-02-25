import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest';
import { TranslateModule } from '@ngx-translate/core';
import { CONFIG_TOKEN, EuiGrowlService, I18nService, I18nState } from '@eui/core';
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

    const growlServiceMock = {
        growl: vi.fn(),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UsersComponent, TranslateModule.forRoot()],
            providers: [
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
                { provide: I18nService, useValue: i18nServiceMock },
                { provide: CONFIG_TOKEN, useValue: { global: {}, modules: {} } },
                { provide: EuiGrowlService, useValue: growlServiceMock },
            ],
        }).compileComponents();

        httpMock = TestBed.inject(HttpTestingController);
        fixture = TestBed.createComponent(UsersComponent);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        httpMock.verify();
        vi.restoreAllMocks();
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
        const actionButtons = fixture.nativeElement.querySelectorAll('tbody eui-icon-button button');
        expect(actionButtons.length).toBeGreaterThan(0);
        actionButtons.forEach((btn: HTMLElement) => {
            expect(btn.getAttribute('aria-label')).toBeTruthy();
        });
    });

    // ─── Create User button ──────────────────────────────────────────────

    it('should render a "Create User" button with aria-haspopup="dialog"', () => {
        initWithData();
        const buttons = fixture.nativeElement.querySelectorAll('button[euibutton]');
        const createBtn = Array.from(buttons).find(
            (b: any) => b.textContent.trim().includes('Create User')
        ) as HTMLElement;
        expect(createBtn).toBeTruthy();
        expect(createBtn.getAttribute('aria-haspopup')).toBe('dialog');
    });

    // ─── Create form ─────────────────────────────────────────────────────

    it('should have a create form with all required fields', () => {
        initWithData();
        expect(component.createForm).toBeTruthy();
        expect(component.createForm.get('username')).toBeTruthy();
        expect(component.createForm.get('firstName')).toBeTruthy();
        expect(component.createForm.get('lastName')).toBeTruthy();
        expect(component.createForm.get('email')).toBeTruthy();
        expect(component.createForm.get('role')).toBeTruthy();
    });

    it('should mark form as invalid when empty', () => {
        initWithData();
        expect(component.createForm.valid).toBe(false);
    });

    it('should mark form as valid when all fields are filled', () => {
        initWithData();
        component.createForm.setValue({
            username: 'newuser',
            firstName: 'New',
            lastName: 'User',
            email: 'new@taskforge.local',
            role: 'DEVELOPER',
        });
        expect(component.createForm.valid).toBe(true);
    });

    it('should reject invalid email format', () => {
        initWithData();
        component.createForm.patchValue({ email: 'not-an-email' });
        expect(component.createForm.get('email')?.errors?.['email']).toBeTruthy();
    });

    it('should not call API when form is invalid on submit', () => {
        initWithData();
        component.onCreateUser();
        // No additional HTTP request should be made (only the init one was flushed)
        httpMock.expectNone(r => r.url === '/api/admin/users' && r.method === 'POST');
    });

    it('should mark all fields as touched when submitting invalid form', () => {
        initWithData();
        component.onCreateUser();
        expect(component.createForm.get('username')?.touched).toBe(true);
        expect(component.createForm.get('email')?.touched).toBe(true);
        expect(component.createForm.get('role')?.touched).toBe(true);
    });

    it('should call createUser API on valid form submit', () => {
        initWithData();
        component.createForm.setValue({
            username: 'newuser',
            firstName: 'New',
            lastName: 'User',
            email: 'new@taskforge.local',
            role: 'DEVELOPER',
        });

        // Mock the dialog ViewChild refs
        component.createDialog = { closeDialog: vi.fn() } as any;
        component.tempPasswordDialog = { openDialog: vi.fn() } as any;

        component.onCreateUser();

        const req = httpMock.expectOne(r =>
            r.url === '/api/admin/users' && r.method === 'POST'
        );
        expect(req.request.body).toEqual({
            username: 'newuser',
            firstName: 'New',
            lastName: 'User',
            email: 'new@taskforge.local',
            role: 'DEVELOPER',
        });

        req.flush({
            user: { id: '26', username: 'newuser', email: 'new@taskforge.local', role: 'DEVELOPER', global_role: 'DEVELOPER', firstName: 'New', lastName: 'User', is_active: true, created_at: '2026-02-25T00:00:00Z', updated_at: '2026-02-25T00:00:00Z' },
            temporaryPassword: 'AbCdEf123456',
        });

        // Flush the loadUsers() call triggered by success
        const listReq = httpMock.expectOne(r => r.url === '/api/admin/users' && r.method === 'GET');
        listReq.flush(mockListResponse);

        expect(component.temporaryPassword).toBe('AbCdEf123456');
        expect(component.createDialog.closeDialog).toHaveBeenCalled();
        expect(component.tempPasswordDialog.openDialog).toHaveBeenCalled();
        expect(growlServiceMock.growl).toHaveBeenCalledWith(
            expect.objectContaining({ severity: 'success' })
        );
    });

    it('should display inline error on 409 duplicate response', () => {
        initWithData();
        component.createForm.setValue({
            username: 'superadmin',
            firstName: 'Super',
            lastName: 'Admin',
            email: 'superadmin@taskforge.local',
            role: 'SUPER_ADMIN',
        });

        component.createDialog = { closeDialog: vi.fn() } as any;
        component.tempPasswordDialog = { openDialog: vi.fn() } as any;

        component.onCreateUser();

        const req = httpMock.expectOne(r =>
            r.url === '/api/admin/users' && r.method === 'POST'
        );
        req.flush(
            { message: 'A user with this username already exists' },
            { status: 409, statusText: 'Conflict' }
        );

        expect(component.createError).toBe('A user with this username already exists');
        expect(component.createDialog.closeDialog).not.toHaveBeenCalled();
    });

    it('should reset form and error when dialog is dismissed', () => {
        initWithData();
        component.createForm.patchValue({ username: 'test' });
        component.createError = 'Some error';

        component.resetCreateForm();

        expect(component.createForm.get('username')?.value).toBeFalsy();
        expect(component.createError).toBe('');
    });

    // ─── Create form a11y ────────────────────────────────────────────────

    it('should have all required validators on create form controls', () => {
        initWithData();
        const controls = ['username', 'firstName', 'lastName', 'email', 'role'];
        for (const name of controls) {
            const control = component.createForm.get(name);
            expect(control).toBeTruthy();
            control?.setValue('');
            expect(control?.hasError('required')).toBe(true);
        }
    });

    it('should have email validator on email control', () => {
        initWithData();
        const email = component.createForm.get('email');
        email?.setValue('bad');
        expect(email?.hasError('email')).toBe(true);
        email?.setValue('good@example.com');
        expect(email?.valid).toBe(true);
    });

    // ─── Available roles ─────────────────────────────────────────────────

    it('should have all 6 roles available', () => {
        initWithData();
        expect(component.availableRoles).toEqual([
            'SUPER_ADMIN', 'PROJECT_ADMIN', 'PRODUCT_OWNER',
            'DEVELOPER', 'REPORTER', 'VIEWER',
        ]);
    });

    // ─── Copy password ───────────────────────────────────────────────────

    it('should copy password to clipboard', async () => {
        initWithData();
        component.temporaryPassword = 'TestPass123';

        const writeTextMock = vi.fn().mockResolvedValue(undefined);
        Object.assign(navigator, { clipboard: { writeText: writeTextMock } });

        await component.copyPassword();

        expect(writeTextMock).toHaveBeenCalledWith('TestPass123');
        expect(growlServiceMock.growl).toHaveBeenCalledWith(
            expect.objectContaining({ severity: 'success', summary: 'Copied' })
        );
    });

    // ─── Reset password ──────────────────────────────────────────────────

    it('should set selectedUser and open confirmation dialog when onResetPassword is called', () => {
        initWithData();
        const user = mockListResponse.data[0];
        component.resetPasswordDialog = { openDialog: vi.fn() } as any;

        component.onResetPassword(user);

        expect(component.selectedUser).toBe(user);
        expect(component.resetPasswordDialog.openDialog).toHaveBeenCalled();
    });

    it('should call resetPassword API on confirm', () => {
        initWithData();
        component.selectedUser = mockListResponse.data[0];
        component.tempPasswordDialog = { openDialog: vi.fn() } as any;

        component.onConfirmResetPassword();

        const req = httpMock.expectOne(r =>
            r.url === '/api/admin/users/1/reset-password' && r.method === 'POST'
        );
        req.flush({ temporaryPassword: 'NewPass789' });

        expect(component.temporaryPassword).toBe('NewPass789');
        expect(component.tempPasswordTitle).toBe('Password Reset Successfully');
        expect(component.tempPasswordDialog.openDialog).toHaveBeenCalled();
    });

    it('should show error growl when reset password API fails', () => {
        initWithData();
        component.selectedUser = mockListResponse.data[0];
        component.tempPasswordDialog = { openDialog: vi.fn() } as any;

        component.onConfirmResetPassword();

        const req = httpMock.expectOne(r =>
            r.url === '/api/admin/users/1/reset-password' && r.method === 'POST'
        );
        req.flush(
            { message: 'User not found' },
            { status: 404, statusText: 'Not Found' }
        );

        expect(growlServiceMock.growl).toHaveBeenCalledWith(
            expect.objectContaining({ severity: 'error', summary: 'Reset failed' })
        );
        expect(component.tempPasswordDialog.openDialog).not.toHaveBeenCalled();
    });

    it('should not call API if selectedUser is null', () => {
        initWithData();
        component.selectedUser = null;

        component.onConfirmResetPassword();

        httpMock.expectNone(r => r.url.includes('reset-password'));
    });

    it('should set tempPasswordTitle to "User Created Successfully" on create flow', () => {
        initWithData();
        component.createForm.setValue({
            username: 'newuser',
            firstName: 'New',
            lastName: 'User',
            email: 'new@taskforge.local',
            role: 'DEVELOPER',
        });

        component.createDialog = { closeDialog: vi.fn() } as any;
        component.tempPasswordDialog = { openDialog: vi.fn() } as any;

        component.onCreateUser();

        const req = httpMock.expectOne(r => r.url === '/api/admin/users' && r.method === 'POST');
        req.flush({
            user: { id: '26', username: 'newuser', email: 'new@taskforge.local', role: 'DEVELOPER', global_role: 'DEVELOPER', firstName: 'New', lastName: 'User', is_active: true, created_at: '2026-02-25T00:00:00Z', updated_at: '2026-02-25T00:00:00Z' },
            temporaryPassword: 'CreatePass123',
        });

        const listReq = httpMock.expectOne(r => r.url === '/api/admin/users' && r.method === 'GET');
        listReq.flush(mockListResponse);

        expect(component.tempPasswordTitle).toBe('User Created Successfully');
    });
});
