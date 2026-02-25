---
description: This sample explores header composition with title/subtitle plus left and right projected content slots.
id: card-header
---

```html
<eui-card>
	<eui-card-header>
        <eui-card-header-title>
            Card header title
        </eui-card-header-title>
    </eui-card-header>
	<eui-card-content>
        Card content...
    </eui-card-content>
</eui-card>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';
import { EUI_LIST } from '@eui/components/eui-list';
import { EuiTooltipDirective } from '@eui/components/directives';
import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EUI_ICON_TOGGLE } from '@eui/components/eui-icon-toggle';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EuiTruncatePipe } from '@eui/components/pipes';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EUI_AVATAR } from '@eui/components/eui-avatar';
import { consumeEvent } from '@eui/core';


@Component({
    // eslint-disable-next-line
    selector: 'card-header',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
        EuiTooltipDirective,
        EuiTruncatePipe,
        ...EUI_CARD,
        ...EUI_ICON,
        ...EUI_CHIP,
        ...EUI_DROPDOWN,
        ...EUI_INPUT_CHECKBOX,
        ...EUI_BUTTON,
        ...EUI_SLIDE_TOGGLE,
        ...EUI_PAGE,
        ...EUI_AVATAR,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardHeaderComponent {

    isCollapsible = true;
    isCollapsed = true;
    isSelected = false;
    isFavourite = false;
    isUrgent = false;

    public selectedItems = [];
    public isMulti = true;
    public cardTitle = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris feugiat, risus sit amet ultricies finibus, diam dolor congue leo, vel vehicula nisl metus eget eros`;
    public cardSubtitle = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Vivamus sed felis ac risus gravida auctor. Praesent vitae neque nec elit maximus lacinia.
                            Sed fringilla sodales est. In ut fermentum diam, ac venenatis lorem.
                            Quisque enim orci, dictum vitae vehicula pretium, rhoncus a nibh.`;

    public onCardTitleLinkClicked(event: Event): void {
        alert('Title clicked !');
        consumeEvent(event);
    }

    public onCardSelect(event: Event, id: any): void {
        this.isSelected = !this.isSelected;
        consumeEvent(event);
        this._onSelectedItem(id);
    }

    public onMarkAsFavourite(event: Event): void {
        this.isFavourite = !this.isFavourite;
        consumeEvent(event);
    }

    public onFavouriteToggle(event: boolean): void {
        // Update business related rules here...
        if (event) {
            // Item is marked as favourite
        } else {
            // Item to be removed from favourites
        }
    }

    public dropdownClick(event: Event): void {
        event.stopPropagation();
    }

    public onCancel(): void {
        this.selectedItems = [];
        this.isSelected = false;
    }

    public onSave(): void {
        this.selectedItems = [];
        this.isSelected = false;
    }

    public onAddButtonClick(event: Event): void {
        // Do add action here
        consumeEvent(event);
    }

    public onChangeMulti(e: boolean): void {
        this.isMulti = e;
    }

    private _onSelectedItem(id: any): void {
        if (id) {
            if (this.isSelected) {
                // Add it (checked)
                this.selectedItems.push({ id });
            } else {
                // Remove it (unchecked)
                for (let i = 0; i < this.selectedItems.length; i++) {
                    if (this.selectedItems[i].id === id) {
                        this.selectedItems.splice(i, 1);
                        break;
                    }
                }
            }
        }
    }
}
```

