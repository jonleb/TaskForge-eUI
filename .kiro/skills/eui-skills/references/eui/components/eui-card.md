# eui-card

## Overview

<p class="eui-u-text-paragraph">
    Cards are surfaces that display content and actions on a single topic. The
    <code class="eui-u-text-code">eui-card</code> component is based on
    <a href="https://material.io/components/cards" target="_blank">
        Material Design
    </a>
    and provides a content container for text, photos and actions in the context
    of a single subject.
</p>

<p class="eui-u-text-paragraph">
    They should be easy to scan for relevant and actionable information.
    Elements, like text and images, should be placed on them in a way that
    clearly indicates hierarchy. Some optional (visual) enhancements and extra
    features has been added to express users and business requirements like the
    header body, type classes, an edit mode and lots of customizations.
</p>
<p class="eui-u-text-paragraph">
    Check out the interactive demo playground from the ADVANCED EXAMPLES section
    to see it in action.
</p>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | euiSelected | boolean | false |
| Input | euiCollapsible | boolean | false |
| Input | euiCollapsed | boolean | false |
| Input | euiUrgent | boolean | false |
| Input | euiNoShadow | boolean | false |
| Input | euiNoContentPadding | boolean | false |
| Input | euiHoverable | boolean | false |
| Input | hasLeftExpander | boolean | false |
| Input | isCompact | boolean | false |
| Output | collapse | EventEmitter<boolean> | new EventEmitter() |

## Host Directives

| Host Directive | Inputs |
| --- | --- |
| BaseStatesDirective | euiPrimary, euiSecondary, euiInfo, euiSuccess, euiWarning, euiDanger, euiHighlighted, euiDisabled, euiLoading, euiSizeXS, euiSizeS, euiSizeM, euiSizeL, euiSizeXL, euiSize2XL, euiSizeVariant |

## Samples

### [Default](samples/eui-card/Default)

```html
<div class="doc-sample-section-title">Showing card header title, subtitle and card content</div>

<eui-card>
    <eui-card-header>
        <eui-card-header-title>
            {{ cardTitle }}
        </eui-card-header-title>
        <eui-card-header-subtitle>
            {{ cardSubtitle }}
        </eui-card-header-subtitle>
    </eui-card-header>
    <eui-card-content>
        I am the content of the card container...
    </eui-card-content>
</eui-card>


<div class="doc-sample-section-title">Displayed card sections: header - header body - content - footer</div>

Features :<br>
<ul class="eui-u-text-list">
    <li class="eui-u-text-list-item">header with title and subtitle with link on Title</li>
    <li class="eui-u-text-list-item">optional header-body with custom content</li>
    <li class="eui-u-text-list-item">optional card content</li>
    <li class="eui-u-text-list-item">optional and custom footer's content with action buttons, icons buttons, tooltip text and local menu</li>
</ul>

<eui-card>
    <eui-card-header>
        <eui-card-header-title>
            <a href="javascript: void(0)" (click)="onCardTitleLinkClicked($event)" class="eui-u-text-link">{{ cardTitle }}</a>
        </eui-card-header-title>

        <eui-card-header-subtitle>
            {{ cardSubtitle }}
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
import { Component } from '@angular/core';

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
        ...EUI_CHIP,
        ...EUI_ICON,
        ...EUI_BUTTON,
        ...EUI_LIST,
        ...EUI_LABEL,
        ...EUI_DROPDOWN,
        ...EUI_ICON_TOGGLE,
        EuiTooltipDirective,
    ],
})
export class DefaultComponent {

    public cardTitle = 'Card Title goes here';
    public cardSubtitle = 'Card subtitle text label';
    public cardContentStyle = 'height: 10rem';
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

### Other examples

- [Variants: Colors](samples/eui-card/colors)
- [Options: Collapsible / collapsed](samples/eui-card/collapsible-collapsed)
- [Options: euiNoContentPadding](samples/eui-card/no-padding)
- [Options: euiSelected](samples/eui-card/selected)
- [Options: euiUrgent](samples/eui-card/urgent)
- [Options: isCompact](samples/eui-card/is-compact)
- [Options: hasFullTitle](samples/eui-card/full-title)
- [Options: isHeaderMultilines](samples/eui-card/header-multilines)
- [Main Features: Card container](samples/eui-card/card-container)
- [Main Features: Card footer](samples/eui-card/card-footer)
- [Main Features: Card header](samples/eui-card/card-header)
- [Event handlers: Events](samples/eui-card/event-handlers)
- [Event handlers: Clickeable card header](samples/eui-card/is-clickeable)
- [Misc: Card with table](samples/eui-card/card-table)
- [Misc: Card with table and cards list](samples/eui-card/card-table-list)
- [Misc: Cards list](samples/eui-card/cards-list)
- [Misc: Cards list accordion](samples/eui-card/cards-list-accordion)
- [Misc: Change properties dynamically](samples/eui-card/change-prop-dynamically)
- [Misc: Component in content](samples/eui-card/component-in-content)
- [Misc: Content viewer featured cards](samples/eui-card/pictures-viewer)
- [Misc: Editable card](samples/eui-card/card-editable)
- [Misc: Media featured cards](samples/eui-card/media-cards)
- [Misc: Task Centre's like cards](samples/eui-card/task-centre-like-card)

## Accessibility

<p class="eui-u-text-paragraph"><code class="eui-u-text-code">eui-card</code>  can be used in a wide variety of scenarios and can contain many different types of content.
    Due to this dynamic nature, the appropriate accessibility treatment depends on how <code class="eui-u-text-code">eui-card</code> is used.</p>

<div class="eui-u-mt-m eui-u-ml-m">
    &bull;&nbsp;<code class="eui-u-text-code">eui-card-header</code>:<br>
    <div class="eui-u-ml-m">
        - if <code class="eui-u-text-code">avatarUrl</code> is being used then we expose an <code class="eui-u-text-code">&#64;Input() avatarDerscription</code> that we pass to the <code class="eui-u-text-code">aria-label</code> attribute to announce the avatar Url.<br>
        - if <code class="eui-u-text-code">iconClass</code> is being used then we expose an <code class="eui-u-text-code">&#64;Input() iconDescription</code> that we pass to the <code class="eui-u-text-code">aria-label</code> attribute to announce the card header icon.<br>
        - if the header is collapsible we then expose an <code class="eui-u-text-code"> &#64;Input() expandLabel</code> and <code class="eui-u-text-code"> &#64;Input() collapseLabel</code> that we pass as <code class="eui-u-text-code">aria-label</code> to the <code class="eui-u-text-code">span</code> element in order to announce the icon. <br>
    </div>
    &bull;&nbsp;<code class="eui-u-text-code">eui-card-content</code>: a <code class="eui-u-text-code">&#64;HostBinding('attr.tabindex') tabindex = '0';</code> is being used in order to ensure that scrollable regions have keyboard access. <br>
    &bull;&nbsp;<code class="eui-u-text-code">eui-card-media</code>: an <code class="eui-u-text-code"> &#64;Input() imageDescription = 'eUI Card Image';</code> is exposed in order to announce the img when an <code class="eui-u-text-code">imageLegend</code> is not being used. <br>
    &bull;&nbsp;<code class="eui-u-text-code">eui-card-footer-menu</code> is using an <code class="eui-u-text-code">eui-drodpown</code> with an <code class="eui-u-text-code">eui-button</code> icon within. We expose an <code class="eui-u-text-code">&#64;Input() tooltipText = 'More options';</code> in order to make button's content accessible to the screen reader users.
</div>

<!-- LEFT blank showcase central link provided in showcase doc-page component -->
