import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { JsonPipe } from "@angular/common";

import {
    TreeDataModel,
    EuiTreeSelectionChanges,
    EuiDropdownTreeDirective,
    EuiTreeComponent,
    EuiTreeFormControlDirective,
    EUI_TREE,
} from '@eui/components/eui-tree';
import { EUI_FIELDSET } from '@eui/components/eui-fieldset';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_DROPDOWN } from "@eui/components/eui-dropdown";
import { EUI_INPUT_TEXT } from "@eui/components/eui-input-text";
import { EUI_INPUT_GROUP } from "@eui/components/eui-input-group";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'reactive-forms',
    templateUrl: 'component.html',
    imports: [
        ...EUI_TREE,
        ReactiveFormsModule,
        ...EUI_FIELDSET,
        ...EUI_ALERT,
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_DROPDOWN,
        EuiDropdownTreeDirective,
        ...EUI_INPUT_TEXT,
        ...EUI_INPUT_GROUP,
        EuiTreeFormControlDirective,
        JsonPipe,
    ],
})
export class ReactiveFormsComponent implements OnInit {
    public treeData: TreeDataModel = [
        {
            node: {
                treeContentBlock: {
                    id: '1',
                    label: 'DIGIT A',
                },
            },
        },
        {
            node: {
                treeContentBlock: {
                    id: '2',
                    label: 'DIGIT B',
                },
            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            id: '3',
                            label: 'DIGIT B.1',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            id: '4',
                            label: 'DIGIT B.2',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            id: '5',
                            label: 'DIGIT B.3',
                        },
                    },
                    children: [
                        {
                            node: {
                                treeContentBlock: {
                                    id: '6',
                                    label: 'DIGIT B.3.1',
                                },
                            },
                        },
                        {
                            node: {
                                treeContentBlock: {
                                    id: '7',
                                    label: 'DIGIT B.3.2',
                                },
                            },
                        },
                    ],
                },
                {
                    node: {
                        treeContentBlock: {
                            id: '8',
                            label: 'DIGIT B.4',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            id: '9',
                            label: 'DIGIT B.5',
                        },
                    },
                },
            ],
        },
        {
            node: {
                treeContentBlock: {
                    id: '10',
                    label: 'DIGIT C',
                },
            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            id: '11',
                            label: 'DIGIT C.1',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            id: '12',
                            label: 'DIGIT C.2',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            id: '13',
                            label: 'DIGIT C.3',
                        },
                    },
                    children: [
                        {
                            node: {
                                treeContentBlock: {
                                    id: '14',
                                    label: 'DIGIT C.3.1',
                                },
                            },
                        },
                        {
                            node: {
                                treeContentBlock: {
                                    id: '15',
                                    label: 'DIGIT C.3.2',
                                },
                            },
                        },
                    ],
                },
                {
                    node: {
                        treeContentBlock: {
                            id: '16',
                            label: 'DIGIT C.4',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            id: '17',
                            label: 'DIGIT C.5',
                        },
                    },
                },
            ],
        },
    ];
    
    public selectionLabels: string;
    public form: FormGroup;
    
    @ViewChild('componentInstance') public componentInstance: EuiTreeComponent;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            tree: [],
            search: [''],
        });

        this.form.get('tree').valueChanges.subscribe((values) => {
            console.log(values);
        });

        this.form.get('search').valueChanges.subscribe((search) => {
            this.componentInstance?.filterTerm(search);
        });
    }

    public onSelectionChange(evt: EuiTreeSelectionChanges): void {
        this.selectionLabels = evt.selection.map((item) => item.node.treeContentBlock.label).join(',');

    }

    public onPatch(): void {
        this.form.get('tree').patchValue(this.treeData.filter((d => d.node.treeContentBlock.id === '1')));
    }
}
