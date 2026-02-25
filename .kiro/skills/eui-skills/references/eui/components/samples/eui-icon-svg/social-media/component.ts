import { Component, ViewChild, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

import { EUI_ICON } from "@eui/components/eui-icon";
import { EuiGrowlService } from '@eui/core';
import { EUI_POPOVER, EuiPopoverComponent } from "@eui/components/eui-popover";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_INPUT_TEXT } from "@eui/components/eui-input-text";
import { EuiTooltipDirective } from "@eui/components/directives";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'social-media',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON,
        ...EUI_POPOVER,
        ...EUI_BUTTON,
        ...EUI_INPUT_TEXT,
        EuiTooltipDirective,
    ],
    styleUrls: ['../../module.component.scss'],
})
export class EuiSocialMediaIconsComponent implements OnInit {
    public euiSocialMediaIcons: any = [];

    @ViewChild('popover') popover: EuiPopoverComponent;

    selectedIcon: string;
    selectedSet: 'eui' | 'sharp' | 'outline' = 'eui';
    selectedSize = 'm';
    selectedColor = 'neutral';

    constructor( private clipboard: Clipboard,
        public growlService: EuiGrowlService, ) {
    }

    public copySourceToClipboard( icon: any, set?: any, size?: any, hue?: any ) {
        let code: string = '<eui-icon-svg icon="' + icon;
        if (this.selectedSet !== 'eui') {
            code += ':' + this.selectedSet;
        }
        if (this.selectedSize !== 'm') {
            code += '" size="' + this.selectedSize;
        }
        if (this.selectedColor !== 'neutral') {
            code += '" fillColor="' + this.selectedColor;
        }
        code += '" />';
        this.clipboard.copy(code);
        this.growlService.growlInfo('The code source has been successfully copied to clipboard.');
    }

    public openPopover(e: any, icon?: any, set?: any, size?: any, hue?: any) {
        this.selectedIcon = icon;
        this.selectedSet = set;
        this.selectedSize = size;
        this.selectedColor = hue;
        this.popover.openPopover(e.target);
    }

    ngOnInit(): void {
        this.euiSocialMediaIcons = [
            { icon: 'ecl-blog' },
            { icon: 'ecl-email' },
            { icon: 'ecl-facebook' },
            { icon: 'ecl-flickr' },
            { icon: 'ecl-foursquare' },
            { icon: 'ecl-gmail' },
            { icon: 'ecl-instagram' },
            { icon: 'ecl-linkedin' },
            { icon: 'ecl-mastodon' },
            { icon: 'ecl-messenger' },
            { icon: 'ecl-pinterest' },
            { icon: 'ecl-qzone' },
            { icon: 'ecl-reddit' },
            { icon: 'ecl-rss' },
            { icon: 'ecl-skype' },
            { icon: 'ecl-sms' },
            { icon: 'ecl-spotify' },
            { icon: 'ecl-telegram' },
            { icon: 'ecl-twitter' },
            { icon: 'ecl-typepad' },
            { icon: 'ecl-weibo' },
            { icon: 'ecl-whatasapp' },
            { icon: 'ecl-yahoomail' },
            { icon: 'ecl-yammer' },
            { icon: 'ecl-youtube' },
        ];
    }
}
