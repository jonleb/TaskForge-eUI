import { Component, inject, OnInit, OnDestroy, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
import { EUI_TOGGLE_GROUP, EuiToggleGroupItemComponent } from '@eui/components/eui-toggle-group';
import { EuiGrowlService } from '@eui/core';
import { AdminUserService } from './admin-user.service';
import { AdminUser, AdminUserListParams, UserRole } from './admin-user.models';

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
        ...EUI_TOGGLE_GROUP,
        EuiTemplateDirective,
        EuiPaginatorComponent,
        EuiDialogComponent,
        ReactiveFormsModule,
    ],
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
    private readonly adminUserService = inject(AdminUserService);
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly fb = inject(FormBuilder);
    private readonly growlService = inject(EuiGrowlService);
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
    activeStatusFilter: 'all' | 'active' | 'inactive' = 'all';
    selectedUser: AdminUser | null = null;
    tempPasswordTitle = 'User Created Successfully';
    toggleDialogTitle = '';
    toggleDialogAcceptLabel = '';
    toggleDialogIsDeactivate = false;

    params: AdminUserListParams = {
        _page: 1,
        _limit: 10,
        _sort: 'created_at',
        _order: 'desc',
    };

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
                    summary: 'Load failed',
                    detail: 'Could not load users. Please try again.',
                });
                this.cdr.markForCheck();
            },
        });
    }

    onFilterChange(searchTerm: string): void {
        this.searchSubject.next(searchTerm);
    }

    onSortChange(sort: Sort[]): void {
        if (sort.length > 0) {
            this.params = {
                ...this.params,
                _sort: sort[0].sort,
                _order: sort[0].order.toLowerCase() as 'asc' | 'desc',
                _page: 1,
            };
        }
        this.loadUsers();
    }

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

    onStatusFilterChange(item: EuiToggleGroupItemComponent): void {
        const filterMap: Record<string, 'all' | 'active' | 'inactive'> = {
            'status-all': 'all',
            'status-active': 'active',
            'status-inactive': 'inactive',
        };
        this.activeStatusFilter = filterMap[item.id] ?? 'all';

        const isActiveMap: Record<string, 'true' | 'false' | undefined> = {
            'all': undefined,
            'active': 'true',
            'inactive': 'false',
        };
        this.params = {
            ...this.params,
            is_active: isActiveMap[this.activeStatusFilter],
            _page: 1,
        };
        this.loadUsers();
    }

    get emptyStateMessage(): string {
        if (this.hasLoadError) {
            return 'An error occurred while loading users.';
        }
        if (this.params.q) {
            return 'No users match your search criteria.';
        }
        if (this.activeStatusFilter === 'active') {
            return 'No active users found.';
        }
        if (this.activeStatusFilter === 'inactive') {
            return 'No inactive users found.';
        }
        return 'No users found.';
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
                this.tempPasswordTitle = 'User Created Successfully';
                this.createDialog.closeDialog();
                this.resetCreateForm();
                this.loadUsers();
                this.tempPasswordDialog.openDialog();
                this.growlService.growl({ severity: 'success', summary: 'User created', detail: `Account for ${res.user.username} has been created.` });
                this.cdr.markForCheck();
            },
            error: err => {
                this.operationPending = false;
                this.createError = err.error?.message || 'An error occurred while creating the user';
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
            this.growlService.growl({ severity: 'success', summary: 'Copied', detail: 'Password copied to clipboard.' });
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
                this.tempPasswordTitle = 'Password Reset Successfully';
                this.tempPasswordDialog.openDialog();
                this.cdr.markForCheck();
            },
            error: err => {
                this.operationPending = false;
                this.growlService.growl({
                    severity: 'error',
                    summary: 'Reset failed',
                    detail: err.error?.message || 'Could not reset password. Please try again.',
                });
                this.cdr.markForCheck();
            },
        });
    }

    // ─── Deactivate / Reactivate ─────────────────────────────────────

    onToggleStatus(user: AdminUser): void {
        this.selectedUser = user;
        this.toggleDialogIsDeactivate = user.is_active;
        this.toggleDialogTitle = user.is_active ? 'Deactivate User' : 'Reactivate User';
        this.toggleDialogAcceptLabel = user.is_active ? 'Deactivate' : 'Reactivate';
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
        const actionLabel = isDeactivate ? 'deactivated' : 'reactivated';
        const username = this.selectedUser.username;

        this.operationPending = true;
        action$.subscribe({
            next: () => {
                this.operationPending = false;
                this.loadUsers();
                this.growlService.growl({
                    severity: 'success',
                    summary: `User ${actionLabel}`,
                    detail: `${username} has been ${actionLabel}.`,
                });
                this.cdr.markForCheck();
            },
            error: err => {
                this.operationPending = false;
                this.growlService.growl({
                    severity: 'error',
                    summary: 'Action failed',
                    detail: err.error?.message || `Could not ${isDeactivate ? 'deactivate' : 'reactivate'} user. Please try again.`,
                });
                this.cdr.markForCheck();
            },
        });
    }
}
