---
description: Custom node template for single select with badge right content.
id: custom-node-template-single-select
---

```html
<eui-tree [nodes]="treeData" [nodeTemplateRef]="nodeTemplateCustom" isSingleSelect (selectionChange)="onSelectionChange($event)" />

<ng-template let-node #nodeTemplateCustom let-onSelect="onSelect" let-id2="id" let-children>
    <div (click)="onSelect({ target: { checked: !node.isSelected } })" class="eui-tree-node-wrapper__container-middle">
        <label
            euiLabel
            class="eui-u-text-truncate eui-u-p-2xs"
            [class.eui-label--selected]="node?.isSelected"
            [class.eui-u-cursor-pointer]="node?.selectable">
            {{ node?.treeContentBlock?.label }}
        </label>
    </div>

    @if (node?.treeContentBlock?.rightContent) {
        <div (click)="onSelect({ target: { checked: !node.isSelected } })" class="eui-tree-node-wrapper__container-right">
            @for (badge of node.treeContentBlock.rightContent?.badges; track $index) {
                <eui-badge euiSizeM euiOutline [euiVariant]="badge.typeClass || 'secondary'" class="eui-u-ml-xs">
                    <span euiLabel>{{ badge.label }}</span>
                </eui-badge>
            }
        </div>
    }
</ng-template>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_TREE, EuiTreeSelectionChanges, TreeDataModel } from '@eui/components/eui-tree';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_BADGE } from '@eui/components/eui-badge';

@Component({
    selector: 'custom-node-template-single-select',
    templateUrl: 'component.html',
    imports: [
        ...EUI_TREE,
        ...EUI_LABEL,
        ...EUI_ICON,
        ...EUI_BADGE,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomNodeTemplateSingleSelectComponent {
    treeData: TreeDataModel = [
        {
            node: {
                treeContentBlock: {
                    label: 'Node 0',
                    rightContent: {
                        badges: [
                            {
                                label: '2',
                                typeClass: 'warning',
                            },
                            {
                                label: '5',
                                typeClass: 'accent',
                            },
                        ],
                    },
                },
            },
        },
        {
            node: {
                treeContentBlock: {
                    label: 'Node 1',
                    rightContent: {
                        badges: [
                            {
                                label: '8',
                                typeClass: 'warning',
                            },
                            {
                                label: '13',
                                typeClass: 'accent',
                            },
                        ],
                    },
                },
            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.1',
                            rightContent: {
                                badges: [
                                    {
                                        label: '8',
                                        typeClass: 'warning',
                                    },
                                    {
                                        label: '13',
                                        typeClass: 'accent',
                                    },
                                ],
                            },
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.2',
                            rightContent: {
                                badges: [
                                    {
                                        label: '8',
                                        typeClass: 'warning',
                                    },
                                    {
                                        label: '13',
                                        typeClass: 'accent',
                                    },
                                ],
                            },
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.3',
                            rightContent: {
                                badges: [
                                    {
                                        label: '8',
                                        typeClass: 'warning',
                                    },
                                    {
                                        label: '13',
                                        typeClass: 'accent',
                                    },
                                ],
                            },
                        },
                    },
                    children: [
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'Node 1.3.1',
                                    rightContent: {
                                        badges: [
                                            {
                                                label: '8',
                                                typeClass: 'warning',
                                            },
                                            {
                                                label: '13',
                                                typeClass: 'accent',
                                            },
                                        ],
                                    },
                                },
                            },
                        },
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'Node 1.3.2',
                                    rightContent: {
                                        badges: [
                                            {
                                                label: '8',
                                                typeClass: 'warning',
                                            },
                                            {
                                                label: '13',
                                                typeClass: 'accent',
                                            },
                                        ],
                                    },
                                },
                            },
                        },
                    ],
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.4',
                            rightContent: {
                                badges: [
                                    {
                                        label: '8',
                                        typeClass: 'warning',
                                    },
                                    {
                                        label: '13',
                                        typeClass: 'accent',
                                    },
                                ],
                            },
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.5',
                            rightContent: {
                                badges: [
                                    {
                                        label: '8',
                                        typeClass: 'warning',
                                    },
                                    {
                                        label: '13',
                                        typeClass: 'accent',
                                    },
                                ],
                            },
                        },
                    },
                },
            ],
        },
    ];
    
    public onSelectionChange(e: EuiTreeSelectionChanges): void {
        console.log(e)
        console.log('Added', e.added.map((item) => item.node.treeContentBlock.label).join(','));
        console.log('Removed', e.removed.map((item) => item.node.treeContentBlock.label).join(','));
        console.log('Selection', e.selection.map((item) => item.node.treeContentBlock.label).join(','));
    }
}
```

