import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EUI_TABLE } from '@eui/components/eui-table';
import { EUI_PAGINATOR } from '@eui/components/eui-paginator';
import { EuiTemplateDirective } from '@eui/components/directives';
import { User } from '../users/users.component';

@Component({
    templateUrl: './table-pagination.component.html',
    imports: [
        ...EUI_PAGE,
        ...EUI_TABLE,
        ...EUI_PAGINATOR,
        EuiTemplateDirective,
    ],
})
export class TablePaginationComponent implements OnInit {
    private http = inject(HttpClient);
    users: User[] = [];

    ngOnInit(): void {
        this.http.get<User[]>('/api/users').subscribe(data => {
            this.users = data;
        });
    }
}
