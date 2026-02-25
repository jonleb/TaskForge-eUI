import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EUI_ECL_STICKY_CONTAINER } from '@eui/ecl/components/ecl-sticky-container';
import { EUI_ECL_TIMELINE } from '@eui/ecl/components/ecl-timeline';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_STICKY_CONTAINER, ...EUI_ECL_TIMELINE],
})
export class DefaultComponent implements OnInit, OnDestroy {
    ngOnInit(): void {
        const euiApp: HTMLElement = document.querySelector('eui-app');
        euiApp.style.overflow = 'visible';
    }

    ngOnDestroy(): void {
        const euiApp: HTMLElement = document.querySelector('eui-app');
        euiApp.style.overflow = 'hidden';
    }
}
