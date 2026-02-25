# eui-input-text

## Overview

<p class="eui-u-text-paragraph">Text fields allow users to input text and/or numeric information. They are typically used in forms and dialogs. This directive is being applied to input components only.</p>
<br>
<eui-alert>
    <eui-alert-title>Remark about styling</eui-alert-title>
    If you don't use the <code class="eui-u-text-code">euiInputText</code> directive, it is recommended to use the <strong>eui-input-text</strong> style class applied to the input tag.
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

### [Default](samples/eui-input-text/Default)

```html
<input euiInputText value="Input text sample" aria-label="Input text sample" />

<div class="doc-sample-section-title">With Label</div>
<div euiInputGroup>
    <label euiLabel for="with_label_default">Label</label>
    <input euiInputText id="with_label_default" value="Input text sample" />
</div>

<div class="doc-sample-section-title">With max length defined</div>
<p class="eui-u-text-paragraph">Use the <code class="eui-u-text-code">euiMaxlength</code> directive to set contents size limit</p>
<br>
<div euiInputGroup>
    <label euiLabel for="label_max50">Label (euiMaxlength=50)</label>
    <input euiInputText id="label_max50" value="Input text sample" [euiMaxlength]="50" />
</div>
```

```typescript
import { Component } from '@angular/core';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EuiMaxLengthDirective } from '@eui/components/directives';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_INPUT_GROUP, ...EUI_LABEL, ...EUI_INPUT_TEXT, EuiMaxLengthDirective],
})
export class DefaultComponent {
}
```

### Other examples

- [Options: Clearable](samples/eui-input-text/clearable)
- [Options: Disabled](samples/eui-input-text/disabled)
- [Options: Invalid](samples/eui-input-text/invalid)
- [Options: Loading indicator](samples/eui-input-text/loading-indicator)
- [Options: Placeholder](samples/eui-input-text/placeholder)
- [Options: ReadOnly](samples/eui-input-text/readonly)
- [Reactive Forms: Reactive Forms](samples/eui-input-text/reactive-forms)
- [Reactive Forms: Template-Driven Forms](samples/eui-input-text/template-driven-form)
- [Misc: Clearable with loading indicator](samples/eui-input-text/clearable-loading)
- [Misc: Password field](samples/eui-input-text/password-field)

## Accessibility

<code class="eui-u-text-code">eui-input-text</code> following the semantic approach takes advantage of all the attributes attached to the native <code class="eui-u-text-code">input</code> html element and behaves as a <code class="eui-u-text-code">role="textbox"</code>. <br>
The <code class="eui-u-text-code">input</code> field should be given a meaningful label via <code class="eui-u-text-code">label for=""</code>, or <code class="eui-u-text-code">aria-label</code> or <code class="eui-u-text-code">aria-labelledby</code>.
<!-- LEFT blank showcase central link provided in showcase doc-page component -->
