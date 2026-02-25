# eui-dropdown-tree

## Overview

<p class="eui-u-text-paragraph">
    The <strong>eui-dropdown-tree</strong> is not specifically an eUI component but a <strong>composition</strong> build using some eUI components and utility classes only.
    It is mainly based on the <code class="eui-u-text-code">&lt;eui-dropdown&gt;</code> and the <code class="eui-u-text-code">&lt;eui-tree&gt;</code> components.
</p>

## Samples

### [Default](samples/eui-dropdown-tree/Default)

```html
<div class="doc-sample-section-title">The euiDropdownTree directive is used on eui-dropdown which renders the eui-tree</div>
<eui-alert>
    Please note that the button trigger uses the <code class="eui-u-text-code">euiResponsive</code> option which allows the selected tree items to be displayed correctly within the button.
    Also, the <code class="eui-u-text-code">eui-dropdown</code> have the <code class="eui-u-text-code">isBlock</code> input option which displays the dropdown content using the same width as the button trigger.
</eui-alert>

<br>

<ng-template #buttonTemplate let-label>
    <button euiButton euiPrimary>
        <div class="eui-u-flex">
            <div class="eui-u-flex eui-u-flex-justify-content-start eui-u-text-truncate">
                <label euilabel class="eui-u-text-truncate">{{label}}</label>
            </div>
            <div class="eui-u-inline-flex eui-u-flex-justify-content-end eui-u-ml-s">
                <eui-icon-svg icon="eui-chevron-down" size="xs" />
            </div>
        </div>
    </button>
</ng-template>

<div class="row">
    <div class="col-md-6">
        <eui-dropdown hasTabNavigation [hasClosedOnClickInside]="false" euiDropdownTree [buttonTemplateRef]="buttonTemplate" isBlock>
            <eui-dropdown-content>
                <div class="eui-u-p-m">
                    <eui-tree #euiTreeInstance isMultiselect [nodes]="treeData"></eui-tree>
                </div>
            </eui-dropdown-content>
        </eui-dropdown>
    </div>
    <div class="col-md-6">
        <div class="eui-showcase-demo">
            <div class="code" style="max-height: 25rem; overflow-y: auto;">
                <eui-fieldset label="Selection" isExpandable>
                    <pre class="eui-u-text-pre">{{ euiTreeInstance.getSelection() | json}}</pre>
                </eui-fieldset>
            </div>
        </div>
    </div>
</div>
```

```typescript
import { Component } from '@angular/core';
import { JsonPipe } from "@angular/common";

import {
    EUI_TREE,
    EuiDropdownTreeDirective,
    EuiTreeSelectionChanges,
    TreeDataModel,
} from "@eui/components/eui-tree";
import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_FIELDSET } from "@eui/components/eui-fieldset";
import { EUI_ALERT } from '@eui/components/eui-alert';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_DROPDOWN,
        ...EUI_TREE,
        ...EUI_LABEL,
        ...EUI_ICON,
        EuiDropdownTreeDirective,
        ...EUI_FIELDSET,
        ...EUI_BUTTON,
        ...EUI_ALERT,
        JsonPipe,
    ],
})
export class DefaultComponent {
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
    selectionChange: EuiTreeSelectionChanges;
}
```

### Other examples

- [Reactive Forms: Reactive forms](samples/eui-dropdown-tree/reactive-forms)
- [Misc: Custom](samples/eui-dropdown-tree/custom)
- [Misc: Filter](samples/eui-dropdown-tree/filter)
- [Misc: Multiselect dropdown with search filter](samples/eui-dropdown-tree/multiselect-dropdown-search)
- [Misc: Virtual scroll](samples/eui-dropdown-tree/virtual-scroll)

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
            <td><kbd class="eui-u-text-kbd">Tab</kbd></td>
            <td>Navigate to next targettable element</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Shift+Tab</kbd></td>
            <td>Navigate to previous targettable element</td>
        </tr>
    </tbody>
</table>
