import { Component, inject, OnInit, OnDestroy, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EUI_TABLE, Sort } from '@eui/components/eui-table';
import { EuiTemplateDirective } from '@eui/components/directives';
import { EuiPaginatorComponent } from '@eui/components/eui-paginator';
import { EUI_ICON_BUTTON } from '@eui/components/eui-icon-button';
import { AdminUserService } from './admin-user.service';
import { AdminUser, AdminUserListParams } from './admin-user.models';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...EUI_PAGE,
        ...EUI_TABLE,
        ...EUI_ICON_BUTTON,
        EuiTemplateDirective,
        EuiPaginatorComponent,
    ],
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
    private readonly adminUserService = inject(AdminUserService);
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly destroy$ = new Subject<void>();
    private readonly searchSubject = new Subject<string>();
    private paginatorReady = false;

    users: AdminUser[] = [];
    total = 0;
    loading = false;

    params: AdminUserListParams = {
        _page: 1,
        _limit: 10,
        _sort: 'created_at',
        _order: 'desc',
    };

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
        // Skip paginator init event that fires before view is stable (causes NG0100)
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
}
