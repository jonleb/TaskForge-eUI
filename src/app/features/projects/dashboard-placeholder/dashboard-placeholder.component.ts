import { Component, inject } from '@angular/core';
import { EUI_PAGE } from '@eui/components/eui-page';
import { ProjectContextService } from '../../../core/project';

@Component({
    selector: 'app-dashboard-placeholder',
    template: `
        <eui-page>
            <eui-page-header [label]="projectContext.getCurrentProject()?.name ?? 'Project'"></eui-page-header>
            <eui-page-content>
                <p>Project dashboard — coming soon.</p>
            </eui-page-content>
        </eui-page>
    `,
    imports: [...EUI_PAGE],
})
export class DashboardPlaceholderComponent {
    readonly projectContext = inject(ProjectContextService);
}
