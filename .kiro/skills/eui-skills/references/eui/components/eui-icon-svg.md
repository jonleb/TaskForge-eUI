# eui-icon-svg

## Overview

<p class="eui-u-text-paragraph">
    The <strong>eUI Core</strong> icons set and 
    <a class="eui-u-text-link-external eui-u-f-bold" href="https://phosphoricons.com/" target="_blank">Phosphor</a>
    icons sets (Regular set variant recommended first and Fill set variant) are the default icon sets from the current <strong>eUI 21 Design System</strong>.
</p>

<p class="eui-u-text-paragraph">
    The <strong>ECL</strong> Icon Set is provided for all official social media icon references among other official icons.
    <br>
    For <strong>Ionic</strong> icons sets (Filled & Outline), please refer to the following link:
    <a class="eui-u-text-link-external" href="https://ionic.io/ionicons" target="_blank">Ionicons</a>
</p>
<br>

<div class="eui-u-text-h4">Usage</div>

<p class="eui-u-text-paragraph">
    Default usage is to use the <code class="eui-u-text-code">icon="%icon%"</code> input option, where <code class="eui-u-text-code">%icon%</code> is one of the icons shown below (see Icon sets).
</p>
<pre class="eui-u-f">
Example: <code class="eui-u-text-code">&lt;eui-icon-svg icon="%icon%" set="%set%" /&gt;</code>
</pre>
or you can define both <strong>icon:set</strong> in the icon input option separated by a semicolon character.
<pre class="eui-u-f">
Example: <code class="eui-u-text-code">&lt;eui-icon-svg icon="%icon%:%set%" /&gt;</code>
</pre>

<p class="eui-u-text-paragraph">
    The <code class="eui-u-text-code">set</code> input option can be one of the following : <strong>eui | ecl | regular | fill</strong>. The regular and fill are using the Phosphor icons.
    <br>
    If no set is specified, the <strong>eui</strong> one is applied by default.
</p>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | icon | string | - |
| Input | fillColor | string | - |
| Input | set | string | 'eui' |
| Input | size | '2xs' \| 'xs' \| 's' \| 'm' \| 'l' \| 'xl' \| '2xl' \| '3xl' \| '4xl' \| string | 'm' |
| Input | style | string | '' |
| Input | iconUrl | string | - |
| Input | transform | string | '' |
| Input | ariaLabel | string | 'Icon' |
| Input | focusable | boolean | false |
| Input | isLoading | boolean | false |
| Input | isInputIcon | boolean | false |
| Input | euiStart | boolean | false |
| Input | euiEnd | boolean | false |

## Samples

### [Default](samples/eui-icon-svg/Default)

```html
<div class="doc-sample-section-title">No set defined : the eUI set is used by default</div>

<eui-icon-svg icon="eui-home" />


<div class="doc-sample-section-title">Set is defined with the "set" property</div>
<div class="eui-u-text-paragraph">or you can use the icon property for both <strong>icon_name:set_name</strong> separated by a semicolon.</div>

<eui-icon-svg icon="alarm" set="regular" />
<eui-icon-svg icon="question:regular" />
<br>
<eui-icon-svg icon="alarm" set="fill" />
<eui-icon-svg icon="question:fill" />


<div class="doc-sample-section-title">Icon can be dynamically changed</div>

<eui-icon-svg [icon]="dynamicIcon" />
<br>
<button euiButton euiSizeS (click)="onIconChange()">Update icon</button>


<div class="eui-u-flex eui-u-flex-gap-s eui-u-mt-m">
    <span class="eui-u-f-xl eui-u-f-bold">Powered by</span>
    <eui-icon-svg icon="eui-logo" size="2xl" aria-label="eUI" title="eUI" />
    <span class="eui-u-f-xl eui-u-f-bold">with</span>
    <eui-icon-svg icon="heart-straight:fill" size="xl" aria-label="Love heart" title="Love" fillColor="danger" />
</div>
```

```typescript
import { Component } from '@angular/core';

import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ICON, ...EUI_BUTTON],
    styleUrls: ['../../module.component.scss'],
})
export class DefaultComponent {
    dynamicIcon = 'eui-state-info';

    onIconChange(): void {
        if (this.dynamicIcon === 'eui-state-info') {
            this.dynamicIcon = 'eui-state-warning';
        } else {
            this.dynamicIcon = 'eui-state-info';
        }
    }
}
```

### Other examples

- [Variants: Colors](samples/eui-icon-svg/icon-colors)
- [Variants: Sizes](samples/eui-icon-svg/icon-sizes)
- [Options: isLoading](samples/eui-icon-svg/is-loading)
- [Options: Transformations](samples/eui-icon-svg/transform)
- [Main features:  Icon sets (search)](samples/eui-icon-svg/icon-sets)
- [Main features: Custom icons](samples/eui-icon-svg/custom-icons)
- [Main features: Custom icons sets](samples/eui-icon-svg/custom-icons-sets)
- [Main features: eUI Flag icons](samples/eui-icon-svg/eui-flag-icons)
- [Main features: File types](samples/eui-icon-svg/file-types)
- [Main features: Social media](samples/eui-icon-svg/social-media)
- [Migration: eUI icons migration](samples/eui-icon-svg/migration)
- [Composition: With button](samples/eui-icon-svg/with-button)
- [Misc: With card](samples/eui-icon-svg/with-card)
