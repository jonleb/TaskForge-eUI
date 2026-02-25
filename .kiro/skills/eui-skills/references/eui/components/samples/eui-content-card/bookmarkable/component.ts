import { Component } from '@angular/core';

import { EUI_CONTENT_CARD } from '@eui/components/eui-content-card';
import { EUI_ICON_BUTTON } from '@eui/components/eui-icon-button';

@Component({
    // eslint-disable-next-line
    selector: 'bookmarkable',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CONTENT_CARD,
        ...EUI_ICON_BUTTON,
    ],
})
export class BookmarkableComponent {
    isCardBookmarked = false;

    onCardBookmark(isBookmarked: boolean): void {
        this.isCardBookmarked = isBookmarked;
    }

}
