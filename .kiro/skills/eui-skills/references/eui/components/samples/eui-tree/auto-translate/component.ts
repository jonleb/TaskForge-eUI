import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { EUI_TREE, TreeDataModel } from '@eui/components/eui-tree';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Auto-translate',
    templateUrl: 'component.html',
    imports: [...EUI_TREE, ...EUI_SLIDE_TOGGLE],
    providers: [TranslateService],
})
export class AutoTranslateComponent {
    autoTranslate: boolean;
    treeData: TreeDataModel = [
        {
            node: {
                treeContentBlock: {
                    label: 'Node.0',
                    urlExternal: 'https://google.fr',
                    urlExternalTarget: '_blank',
                },
            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node.1',
                        },
                    },
                },
            ],
        },
    ];

    constructor(private translateService: TranslateService) {
        this.translateService.set('Node.0', 'Node 0 Translated', 'en');
        this.translateService.set('Node.1', 'Node 1 Translated', 'en');
    }

    onChange(evt: boolean): void {
        this.autoTranslate = evt;
    }
}
