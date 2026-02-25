# eui-textarea

## Overview

<p class="eui-u-text-paragraph">This is the multi-line text input directive which allow users to input a lot of text information.</p>
<p class="eui-u-text-paragraph"><code class="eui-u-text-code">euiTextArea</code> may have a max character limit with counter to let users know how long their entry can be before they begin typing.
Character count allows a user to understand an input error if they surpass the character limit.</p>

<br>

<eui-alert>
    <eui-alert-title>Remark about styling</eui-alert-title>
    <p class="eui-u-text-paragraph">If you don't use the <code class="eui-u-text-code">euiTextArea</code> directive, it is recommended to use the <strong>eui-textarea</strong> style class applied to the textarea tag.</p>
</eui-alert>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |

## Host Directives

| Host Directive | Inputs |
| --- | --- |
| BaseStatesDirective | euiDisabled, euiDanger |

## Samples

### [Default](samples/eui-textarea/Default)

```html
<div euiInputGroup>
    <label euiLabel for="story">Tell us your story</label>
    <textarea (rowsChange)="onRowsChange($event)" euiTextArea id="story" name="story" rows="5" cols="33">It was a dark and stormy night...</textarea>
</div>

Current rows: {{ rows }}


<div class="doc-sample-section-title">With max length defined</div>
<p class="eui-u-text-paragraph">Use the <code class="eui-u-text-code">euiMaxlength</code> directive to set contents size limit</p>

<br>

<div euiInputGroup>
    <label euiLabel for="story_max200">Tell us your story (euiMaxlength=255)</label>
    <textarea euiTextArea id="story_max200" name="story" rows="5" cols="33" [euiMaxlength]="255">It was a dark and stormy night...</textarea>
</div>

<p class="eui-u-text-paragraph">For more dynamic usage samples, please see the reactive forms section.</p>
```

```typescript
import { Component } from '@angular/core';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EuiMaxLengthDirective } from '@eui/components/directives';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_TEXTAREA } from '@eui/components/eui-textarea';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_LABEL, ...EUI_TEXTAREA, ...EUI_INPUT_GROUP, EuiMaxLengthDirective],
})
export class DefaultComponent {
    rows: number = 0;

    onRowsChange(rows: number) {
        this.rows = rows;
    }
}
```

### Other examples

- [Options: Disabled](samples/eui-textarea/disabled)
- [Options: Invalid](samples/eui-textarea/invalid)
- [Options: Placeholder](samples/eui-textarea/placeholder)
- [Options: Readonly](samples/eui-textarea/readonly)
- [Main features: Auto Resize](samples/eui-textarea/auto-resize)
- [Reactive Forms: Reactive Forms](samples/eui-textarea/reactive-forms)

## Accessibility

<p class="eui-u-text-paragraph"><code class="eui-u-text-code">eui-textarea</code> following the semantic approach takes advantage of all the attributes attached to the native <code class="eui-u-text-code">textarea</code> html element and behaves as a <code class="eui-u-text-code">role="textbox"</code>. <br>
The <code class="eui-u-text-code">teaxtarea</code> field should be given a meaningful label via <code class="eui-u-text-code">label for=""</code>, or <code class="eui-u-text-code">aria-label</code> or <code class="eui-u-text-code">aria-labelledby</code>.</p>

<!-- LEFT blank showcase central link provided in showcase doc-page component -->
