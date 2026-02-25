import { Component, ViewChild } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { TreeDataModel, EuiDropdownTreeDirective, EuiTreeFormControlDirective, EUI_TREE } from '@eui/components/eui-tree';
import { EUI_ICON } from '@eui/components/eui-icon';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';
import { EuiTooltipDirective } from '@eui/components/directives';
import { EUI_ALERT } from '@eui/components/eui-alert';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'within-dropdown',
    templateUrl: 'component.html',
    imports: [
        RouterLinkWithHref,
        FormsModule,
        ReactiveFormsModule,
        ...EUI_INPUT_CHECKBOX,
        ...EUI_INPUT_TEXT,
        ...EUI_INPUT_GROUP,
        ...EUI_LABEL,
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_TREE,
        ...EUI_DROPDOWN,
        EuiDropdownTreeDirective,
        EuiTreeFormControlDirective,
        EuiTooltipDirective,
        ...EUI_ALERT,
    ],
})
export class WithinDropdownComponent {
    public isExpandedAll = false;
    public isSelectedAll = false;
    public treeData: TreeDataModel = [
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

    public filterInputControl = new FormControl();
    public selectAllDropdownCheckboxControl = new FormControl();
    public selectAllDropdownTreeControl = new FormControl();

    public filterInput = '';
    public selectionChange: any;
    public selectionLabels = 'No node selected';
    public selectionChangeDropdown: any;

    @ViewChild('selectAllDropdownTreeInstance') public selectAllDropdownTreeInstance: any;

    constructor() {
        // Search filter
        this.filterInputControl.valueChanges.subscribe(() => {
            this.filterTerm();
        });

        // Select all checkbox
        this.selectAllDropdownCheckboxControl.valueChanges.subscribe((val) => {
            if (val) {
                this.selectAllDropdownTreeInstance?.setAllSelection(true);
            } else {
                this.selectAllDropdownTreeInstance?.setAllSelection(false);
            }
        });
        this.selectAllDropdownTreeControl.valueChanges.subscribe((val) => {
            if (val && val?.length > 0 && !this.selectAllDropdownCheckboxControl.value) {
                this.selectAllDropdownCheckboxControl.setValue(true, { emitEvent: false });
            } else if (val && val?.length === 0 && this.selectAllDropdownCheckboxControl.value) {
                this.selectAllDropdownCheckboxControl.setValue(false, { emitEvent: false });
            }
        });
    }

    public expandAll() {
        this.isExpandedAll = true;
        this.selectAllDropdownTreeInstance.expandAll();
    }

    public collapseAll() {
        this.isExpandedAll = false;
        this.selectAllDropdownTreeInstance.collapseAll();
    }

    public filterTerm() {
        this.selectAllDropdownTreeInstance?.filterTerm(this.filterInputControl.value);
    }

    public onSelectionChangeDropdown(evt) {
        this.selectionChangeDropdown = evt;
        this.selectionLabels = this.selectionChangeDropdown.selection.map(item => item.node.treeContentBlock.label).join(',');
    }
}
