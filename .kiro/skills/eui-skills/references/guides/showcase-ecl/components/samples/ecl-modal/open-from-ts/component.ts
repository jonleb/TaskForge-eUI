import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { EUI_ECL_BUTTON } from '@eui/ecl/components/ecl-button';
import { EclModalCloseEvent, EclModalComponent, EclModalOpenEvent, EUI_ECL_MODAL } from '@eui/ecl/components/ecl-modal';

@Component({
    // tslint:disable-next-line
    selector: 'open-from-ts',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_BUTTON, ...EUI_ECL_MODAL],
})
export class OpenFromTsComponent implements AfterViewInit {
    @ViewChild('modalTS') modalTS: EclModalComponent;

    ngAfterViewInit(): void {
        setTimeout(() => this.modalTS.openModal());
    }
    
    onOpen(evt: EclModalOpenEvent) {
        console.log(evt);
    }

    onClose(evt: EclModalCloseEvent<string>) {
        console.log(evt);
    }
}
