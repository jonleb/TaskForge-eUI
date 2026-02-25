import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EUI_TREE, EuiTreeComponent, TreeDataModel } from '@eui/components/eui-tree';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Type-label-class',
    templateUrl: 'component.html',
    imports: [...EUI_TREE, ...EUI_INPUT_CHECKBOX],
})
export class TypeLabelClassComponent implements AfterViewInit {
    public treeData: TreeDataModel = [
        {
            node: {
                treeContentBlock: {
                    label: 'Node 1',
                    typeLabel: 'PRIMARY',
                    typeClass: 'primary',
                },
            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.1',
                            typeLabel: 'SECONDARY',
                            typeClass: 'secondary',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.2',
                            typeLabel: 'INFO',
                            typeClass: 'info',
                        },
                    },
                    children: [
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'Node 1.2.1',
                                    typeLabel: 'SUCCESS',
                                    typeClass: 'success',
                                },
                            },
                        },
                    ],
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.3',
                            typeLabel: 'WARNING',
                            typeClass: 'warning',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.4',
                            typeLabel: 'DANGER',
                            typeClass: 'danger',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.5',
                            typeLabel: 'ACCENT',
                            typeClass: 'accent',
                        },
                    },
                },
            ],
        },
    ];

    @ViewChild('compInstance') public compInstance: EuiTreeComponent;

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.compInstance.expandAll();
        });
    }
}
