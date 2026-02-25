---
description: Shows textarea in readonly mode using readonly attribute, allowing content to be viewed but not edited.
id: readonly
---

```html
<div euiInputGroup>
    <label euiLabel for="story-readonly-dyn">Tell us your story</label>
    <textarea euiTextArea
            id="story-readonly-dyn"
            name="story"
            rows="5" cols="33"
            readonly >
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin mi velit, ac ornare nunc vehicula in. Pellentesque ultrices vitae eros rhoncus feugiat.
Sed in diam vitae felis posuere tempor eu nec augue. Duis nisl orci, finibus at pharetra at, ullamcorper at metus.
Fusce ac neque ex. Nunc malesuada magna et arcu porttitor, tincidunt molestie diam posuere.

Praesent sit amet mi posuere, congue sem eget, iaculis leo. Phasellus fermentum tristique quam. Pellentesque eget lorem elit. Sed aliquet orci sed vestibulum volutpat.
Donec eget nunc at odio ultrices interdum in dictum enim. Donec at ligula nec libero pretium vulputate. Praesent ullamcorper mauris eu ultricies blandit.
    </textarea>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_TEXTAREA } from '@eui/components/eui-textarea';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';


@Component({
    // tslint:disable-next-line
    selector: 'readonly',
    templateUrl: 'component.html',
    imports: [...EUI_BUTTON, ...EUI_TEXTAREA, ...EUI_INPUT_GROUP],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadOnlyComponent {

    public state: false | true = true;

    public changeState() {
        this.state = !this.state;
    }
}
```

