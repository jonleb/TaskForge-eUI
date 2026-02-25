---
description: Enables the bookmark toggle in the header end block, with an optional pre-bookmarked state.
id: bookmarkable
---

```html
<eui-content-card isBookmarkable (cardBookmark)="onCardBookmark($event)">
    <eui-content-card-header>
        <eui-content-card-header-end>
            <eui-icon-button icon="eui-ellipsis-vertical" euiRounded fillColor="primary" size="s"/>
        </eui-content-card-header-end>        
        <eui-content-card-header-title>
            <a class="eui-u-text-link" href="javascript:void(0)">
                This is a title
            </a>
        </eui-content-card-header-title>
    </eui-content-card-header>

    <eui-content-card-body>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum."
    </eui-content-card-body>
</eui-content-card>


<div class="doc-sample-section-title">isBookmarkable / isBookmarked</div>

<eui-content-card isBookmarkable isBookmarked (cardBookmark)="onCardBookmark($event)">
    <eui-content-card-header>
        <eui-content-card-header-end>
            <eui-icon-button icon="eui-ellipsis-vertical" euiRounded fillColor="primary" size="s"/>
        </eui-content-card-header-end>        
        <eui-content-card-header-title>
            <a class="eui-u-text-link" href="javascript:void(0)">
                This is a title
            </a>
        </eui-content-card-header-title>
    </eui-content-card-header>

    <eui-content-card-body>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum."
    </eui-content-card-body>
</eui-content-card>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkableComponent {

    onCardBookmark(isBookmarked: boolean): void {
        console.log('isBookmarked', isBookmarked);
    }

}
```

