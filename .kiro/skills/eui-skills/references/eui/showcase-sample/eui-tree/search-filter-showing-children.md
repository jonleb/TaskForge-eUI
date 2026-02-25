---
description: Show children of matched items while filtering to preserve context.
id: search-filter-showing-children
---

```html
<input euiInputText [formControl]="showChildrenOfMatchedItemsControl" euiClearable placeholder="Search from tree list items..."/><br/>
<eui-tree #compInstanceShowChildrenOfMatchedItems isRecursiveSelection [nodes]="treeDataShowChildrenOfMatchedItems" (selectionChange)="onSelectionChange($event)" />
```

```typescript
import { Component, OnInit, ChangeDetectionStrategy, viewChild } from "@angular/core";
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_TREE, EuiTreeComponent, EuiTreeSelectionChanges, TreeDataModel } from '@eui/components/eui-tree';

@Component({
    selector: 'search-filter-showing-children',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ...EUI_TREE,
        ...EUI_INPUT_TEXT,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFilterShowingChildrenComponent implements OnInit {

    public treeDataShowChildrenOfMatchedItems: TreeDataModel = [
        {
            node: {
                selectable: true,
                treeContentBlock: {
                    label: 'Europe',
                },
                selectConfig: {
                    recursive: true,
                },
            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            label: 'Benelux',
                        },
                        selectable: true,
                        selectConfig: {
                            recursive: true,
                        },
                    },
                    children: [
                        {
                            node: {
                                selectable: true,
                                treeContentBlock: {
                                    label: 'Belgium',
                                },
                                selectConfig: {
                                    recursive: true,
                                },
                            },
                            children: [
                                {
                                    node: {
                                        selectable: true,
                                        treeContentBlock: {
                                            label: 'Brussels',
                                        },
                                        selectConfig: {
                                            recursive: true,
                                        },
                                    },
                                    children: [
                                        {
                                            node: {
                                                selectable: true,
                                                treeContentBlock: {
                                                    label: 'Ixelles',
                                                },
                                                selectConfig: {
                                                    recursive: true,
                                                },
                                            },
                                            children: [
                                                {
                                                    node: {
                                                        selectable: true,
                                                        treeContentBlock: {
                                                            label: 'Place Flagey',
                                                        },
                                                    },
                                                },
                                                {
                                                    node: {
                                                        selectable: true,
                                                        treeContentBlock: {
                                                            label: 'Place du Châtelain',
                                                        },
                                                    },
                                                },
                                                {
                                                    node: {
                                                        selectable: true,
                                                        treeContentBlock: {
                                                            label: 'Place du Luxembourg',
                                                        },
                                                    },
                                                },
                                            ],
                                        },
                                        {
                                            node: {
                                                selectable: true,
                                                treeContentBlock: {
                                                    label: 'Etterbeek',
                                                },
                                            },
                                        },
                                        {
                                            node: {
                                                selectable: true,
                                                treeContentBlock: {
                                                    label: 'Uccle',
                                                },
                                            },
                                        },
                                        {
                                            node: {
                                                selectable: true,
                                                treeContentBlock: {
                                                    label: 'Forest',
                                                },
                                            },
                                        },
                                        {
                                            node: {
                                                selectable: true,
                                                treeContentBlock: {
                                                    label: 'Schaerbeek',
                                                },
                                            },
                                        },
                                    ],
                                },
                                {
                                    node: {
                                        selectable: true,
                                        treeContentBlock: {
                                            label: 'Antwerp',
                                        },
                                    },
                                },
                                {
                                    node: {
                                        selectable: true,
                                        treeContentBlock: {
                                            label: 'Liège',
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            node: {
                                selectable: true,
                                treeContentBlock: {
                                    label: 'Luxemburg',
                                },
                                selectConfig: {
                                    recursive: true,
                                },
                            },
                        },
                        {
                            node: {
                                selectable: true,
                                treeContentBlock: {
                                    label: 'Nederlands',
                                },
                                selectConfig: {
                                    recursive: true,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            node: {
                selectable: true,
                treeContentBlock: {
                    label: 'Latin America',
                },
                selectConfig: {
                    recursive: true,
                },
            },
            children: [
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Argentina',
                        },
                        selectConfig: {
                            recursive: true,
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Brazil',
                        },
                        selectConfig: {
                            recursive: true,
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Chile',
                        },
                        selectConfig: {
                            recursive: true,
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Colombia',
                        },
                        selectConfig: {
                            recursive: true,
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Venezuela',
                        },
                        selectConfig: {
                            recursive: true,
                        },
                    },
                },
            ],
        },
        {
            node: {
                selectable: true,
                treeContentBlock: {
                    label: 'Others',
                },
            },
        },
    ];

    public showChildrenOfMatchedItemsControl = new FormControl();

    public readonly compInstanceShowChildrenOfMatchedItems = viewChild<EuiTreeComponent>('compInstanceShowChildrenOfMatchedItems');

    ngOnInit(): void {
        this.showChildrenOfMatchedItemsControl.valueChanges.subscribe((val)=>{
            this.compInstanceShowChildrenOfMatchedItems().filterTerm(val, undefined, true);
        });
    }

    public onSelectionChange(e: EuiTreeSelectionChanges): void {
        console.log(e);
    }
}
```

