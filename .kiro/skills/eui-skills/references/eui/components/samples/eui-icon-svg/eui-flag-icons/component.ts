import { Component } from '@angular/core';

import { EUI_ICON } from "@eui/components/eui-icon";
import { EuiTooltipDirective } from "@eui/components/directives";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_ALERT } from '@eui/components/eui-alert';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'eui-flag-icons',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON,
        EuiTooltipDirective,
        ...EUI_BUTTON,
        ...EUI_ALERT,
    ],
    styleUrls: ['../../module.component.scss'],
})
export class EuiFlagIconsComponent {
    flagIcons: any = [];
    flagIcon: any;
    scaleSize = '2x';
    scaleSizeRounded = '2x';
    flagRatio = '4x3';
    flagSquaredClass = '';
    iconISO = 'eu';

    constructor( ) {

        this.flagIcons = [
            'ad', 'ae', 'af', 'ag', 'ai', 'al', 'am', 'ao', 'aq', 'ar', 'as', 'at', 'au', 'aw', 'ax', 'az',
            'ba', 'bb', 'bd', 'be', 'bf', 'bg', 'bh', 'bi', 'bj', 'bl', 'bm', 'bn', 'bo', 'bq', 'br', 'bs', 'bt', 'bv', 'bw', 'by', 'bz',
            'ca', 'cc', 'cd', 'cf', 'cg', 'ch', 'ci', 'ck', 'cl', 'cm', 'cn', 'co', 'cr', 'cu', 'cv', 'cw', 'cx', 'cy', 'cz',
            'de', 'dj', 'dk', 'dm', 'do', 'dz',
            'ec', 'ee', 'eg', 'eh', 'el', 'er', 'es', 'et', 'eu',
            'fi', 'fj', 'fk', 'fm', 'fo', 'fr',
            'ga', 'gb', 'gd', 'ge', 'gf', 'gg', 'gh', 'gi', 'gl', 'gm', 'gn', 'gp', 'gq', 'gr', 'gs', 'gt', 'gu', 'gw', 'gy',
            'hk', 'hm', 'hn', 'hr', 'ht', 'hu',
            'id', 'ie', 'il', 'im', 'in', 'io', 'iq', 'ir', 'is', 'it',
            'je', 'jm', 'jo', 'jp',
            'ke', 'kg', 'kh', 'ki', 'km', 'kn', 'kp', 'kr', 'kw', 'ky', 'kz',
            'la', 'lb', 'lc', 'li', 'lk', 'lr', 'ls', 'lt', 'lu', 'lv', 'ly',
            'ma', 'mc', 'md', 'me', 'mf', 'mg', 'mh', 'mk', 'ml', 'mm', 'mn', 'mo', 'mp', 'mq', 'mr', 'ms', 'mt', 'mu', 'mv', 'mw', 'mx', 'my', 'mz',
            'na', 'nc', 'ne', 'nf', 'ng', 'ni', 'nl', 'no', 'np', 'nr', 'nu', 'nz',
            'om', 'pa', 'pe', 'pf', 'pg', 'ph', 'pk', 'pl', 'pm', 'pn', 'pr', 'ps', 'pt', 'pw', 'py',
            'qa', 're', 'ro', 'rs', 'ru', 'rw',
            'sa', 'sb', 'sc', 'sd', 'se', 'sg', 'sh', 'si', 'sj', 'sk', 'sl', 'sm', 'sn', 'so', 'sr', 'ss', 'st', 'sv', 'sx', 'sy', 'sz',
            'tc', 'td', 'tf', 'tg', 'th', 'tj', 'tk', 'tl', 'tm', 'tn', 'to', 'tr', 'tt', 'tv', 'tw', 'tz',
            'ua', 'ug', 'uk', 'um', 'us', 'uy', 'uz',
            'va', 'vc', 've', 'vg', 'vi', 'vn', 'vu',
            'wf', 'ws', 'xk', 'ye', 'yt', 'za', 'zm', 'zw',
        ];
    }

    public setScaleSize(scale: string) {
        this.scaleSize = scale;
    }

    public setScaleSizeRounded(scale: string) {
        this.scaleSizeRounded = scale;
    }

    public setRatio(ratio: string) {
        this.flagRatio = ratio;
        if (ratio === '1x1') {
            this.flagSquaredClass = 'flag-icon-squared';
        } else {
            this.flagSquaredClass = '';
        }
    }

    public onFlagChange(iso: string) {
        this.iconISO = iso;
    }
}
