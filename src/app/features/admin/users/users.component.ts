import { Component } from '@angular/core';
import { EUI_PAGE } from '@eui/components/eui-page';

@Component({
    selector: 'app-users',
    template: `
        <eui-page>
            <eui-page-header label="User Administration" />
            <eui-page-content>
                <p>User management features will be implemented in a future story.</p>
            </eui-page-content>
        </eui-page>
    `,
    imports: [...EUI_PAGE],
})
export class UsersComponent {}
