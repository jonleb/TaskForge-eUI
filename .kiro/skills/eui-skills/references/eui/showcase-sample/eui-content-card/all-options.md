---
description: Comprehensive example combining media, header blocks, metadata, body-top content, footer actions, and selectable/collapsible states.
id: all-options
---

```html
<eui-content-card isCollapsible isSelectable>
    <eui-content-card-media>
        <picture>
            <img width="200px" src="assets/images/example-image.jpg" alt="Image alternative text"/>
        </picture>        
    </eui-content-card-media> 

    <eui-content-card-header>
        <eui-content-card-header-start>
            <eui-chip euiSizeS>In progress</eui-chip>
        </eui-content-card-header-start>
        <eui-content-card-header-end>
            <eui-icon-button icon="eui-ellipsis-vertical" euiRounded fillColor="primary" size="s"/>
        </eui-content-card-header-end>
        <eui-content-card-header-title>
            <a class="eui-u-text-link" href="javascript:void(0)">
                This is a title
            </a>
        </eui-content-card-header-title>
        <eui-content-card-header-subtitle>
            This is a secondary title
        </eui-content-card-header-subtitle>

        <eui-content-card-header-metadata>
            Meta info | Date
        </eui-content-card-header-metadata>
        <eui-content-card-header-submetadata>
            <span class="eui-u-flex eui-u-flex-gap-2xs">
                <eui-icon-svg icon="star:fill" fillColor="primary" size="s" />
                <strong>4.9</strong>
                (202 reviews)
            </span>
        </eui-content-card-header-submetadata>
    </eui-content-card-header>

    <eui-content-card-body>
        <eui-content-card-body-top>
            <div class="eui-u-flex eui-u-flex-gap-xs">
                <eui-status-badge euiSecondary euiSizeS>Badge label</eui-status-badge>
                <eui-status-badge euiSecondary euiSizeS>Badge label</eui-status-badge>
                <eui-status-badge euiSecondary euiSizeS>Badge label</eui-status-badge>
            </div>
        </eui-content-card-body-top>

        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum."
    </eui-content-card-body>

    <eui-content-card-footer>
        <div class="eui-u-flex">
            <button euiButton euiBasicButton euiPrimary euiSizeS>Tertiary</button>
            <div class="eui-u-display-flex eui-u-ml-auto eui-u-flex-gap-xs">
                <button euiButton euiOutline euiPrimary euiSizeS>Secondary</button>
                <button euiButton euiPrimary euiSizeS>Primary</button>
            </div>
        </div>
    </eui-content-card-footer>
</eui-content-card>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_CONTENT_CARD } from '@eui/components/eui-content-card';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_ICON_BUTTON } from '@eui/components/eui-icon-button';
import { EUI_STATUS_BADGE } from '@eui/components/eui-status-badge';


@Component({
    // eslint-disable-next-line
    selector: 'all-options',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CONTENT_CARD,
        ...EUI_BUTTON,
        ...EUI_ICON_BUTTON,
        ...EUI_ICON,
        ...EUI_CHIP,
        ...EUI_STATUS_BADGE,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllOptionsComponent {

}
```

