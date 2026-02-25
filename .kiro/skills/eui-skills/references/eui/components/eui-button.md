# eui-button

## Overview

<p class="eui-u-text-paragraph">Buttons are clickable elements that are used to allow (inter)actions with the User Interface.
They communicate calls to action to the user and allow users to interact with pages in a variety of ways.
Button labels express what action will occur when the user interacts with it.</p>

<p class="eui-u-text-paragraph">eUI buttons are build on native <code class="eui-u-text-code">&lt;button&gt;</code> associated with the <code class="eui-u-text-code">euiButton</code> input directive which enhances the visual layout over the eUI Design System specifications.</p>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | id | string | - |
| Input | euiBasicButton | boolean | false |
| Input | euiCTAButton | boolean | false |
| Input | euiBlockButton | boolean | false |
| Input | euiIconButton | boolean | false |
| Input | euiAvatarButton | boolean | false |
| Input | euiLineWrap | boolean | false |
| Input | isCompact | boolean | false |
| Input | hasNoFocusRing | boolean | false |
| Input | get | unknown | - |
| Input | get | unknown | - |
| Output | buttonClick | EventEmitter<EuiButtonComponent> | new EventEmitter<EuiButtonComponent>() |

## Host Directives

| Host Directive | Inputs |
| --- | --- |
| BaseStatesDirective | euiPrimary, euiBranding, euiSecondary, euiSuccess, euiInfo, euiWarning, euiDanger, euiInverse, euiVariant, euiSizeXS, euiSizeS, euiSizeM, euiSizeL, euiSizeVariant, euiOutline, euiRounded, euiResponsive, euiStart, euiEnd |

## Samples

### [Default](samples/eui-button/Default)

```html
<button euiButton>Default</button>
```

```typescript
import { Component } from '@angular/core';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_BUTTON, ...EUI_ICON]
})
export class DefaultComponent {
}
```

### Other examples

- [Variants: Colors](samples/eui-button/colors)
- [Variants: Outline](samples/eui-button/outline)
- [Variants: Basic](samples/eui-button/basic)
- [Variants: Rounded](samples/eui-button/rounded)
- [Variants: Sizes](samples/eui-button/sizes)
- [Variants: Types](samples/eui-button/types)
- [Options: Block button](samples/eui-button/block-button)
- [Options: Disabled](samples/eui-button/disabled)
- [Options: isLoading](samples/eui-button/is-loading)
- [Composition: Icon Button](samples/eui-button/icon-button)
- [Misc: Icon before / after label](samples/eui-button/icon-before-after)
- [Misc: Multiple lines label](samples/eui-button/line-wrap)
- [Misc: Responsive buttons](samples/eui-button/responsive-button)
- [Misc: Used as toggler](samples/eui-button/used-as-toggler)
- [Misc: With badge](samples/eui-button/with-badge)
- [Misc: Within flexbox](samples/eui-button/with-flexbox)

## Accessibility

<p class="eui-u-text-paragraph"><code class="eui-u-text-code">eui-button</code> is taking full advantage of the semantic approach being used in order to announce the role and the innerHTML content through the corresponding attributes of the native button HTML element.</p>

<p class="eui-u-text-paragraph">If the button content is not text (i.e. Icon), then it should be given a meaningful label via <code class="eui-u-text-code">aria-label</code> or <code class="eui-u-text-code">aria-labelledby</code> to express the meaning to screen readers.
If <code class="eui-u-text-code">eui-icon</code> is used then an <code class="eui-u-text-code">&#64;Input('aria-label')</code> is exposed to announce the icon, which defaults to 'eUI Icon'.</p>

<p class="eui-u-text-paragraph">Special attention has been given to comply with the a11y requirement to have sufficient color contrast between the text in the foreground and the background color behind it.
More info on this can be found <a class="eui-u-text-link-external" href="https://dequeuniversity.com/rules/axe/3.5/color-contrast?application=axeAPI" target="_blank" class="eui-u-text-link-external">here</a>.</p>

<!-- LEFT blank showcase central link provided in showcase doc-page component -->
