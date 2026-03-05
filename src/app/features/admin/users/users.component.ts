import { Component, inject, OnInit, OnDestroy, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EUI_TABLE, Sort } from '@eui/components/eui-table';
import { EuiTemplateDirective } from '@eui/components/directives';
import { EuiPaginatorComponent } from '@eui/components/eui-paginator';
import { EUI_ICON_BUTTON } from '@eui/components/eui-icon-button';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EuiDialogComponent } from '@eui/components/eui-dialog';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_CHIP_LIST } from '@eui/components/eui-chip-list';
import { EUI_PROGRESS_BAR } from '@eui/components/eui-progress-bar';
import { EuiGrowlService } from '@eui/core';
import { EuiBreadcrumbService } from '@eui/components/eui-breadcrumb';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AdminUserService } from './admin-user.service';
import { AdminUser, AdminUserListParams, UserRole } from './admin-user.models';

export interface UserFilterChip {
    key: string;
    dimension: 'search' | 'status' | 'role';
    value: string;
    label: string;
}

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...EUI_PAGE,
        ...EUI_TABLE,
        ...EUI_ICON_BUTTON,
        ...EUI_BUTTON,
        ...EUI_INPUT_TEXT,
        ...EUI_SELECT,
        ...EUI_LABEL,
        ...EUI_INPUT_GROUP,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_CHIP,
        ...EUI_CHIP_LIST,
        ...EUI_PROGRESS_BAR,
        EuiTemplateDirective,
        EuiPaginatorComponent,
        EuiDialogComponent,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule,
    ],
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
    private readonly adminUserService = inject(AdminUserService);
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly fb = inject(FormBuilder);
    private readonly growlService = inject(EuiGrowlService);
    private readonly breadcrumbService = inject(EuiBreadcrumbService);
    private readonly translate = inject(TranslateService);
    private readonly destroy$ = new Subject<void>();
    private readonly searchSubject = new Subject<string>();
    private paginatorReady = false;

    @ViewChild('createDialog') createDialog!: EuiDialogComponent;
    @ViewChild('tempPasswordDialog') tempPasswordDialog!: EuiDialogComponent;
    @ViewChild('resetPasswordDialog') resetPasswordDialog!: EuiDialogComponent;
    @ViewChild('toggleStatusDialog') toggleStatusDialog!: EuiDialogComponent;

    users: AdminUser[] = [];
    total = 0;
    loading = false;
    hasLoadError = false;
    operationPending = false;
    selectedUser: AdminUser | null = null;
    tempPasswordTitle = '';
    toggleDialogTitle = '';
    toggleDialogAcceptLabel = '';
    toggleDialogIsDeactivate = false;

    params: AdminUserListParams = {
        _page: 1,
        _limit: 10,
        _sort: 'created_at',
        _order: 'desc',
    };

    // ─── Filter sidebar ──────────────────────────────────────────────
    isFilterCollapsed = false;
    searchValue = '';
    selectedStatusValue: 'true' | 'false' | null = null;
    selectedRole: string | null = null;

    // ─── Sort ────────────────────────────────────────────────────────
    sortField = 'created_at';
    sortOrder: 'asc' | 'desc' = 'desc';

    // ─── Chip overflow ───────────────────────────────────────────────
    readonly MAX_VISIBLE_CHIPS = 5;

    // ─── Create user form ────────────────────────────────────────────
    availableRoles: UserRole[] = [
        'SUPER_ADMIN', 'PROJECT_ADMIN', 'PRODUCT_OWNER',
        'DEVELOPER', 'REPORTER', 'VIEWER',
    ];

    createForm: FormGroup = this.fb.group({
        username: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        role: ['', Validators.required],
    });

    createError = '';
    temporaryPassword = '';

    // ─── Lifecycle ───────────────────────────────────────────────────

    ngOnInit(): void {
        this.breadcrumbService.setBreadcrumb([
            { id: 'users', label: this.translate.instant('nav.users'), link: null },
        ]);

        this.searchSubject.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            takeUntil(this.destroy$),
        ).subscribe(q => {
            this.params = { ...this.params, q: q || undefined, _page: 1 };
            this.loadUsers();
        });

        this.loadUsers();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngAfterViewInit(): void {
        this.paginatorReady = true;
    }

    // ─── Table data ──────────────────────────────────────────────────

    loadUsers(): void {
        this.loading = true;
        this.hasLoadError = false;
        this.cdr.markForCheck();

        this.adminUserService.getUsers(this.params).subscribe({
            next: res => {
                this.users = res.data;
                this.total = res.total;
                this.loading = false;
                this.cdr.markForCheck();
            },
            error: () => {
                this.users = [];
                this.total = 0;
                this.loading = false;
                this.hasLoadError = true;
                this.growlService.growl({
                    severity: 'error',
                    summary: this.translate.instant('users.growl.load-failed-summary'),
                    detail: this.translate.instant('users.growl.load-failed-detail'),
                });
                this.cdr.markForCheck();
            },
        });
    }

    // ─── Filter sidebar ──────────────────────────────────────────────

    onFilterColumnCollapse(collapsed: boolean): void {
        this.isFilterCollapsed = collapsed;
    }

    onFilterChange(value: string): void {
        this.searchValue = value;
        this.searchSubject.next(value);
    }

    onStatusSelectChange(): void {
        this.params = { ...this.params, is_active: this.selectedStatusValue ?? undefined, _page: 1 };
        this.loadUsers();
    }

    onRoleSelectChange(): void {
        this.params = { ...this.params, role: this.selectedRole || undefined, _page: 1 };
        this.loadUsers();
    }

    // ─── Sort ────────────────────────────────────────────────────────

    onSortFieldChange(): void {
        this.params = { ...this.params, _sort: this.sortField, _page: 1 };
        this.loadUsers();
    }

    onToggleSortOrder(): void {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        this.params = { ...this.params, _order: this.sortOrder, _page: 1 };
        this.loadUsers();
    }

    onSortChange(sort: Sort[]): void {
        if (sort.length > 0) {
            this.sortField = sort[0].sort;
            this.sortOrder = sort[0].order.toLowerCase() as 'asc' | 'desc';
            this.params = {
                ...this.params,
                _sort: this.sortField,
                _order: this.sortOrder,
                _page: 1,
            };
        }
        this.loadUsers();
    }

    // ─── Pagination ──────────────────────────────────────────────────

    onPageChange(event: { page: number; pageSize: number }): void {
        if (!this.paginatorReady) {
            return;
        }
        this.params = {
            ...this.params,
            _page: event.page + 1,
            _limit: event.pageSize,
        };
        this.loadUsers();
    }

    // ─── Filter chips ────────────────────────────────────────────────

    get activeFilterChips(): UserFilterChip[] {
        const chips: UserFilterChip[] = [];
        if (this.searchValue) {
            chips.push({ key: 'search', dimension: 'search', value: this.searchValue,
                label: this.translate.instant('users.chip.search', { term: this.searchValue }) });
        }
        if (this.selectedStatusValue) {
            const statusLabel = this.selectedStatusValue === 'true'
                ? this.translate.instant('common.active')
                : this.translate.instant('common.inactive');
            chips.push({ key: 'status', dimension: 'status', value: this.selectedStatusValue,
                label: this.translate.instant('users.chip.status', { value: statusLabel }) });
        }
        if (this.selectedRole) {
            chips.push({ key: 'role', dimension: 'role', value: this.selectedRole,
                label: this.translate.instant('users.chip.role', { value: this.selectedRole }) });
        }
        return chips;
    }

    get visibleChips(): UserFilterChip[] {
        return this.activeFilterChips.slice(0, this.MAX_VISIBLE_CHIPS);
    }

    get hasOverflowChips(): boolean {
        return this.activeFilterChips.length > this.MAX_VISIBLE_CHIPS;
    }

    get overflowChipCount(): number {
        return this.activeFilterChips.length - this.MAX_VISIBLE_CHIPS;
    }

    get hasActiveFilters(): boolean {
        return this.activeFilterChips.length > 0;
    }

    onChipRemove(chip: UserFilterChip): void {
        switch (chip.dimension) {
            case 'search':
                this.searchValue = '';
                this.params = { ...this.params, q: undefined, _page: 1 };
                break;
            case 'status':
                this.selectedStatusValue = null;
                this.params = { ...this.params, is_active: undefined, _page: 1 };
                break;
            case 'role':
                this.selectedRole = null;
                this.params = { ...this.params, role: undefined, _page: 1 };
                break;
        }
        this.loadUsers();
    }

    clearAllFilters(): void {
        this.searchValue = '';
        this.selectedStatusValue = null;
        this.selectedRole = null;
        this.params = { _page: 1, _limit: this.params._limit, _sort: this.params._sort, _order: this.params._order };
        this.loadUsers();
    }

    // ─── Empty state ─────────────────────────────────────────────────

    get emptyStateMessage(): string {
        if (this.hasLoadError) {
            return this.translate.instant('users.load-error');
        }
        if (this.params.q) {
            return this.translate.instant('users.no-match');
        }
        if (this.selectedStatusValue === 'true') {
            return this.translate.instant('users.no-active');
        }
        if (this.selectedStatusValue === 'false') {
            return this.translate.instant('users.no-inactive');
        }
        return this.translate.instant('users.no-users');
    }

    // ─── Create user ─────────────────────────────────────────────────

    onCreateUser(): void {
        if (this.createForm.invalid) {
            this.createForm.markAllAsTouched();
            return;
        }

        this.createError = '';
        this.operationPending = true;
        this.adminUserService.createUser(this.createForm.value).subscribe({
            next: res => {
                this.operationPending = false;
                this.temporaryPassword = res.temporaryPassword;
                this.tempPasswordTitle = this.translate.instant('users.dialog.temp-password-title-created');
                this.createDialog.closeDialog();
                this.resetCreateForm();
                this.loadUsers();
                this.tempPasswordDialog.openDialog();
                this.growlService.growl({ severity: 'success', summary: this.translate.instant('users.growl.created-summary'), detail: this.translate.instant('users.growl.created-detail', { username: res.user.username }) });
                this.cdr.markForCheck();
            },
            error: err => {
                this.operationPending = false;
                this.createError = err.error?.message || this.translate.instant('users.error.create-default');
                this.cdr.markForCheck();
            },
        });
    }

    resetCreateForm(): void {
        this.createForm.reset();
        this.createError = '';
    }

    copyPassword(): void {
        navigator.clipboard.writeText(this.temporaryPassword).then(() => {
            this.growlService.growl({ severity: 'success', summary: this.translate.instant('users.growl.copied-summary'), detail: this.translate.instant('users.growl.copied-detail') });
        });
    }

    // ─── Reset password ──────────────────────────────────────────────

    onResetPassword(user: AdminUser): void {
        this.selectedUser = user;
        this.resetPasswordDialog.openDialog();
    }

    onConfirmResetPassword(): void {
        if (!this.selectedUser) {
            return;
        }

        this.operationPending = true;
        this.adminUserService.resetPassword(this.selectedUser.id).subscribe({
            next: res => {
                this.operationPending = false;
                this.temporaryPassword = res.temporaryPassword;
                this.tempPasswordTitle = this.translate.instant('users.dialog.temp-password-title-reset');
                this.tempPasswordDialog.openDialog();
                this.cdr.markForCheck();
            },
            error: err => {
                this.operationPending = false;
                this.growlService.growl({
                    severity: 'error',
                    summary: this.translate.instant('users.growl.reset-failed-summary'),
                    detail: err.error?.message || this.translate.instant('users.growl.reset-failed-detail'),
                });
                this.cdr.markForCheck();
            },
        });
    }

    // ─── Deactivate / Reactivate ─────────────────────────────────────

    onToggleStatus(user: AdminUser): void {
        this.selectedUser = user;
        this.toggleDialogIsDeactivate = user.is_active;
        this.toggleDialogTitle = user.is_active
            ? this.translate.instant('users.dialog.deactivate-title')
            : this.translate.instant('users.dialog.reactivate-title');
        this.toggleDialogAcceptLabel = user.is_active
            ? this.translate.instant('users.dialog.deactivate-accept')
            : this.translate.instant('users.dialog.reactivate-accept');
        this.cdr.detectChanges();
        this.toggleStatusDialog.openDialog();
    }

    onConfirmToggleStatus(): void {
        if (!this.selectedUser) {
            return;
        }

        const isDeactivate = this.toggleDialogIsDeactivate;
        const action$ = isDeactivate
            ? this.adminUserService.deactivateUser(this.selectedUser.id)
            : this.adminUserService.reactivateUser(this.selectedUser.id);
        const username = this.selectedUser.username;

        this.operationPending = true;
        action$.subscribe({
            next: () => {
                this.operationPending = false;
                this.loadUsers();
                this.growlService.growl({
                    severity: 'success',
                    summary: isDeactivate
                        ? this.translate.instant('users.growl.deactivated-summary')
                        : this.translate.instant('users.growl.reactivated-summary'),
                    detail: isDeactivate
                        ? this.translate.instant('users.growl.deactivated-detail', { username })
                        : this.translate.instant('users.growl.reactivated-detail', { username }),
                });
                this.cdr.markForCheck();
            },
            error: err => {
                this.operationPending = false;
                this.growlService.growl({
                    severity: 'error',
                    summary: this.translate.instant('users.growl.action-failed-summary'),
                    detail: err.error?.message || (isDeactivate
                        ? this.translate.instant('users.growl.deactivate-failed-detail')
                        : this.translate.instant('users.growl.reactivate-failed-detail')),
                });
                this.cdr.markForCheck();
            },
        });
    }
}
