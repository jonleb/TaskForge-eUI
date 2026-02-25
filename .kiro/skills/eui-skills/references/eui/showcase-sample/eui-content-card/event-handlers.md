---
description: Illustrates cardSelect, cardBookmark, and cardCollapse events with state updates.
id: event-handlers
---

```html
<eui-content-card isBookmarkable [isBookmarked]="isCardBookmarked" isSelectable [isSelected]="isCardSelected" (cardSelect)="onCardSelect($event)" (cardBookmark)="onCardBookmark($event)">
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

<br/>

<eui-content-card isCollapsible [isCollapsed]="isCardBookmarked" isSelectable [isSelected]="isCardSelected" (cardSelect)="onCardSelect($event)" (cardCollapse)="onCardCollapse($event)">
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
    selector: 'event-handlers',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CONTENT_CARD,
        ...EUI_ICON_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventHandlersComponent {
    isCardBookmarked = false;
    isCardCollapsed = false;
    isCardSelected = false;

    onCardBookmark(isBookmarked: boolean): void {
        console.log('isBookmarked', isBookmarked);
        this.isCardBookmarked = isBookmarked;
    }

    onCardCollapse(isCollapsed: boolean): void {
        console.log('isCollapsed', isCollapsed);
        this.isCardCollapsed = isCollapsed;
    }

    onCardSelect(isSelected: boolean): void {
        console.log('isSelected', isSelected);
        this.isCardSelected = isSelected;
    }

}
```

