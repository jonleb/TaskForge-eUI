# eui-tree

## Overview

<p class="eui-u-text-paragraph">
    The <code class="eui-u-text-code">eui-tree</code> can be used to <strong>display hierarchy data</strong> with optional added behavior inside node templates and interactions that could affect the rendered data such as expand,
    collapse, direct actions, extra menu actions, etc.
</p>
<div class="row">
    <eui-alert>
        In v15 and v16 as default eui tree doesn't render the lines, and you had to pass showLines input in order to show them.
        Now in v17, as default showLines is true. In order to doesn't render the lines you have to define [showLines]="false".
        Check the example in Misc compositions section.
    </eui-alert>
</div>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | nodes | TreeDataModel | - |
| Input | nodeTemplateRef | TemplateRef<any> | - |
| Input | nodeContentMetadataTemplateRef | TemplateRef<any> | - |
| Input | rightContextMenuTemplateRef | TemplateRef<any> | - |
| Input | customNodeSelectFn | CustomNodeSelectFn | - |
| Input | expandedSvgIconClass | string | 'eui-chevron-right' |
| Input | collapsedSvgIconClass | string | 'eui-chevron-down' |
| Input | isClickTogglingNode | boolean | false |
| Input | isMultiselect | boolean | false |
| Input | isSingleSelect | boolean | false |
| Input | isRecursiveSelection | boolean | false |
| Input | isRecursiveParentSelection | boolean | true |
| Input | showUnderlinedLinks | boolean | false |
| Input | showLines | boolean | true |
| Input | autoTranslate | boolean | true |
| Input | highlightPath | boolean | false |
| Input | virtualScrollThreshold | number | 800 |
| Input | virtualScrollPageSize | number | 400 |
| Output | selectionChange | unknown | new EventEmitter<EuiTreeSelectionChanges>() |
| Output | nodeClick | unknown | new EventEmitter<TreeItemModel>() |
| Output | nodeToggle | unknown | new EventEmitter<TreeItemModel>() |

## Samples

### [Default](samples/eui-tree/Default)

```html
<div class="row">
    <div class="col-md-6">
        <div class="doc-sample-section-title">Single level</div>
        <eui-tree [nodes]="treeData"></eui-tree>
    </div>

    <div class="col-md-6">
        <div class="doc-sample-section-title">Multiple levels</div>
        <eui-tree [nodes]="treeDataMultiLevels"></eui-tree>
    </div>
</div>
```

```typescript
import { Component } from '@angular/core';

import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EUI_TREE, TreeDataModel } from '@eui/components/eui-tree';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_TREE, ...EUI_INPUT_CHECKBOX],
})
export class DefaultComponent {
    public treeData: TreeDataModel = [
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
                    url: '.',
                },
            },
        },
        {
            node: {
                treeContentBlock: {
                    label: 'Node 2',
                    url: '.',
                },
            },
        },
        {
            node: {
                treeContentBlock: {
                    label: 'Node 3',
                    urlExternal: 'https://google.fr',
                    urlExternalTarget: '_blank',
                },
            },
        },
    ];

    public treeDataMultiLevels: TreeDataModel = [
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
                    url: '.',
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
                    url: '.',
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
                            url: '.',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 2.3',
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


}
```

### Other examples

- [Options: Auto translate](samples/eui-tree/auto-translate)
- [Options: Expanded/Collapsed icon class](samples/eui-tree/expanded-collapsed-icon-class)
- [Options: Highlight path](samples/eui-tree/highlight-path)
- [Options: Multiselect default](samples/eui-tree/multiselect-default)
- [Options: Multiselect recursive](samples/eui-tree/multiselect-recursive)
- [Options: Single select](samples/eui-tree/single-select)
- [Options: Toggle node on click](samples/eui-tree/is-click-toggling-node)
- [Options: Underlined links](samples/eui-tree/underlined-links)
- [Main Features: Custom node template](samples/eui-tree/custom-node-template)
- [Main Features: Custom onNodeSelect Fn](samples/eui-tree/custom-on-node-select)
- [Main Features: Expand/Collapse - Select/Deselect](samples/eui-tree/methods)
- [Main Features: Lazy load](samples/eui-tree/lazy-load)
- [Main Features: Metadata features](samples/eui-tree/metadata-features)
- [Main Features: Node content metadata](samples/eui-tree/node-content-metadata)
- [Main Features: Programmatic selection](samples/eui-tree/programmatic-selection)
- [Main Features: Virtual scroll](samples/eui-tree/virtual-scroll)
- [Reactive Forms: Reactive Forms](samples/eui-tree/tree-form-control)
- [Event Handlers: Events](samples/eui-tree/event-handlers)
- [Composition: Badges (right content)](samples/eui-tree/badges)
- [Composition: Badges (typeLabel and typeClass)](samples/eui-tree/type-label-class)
- [Composition: Icons](samples/eui-tree/icon)
- [Misc: Advanced custom layout](samples/eui-tree/mix-advanced)
- [Misc: Async Nodes](samples/eui-tree/misc-async-nodes)
- [Misc: Get all parents](samples/eui-tree/parent-obj)
- [Misc: Search filter](samples/eui-tree/search-filter)
- [Misc: Select all](samples/eui-tree/misc-select-all)
- [Misc: Show lines](samples/eui-tree/show-lines)
- [Misc: Within cards](samples/eui-tree/within-panels)
- [Misc: Within dropdown](samples/eui-tree/within-dropdown)

## Accessibility

<div class="doc-sample-section-title">Keyboard interaction</div>
<table class="eui-table-default eui-table-default--bordered">
    <thead>
        <tr>
            <th>Shortcut</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><kbd class="eui-u-text-kbd">Enter / Spacebar</kbd></td>
            <td>
                - on a node icon: expand/collapse the selected node
                <br>
                - on a text link: redirects to the defined link Url
            </td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Spacebar</kbd></td>
            <td> on a checkbox (when isMultiselect/isSingleSelect): check/uncheck the selected node</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Tab</kbd></td>
            <td>Navigate to next targettable element</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Shift+Tab</kbd></td>
            <td>Navigate to previous targettable element</td>
        </tr>
    </tbody>
</table>
