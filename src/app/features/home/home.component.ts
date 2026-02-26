import { Component, inject, OnInit } from '@angular/core';
import { CONFIG_TOKEN, EuiAppConfig } from '@eui/core';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EuiBreadcrumbService } from '@eui/components/eui-breadcrumb';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    templateUrl: './home.component.html',
    imports: [
        TranslateModule,
        ...EUI_PAGE,
    ],
})
export class HomeComponent implements OnInit {
    protected config: EuiAppConfig = inject(CONFIG_TOKEN);
    private readonly breadcrumbService = inject(EuiBreadcrumbService);

    ngOnInit(): void {
        this.breadcrumbService.setBreadcrumb([]);
    }
}
