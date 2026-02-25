import { Component, OnInit, ViewChild } from "@angular/core";
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { JsonPipe } from "@angular/common";

import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_TREE, EuiTreeComponent, EuiTreeSelectionChanges, TreeDataModel } from '@eui/components/eui-tree';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';
import { EUI_FIELDSET } from '@eui/components/eui-fieldset';
import { EuiTooltipDirective } from '@eui/components/directives';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'search-filter',
    templateUrl: 'component.html',
    imports: [
        FormsModule, ReactiveFormsModule,
        ...EUI_TREE, ...EUI_INPUT_GROUP, ...EUI_LABEL, ...EUI_INPUT_TEXT,
        ...EUI_BUTTON, ...EUI_ICON,
        ...EUI_DROPDOWN, ...EUI_FIELDSET, EuiTooltipDirective, JsonPipe,
    ],
})
export class SearchFilterComponent implements OnInit {

    public isExpandedAll = {
        'compInstance': false,
        'compInstanceDropdown': false,
        'compInstanceFilterKey': false,
        'compInstanceShowChildrenOfMatchedItems': false,
    }
    public isSelectedAll = {
        'compInstance': false,
        'compInstanceDropdown': false,
        'compInstanceFilterKey': false,
        'compInstanceShowChildrenOfMatchedItems': false,
    };
    public treeData: TreeDataModel = [
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
    public treeDataFilterKey: TreeDataModel = [
        {
            node: {
                selectable: true,
                treeContentBlock: {
                    label: 'Europe',
                    custom: '123'
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
                            custom: '122'
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
                                    custom: '121'
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

    public filterInputControl = new FormControl();
    public filterInputMultiControl = new FormControl();
    public filterKeyInputControl = new FormControl();
    public showChildrenOfMatchedItemsControl = new FormControl();

    @ViewChild('compInstance') public compInstance: EuiTreeComponent;
    @ViewChild('compInstanceFilterKey') public compInstanceFilterKey: EuiTreeComponent;
    @ViewChild('compInstanceDropdown') public compInstanceDropdown: EuiTreeComponent;
    @ViewChild('compInstanceShowChildrenOfMatchedItems') public compInstanceShowChildrenOfMatchedItems: EuiTreeComponent;

    public selectionChange: EuiTreeSelectionChanges;
    public selectionChange2: EuiTreeSelectionChanges;
    public selectionChange3: EuiTreeSelectionChanges;
    public selectionChangeDropdown: EuiTreeSelectionChanges;
    public defaultSelectionLabel = 'Nothing selected';
    public selectionLabels: string;

    ngOnInit() {
        this.filterInputControl.valueChanges.subscribe((val)=> {
            this.compInstance?.filterTerm(val);
        });

        this.filterInputMultiControl.valueChanges.subscribe((val)=>{
            this.compInstanceDropdown.filterTerm(val);
        });

        this.filterKeyInputControl.valueChanges.subscribe((val)=>{
            this.compInstanceFilterKey.filterTerm(val, 'custom');
        });

        this.showChildrenOfMatchedItemsControl.valueChanges.subscribe((val)=>{
            this.compInstanceShowChildrenOfMatchedItems.filterTerm(val, undefined, true);
        });
    }

    public expandAll(instance?: any): void {
        this.isExpandedAll[instance] = true;
        this[instance].expandAll();
    }

    public collapseAll(instance?: any): void {
        this.isExpandedAll[instance] = false;
        this[instance].collapseAll();
    }

    public deselectAll(instance?: any): void {
        this.isSelectedAll[instance] = false;
        this[instance].setAllSelection(false);
    }

    public selectAll(instance?: any): void {
        this.isSelectedAll[instance] = true;
        this[instance].setAllSelection(true);
    }

    public onSelectionChange(evt: EuiTreeSelectionChanges): void {
        this.selectionChange = evt;
    }

    public onSelectionChange2(evt: EuiTreeSelectionChanges): void {
        this.selectionChange2 = evt;
    }

    public onSelectionChange3(evt: EuiTreeSelectionChanges): void {
        this.selectionChange3 = evt;
    }

    public onSelectionChangeDropdown(evt: EuiTreeSelectionChanges): void {
        this.selectionChangeDropdown = evt;
        this.selectionLabels = this.selectionChangeDropdown.selection.map(item => item.node.treeContentBlock.label).join(',');
    }
}
