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
import { EuiGrowlService } from '@eui/core';
import { AdminUserService } from './admin-user.service';
import { AdminUser, AdminUserListParams, UserRole } from './admin-user.models';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
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

    users: AdminUser[] = [];
    total = 0;
    loading = false;
    selectedUser: AdminUser | null = null;
    tempPasswordTitle = 'User Created Successfully';

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

    // ─── Create user ─────────────────────────────────────────────────

    onCreateUser(): void {
        if (this.createForm.invalid) {
            this.createForm.markAllAsTouched();
            return;
        }

        this.createError = '';
        this.adminUserService.createUser(this.createForm.value).subscribe({
            next: res => {
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

        this.adminUserService.resetPassword(this.selectedUser.id).subscribe({
            next: res => {
                this.temporaryPassword = res.temporaryPassword;
                this.tempPasswordTitle = 'Password Reset Successfully';
                this.tempPasswordDialog.openDialog();
                this.cdr.markForCheck();
            },
            error: err => {
                this.growlService.growl({
                    severity: 'error',
                    summary: 'Reset failed',
                    detail: err.error?.message || 'Could not reset password. Please try again.',
                });
            },
        });
    }
}
