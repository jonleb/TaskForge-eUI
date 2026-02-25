import { Component, OnInit } from '@angular/core';

import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_TABS } from "@eui/components/eui-tabs";
import { EUI_SLIDE_TOGGLE } from "@eui/components/eui-slide-toggle";
import { EUI_ALERT } from "@eui/components/eui-alert";
import { EUI_LABEL } from '@eui/components/eui-label';

@Component({
    // eslint-disable-next-line
    selector: 'icon-colors',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON,
        ...EUI_TABS,
        ...EUI_SLIDE_TOGGLE,
        ...EUI_ALERT,
        ...EUI_LABEL,
    ],
    styleUrls: ['../../module.component.scss'],
})
export class IconColorsComponent implements OnInit {

    defaultMap = [ null, 'darker', 'dark', 'light', 'lighter'];

    colorTypes = [
        { name: 'primary', map: this.defaultMap },
        { name: 'info', map: this.defaultMap },
        { name: 'success', map: this.defaultMap },
        { name: 'warning', map: this.defaultMap },
        { name: 'danger', map: this.defaultMap },
        { name: 'neutral', map: this.defaultMap },
    ];

    hasDarkBackground = false;

    ngOnInit() {
        // Object.keys(this.colorTypes).forEach((type) => {
        //     switch (type) {
        //         case 'primary':
        //             this.colorTypes[type].forEach((hue) => {
        //                 this.colorsPrimary.push(`${type}-${hue}`);
        //             });
        //             break;
        //         case 'branding':
        //             this.colorTypes[type].forEach((hue) => {
        //                 this.colorsBranding.push(`${type}-${hue}`);
        //             });
        //             break;
        //         case 'accent':
        //             this.colorTypes[type].forEach((hue) => {
        //                 this.colorsAccent.push(`${type}-${hue}`);
        //             });
        //             break;
        //         case 'info':
        //             this.colorTypes[type].forEach((hue) => {
        //                 this.colorsInfo.push(`${type}-${hue}`);
        //             });
        //             break;
        //         case 'success':
        //             this.colorTypes[type].forEach((hue) => {
        //                 this.colorsSuccess.push(`${type}-${hue}`);
        //             });
        //             break;
        //         case 'warning':
        //             this.colorTypes[type].forEach((hue) => {
        //                 this.colorsWarning.push(`${type}-${hue}`);
        //             });
        //             break;
        //         case 'danger':
        //             this.colorTypes[type].forEach((hue) => {
        //                 this.colorsDanger.push(`${type}-${hue}`);
        //             });
        //             break;
        //         case 'grey':
        //             this.colorTypes[type].forEach((hue) => {
        //                 this.colorsGrey.push(`${type}-${hue}`);
        //             });
        //             break;

        //         default:
        //             console.log(`Sorry, no type ${type} defined.`);
        //     }
        // });
    }
}
