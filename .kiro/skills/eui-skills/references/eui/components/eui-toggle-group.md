# eui-toggle-group

## Overview

<p>
    Toggle group of items
</p>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | isMultiple | boolean | false |
| Input | isFluid | boolean | false |
| Output | itemClick | EventEmitter<EuiToggleGroupItemComponent> | new EventEmitter<EuiToggleGroupItemComponent>() |

## Samples

### [Default](samples/eui-toggle-group/Default)

```html
<div class="doc-sample-section-title">Default</div>

<eui-toggle-group>
    <eui-toggle-group-item isChecked id="1">item 1</eui-toggle-group-item>
    <eui-toggle-group-item id="2">item 2</eui-toggle-group-item>
    <eui-toggle-group-item id="3">item 3</eui-toggle-group-item>
</eui-toggle-group>


<div class="doc-sample-section-title">With icon</div>

<eui-toggle-group>
    <eui-toggle-group-item isChecked id="1">
        <eui-icon-svg icon="eui-clock" size="s"/>
        item 1
    </eui-toggle-group-item>
    <eui-toggle-group-item id="2">
        <eui-icon-svg icon="eui-menu" size="s"/>
        item 2
    </eui-toggle-group-item>
    <eui-toggle-group-item id="3">
        <eui-icon-svg icon="eui-email" size="s"/>
        item 3
    </eui-toggle-group-item>
</eui-toggle-group>


<div class="doc-sample-section-title">isMultiple</div>

<eui-toggle-group isMultiple>
    <eui-toggle-group-item isChecked id="1">item 1</eui-toggle-group-item>
    <eui-toggle-group-item id="2">item 2</eui-toggle-group-item>
    <eui-toggle-group-item id="3">item 3</eui-toggle-group-item>
</eui-toggle-group>

<div class="doc-sample-section-title">isFluid</div>

<div class="row">
    <div class="col-4">
        <eui-toggle-group isFluid>
            <eui-toggle-group-item isChecked id="1">item 1</eui-toggle-group-item>
            <eui-toggle-group-item id="2">item 2</eui-toggle-group-item>
            <eui-toggle-group-item id="3">item 3</eui-toggle-group-item>
        </eui-toggle-group>
    </div>
</div>


<div class="doc-sample-section-title">isFluid - isMultiple</div>

<div class="row">
    <div class="col-4">
        <eui-toggle-group isFluid isMultiple>
            <eui-toggle-group-item isChecked id="1">item 1</eui-toggle-group-item>
            <eui-toggle-group-item id="2">item 2</eui-toggle-group-item>
            <eui-toggle-group-item id="3">item 3</eui-toggle-group-item>
        </eui-toggle-group>
    </div>
</div>

<div class="doc-sample-section-title">with extra styles</div>

<div class="row">
    <div class="col-4">
        <eui-toggle-group isFluid class="eui-u-c-bg-secondary-surface-medium eui-u-br-l eui-u-p-3xs">
            <eui-toggle-group-item isChecked id="1">item 1</eui-toggle-group-item>
            <eui-toggle-group-item id="2">item 2</eui-toggle-group-item>
            <eui-toggle-group-item id="3">item 3</eui-toggle-group-item>
        </eui-toggle-group>
    </div>
</div>
<br>
<div class="row">
    <div class="col-4">
        <eui-toggle-group isFluid isMultiple class="eui-u-c-bg-secondary-surface-medium eui-u-br-l eui-u-p-3xs">
            <eui-toggle-group-item isChecked id="1">item 1</eui-toggle-group-item>
            <eui-toggle-group-item id="2">item 2</eui-toggle-group-item>
            <eui-toggle-group-item id="3">item 3</eui-toggle-group-item>
        </eui-toggle-group>
    </div>
</div>

<div class="doc-sample-section-title">Event</div>

<eui-toggle-group (itemClick)="onItemClick($event)">
    <eui-toggle-group-item id="1">item 1</eui-toggle-group-item>
    <eui-toggle-group-item id="2">item 2</eui-toggle-group-item>
    <eui-toggle-group-item id="3">item 3</eui-toggle-group-item>
</eui-toggle-group>

<br><br><br>
Clicked item id : <strong>{{ clickedItem?.id }}</strong>


<div class="doc-sample-section-title">data-driven</div>
<eui-toggle-group>
    @for (item of items; track $index) {
        <eui-toggle-group-item id={{item.id}}>{{ item.label }}</eui-toggle-group-item>
    }
</eui-toggle-group>

<div class="doc-sample-section-title">data-driven with pre-selection</div>
<eui-toggle-group>
    @for (item of items; track $index) {
        <eui-toggle-group-item id={{item.id}} [isChecked]="item.active">{{ item.label }}</eui-toggle-group-item>
    }
</eui-toggle-group>
```

```typescript
import { Component } from '@angular/core';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_TOGGLE_GROUP, EuiToggleGroupItemComponent } from '@eui/components/eui-toggle-group';

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_TOGGLE_GROUP,
        ...EUI_ICON,
    ],
})
export class DefaultComponent {
    clickedItem: EuiToggleGroupItemComponent;

    onItemClick(event: EuiToggleGroupItemComponent) {
        this.clickedItem = event;
    }   
    
    public items = [
        { label: 'Item 1', id: '1' },
        { label: 'Item 2', id: '2' },
        { label: 'Item 3', id: '3' },
        { label: 'Item 4', id: '4', active: true },
    ];    
}
```
