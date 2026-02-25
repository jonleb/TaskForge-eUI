import { Component, ChangeDetectionStrategy, ViewEncapsulation, NgModule, ElementRef, ViewChild } from "@angular/core";
import { DragDropModule } from '@angular/cdk/drag-drop';

import { EUI_CHIP_LIST } from "@eui/components/eui-chip-list";
import { EUI_CHIP } from "@eui/components/eui-chip";
import { EUI_LABEL } from "@eui/components/eui-label";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { EUI_ALERT } from "@eui/components/eui-alert";

@Component({
    // eslint-disable-next-line
    selector: "dragndrop",
    templateUrl: "component.html",
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...EUI_CHIP_LIST, ...EUI_CHIP, ...EUI_LABEL, DragDropModule, ...EUI_ALERT],
})
export class DragNDropComponent {
    public chipsH = [
        { id: 1, label: "Chip label", variant: "primary" },
        { id: 2, label: "Chip label", variant: "secondary" },
        { id: 3, label: "Chip label", variant: "info" },
        { id: 4, label: "Chip label", variant: "success" },
        { id: 5, label: "Chip label", variant: "warning" },
        { id: 6, label: "Chip label", variant: "danger" },
        { id: 7, label: "Chip label", variant: "accent" },
    ];

    dropH(event: CdkDragDrop<any[]>) {
        moveItemInArray(this.chipsH, event.previousIndex, event.currentIndex);
    }

    public chipsV = [
        { id: 1, label: "Chip label", variant: "primary" },
        { id: 2, label: "Chip label", variant: "secondary" },
        { id: 3, label: "Chip label", variant: "info" },
        { id: 4, label: "Chip label", variant: "success" },
        { id: 5, label: "Chip label", variant: "warning" },
        { id: 6, label: "Chip label", variant: "danger" },
        { id: 7, label: "Chip label", variant: "accent" },
    ];

    dropV(event: CdkDragDrop<any[]>) {
        moveItemInArray(this.chipsV, event.previousIndex, event.currentIndex);
    }

    public chipsHMulti1 = [
        { id: 1, label: "Chip 1", variant: "success" },
        { id: 2, label: "Chip 2", variant: "success" },
        { id: 3, label: "Chip 3", variant: "success" },
        { id: 4, label: "Chip 4", variant: "success" },
        { id: 5, label: "Chip 5", variant: "success" },
        { id: 6, label: "Chip 6", variant: "success" },
        { id: 7, label: "Chip 7", variant: "success" },
    ];

    public chipsHMulti2 = [
        { id: 1, label: "Chip 1", variant: "danger" },
        { id: 2, label: "Chip 2", variant: "danger" },
        { id: 3, label: "Chip 3", variant: "danger" },
        { id: 4, label: "Chip 4", variant: "danger" },
        { id: 5, label: "Chip 5", variant: "danger" },
        { id: 6, label: "Chip 6", variant: "danger" },
        { id: 7, label: "Chip 7", variant: "danger" },
    ];

    dropHMulti(event: CdkDragDrop<any[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        }
    }

    public chipsVMulti1 = [
        { id: 1, label: "Chip label 1", variant: "success" },
        { id: 2, label: "Chip label 2", variant: "success" },
        { id: 3, label: "Chip label 3", variant: "success" },
        { id: 4, label: "Chip label 4", variant: "success" },
        { id: 5, label: "Chip label 5", variant: "success" },
        { id: 6, label: "Chip label 6", variant: "success" },
        { id: 7, label: "Chip label 7", variant: "success" },
    ];

    public chipsVMulti2 = [
        { id: 1, label: "Chip label 1", variant: "danger" },
        { id: 2, label: "Chip label 2", variant: "danger" },
        { id: 3, label: "Chip label 3", variant: "danger" },
        { id: 4, label: "Chip label 4", variant: "danger" },
        { id: 5, label: "Chip label 5", variant: "danger" },
        { id: 6, label: "Chip label 6", variant: "danger" },
        { id: 7, label: "Chip label 7", variant: "danger" },
    ];

    dropVMulti(event: CdkDragDrop<any[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        }
    }

    public chipsHVMulti = [
        { id: 1, label: "Chip label 1", variant: "danger" },
        { id: 2, label: "Chip label 2", variant: "danger" },
        { id: 3, label: "Chip label 3", variant: "danger" },
        { id: 4, label: "Chip label 4", variant: "danger" },
        { id: 5, label: "Chip label 5", variant: "danger" },
        { id: 6, label: "Chip label 6", variant: "danger" },
        { id: 7, label: "Chip label 7", variant: "danger" },
        { id: 8, label: "Chip label 8", variant: "danger" },
        { id: 9, label: "Chip label 9", variant: "danger" },
        { id: 10, label: "Chip label 10", variant: "danger" },
        { id: 11, label: "Chip label 11", variant: "danger" },
        { id: 12, label: "Chip label 12", variant: "danger" },
        { id: 13, label: "Chip label 13", variant: "danger" },
        { id: 14, label: "Chip label 14", variant: "danger" },
    ];
    
    dropHVMulti(event: CdkDragDrop<any>) {
        const fromIndex = event.previousContainer.data.index;
        const toIndex = event.container.data.index;
        const item = this.chipsHVMulti.splice(fromIndex, 1)[0];

        this.chipsHVMulti.splice(toIndex, 0, item);
    }

}
