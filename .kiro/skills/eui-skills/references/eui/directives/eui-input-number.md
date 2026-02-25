# eui-input-number

## Overview

<p class="eui-u-text-paragraph">This directive is being applied to input components only. There's no need to configure the number decimal and thousand separators.
This is done automatically through the LocaleService of eUI.</p>
<p class="eui-u-text-paragraph">Find more information about the <b>LocaleService</b>, <a href="https://eui.ecdevops.eu/eui-showcase-ux-components-19.x/showcase-dev-guide/docs/10-services/locale" class="eui-u-text-link">here</a>.</p>

<p class="eui-u-text-paragraph">In the case of using Model or FormControl, the value will always be a number. There's no need for you to know the format
of it to transform it into a number. On the other hand, there's no need for you to obtain the number formatted since you
will work with unformatted data.</p>

<br>

<eui-alert>
    <eui-alert-title>Remark about styling</eui-alert-title>
    If you don't use the <code class="eui-u-text-code">euiInputNumber</code> directive, it is recommended to use the <strong>eui-input-number</strong> style class applied to the input tag.
</eui-alert>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |

## Host Directives

| Host Directive | Inputs |
| --- | --- |
| EuiClearableDirective | euiClearable, readonly, disabled |
| EuiLoadingDirective | euiLoading, readonly |

## Samples

### [Default](samples/eui-input-number/Default)

```html
<input euiInputNumber value="9999.02" aria-label='Default Input example'/>
```

```typescript
import { Component } from '@angular/core';

import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_INPUT_NUMBER],
})
export class DefaultComponent {
}
```

### Other examples

- [Options: Clearable](samples/eui-input-number/clearable)
- [Options: Disabled](samples/eui-input-number/disabled)
- [Options: Fill Fraction](samples/eui-input-number/fill-fraction)
- [Options: Fraction Digits](samples/eui-input-number/fraction-digits)
- [Options: Integer Part Digits](samples/eui-input-number/digits)
- [Options: Invalid](samples/eui-input-number/invalid)
- [Options: Leading Zero](samples/eui-input-number/leading-zero)
- [Options: Loading indicator](samples/eui-input-number/loading-indicator)
- [Options: Max and Min](samples/eui-input-number/max-min)
- [Options: No format](samples/eui-input-number/no-format)
- [Options: Placeholder](samples/eui-input-number/placeholder)
- [Options: ReadOnly](samples/eui-input-number/readonly)
- [Options: Rounds number up of exponent 2](samples/eui-input-number/round-up)
- [Reactive Forms: Reactive Forms](samples/eui-input-number/reactive-forms)
- [Reactive Forms: Template-Driven Forms](samples/eui-input-number/template-driven-form)
- [Misc: Clearable with loading indicator](samples/eui-input-number/clearable-loading)

## Accessibility

<code class="eui-u-text-code">eui-input-number</code> following the semantic approach takes advantage of all the attributes attached to the native <code class="eui-u-text-code">input</code> html element and behaves as a <code class="eui-u-text-code">role="textbox"</code>. <br>
The <code class="eui-u-text-code">input</code> field should be given a meaningful label via <code class="eui-u-text-code">label for=""</code>, or  <code class="eui-u-text-code">aria-label</code> or <code class="eui-u-text-code">aria-labelledby</code>.
<!-- LEFT blank showcase central link provided in showcase doc-page component -->
