---
description: Implement a select-all checkbox that syncs with tree selection.
id: select-all
---

```html
<input id="default-checkbox0" aria-label="default checkbox unchecked" name="default-checkbox" [formControl]="selectAllCheckboxControl" euiInputCheckBox />
<label euiLabel for="default-checkbox0">Select All</label>

<eui-tree isMultiselect #selectAllTreeInstance euiTreeFormControl [formControl]="selectAllTreeControl" [nodes]="treeDataSelectAll" />
```

```typescript
import { Component, OnInit, ChangeDetectionStrategy, viewChild } from "@angular/core";
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EUI_TREE, EuiTreeComponent, EuiTreeFormControlDirective, TreeDataModel } from '@eui/components/eui-tree';

@Component({
    selector: 'select-all',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_TREE,
        ...EUI_INPUT_CHECKBOX,
        EuiTreeFormControlDirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectAllComponent implements OnInit {
    public selectAllCheckboxControl = new FormControl();
    public selectAllTreeControl = new FormControl();

    public treeDataSelectAll: TreeDataModel = [
        {
            node: {
                selectable: true,
                treeContentBlock: {
                    label: 'Europe',
                },
            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            label: 'Benelux',
                        },
                        selectable: true,
                    },
                    children: [
                        {
                            node: {
                                selectable: true,
                                treeContentBlock: {
                                    label: 'Belgium',
                                },
                            },
                            children: [
                                {
                                    node: {
                                        selectable: true,
                                        treeContentBlock: {
                                            label: 'Brussels',
                                        },
                                    },
                                    children: [
                                        {
                                            node: {
                                                selectable: true,
                                                treeContentBlock: {
                                                    label: 'Ixelles',
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
                            },
                        },
                        {
                            node: {
                                selectable: true,
                                treeContentBlock: {
                                    label: 'Nederlands',
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
            },
            children: [
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Argentina',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Brazil',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Chile',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Colombia',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'Venezuela',
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

    public readonly selectAllTreeInstance = viewChild<EuiTreeComponent>('selectAllTreeInstance');

    ngOnInit(): void {
        this.selectAllCheckboxControl.valueChanges.subscribe((val) => {
            if (val) {
                this.selectAllTreeInstance()?.setAllSelection(true);
            } else {
                this.selectAllTreeInstance()?.setAllSelection(false);
            }
        });
        this.selectAllTreeControl.valueChanges.subscribe((val) => {
            if (val && val?.length > 0 && !this.selectAllCheckboxControl.value) {
                this.selectAllCheckboxControl.setValue(true, { emitEvent: false });
            }else if(val && val?.length === 0 && this.selectAllCheckboxControl.value){
                this.selectAllCheckboxControl.setValue(false, { emitEvent: false });
            }
        });
    }

}
```

