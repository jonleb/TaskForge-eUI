import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { JsonPipe } from "@angular/common";

import {
    TreeDataModel,
    EuiTreeSelectionChanges,
    EuiTreeFormControlDirective,
    TreeItemModel,
    EuiTreeHelper,
    EUI_TREE,
} from '@eui/components/eui-tree';
import { EUI_FIELDSET } from '@eui/components/eui-fieldset';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ALERT } from '@eui/components/eui-alert';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Tree-form-control',
    templateUrl: 'component.html',
    imports: [
        ...EUI_TREE,
        FormsModule,
        ReactiveFormsModule,
        EuiTreeFormControlDirective,
        ...EUI_FIELDSET,
        ...EUI_ALERT,
        ...EUI_BUTTON,
        JsonPipe
    ],
})
export class TreeFormControlComponent implements OnInit {
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
        {
            node: {
                treeContentBlock: {
                    id: '18',
                    label: 'DIGIT D',
                },
            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            id: '19',
                            label: 'DIGIT D.1',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            id: '20',
                            label: 'DIGIT D.2',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            id: '21',
                            label: 'DIGIT D.3',
                        },
                    },
                    children: [
                        {
                            node: {
                                treeContentBlock: {
                                    id: '22',
                                    label: 'DIGIT D.3.1',
                                },
                            },
                        },
                        {
                            node: {
                                treeContentBlock: {
                                    id: '23',
                                    label: 'DIGIT D.3.2',
                                },
                            },
                        },
                    ],
                },
                {
                    node: {
                        treeContentBlock: {
                            id: '24',
                            label: 'DIGIT D.4',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            id: '25',
                            label: 'DIGIT D.5',
                        },
                    },
                },
            ],
        },
    ];
    public treeDataSelected: TreeDataModel = [
        {
            node: {
                treeContentBlock: {
                    id: '1',
                    label: 'DIGIT A',
                },
                isSelected: true,
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
        {
            node: {
                treeContentBlock: {
                    id: '18',
                    label: 'DIGIT D',
                },
            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            id: '19',
                            label: 'DIGIT D.1',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            id: '20',
                            label: 'DIGIT D.2',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            id: '21',
                            label: 'DIGIT D.3',
                        },
                    },
                    children: [
                        {
                            node: {
                                treeContentBlock: {
                                    id: '22',
                                    label: 'DIGIT D.3.1',
                                },
                            },
                        },
                        {
                            node: {
                                treeContentBlock: {
                                    id: '23',
                                    label: 'DIGIT D.3.2',
                                },
                            },
                        },
                    ],
                },
                {
                    node: {
                        treeContentBlock: {
                            id: '24',
                            label: 'DIGIT D.4',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            id: '25',
                            label: 'DIGIT D.5',
                        },
                    },
                },
            ],
        },
    ];
    public selectionChange: EuiTreeSelectionChanges;
    public selectionLabels: string;
    public selectionLabels2: string;
    public control = new FormControl();
    public form: FormGroup;
    public toggle: boolean;
    public controlInitialSelectionViaMetaData = new FormControl();
    public controlInitialData = new FormControl(
        [
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
            {
                node: {
                    treeContentBlock: {
                        id: '15',
                        label: 'DIGIT C.3.2',
                    },
                },
            }]);
    public customModelControl = new FormControl(['1','3','5']);
    public customControlValueSetter: (selection: TreeDataModel) => any = (selection: TreeDataModel) => {
        return selection?.map((item) => {
            return item.node.treeContentBlock.id;
        });
    };
    public customControlModelMapper: (model: any, tree: TreeDataModel) => Array<TreeItemModel> = (model: Array<string>, tree: TreeDataModel) => {
        return new EuiTreeHelper(tree).getItems(model, 'node.treeContentBlock.id');
    };

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            myControlName: [],
        });
        this.control.valueChanges.subscribe((value) => {
            console.log(value);
        });
        this.controlInitialSelectionViaMetaData.valueChanges.subscribe((value) => {
            console.log(value);
        });
        this.customModelControl.valueChanges.subscribe((value) => {
            console.log(value);
        });
    }

    public onSelectionChange(evt: EuiTreeSelectionChanges): void {
        this.selectionLabels = evt.selection.map((item) => item.node.treeContentBlock.label).join(',');

    }

    public onSelectionChange2(evt: EuiTreeSelectionChanges): void {
        this.selectionChange = evt;
        this.selectionLabels2 = evt.selection.map((item) => item.node.treeContentBlock.label).join(',');
    }
}
