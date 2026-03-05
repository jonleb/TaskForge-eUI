import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { describe, it, beforeEach, afterEach, expect, vi, beforeAll } from 'vitest';

// EuiPageColumnsComponent uses ResizeObserver internally — polyfill for jsdom
beforeAll(() => {
    globalThis.ResizeObserver ??= class {
        observe() {}
        unobserve() {}
        disconnect() {}
    } as unknown as typeof ResizeObserver;
});

import { CONFIG_TOKEN, EuiGrowlService, I18nService } from '@eui/core';
import { EuiBreadcrumbService } from '@eui/components/eui-breadcrumb';
import { EuiDialogComponent } from '@eui/components/eui-dialog';
import { TranslateTestingModule, createI18nServiceMock, createGrowlServiceMock, createBreadcrumbServiceMock, TEST_CONFIG } from '../../../testing/test-providers';
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

    const growlServiceMock = createGrowlServiceMock();

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UsersComponent, TranslateTestingModule],
            providers: [
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
                { provide: I18nService, useValue: createI18nServiceMock() },
                { provide: CONFIG_TOKEN, useValue: TEST_CONFIG },
                { provide: EuiGrowlService, useValue: growlServiceMock },
                { provide: EuiBreadcrumbService, useValue: createBreadcrumbServiceMock() },
            ],
        }).compileComponents();

        httpMock = TestBed.inject(HttpTestingController);
        fixture = TestBed.createComponent(UsersComponent);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        // Flush any outstanding paginator-init requests before verify
        httpMock.match(r => r.url === '/api/admin/users');
        httpMock.verify();
        vi.restoreAllMocks();
    });

    /**
     * Flush the initial getUsers() call that fires on ngOnInit.
     * Also flushes any paginator-init pageChange request.
     */
    function initWithData(response: AdminUserListResponse = mockListResponse): void {
        fixture.detectChanges(); // triggers ngOnInit → loadUsers()
        const reqs = httpMock.match(r => r.url === '/api/admin/users');
        reqs.forEach(r => r.flush(response));
        fixture.detectChanges();
        // Flush any paginator-init triggered request
        const extraReqs = httpMock.match(r => r.url === '/api/admin/users');
        extraReqs.forEach(r => r.flush(response));
        fixture.detectChanges();
    }

    // ─── Component creation ──────────────────────────────────────────

    it('should create the component', () => {
        initWithData();
        expect(component).toBeTruthy();
    });

    // ─── Data loading ────────────────────────────────────────────────

    it('should call adminUserService.getUsers() on init', () => {
        fixture.detectChanges();
        const reqs = httpMock.match(r => r.url === '/api/admin/users');
        expect(reqs.length).toBeGreaterThanOrEqual(1);
        expect(reqs[0].request.method).toBe('GET');
        reqs.forEach(r => r.flush(mockListResponse));
    });

    it('should populate users array when data is loaded', () => {
        initWithData();
        expect(component.users.length).toBe(2);
        expect(component.users[0].username).toBe('superadmin');
    });

    it('should set total from response', () => {
        initWithData();
        expect(component.total).toBe(2);
    });

    it('should set loading to false after data loads', () => {
        initWithData();
        expect(component.loading).toBe(false);
    });

    it('should set loading to true during loading', () => {
        fixture.detectChanges();
        expect(component.loading).toBe(true);
        httpMock.match(r => r.url === '/api/admin/users').forEach(r => r.flush(mockListResponse));
    });

    it('should set hasLoadError and empty users on API error', () => {
        fixture.detectChanges();
        const reqs = httpMock.match(r => r.url === '/api/admin/users');
        reqs.forEach(r => r.flush(null, { status: 500, statusText: 'Internal Server Error' }));
        fixture.detectChanges();

        expect(component.hasLoadError).toBe(true);
        expect(component.users).toEqual([]);
    });

    it('should show error growl on load failure', () => {
        fixture.detectChanges();
        httpMock.match(r => r.url === '/api/admin/users')
            .forEach(r => r.flush(null, { status: 500, statusText: 'Internal Server Error' }));
        fixture.detectChanges();

        expect(growlServiceMock.growl).toHaveBeenCalledWith(
            expect.objectContaining({ severity: 'error', summary: 'users.growl.load-failed-summary' })
        );
    });

    it('should recover from error on retry', () => {
        fixture.detectChanges();
        httpMock.match(r => r.url === '/api/admin/users')
            .forEach(r => r.flush(null, { status: 500, statusText: 'Internal Server Error' }));
        fixture.detectChanges();

        component.loadUsers();
        httpMock.match(r => r.url === '/api/admin/users').forEach(r => r.flush(mockListResponse));
        fixture.detectChanges();

        expect(component.hasLoadError).toBe(false);
        expect(component.users.length).toBe(2);
    });

    // ─── Search ──────────────────────────────────────────────────────

    it('should call loadUsers when filter changes (after debounce)', () => {
        vi.useFakeTimers();
        initWithData();

        component.onFilterChange('admin');
        vi.advanceTimersByTime(300);

        const reqs = httpMock.match(r =>
            r.url === '/api/admin/users' && r.params.get('q') === 'admin'
        );
        expect(reqs.length).toBeGreaterThanOrEqual(1);
        reqs.forEach(r => r.flush(mockListResponse));

        expect(component.params.q).toBe('admin');
        vi.useRealTimers();
    });

    it('should reset page to 1 on search', () => {
        vi.useFakeTimers();
        initWithData();
        component.params = { ...component.params, _page: 3 };

        component.onFilterChange('test');
        vi.advanceTimersByTime(300);

        const reqs = httpMock.match(r => r.url === '/api/admin/users');
        expect(reqs.length).toBeGreaterThanOrEqual(1);
        expect(reqs[0].request.params.get('_page')).toBe('1');
        reqs.forEach(r => r.flush(mockListResponse));

        expect(component.params._page).toBe(1);
        vi.useRealTimers();
    });

    // ─── Status filter ───────────────────────────────────────────────

    it('should filter by status via dropdown', () => {
        initWithData();
        component.selectedStatusValue = 'true';
        component.onStatusSelectChange();
        const reqs = httpMock.match(r =>
            r.url === '/api/admin/users' && r.params.get('is_active') === 'true'
        );
        expect(reqs.length).toBeGreaterThanOrEqual(1);
        reqs.forEach(r => r.flush(mockListResponse));
        expect(component.params.is_active).toBe('true');
        expect(component.params._page).toBe(1);
    });

    it('should clear status filter when set to null', () => {
        initWithData();
        component.selectedStatusValue = 'true';
        component.onStatusSelectChange();
        httpMock.match(r => r.url === '/api/admin/users').forEach(r => r.flush(mockListResponse));

        component.selectedStatusValue = null;
        component.onStatusSelectChange();
        const reqs = httpMock.match(r => r.url === '/api/admin/users');
        expect(reqs.length).toBeGreaterThanOrEqual(1);
        expect(reqs[0].request.params.has('is_active')).toBe(false);
        reqs.forEach(r => r.flush(mockListResponse));
    });

    it('should reset page to 1 on status filter change', () => {
        initWithData();
        component.params = { ...component.params, _page: 3 };
        component.selectedStatusValue = 'false';
        component.onStatusSelectChange();
        const reqs = httpMock.match(r => r.url === '/api/admin/users');
        expect(reqs[0].request.params.get('_page')).toBe('1');
        reqs.forEach(r => r.flush(mockListResponse));
    });

    // ─── Role filter ─────────────────────────────────────────────────

    it('should filter by role via dropdown', () => {
        initWithData();
        component.selectedRole = 'DEVELOPER';
        component.onRoleSelectChange();
        const reqs = httpMock.match(r =>
            r.url === '/api/admin/users' && r.params.get('role') === 'DEVELOPER'
        );
        expect(reqs.length).toBeGreaterThanOrEqual(1);
        reqs.forEach(r => r.flush(mockListResponse));
        expect(component.params.role).toBe('DEVELOPER');
        expect(component.params._page).toBe(1);
    });

    it('should clear role filter when set to null', () => {
        initWithData();
        component.selectedRole = 'DEVELOPER';
        component.onRoleSelectChange();
        httpMock.match(r => r.url === '/api/admin/users').forEach(r => r.flush(mockListResponse));

        component.selectedRole = null;
        component.onRoleSelectChange();
        const reqs = httpMock.match(r => r.url === '/api/admin/users');
        expect(reqs[0].request.params.has('role')).toBe(false);
        reqs.forEach(r => r.flush(mockListResponse));
    });

    it('should reset page to 1 on role filter change', () => {
        initWithData();
        component.params = { ...component.params, _page: 3 };
        component.selectedRole = 'VIEWER';
        component.onRoleSelectChange();
        const reqs = httpMock.match(r => r.url === '/api/admin/users');
        expect(reqs[0].request.params.get('_page')).toBe('1');
        reqs.forEach(r => r.flush(mockListResponse));
    });

    // ─── Filter chips ────────────────────────────────────────────────

    it('should show search chip when searchValue is set', () => {
        initWithData();
        component.searchValue = 'admin';
        expect(component.activeFilterChips.length).toBe(1);
        expect(component.activeFilterChips[0].dimension).toBe('search');
    });

    it('should show status chip when status filter is active', () => {
        initWithData();
        component.selectedStatusValue = 'true';
        expect(component.activeFilterChips.some(c => c.dimension === 'status')).toBe(true);
    });

    it('should show role chip when role filter is active', () => {
        initWithData();
        component.selectedRole = 'DEVELOPER';
        expect(component.activeFilterChips.some(c => c.dimension === 'role')).toBe(true);
    });

    it('should show all 3 chips when all filters are active', () => {
        initWithData();
        component.searchValue = 'test';
        component.selectedStatusValue = 'true';
        component.selectedRole = 'DEVELOPER';
        expect(component.activeFilterChips.length).toBe(3);
    });

    it('should remove search chip and clear search', () => {
        initWithData();
        component.searchValue = 'test';
        component.params = { ...component.params, q: 'test' };
        const chip = component.activeFilterChips.find(c => c.dimension === 'search')!;

        component.onChipRemove(chip);
        httpMock.match(r => r.url === '/api/admin/users').forEach(r => r.flush(mockListResponse));

        expect(component.searchValue).toBe('');
        expect(component.params.q).toBeUndefined();
    });

    it('should remove status chip and clear status filter', () => {
        initWithData();
        component.selectedStatusValue = 'true';
        component.params = { ...component.params, is_active: 'true' };
        const chip = component.activeFilterChips.find(c => c.dimension === 'status')!;

        component.onChipRemove(chip);
        httpMock.match(r => r.url === '/api/admin/users').forEach(r => r.flush(mockListResponse));

        expect(component.selectedStatusValue).toBeNull();
        expect(component.params.is_active).toBeUndefined();
    });

    it('should remove role chip and clear role filter', () => {
        initWithData();
        component.selectedRole = 'DEVELOPER';
        component.params = { ...component.params, role: 'DEVELOPER' };
        const chip = component.activeFilterChips.find(c => c.dimension === 'role')!;

        component.onChipRemove(chip);
        httpMock.match(r => r.url === '/api/admin/users').forEach(r => r.flush(mockListResponse));

        expect(component.selectedRole).toBeNull();
        expect(component.params.role).toBeUndefined();
    });

    it('should clear all filters on clearAllFilters()', () => {
        initWithData();
        component.searchValue = 'test';
        component.selectedStatusValue = 'true';
        component.selectedRole = 'DEVELOPER';
        component.params = { ...component.params, q: 'test', is_active: 'true', role: 'DEVELOPER' };

        component.clearAllFilters();
        httpMock.match(r => r.url === '/api/admin/users').forEach(r => r.flush(mockListResponse));

        expect(component.searchValue).toBe('');
        expect(component.selectedStatusValue).toBeNull();
        expect(component.selectedRole).toBeNull();
        expect(component.hasActiveFilters).toBe(false);
    });

    it('should report hasActiveFilters correctly', () => {
        initWithData();
        expect(component.hasActiveFilters).toBe(false);

        component.searchValue = 'test';
        expect(component.hasActiveFilters).toBe(true);

        component.searchValue = '';
        component.selectedStatusValue = 'true';
        expect(component.hasActiveFilters).toBe(true);

        component.selectedStatusValue = null;
        component.selectedRole = 'DEVELOPER';
        expect(component.hasActiveFilters).toBe(true);

        component.selectedRole = null;
        expect(component.hasActiveFilters).toBe(false);
    });

    // ─── Sort controls ───────────────────────────────────────────────

    it('should change sort field and reload', () => {
        initWithData();
        component.sortField = 'username';
        component.onSortFieldChange();
        const reqs = httpMock.match(r =>
            r.url === '/api/admin/users' && r.params.get('_sort') === 'username'
        );
        expect(reqs.length).toBeGreaterThanOrEqual(1);
        reqs.forEach(r => r.flush(mockListResponse));
        expect(component.params._sort).toBe('username');
    });

    it('should toggle sort direction and reload', () => {
        initWithData();
        expect(component.sortOrder).toBe('desc');
        component.onToggleSortOrder();
        const reqs = httpMock.match(r =>
            r.url === '/api/admin/users' && r.params.get('_order') === 'asc'
        );
        expect(reqs.length).toBeGreaterThanOrEqual(1);
        reqs.forEach(r => r.flush(mockListResponse));
        expect(component.sortOrder).toBe('asc');
    });

    it('should sync sort when table header sort is used', () => {
        initWithData();
        component.onSortChange([{ sort: 'username', order: 'asc' }]);
        const reqs = httpMock.match(r =>
            r.url === '/api/admin/users' &&
            r.params.get('_sort') === 'username' &&
            r.params.get('_order') === 'asc'
        );
        expect(reqs.length).toBeGreaterThanOrEqual(1);
        reqs.forEach(r => r.flush(mockListResponse));
        expect(component.sortField).toBe('username');
        expect(component.sortOrder).toBe('asc');
    });

    it('should reset page to 1 on sort change', () => {
        initWithData();
        component.params = { ...component.params, _page: 5 };
        component.onSortChange([{ sort: 'email', order: 'desc' }]);
        const reqs = httpMock.match(r => r.url === '/api/admin/users');
        expect(reqs[0].request.params.get('_page')).toBe('1');
        reqs.forEach(r => r.flush(mockListResponse));
        expect(component.params._page).toBe(1);
    });

    // ─── Pagination ──────────────────────────────────────────────────

    it('should call loadUsers with updated page on pageChange', () => {
        initWithData();
        component.onPageChange({ page: 2, pageSize: 10 });
        const reqs = httpMock.match(r =>
            r.url === '/api/admin/users' && r.params.get('_page') === '3'
        );
        expect(reqs.length).toBeGreaterThanOrEqual(1);
        reqs.forEach(r => r.flush(mockListResponse));
    });

    it('should convert 0-indexed paginator page to 1-indexed API page', () => {
        initWithData();
        component.onPageChange({ page: 0, pageSize: 25 });
        const reqs = httpMock.match(r => r.url === '/api/admin/users');
        expect(reqs[0].request.params.get('_page')).toBe('1');
        expect(reqs[0].request.params.get('_limit')).toBe('25');
        reqs.forEach(r => r.flush(mockListResponse));
    });

    it('should ignore paginator init event before paginatorReady is set', () => {
        fixture.detectChanges();
        httpMock.match(r => r.url === '/api/admin/users').forEach(r => r.flush(mockListResponse));

        // Reset the flag to simulate pre-init state
        (component as any).paginatorReady = false;
        component.onPageChange({ page: 0, pageSize: 10 });
        // No new request should be made
        const reqs = httpMock.match(r => r.url === '/api/admin/users');
        expect(reqs.length).toBe(0);
    });

    // ─── Empty state messages ────────────────────────────────────────

    it('should show default empty message when no filters active', () => {
        initWithData(emptyResponse);
        expect(component.emptyStateMessage).toBe('users.no-users');
    });

    it('should show contextual empty message for search with no results', () => {
        initWithData(emptyResponse);
        component.params = { ...component.params, q: 'nonexistent' };
        expect(component.emptyStateMessage).toBe('users.no-match');
    });

    it('should show contextual empty message for active filter', () => {
        initWithData(emptyResponse);
        component.selectedStatusValue = 'true';
        expect(component.emptyStateMessage).toBe('users.no-active');
    });

    it('should show contextual empty message for inactive filter', () => {
        initWithData(emptyResponse);
        component.selectedStatusValue = 'false';
        expect(component.emptyStateMessage).toBe('users.no-inactive');
    });

    it('should show error empty message when hasLoadError is true', () => {
        initWithData(emptyResponse);
        component.hasLoadError = true;
        expect(component.emptyStateMessage).toBe('users.load-error');
    });

    // ─── Available roles ─────────────────────────────────────────────

    it('should have all 6 roles available', () => {
        initWithData();
        expect(component.availableRoles).toEqual([
            'SUPER_ADMIN', 'PROJECT_ADMIN', 'PRODUCT_OWNER',
            'DEVELOPER', 'REPORTER', 'VIEWER',
        ]);
    });

    // ─── Create form ─────────────────────────────────────────────────

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
            username: 'newuser', firstName: 'New', lastName: 'User',
            email: 'new@taskforge.local', role: 'DEVELOPER',
        });
        expect(component.createForm.valid).toBe(true);
    });

    it('should reject invalid email format', () => {
        initWithData();
        component.createForm.patchValue({ email: 'not-an-email' });
        expect(component.createForm.get('email')?.errors?.['email']).toBeTruthy();
    });

    it('should have all required validators on create form controls', () => {
        initWithData();
        for (const name of ['username', 'firstName', 'lastName', 'email', 'role']) {
            const control = component.createForm.get(name);
            control?.setValue('');
            expect(control?.hasError('required')).toBe(true);
        }
    });

    it('should not call API when form is invalid on submit', () => {
        initWithData();
        component.onCreateUser();
        const postReqs = httpMock.match(r => r.url === '/api/admin/users' && r.method === 'POST');
        expect(postReqs.length).toBe(0);
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
            username: 'newuser', firstName: 'New', lastName: 'User',
            email: 'new@taskforge.local', role: 'DEVELOPER',
        });

        component.createDialog = { closeDialog: vi.fn() } as unknown as EuiDialogComponent;
        component.tempPasswordDialog = { openDialog: vi.fn() } as unknown as EuiDialogComponent;

        component.onCreateUser();

        const postReqs = httpMock.match(r => r.url === '/api/admin/users' && r.method === 'POST');
        expect(postReqs.length).toBe(1);
        expect(postReqs[0].request.body).toEqual({
            username: 'newuser', firstName: 'New', lastName: 'User',
            email: 'new@taskforge.local', role: 'DEVELOPER',
        });

        postReqs[0].flush({
            user: { id: '26', username: 'newuser', email: 'new@taskforge.local', role: 'DEVELOPER', global_role: 'DEVELOPER', firstName: 'New', lastName: 'User', is_active: true, created_at: '2026-02-25T00:00:00Z', updated_at: '2026-02-25T00:00:00Z' },
            temporaryPassword: 'AbCdEf123456',
        });

        // loadUsers() is called after create — flush the GET
        httpMock.match(r => r.url === '/api/admin/users' && r.method === 'GET').forEach(r => r.flush(mockListResponse));

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
            username: 'superadmin', firstName: 'Super', lastName: 'Admin',
            email: 'superadmin@taskforge.local', role: 'SUPER_ADMIN',
        });

        component.createDialog = { closeDialog: vi.fn() } as unknown as EuiDialogComponent;
        component.tempPasswordDialog = { openDialog: vi.fn() } as unknown as EuiDialogComponent;

        component.onCreateUser();

        const postReqs = httpMock.match(r => r.url === '/api/admin/users' && r.method === 'POST');
        postReqs[0].flush(
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

    it('should set tempPasswordTitle to created title on create flow', () => {
        initWithData();
        component.createForm.setValue({
            username: 'newuser', firstName: 'New', lastName: 'User',
            email: 'new@taskforge.local', role: 'DEVELOPER',
        });

        component.createDialog = { closeDialog: vi.fn() } as unknown as EuiDialogComponent;
        component.tempPasswordDialog = { openDialog: vi.fn() } as unknown as EuiDialogComponent;

        component.onCreateUser();

        httpMock.match(r => r.url === '/api/admin/users' && r.method === 'POST')
            .forEach(r => r.flush({
                user: { id: '26', username: 'newuser', email: 'new@taskforge.local', role: 'DEVELOPER', global_role: 'DEVELOPER', firstName: 'New', lastName: 'User', is_active: true, created_at: '2026-02-25T00:00:00Z', updated_at: '2026-02-25T00:00:00Z' },
                temporaryPassword: 'CreatePass123',
            }));
        httpMock.match(r => r.url === '/api/admin/users' && r.method === 'GET').forEach(r => r.flush(mockListResponse));

        expect(component.tempPasswordTitle).toBe('users.dialog.temp-password-title-created');
    });

    // ─── Copy password ───────────────────────────────────────────────

    it('should copy password to clipboard', () => {
        initWithData();
        component.temporaryPassword = 'TestPass123';

        const writeTextMock = vi.fn().mockResolvedValue(undefined);
        Object.assign(navigator, { clipboard: { writeText: writeTextMock } });

        component.copyPassword();

        expect(writeTextMock).toHaveBeenCalledWith('TestPass123');
    });

    // ─── Reset password ──────────────────────────────────────────────

    it('should set selectedUser and open confirmation dialog when onResetPassword is called', () => {
        initWithData();
        const user = mockListResponse.data[0];
        component.resetPasswordDialog = { openDialog: vi.fn() } as unknown as EuiDialogComponent;

        component.onResetPassword(user);

        expect(component.selectedUser).toBe(user);
        expect(component.resetPasswordDialog.openDialog).toHaveBeenCalled();
    });

    it('should call resetPassword API on confirm', () => {
        initWithData();
        component.selectedUser = mockListResponse.data[0];
        component.tempPasswordDialog = { openDialog: vi.fn() } as unknown as EuiDialogComponent;

        component.onConfirmResetPassword();

        const reqs = httpMock.match(r => r.url === '/api/admin/users/1/reset-password' && r.method === 'POST');
        expect(reqs.length).toBe(1);
        reqs[0].flush({ temporaryPassword: 'NewPass789' });

        expect(component.temporaryPassword).toBe('NewPass789');
        expect(component.tempPasswordTitle).toBe('users.dialog.temp-password-title-reset');
        expect(component.tempPasswordDialog.openDialog).toHaveBeenCalled();
    });

    it('should show error growl when reset password API fails', () => {
        initWithData();
        component.selectedUser = mockListResponse.data[0];
        component.tempPasswordDialog = { openDialog: vi.fn() } as unknown as EuiDialogComponent;

        component.onConfirmResetPassword();

        httpMock.match(r => r.url === '/api/admin/users/1/reset-password')
            .forEach(r => r.flush({ message: 'User not found' }, { status: 404, statusText: 'Not Found' }));

        expect(growlServiceMock.growl).toHaveBeenCalledWith(
            expect.objectContaining({ severity: 'error', summary: 'users.growl.reset-failed-summary' })
        );
        expect(component.tempPasswordDialog.openDialog).not.toHaveBeenCalled();
    });

    it('should not call API if selectedUser is null on confirmResetPassword', () => {
        initWithData();
        component.selectedUser = null;
        component.onConfirmResetPassword();
        const reqs = httpMock.match(r => r.url.includes('reset-password'));
        expect(reqs.length).toBe(0);
    });

    it('should set operationPending during reset password operation', () => {
        initWithData();
        component.selectedUser = mockListResponse.data[0];

        component.onConfirmResetPassword();
        expect(component.operationPending).toBe(true);

        httpMock.match(r => r.url === '/api/admin/users/1/reset-password')
            .forEach(r => r.flush({ temporaryPassword: 'NewPass123' }));

        expect(component.operationPending).toBe(false);
    });

    // ─── Deactivate / Reactivate ─────────────────────────────────────

    it('should set selectedUser and open toggle status dialog when onToggleStatus is called', () => {
        initWithData();
        const user = mockListResponse.data[0];
        component.toggleStatusDialog = { openDialog: vi.fn() } as unknown as EuiDialogComponent;

        component.onToggleStatus(user);

        expect(component.selectedUser).toBe(user);
        expect(component.toggleDialogIsDeactivate).toBe(true);
        expect(component.toggleDialogTitle).toBe('users.dialog.deactivate-title');
        expect(component.toggleDialogAcceptLabel).toBe('users.dialog.deactivate-accept');
        expect(component.toggleStatusDialog.openDialog).toHaveBeenCalled();
    });

    it('should set reactivate labels when onToggleStatus is called for inactive user', () => {
        initWithData();
        const user = mockListResponse.data[1];
        component.toggleStatusDialog = { openDialog: vi.fn() } as unknown as EuiDialogComponent;

        component.onToggleStatus(user);

        expect(component.toggleDialogIsDeactivate).toBe(false);
        expect(component.toggleDialogTitle).toBe('users.dialog.reactivate-title');
        expect(component.toggleDialogAcceptLabel).toBe('users.dialog.reactivate-accept');
    });

    it('should call deactivateUser API when confirming for an active user', () => {
        initWithData();
        component.selectedUser = { ...mockListResponse.data[0], is_active: true };
        component.toggleDialogIsDeactivate = true;

        component.onConfirmToggleStatus();

        const reqs = httpMock.match(r => r.url === '/api/admin/users/1/deactivate' && r.method === 'PATCH');
        expect(reqs.length).toBe(1);
        reqs[0].flush({ ...mockListResponse.data[0], is_active: false });

        httpMock.match(r => r.url === '/api/admin/users' && r.method === 'GET').forEach(r => r.flush(mockListResponse));

        expect(growlServiceMock.growl).toHaveBeenCalledWith(
            expect.objectContaining({ severity: 'success', summary: 'users.growl.deactivated-summary' })
        );
    });

    it('should call reactivateUser API when confirming for an inactive user', () => {
        initWithData();
        component.selectedUser = { ...mockListResponse.data[1], is_active: false };
        component.toggleDialogIsDeactivate = false;

        component.onConfirmToggleStatus();

        const reqs = httpMock.match(r => r.url === '/api/admin/users/7/reactivate' && r.method === 'PATCH');
        expect(reqs.length).toBe(1);
        reqs[0].flush({ ...mockListResponse.data[1], is_active: true });

        httpMock.match(r => r.url === '/api/admin/users' && r.method === 'GET').forEach(r => r.flush(mockListResponse));

        expect(growlServiceMock.growl).toHaveBeenCalledWith(
            expect.objectContaining({ severity: 'success', summary: 'users.growl.reactivated-summary' })
        );
    });

    it('should show error growl with backend message on 409 deactivate error', () => {
        initWithData();
        component.selectedUser = { ...mockListResponse.data[0], is_active: true };
        component.toggleDialogIsDeactivate = true;

        component.onConfirmToggleStatus();

        httpMock.match(r => r.url === '/api/admin/users/1/deactivate')
            .forEach(r => r.flush(
                { message: 'Cannot deactivate the last active SUPER_ADMIN user' },
                { status: 409, statusText: 'Conflict' }
            ));

        expect(growlServiceMock.growl).toHaveBeenCalledWith(
            expect.objectContaining({
                severity: 'error',
                detail: 'Cannot deactivate the last active SUPER_ADMIN user',
            })
        );
    });

    it('should show error growl on reactivate error', () => {
        initWithData();
        component.selectedUser = { ...mockListResponse.data[1], is_active: false };
        component.toggleDialogIsDeactivate = false;

        component.onConfirmToggleStatus();

        httpMock.match(r => r.url === '/api/admin/users/7/reactivate')
            .forEach(r => r.flush(
                { message: 'User not found' },
                { status: 404, statusText: 'Not Found' }
            ));

        expect(growlServiceMock.growl).toHaveBeenCalledWith(
            expect.objectContaining({ severity: 'error', summary: 'users.growl.action-failed-summary' })
        );
    });

    it('should not call API if selectedUser is null on confirmToggleStatus', () => {
        initWithData();
        component.selectedUser = null;
        component.onConfirmToggleStatus();
        const reqs = httpMock.match(r => r.url.includes('deactivate') || r.url.includes('reactivate'));
        expect(reqs.length).toBe(0);
    });

    it('should set operationPending during toggle status operation', () => {
        initWithData();
        component.selectedUser = mockListResponse.data[0];
        component.toggleDialogIsDeactivate = true;

        component.onConfirmToggleStatus();
        expect(component.operationPending).toBe(true);

        httpMock.match(r => r.url === '/api/admin/users/1/deactivate')
            .forEach(r => r.flush({ ...mockListResponse.data[0], is_active: false }));
        httpMock.match(r => r.url === '/api/admin/users').forEach(r => r.flush(mockListResponse));

        expect(component.operationPending).toBe(false);
    });
});
