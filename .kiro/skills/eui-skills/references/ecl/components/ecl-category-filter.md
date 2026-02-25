# ecl-category-filter

## Overview

Category filter component can be used to display categories and their sub categories. It can expand up to 4 levels.
<br>
<more-info componentPartUrl="category-filter/usage/"></more-info>

## API

API content

## Samples

### Default

```html
<div>
    <ecl-category-filter>
        <ecl-category-filter-list>
            <ecl-category-filter-item>
                Item 1
            </ecl-category-filter-item>
            <ecl-category-filter-item>
                Item 2 label
                <ecl-category-filter-list>
                    <ecl-category-filter-item>
                        Item 2.1
                        <ecl-category-filter-list>
                            <ecl-category-filter-item>
                                Item 2.1.1
                            </ecl-category-filter-item>
                            <ecl-category-filter-item>
                                Item 2.1.2
                                <ecl-category-filter-list>
                                    <ecl-category-filter-item>
                                        Item 2.1.2 a
                                    </ecl-category-filter-item>
                                    <ecl-category-filter-item>
                                        Item 2.1.2 b
                                    </ecl-category-filter-item>
                                    <ecl-category-filter-item>
                                        Item 2.1.2 c
                                    </ecl-category-filter-item>
                                </ecl-category-filter-list>
                            </ecl-category-filter-item>
                            <ecl-category-filter-item>
                                Item 2.1.3
                            </ecl-category-filter-item>
                            <ecl-category-filter-item>
                                Item 2.1.4
                            </ecl-category-filter-item>
                        </ecl-category-filter-list>
                    </ecl-category-filter-item>
                    <ecl-category-filter-item>
                        Item 2.2
                    </ecl-category-filter-item>
                    <ecl-category-filter-item>
                        Item 2.3
                    </ecl-category-filter-item>
                    <ecl-category-filter-item>
                        Item 2.4
                    </ecl-category-filter-item>
                    <ecl-category-filter-item>
                        Item 2.5
                    </ecl-category-filter-item>
                    <ecl-category-filter-item>
                        Item 2.6
                    </ecl-category-filter-item>
                    <ecl-category-filter-item>
                        Item 2.7
                    </ecl-category-filter-item>
                </ecl-category-filter-list>
            </ecl-category-filter-item>
            <ecl-category-filter-item>
                Item 3 with a very long label
                <ecl-category-filter-list>
                    <ecl-category-filter-item>
                        Item 3.1
                        <ecl-category-filter-list>
                            <ecl-category-filter-item>
                                Item 3.1.1
                            </ecl-category-filter-item>
                            <ecl-category-filter-item>
                                Item 3.1.2
                                <ecl-category-filter-list>
                                    <ecl-category-filter-item>
                                        Item 3.1.2 a
                                    </ecl-category-filter-item>
                                    <ecl-category-filter-item>
                                        Item 3.1.2 b
                                    </ecl-category-filter-item>
                                    <ecl-category-filter-item>
                                        Item 3.1.2 c
                                    </ecl-category-filter-item>
                                </ecl-category-filter-list>
                            </ecl-category-filter-item>
                            <ecl-category-filter-item>
                                Item 3.1.3
                            </ecl-category-filter-item>
                            <ecl-category-filter-item>
                                Item 3.1.4
                            </ecl-category-filter-item>
                        </ecl-category-filter-list>
                    </ecl-category-filter-item>
                    <ecl-category-filter-item>
                        Item 3.2
                    </ecl-category-filter-item>
                    <ecl-category-filter-item>
                        Item 3.3
                    </ecl-category-filter-item>
                </ecl-category-filter-list>
            </ecl-category-filter-item>
            <ecl-category-filter-item>
                Item 4 label
                <ecl-category-filter-list>
                    @for (subItem of dynamicSubItems; track subItem.id) {
                    <ecl-category-filter-item (itemSelect)="onItemSelect($event)" [id]="subItem.id">
                        {{ subItem.label }}
                    </ecl-category-filter-item>
                    }
                </ecl-category-filter-list>
            </ecl-category-filter-item>
        </ecl-category-filter-list>
    </ecl-category-filter>
</div>


<h6 class="section-title">Dynamic with for block and default current item</h6>
<div>
    <ecl-category-filter [currentItemId]="itemId">
        <ecl-category-filter-list>
            @for (item of dynamicItems; track item.id) {
            <ecl-category-filter-item (itemSelect)="onItemSelect($event)" [id]="item.id">
                {{ item.label }}
                @if(item.children) {
                <ecl-category-filter-list>
                    @for (subItem of item.children; track subItem.id) {
                    <ecl-category-filter-item (itemSelect)="onItemSelect($event)" [id]="subItem.id">
                        {{ subItem.label }}
                        @if(subItem.children) {
                        <ecl-category-filter-list>
                            @for (subItem2 of subItem.children; track subItem2.id) {
                            <ecl-category-filter-item (itemSelect)="onItemSelect($event)" [id]="subItem2.id">
                                {{ subItem2.label }}
                                @if(subItem2.children) {
                                <ecl-category-filter-list>
                                    @for (subItem3 of subItem2.children; track subItem3.id) {
                                    <ecl-category-filter-item (itemSelect)="onItemSelect($event)" [id]="subItem3.id">
                                        {{ subItem3.label }}
                                    </ecl-category-filter-item>
                                    }
                                </ecl-category-filter-list>
                                }
                            </ecl-category-filter-item>
                            }
                        </ecl-category-filter-list>
                        }
                    </ecl-category-filter-item>
                    }
                </ecl-category-filter-list>
                }
            </ecl-category-filter-item>
            }
        </ecl-category-filter-list>
    </ecl-category-filter>
</div>
```

```typescript
import { Component } from '@angular/core';
import { EclCategoryFilterItemSelectEvent, EUI_ECL_CATEGORY_FILTER } from '@eui/ecl/components/ecl-category-filter';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_CATEGORY_FILTER],
})
export class DefaultComponent {

    itemId = '3.2';
    dynamicItems: Array<any> = [
        { id: '1', label: 'Item 1' },
        { id: '2', label: 'Item 2', children: [
            { id: '2.1', label: 'Item 2.1', children: [
                    { id: '2.1.1', label: 'Item 2.1.1' },
                    { id: '2.1.2', label: 'Item 2.1.2' , children: [
                            { id: '2.1.2.a', label: 'Item 2.1.2.a' },
                            { id: '2.1.2.b', label: 'Item 2.1.2.b' },
                            { id: '2.1.2.c', label: 'Item 2.1.2.c' },
                        ]},
                    { id: '2.1.3', label: 'Item 2.1.3' },
                    { id: '2.1.4', label: 'Item 2.1.4' },
                ]},
            { id: '2.2', label: 'Item 2.2' },
            { id: '2.3', label: 'Item 2.3' },
            { id: '2.4', label: 'Item 2.4' },
            { id: '2.5', label: 'Item 2.5' },
            { id: '2.6', label: 'Item 2.6' },
            { id: '2.7', label: 'Item 2.7' },
        ]},
        { id: '3', label: 'Item 3 with a very long label', children: [
            { id: '3.1', label: 'Item 3.1', children: [
                { id: '3.1.1', label: 'Item 3.1.1' },
                { id: '3.1.2', label: 'Item 3.1.2' , children: [
                        { id: '3.1.2.a', label: 'Item 3.1.2.a' },
                        { id: '3.1.2.b', label: 'Item 3.1.2.b' },
                        { id: '3.1.2.c', label: 'Item 3.1.2.c' },
                    ]},
                { id: '3.1.3', label: 'Item 3.1.3' },
                { id: '3.1.4', label: 'Item 3.1.4' },
            ]},
            { id: '3.2', label: 'Item 3.2' },
            { id: '3.3', label: 'Item 3.3' },
        ] },
        { id: '4', label: 'Item 4', children: [
                { id: '4.1', label: 'Item 4.1' },
                { id: '4.2', label: 'Item 4.2' },
                { id: '4.3', label: 'Item 4.3 with a very long label going on 2 lines' },
                { id: '4.4', label: 'Item 4.4' },
                { id: '4.5', label: 'Item 4.5' },
                { id: '4.6', label: 'Item 4.6' },
            ]},
    ];

    dynamicSubItems: Array<any> = [
        { id: '4.1', label: 'Item 4.1' },
        { id: '4.2', label: 'Item 4.2' },
        { id: '4.3', label: 'Item 4.3 with a very long label going on 2 lines' },
        { id: '4.4', label: 'Item 4.4' },
        { id: '4.5', label: 'Item 4.5' },
        { id: '4.6', label: 'Item 4.6' },
    ];

    onItemSelect(event: EclCategoryFilterItemSelectEvent) {
        console.log(event);
    }
}
```
