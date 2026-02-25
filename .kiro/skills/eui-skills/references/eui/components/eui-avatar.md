# eui-avatar

## Overview

Molecule multi-purpose container component to display icon / image / text initials.

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | hasShadow | boolean | false |
| Input | isShapeSquare | boolean | false |
| Input | hasNoBackground | boolean | false |
| Input | isReverse | boolean | false |
| Input | colorPalette | string | - |

## Host Directives

| Host Directive | Inputs |
| --- | --- |
| BaseStatesDirective | euiPrimary, euiSecondary, euiSuccess, euiInfo, euiWarning, euiDanger, euiVariant, euiSizeXS, euiSizeS, euiSizeL, euiSizeXL, euiSize2XL, euiSizeVariant, euiOutline |

## Samples

### [Default](samples/eui-avatar/Default)

```html
<div class="doc-sample-section-title">eui-avatar-icon content</div>

<eui-avatar>
    <eui-avatar-icon>
        <eui-icon-svg icon="eui-user" />
    </eui-avatar-icon>
</eui-avatar>


<div class="doc-sample-section-title">eui-avatar-text content</div>

<eui-avatar>
    <eui-avatar-text>eUI</eui-avatar-text>
</eui-avatar>


<div class="doc-sample-section-title">eui-avatar-image content (default)</div>

<eui-avatar>
    <eui-avatar-image></eui-avatar-image>
</eui-avatar>


<div class="doc-sample-section-title">With label content</div>
<eui-avatar>
    <eui-avatar-image></eui-avatar-image>
    <eui-avatar-content>
        <eui-avatar-content-label>
            John Doe
        </eui-avatar-content-label>
        <eui-avatar-content-sublabel>
            john.doe&#64;ec.europa.eu
        </eui-avatar-content-sublabel>
    </eui-avatar-content>
</eui-avatar>


<div class="doc-sample-section-title">Button actionable avatar with eui-dropdown</div>

<p class="eui-u-text-paragraph">
    Click on the avatar to expand the menu items
</p>




<eui-dropdown>
    <button euiButton euiRounded euiIconButton euiBasicButton euiAvatarButton [attr.aria-label]="'More options'">
        <eui-avatar>
            <eui-avatar-image></eui-avatar-image>
        </eui-avatar>
    </button>
    <eui-dropdown-content>
        <button euiDropdownItem aria-label="Item 1">Option item 1</button>
        <button euiDropdownItem aria-label="Item 2">Option item 2</button>
        <button euiDropdownItem aria-label="Item 3">Option item 3</button>
    </eui-dropdown-content>
</eui-dropdown>
```

```typescript
import { Component } from '@angular/core';

import { EUI_AVATAR } from '@eui/components/eui-avatar';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';
import { EUI_ICON } from '@eui/components/eui-icon';

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_AVATAR,
        ...EUI_ICON,
        ...EUI_DROPDOWN,
        ...EUI_BUTTON,
    ],
})
export class DefaultComponent {
}
```

### Other examples

- [Variants: Colors](samples/eui-avatar/colors)
- [Variants: Reverse](samples/eui-avatar/reverse)
- [Variants: Sizes](samples/eui-avatar/sizes)
- [Variants: Squared](samples/eui-avatar/is-shape-square)
- [Main features: Image](samples/eui-avatar/image)
- [Main features: List grouping](samples/eui-avatar/list-grouping)
- [Main features: Text](samples/eui-avatar/text)
- [Composition: With eui-badge](samples/eui-avatar/with-badge)
- [Composition: With eui-chip](samples/eui-avatar/with-chip)
- [Extra palettes](samples/eui-avatar/extra-palettes)

## Accessibility

<eui-alert>
    <eui-alert-title>N/A</eui-alert-title>
    this component has no interaction, it's a plain container used for rendering
</eui-alert>
