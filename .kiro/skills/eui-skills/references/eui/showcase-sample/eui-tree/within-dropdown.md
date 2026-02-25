---
description: Embed the tree inside dropdowns, including an advanced searchable multi-select.
id: within-dropdown
---

```html
<div class="doc-sample-section-title">Sample 1 &mdash; Dropdown with multi-select tree (replacement of dropdown-tree)</div>
<ng-template #buttonTemplate let-label>
    <button euiButton euiPrimary euiOutline>
        <label euilabel class="eui-u-text-truncate">{{label}}</label>
        <eui-icon-svg icon="eui-chevron-down" size="s" class="eui-u-ml-s" />
    </button>
</ng-template>
<eui-dropdown hasTabNavigation euiDropdownTree [buttonTemplateRef]="buttonTemplate">
    <eui-dropdown-content>
        <div class="eui-u-p-m">
            <eui-tree isMultiselect [nodes]="treeData" (selectionChange)="onSelectionChangeDropdown($event)" />
        </div>
    </eui-dropdown-content>
</eui-dropdown>


<div class="doc-sample-section-title">Sample 2 &mdash; Dropdown with advanced responsive multi-select tree, search filter and select all.</div>
<p class="eui-u-text-paragraph">
    This <strong>advanced composition</strong> sample features a responsive dropdown with rich content containing :
    <br>
    - a multi-select eui-tree<br>
    - a select/deselect all tree items option<br>
    - an auto search filter with clearable option<br>
    - an expand/collapse all toggle icon button with tooltips<br>
</p>
<p class="eui-u-text-paragraph">
    Also, the eui-dropdown features the <code class="eui-u-text-code">height</code> option which sets the dropdown panel to '25vw' maximum height.
    <br>
    Please refer to the <a routerLink="/style-guide/components/eui-dropdown" fragment="height" class="eui-u-text-link">eui-dropdown</a> component for more information.
</p>

<br>

<div class="row">
    <div class="col-md-6">
        <ng-template #buttonTemplate2 let-label>
            <button euiButton euiPrimary euiResponsive>
                <div class="eui-u-flex eui-u-flex-gap-s">
                    <div class="eui-u-flex eui-u-flex-justify-content-start">
                        <label euilabel class="eui-u-text-truncate">{{label}}</label>
                    </div>
                    <div class="eui-u-inline-flex eui-u-flex-justify-content-end">
                        <eui-icon-svg icon="eui-chevron-down" size="s" />
                    </div>
                </div>
            </button>
        </ng-template>

        <eui-dropdown hasTabNavigation euiDropdownTree [buttonTemplateRef]="buttonTemplate2" isBlock height="25vw">
            <eui-dropdown-content class="eui-u-p-m">

                <div euiInputGroup>
                    <div euiInputGroupAddOn>
                        <div euiInputGroupAddOnItem>
                            <eui-icon-svg icon="eui-search" fillColor="secondary" />
                        </div>
                        <input euiInputText type="search" placeholder="Search website..." aria-label="Search website"/>
                        @if (!isExpandedAll) {
                            <button euiButton euiIconButton euiPrimary (click)="expandAll()" aria-label="Expand all">
                                <eui-icon-svg icon="eui-level-down" />
                            </button>
                        }
                        @if (isExpandedAll) {
                            <button euiButton euiIconButton euiPrimary (click)="collapseAll()" aria-label="Collapse all">
                                <eui-icon-svg icon="eui-level-up" />
                            </button>
                        }
                    </div>
                </div>

                <!-- Select All checkbox -->
                <input euiInputCheckBox
                    [formControl]="selectAllDropdownCheckboxControl"
                    id="selectall-checkbox-dropdown"
                    name="selectall-checkbox-dropdown"
                    aria-label="Select all checkbox"
                />
                <label euiLabel for="selectall-checkbox-dropdown">Select All</label>

                <!-- Tree -->
                <eui-tree #selectAllDropdownTreeInstance
                    isMultiselect
                    [nodes]="treeData"
                    euiTreeFormControl
                    [formControl]="selectAllDropdownTreeControl"
                    (selectionChange)="onSelectionChangeDropdown($event)" />

            </eui-dropdown-content>
        </eui-dropdown>
    </div>
</div>

<div class="eui-u-m-4xl">&nbsp;</div>
<div class="eui-u-m-4xl">&nbsp;</div>
<div class="eui-u-m-4xl">&nbsp;</div>
<div class="eui-u-m-4xl">&nbsp;</div>
<div class="eui-u-m-4xl">&nbsp;</div>
<div class="eui-u-m-4xl">&nbsp;</div>
```

```typescript

```

