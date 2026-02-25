---
description: Provide a custom node template with checkboxes and tooltips in multiselect mode.
id: custom-node-template-multiselect
---

```html
<eui-tree [nodes]="treeData" [nodeTemplateRef]="nodeTemplateCustom" isMultiselect (selectionChange)="onSelectionChange($event)" />

<ng-template let-node #nodeTemplateCustom let-onSelect="onSelect" let-id="id" let-children="children">
    @if (node && node.selectable) {
        <input euiInputCheckBox type="checkbox" id="{{ id }}" [checked]="node && node.isSelected" (change)="onSelect($event)" />
    }
    <label euiLabel for="{{ id }}" class="eui-u-text-truncate eui-u-mr-m" [class.eui-label--selected]="node.isSelected">
        {{ node.treeContentBlock.label + ' CUSTOM' }}
    </label>
    @if (children?.length > 0) {
        <eui-icon-svg icon="eui-state-info" size="s" fillColor="info" euiTooltip="Some tooltip text" class="eui-u-ml-s" />
    }
</ng-template>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_TREE, EuiTreeSelectionChanges, TreeDataModel } from '@eui/components/eui-tree';
import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EuiTooltipDirective } from '@eui/components/directives';

@Component({
    selector: 'custom-node-template-multiselect',
    templateUrl: 'component.html',
    imports: [
        ...EUI_TREE,
        ...EUI_INPUT_CHECKBOX,
        ...EUI_LABEL,
        ...EUI_ICON,
        EuiTooltipDirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomNodeTemplateMultiselectComponent {
    treeData: TreeDataModel = [
        {
            node: {
                treeContentBlock: {
                    label: 'Node 0',
                    tooltipLabel: 'Node 0 tooltip',
                },
            },
        },
        {
            node: {
                treeContentBlock: {
                    label: 'Node 1',
                    tooltipLabel: 'Some tooltip text',
                    urlExternal: 'https://google.fr',
                    urlExternalTarget: '_blank',
                },
            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.1',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.2',
                            urlExternal: 'https://google.fr',
                            urlExternalTarget: '_blank',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.3',
                            tooltipLabel: 'Some tooltip text',
                            urlExternal: 'https://google.fr',
                            urlExternalTarget: '_blank',
                        },
                    },
                    children: [
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'Node 1.3.1',
                                    urlExternal: 'https://google.fr',
                                    urlExternalTarget: '_blank',
                                },
                            },
                        },
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'Node 1.3.2',
                                    tooltipLabel: 'Some tooltip text',
                                },
                            },
                            children: [
                                {
                                    node: {
                                        treeContentBlock: {
                                            label: 'Node 1.3.2.1',
                                        },
                                    },
                                },
                                {
                                    node: {
                                        treeContentBlock: {
                                            label: 'Node 1.3.2.2',
                                        },
                                    },
                                },
                                {
                                    node: {
                                        treeContentBlock: {
                                            label: 'Node 1.3.2.3',
                                            tooltipLabel: 'Some tooltip text',
                                        },
                                    },
                                    children: [
                                        {
                                            node: {
                                                treeContentBlock: {
                                                    label: 'Node 1.3.2.3.1',
                                                },
                                            },
                                        },
                                        {
                                            node: {
                                                treeContentBlock: {
                                                    label: 'Node 1.3.2.3.2',
                                                },
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.4',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.5',
                        },
                    },
                },
            ],
        },
        {
            node: {
                treeContentBlock: {
                    label: 'Node 2',
                    tooltipLabel: 'Some tooltip text',
                    urlExternal: 'https://google.fr',
                    urlExternalTarget: '_blank',
                },
            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 2.1',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 2.2',
                            urlExternal: 'https://google.fr',
                            urlExternalTarget: '_blank',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 2.3',
                            tooltipLabel: 'Some tooltip text',
                            urlExternal: 'https://google.fr',
                            urlExternalTarget: '_blank',
                        },
                    },
                    children: [
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'Node 2.3.1',
                                    urlExternal: 'https://google.fr',
                                    urlExternalTarget: '_blank',
                                },
                            },
                        },
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'Node 2.3.2',
                                },
                            },
                        },
                    ],
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 2.4',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 2.5',
                        },
                    },
                },
            ],
        },
        {
            node: {
                treeContentBlock: {
                    label: 'Node 3',
                    tooltipLabel: 'Some tooltip text',
                    urlExternal: 'https://google.fr',
                    urlExternalTarget: '_blank',
                },
            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 3.1',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 3.2',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 3.3',
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

