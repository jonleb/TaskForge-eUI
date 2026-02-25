# eui-feedback-message

## Overview

<p class="eui-u-text-paragraph">The <code class="eui-u-text-code">eui-feedback-message</code> provides visual text feedback in context of form elements and helps users to better understand an input error for example.</p>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | isMuted | boolean | false |

## Host Directives

| Host Directive | Inputs |
| --- | --- |
| BaseStatesDirective | euiPrimary, euiSecondary, euiInfo, euiWarning, euiSuccess, euiDanger, euiVariant |

## Samples

### [Default](samples/eui-feedback-message/Default)

```html
<div class="row">
	<div class="col-md-6">

		<div euiInputGroup>
			<label euiLabel for="default-label">This is the label</label>
			<input euiInputText id="default-label" />
			<eui-feedback-message>This is the default feedback message</eui-feedback-message>
		</div>

		<div euiInputGroup>
			<label euiLabel for="default-label-multi">This is the label</label>
			<!-- <div class="eui-u-f-s eui-u-mb-2xs">Helper: type at least 3 characters</div> -->
			<input euiInputText id="default-label-multi" />
			<eui-feedback-message>
				Feedback messages can be very long and automatically displayed on <strong>multiple lines</strong>.
				This is the default feedback message.
			</eui-feedback-message>
		</div>

	</div>
</div>
```

```typescript
import { Component } from '@angular/core';

import { EUI_FEEDBACK_MESSAGE } from "@eui/components/eui-feedback-message";
import { EUI_INPUT_GROUP } from "@eui/components/eui-input-group";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_INPUT_TEXT } from "@eui/components/eui-input-text";

@Component({
    // eslint-disable-next-line:component-selector
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_INPUT_GROUP,
        ...EUI_LABEL,
        ...EUI_INPUT_TEXT,
    ],
})
export class DefaultComponent {
}
```

### Other examples

- [Variants: Colors](samples/eui-feedback-message/colors)
- [Options: isMuted](samples/eui-feedback-message/isMuted)
- [Misc: Multiple feedbacks](samples/eui-feedback-message/feedbacks-multiple)

## Accessibility

When <code class="eui-u-text-code">eui-feedback-message</code> is being used with a specific message type (euiSuccess, euiWarning, euiDanger etc.), special attention has been given to comply with the a11y requirement to have sufficient color contrast between the text in the foreground and the background color behind it.
More info on this can be found <code class="eui-u-text-code"><a href="https://dequeuniversity.com/rules/axe/3.5/color-contrast?application=axeAPI">here</a></code>
