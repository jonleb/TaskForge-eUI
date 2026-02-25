---
description: Demonstrates conditional rendering based on user permissions using *euiHasPermission directive. Shows how to check single or multiple rights/permissions with AND/OR operators, and conditionally display content based on the EuiPermissionService state.
id: Default
---

```html
<h3>Permissions service loaded Rights and their Permissions</h3>
@let rights = this.euiPermissionService.getState() | async;
@for (right of rights; track right) {
    @let permissions = right.permissions;
    <ol>
        {{right.id}}
        @if(permissions) {
            <ul>
                @for(permission of permissions; track permission) {
                    <li>{{permission}}</li>
                }
            </ul>
        }
    </ol>
}
<!--Using render is not necessary If you initialise the permission service at app starter level.
Check our dev guide in order to learn how to use AppStarterService.-->
@if (render) {
    <h3>AND operator (default)</h3>
    <!--As we initialised the user rights which includes RIGHT_ID_1 & PERMISSION_ID_1-->
    <div class="row" *euiHasPermission="['RIGHT_ID_1']">['RIGHT_ID_1'] SHOULD BE SEEN</div>
    <div class="row" *euiHasPermission="['RIGHT_ID_1.PERMISSION_ID_1']">
        ['RIGHT_ID_1.PERMISSION_ID_1'] SHOULD BE SEEN
    </div>

    <!--As we initialised the user rights which includes RIGHT_ID_1 & PERMISSION_ID_1-->
    <div class="row" *euiHasPermission="['RIGHT_ID_1.PERMISSION_ID_2']">
        ['RIGHT_ID_1.PERMISSION_ID_2'] SHOULD BE SEEN
    </div>

    <!--As user has the all of the required RightId,PermissionId pairs, It will not show-->
    <div class="row" *euiHasPermission="['RIGHT_ID_1.PERMISSION_ID_1','RIGHT_ID_1.PERMISSION_ID_2']">
        ['RIGHT_ID_1.PERMISSION_ID_1','RIGHT_ID_1.PERMISSION_ID_2'] SHOULD BE SEEN
    </div>

    <!--As user doesn't have the (RIGHT_ID_2,PERMISSION_ID_1) -->
    <div class="row" *euiHasPermission="['RIGHT_ID_2.PERMISSION_ID_1']">SHOULD NOT BE SEEN</div>

    <!--As user doesn't have the all of the required RightId,PermissionId pairs, It will not show-->
    <div class="row" *euiHasPermission="['RIGHT_ID_1.PERMISSION_ID_2','RIGHT_ID_2.PERMISSION_ID_2']">SHOULD NOT BE
        SEEN
    </div>

    <h3>OR Operator</h3>

    <span euiLabel><b>Current operator is:</b> {{operator}}</span>
    <br>
    <button euiButton (click)="changeOperator()">Change Operator from {{ operator }}</button>
    <!-- Or operator can be used -->
    <div class="row" *euiHasPermission="['RIGHT_ID_2','RIGHT_WITHOUT_PERMISSIONS']; operator: operator">
        RIGHT_ID_1 or RIGHT_WITHOUT_PERMISSIONS SHOULD BE SEEN
    </div>

    <ng-template
        [euiHasPermission]="['RIGHT_ID_2.PERMISSION_ID_1', 'RIGHT_WITHOUT_PERMISSIONS']"
        [euiHasPermissionOperator]="operator"
    >
        <div class="row">
            RIGHT_WITHOUT_PERMISSIONS SHOULD BE SEEN
        </div>
    </ng-template>
}
```

```typescript
import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';

import { EuiPermissionService } from '@eui/core';
import { ConditionOperator, EuiHasPermissionDirective } from '@eui/components/directives';
import { EuiButtonComponent } from '@eui/components/eui-button';
import { AsyncPipe } from '@angular/common';
import { EuiLabelComponent } from '@eui/components/eui-label';

@Component({
    selector: "Default",
    templateUrl: "component.html",
	imports: [EuiHasPermissionDirective, EuiButtonComponent, AsyncPipe, EuiLabelComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent implements OnInit {
    public render: boolean;
    public operator = ConditionOperator.OR;

    protected euiPermissionService: EuiPermissionService = inject(EuiPermissionService);

    ngOnInit(): void {
        this.initEuiPermissionService();
    }

    /*
     This initialization should be done in AppStarterService,
     Here, It has been implemented for the showcase purposes
     */
    initEuiPermissionService() {
        this.euiPermissionService.init([{
            id: "RIGHT_ID_1",
            permissions: ["PERMISSION_ID_1", "PERMISSION_ID_2"],
        }, {
			id: 'RIGHT_WITHOUT_PERMISSIONS',
		}]).subscribe(() => {
            this.render = true;
        });
    }

	changeOperator() {
		this.operator = this.operator === ConditionOperator.OR ? ConditionOperator.AND : ConditionOperator.OR;
	}

	protected readonly ConditionOperator = ConditionOperator;
}
```

