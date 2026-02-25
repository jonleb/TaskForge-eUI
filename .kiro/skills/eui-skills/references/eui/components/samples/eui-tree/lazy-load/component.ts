import { Component, ViewChild } from '@angular/core';
import { JsonPipe } from '@angular/common';

import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { TreeDataModel, TreeItemModel, EuiTreeHelper, EuiTreeComponent, EUI_TREE } from '@eui/components/eui-tree';
import { EUI_FIELDSET } from '@eui/components/eui-fieldset';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Lazy-load',
    templateUrl: 'component.html',
    imports: [...EUI_TREE, ...EUI_INPUT_CHECKBOX, ...EUI_FIELDSET, JsonPipe],
})
export class LazyLoadComponent {
    @ViewChild('compInstance') public compInstance: EuiTreeComponent;
    @ViewChild('compInstance2') public compInstance2: EuiTreeComponent;
    public lazyData: TreeDataModel = [...Array.from({ length: 10 }).map((_, i) => ({
        node: {
            treeContentBlock: {
                label: 'Lazy' + i,
            },
        },
    }))];
    public lazyData2: TreeDataModel = [...Array.from({ length: 10 }).map((_, i) => ({
        node: {
            treeContentBlock: {
                label: 'Lazy' + i,
            },
            isExpanded:true,
            selectable:true,
            isSelected:true
        },
        children:[...Array.from({ length: 10 }).map((_, i) => ({
            node: {
                treeContentBlock: {
                    label: 'Lazy Sub' + i,
                },
            },
        }))]
    }))];
    public treeData: TreeDataModel = [
        ...Array.from({ length: 9 }).map((_, i) => ({
            node: {
                treeContentBlock: {
                    label: 'DIGIT A' + (i+1),
                    id:i+1
                },
            }, children: [],
        })),

    ];

    onNodeToggle(item: TreeItemModel): void {
        if(item?.children.length === 0){
            const itemPath = new EuiTreeHelper(this.compInstance.getProcessedNodes()).getPath(item.node.treeContentBlock.id);
            this.compInstance.updateTreeItem({ ...item, children: this.lazyData }, itemPath);
        }
    }

    onNodeToggle2(item: TreeItemModel): void {
        if(item?.children.length === 0){
            const itemPath = new EuiTreeHelper(this.compInstance2.getProcessedNodes()).getPath(item.node.treeContentBlock.id);
            this.compInstance2.updateTreeItem({ ...item, children: this.generateLazyDataDeeper(item.node.treeContentBlock.id) }, itemPath);
        }
    }

    private generateLazyDataDeeper(id: number): TreeItemModel[] {
        return [
            ...Array.from({ length: 9 }).map((_, i) => ({
                node: {
                    treeContentBlock: {
                        label: 'DIGIT A' + ((id * 10) + i+1),
                        id:(id * 10) + (i+1)
                    },
                }, children: [],
            })),
        ]
    }
}
