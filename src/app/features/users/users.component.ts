import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EUI_TABLE } from '@eui/components/eui-table';
import { EuiTemplateDirective } from '@eui/components/directives';

export interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    is_active: boolean;
}

@Component({
    templateUrl: './users.component.html',
    imports: [
        ...EUI_PAGE,
        ...EUI_TABLE,
        EuiTemplateDirective,
    ],
})
export class UsersComponent implements OnInit {
    private http = inject(HttpClient);
    users: User[] = [];

    ngOnInit(): void {
        this.http.get<User[]>('/api/users').subscribe(data => {
            this.users = data;
        });
    }
}
