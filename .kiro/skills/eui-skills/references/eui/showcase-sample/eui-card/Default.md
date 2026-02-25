---
description: This baseline sample shows the standard card composition with header, content, and footer action areas.
id: Default
---

```html
<eui-card>
    <eui-card-header>
        <eui-card-header-title>
            <a href="javascript: void(0)" (click)="onCardTitleLinkClicked($event)" class="eui-u-text-link">Card Title goes here</a>
        </eui-card-header-title>

        <eui-card-header-subtitle>
            Card subtitle text label
        </eui-card-header-subtitle>

        <eui-card-header-body>Optional card header body section content...</eui-card-header-body>
    </eui-card-header>

    <eui-card-content>
        <p class="eui-u-text-paragraph">
            The <strong>Shiba Inu</strong> is a Japanese breed of hunting dog. A small-to-medium breed, it is the smallest of
            the six original and distinct spitz breeds of dog native to Japan.
            A small, agile dog that copes very well with mountainous terrain and hiking trails, the <a
                href="https://en.wikipedia.org/wiki/Shiba_Inu" target="_blank" class="eui-u-text-link-external-standalone">Shiba Inu</a>
            was originally bred for hunting.
        </p>
        <p class="eui-u-text-paragraph">
            It looks similar to and is often mistaken for other Japanese dog breeds like the Akita Inu or Hokkaido, but the
            Shiba Inu is a different breed with a distinct blood line, temperament, and smaller size than other Japanese dog
            breeds.
        </p>
    </eui-card-content>

    <eui-card-footer>
        <eui-card-footer-action-buttons>
            <button euiButton euiPrimary euiTooltip="Primary action" aria-label="Primary action">Action 1</button>
            <button euiButton euiSecondary euiTooltip="Secondary action" aria-label="Secondary action">Action 2</button>
        </eui-card-footer-action-buttons>

        <eui-card-footer-action-icons>
            <eui-icon-toggle isChecked iconSvgNameOn="eui-star-fill" iconSvgNameOff="eui-star"
                (toggle)="onFavouriteToggle($event)" 
                [euiTooltip]="isChecked ? 'Unmark from favourites' : 'Mark as favourite'"
                [attr.aria-label]="isChecked ? 'Unmark from favourites' : 'Mark as favourite'"
                keyboardAccessKey="st"
            />

            <button euiButton euiRounded euiIconButton euiBasicButton euiPrimary euiTooltip="Share" aria-label="Share">
                <eui-icon-svg icon="share-network:regular"/>
            </button>
        </eui-card-footer-action-icons>

        <eui-card-footer-menu>
            <eui-dropdown euiTooltip="More actions">
                <button
                    euiButton
                    euiRounded
                    euiIconButton
                    euiBasicButton
                    euiPrimary
                    type="button"
                    aria-label="More actions">
                    <eui-icon-svg icon="eui-ellipsis-vertical"/>
                </button>
                <eui-dropdown-content>
                    <button euiDropdownItem (click)="onMenuItemClicked($event, 1);">Menu item 1</button>
                    <button euiDropdownItem (click)="onMenuItemClicked($event, 2);">Menu item 2</button>
                    <button euiDropdownItem (click)="onMenuItemClicked($event, 3);">Menu item 3</button>
                </eui-dropdown-content>
            </eui-dropdown>
        </eui-card-footer-menu>
    </eui-card-footer>
</eui-card>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_LIST } from '@eui/components/eui-list';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';
import { EUI_ICON_TOGGLE } from '@eui/components/eui-icon-toggle';
import { EuiTooltipDirective } from '@eui/components/directives';


@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CARD,
        ...EUI_ICON,
        ...EUI_BUTTON,
        ...EUI_DROPDOWN,
        ...EUI_ICON_TOGGLE,
        EuiTooltipDirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultComponent {
    public isChecked = true;

    public onCardTitleLinkClicked(event: Event): void {
        alert('Title clicked !');
        if (event) {
            event.preventDefault();
            event.stopPropagation();
            event.cancelBubble = true;
        }
    }

    public onMenuItemClicked(event: Event, index: number): void {
        alert('you clicked on menu item ' + index);
    }
    public onFavouriteToggle(isChecked: boolean) {
        this.isChecked = isChecked;
    }
}
```

