import { Component } from '@angular/core';

import { EuiPermissionService } from '@eui/core';
import { ConditionOperator, EuiHasPermissionDirective } from '@eui/components/directives';
import { EuiButtonComponent } from '@eui/components/eui-button';
import { AsyncPipe } from '@angular/common';
import { EuiLabelComponent } from '@eui/components/eui-label';

@Component({
    // tslint:disable-next-line
    selector: "Default",
    templateUrl: "component.html",
	imports: [EuiHasPermissionDirective, EuiButtonComponent, AsyncPipe, EuiLabelComponent],
})
export class DefaultComponent {
    public render: boolean;
    public operator = ConditionOperator.OR;

    constructor(protected euiPermissionService: EuiPermissionService) {
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
