import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_CHIP_LIST } from '@eui/components/eui-chip-list';
import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_PAGE } from '@eui/components/eui-page';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    // eslint-disable-next-line
    selector: 'custom-content',
    templateUrl: 'component.html',
    imports: [
        NgTemplateOutlet,
        TranslateModule,
        ...EUI_PAGE,
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_DROPDOWN,
        ...EUI_CHIP,
        ...EUI_CHIP_LIST,
        ...EUI_CARD,
    ],
})
export class CustomContentComponent {

    public hasSupplementaryItems = true;
    public showMore = false;

    public chips = [
        { id: 1, label: 'Tagname 01' },
        { id: 2, label: 'Tagname 02' },
        { id: 3, label: 'Tagname 03 with veyy long label' },
        { id: 4, label: 'Tagname 04' },
        { id: 5, label: 'Tagname 05' },
        { id: 6, label: 'Tagname 06' },
        { id: 7, label: 'Tagname 07' },
    ];
    public maxVisibleChipsCount = 2;
    public isMaxVisibleChipsOpened = false;

    public onShowMoreToggle(event: Event) {
        this.showMore = !this.showMore;
    }

    public toggleTags(): void {
        this.isMaxVisibleChipsOpened = !this.isMaxVisibleChipsOpened;
    }
}

