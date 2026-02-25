# Migration from eUI 19.x to 21.x

## Starting the migration of your project

<em>As usual it is recommended to generate a new **eUI CLI** application, and transfer your /src/app folder to the one created in this generated app.</em>

Note that: the eUI CLI generated app has been aligned to the latest **Angular CLI** app, and is now re-structured to the **standalone** default mode of Angular, where there's no **NgModule** declared, central **AppConfig** is used.


## Breaking changes

### Angular : 21.x

As expected, please follow their migration guide here for more info : https://angular.dev/update-guide?v=19.0-21.0&l=1

below you can find all the [breaking changes](https://github.com/angular/angular/blob/master/CHANGELOG.md#breaking-changes).




### 3rd party dependencies

#### karma and related dependencies
have been removed in favor of new test runner : Vitest, the eUI CLI app has been adapted accordingly

#### eUI tools and related devDependencies
have been removed, once you're generating a eUI CLI application, what was provided in the @eui/deps-base before (express / json-server) are now to be set in the devDependencies of your package.json.

Regarding **eUI tools** all build script are now part of the @eui/cli scripts.


#### moment-timezone
**moment-timezone** has been removed as a dependency of the eUI package. If your application uses it (i.e. in case you need to force specific timezones), you need to install it separately.


### Styling - Visual breaking changes

**eui-legacy-bootstrap-utilities.css** has been removed, now **eui-u-%** utility classes have to be used for margin / paddings, 

**Bootstrap grid utility classes** (row/col) has been extracted to **eui-bootstrap-grid.css** from the previously embedded **eui.css**, to be aligned with ECL more closely, **eui-ecl-grid.css** is also now provided as external and exports the **ECL v5** grid utilities as a replacement of Bootstrap grid utility classes usage (more info on the ECL website : https://ec.europa.eu/component-library/v5.0.0-alpha.21/ec/utilities/layout/grid/usage/).

**eui-u-c-%** and **eui-u-c-bg-%** utility classes have been refactored to handle the 2nd level context tokens variables, only used within eUI internal components and exported as such (for more info, check the **Design system** showcase : CSS utilities and CSS variables sections).

**Icons sets** : have been adjusted to **Europa Design System** / **Phosphor** icon library usage, previous icon sets : Ionicons filled : **:filled** / Ionicons sharp **:sharp** / Ionicons outline **:outline** AND FontAwesome sets : **:fa-solid** and **:fa-regular** have been removed, either use **:eui** set or Phosphor : **:regular** or **:fill** sets, note that the ECL icon set is still provided for social icons and previous ECL icon set (with the **:ecl** set definition)

**Inter font** is now default in eUI and has to be used to be compliant with **Europa Design System** specs, it is provided by default in eUI and components have been adjusted to render properly against the new font.


### API breaking changed : removed / replaced deprecated Inputs, Outputs, methods

#### IMPORTANT CHANGES

<em>**ALL COMPONENTS MODULES** have been removed, use import components array instead.</em>

<em>**EuiAllModule** has been removed, use standalone imports of individual components instead.</em>

**eui-toolbar-menu** has been removed in favor of **eui-toolbar-mega-menu**

**euiAccent** variant has been removed from all components, use **euiPrimary** for active state instead (when available component side).



#### Various components changes

- **eui-alert**
    - **@Input() alertIconType - alertIconFillColor - isMuted - isBordered** have been removed.

- **eui-autocomplete**
    - **@Input() dragAndDropSourceName** has been removed. **Drag and Drop features** needs to be implemented on application side. (<a href="/eui-showcase-ux-components-21.x/style-guide/components/eui-autocomplete#chips-drag-and-drop">sample</a>).
    - **@Input() dragAndDropConnectedTo** has been removed. **Drag and Drop features** needs to be implemented on application side. (<a href="/eui-showcase-ux-components-21.x/style-guide/components/eui-autocomplete#chips-drag-and-drop">sample</a>).
    - In this context **EuiChipDragDrop** returned by **@Output chipDragStart**, **@Output chipDragRelease**, **@Output chipDrop** does not have **sourceName** property anymore.

- **eui-avatar**
    - **@Input() isFlat** have been removed.

- **eui-button**
    - **@Input() euiButtonCall** has been removed. euiCTA to be used instead.

- **eui-card-header**
    - **@Input() hasHeaderClickToggle** has been removed since the header container is not collapsible anymore.
    - Public method **onToggleHeader** has been removed since the header container is not collapsible anymore.

- **eui-chip**
    - **@Input() isSquared** has been removed.

- **eui-chip-list** (FULLY REFACTORED)
    - **@Input() Colors variants, sizes variants and outline** have been removed. Those properties need to be set directly on **eui-chip**.
    - **@Input() chipsLabelTruncateCount** has been removed. This needs to be done with **euiTruncate pipe** on chip label. (<a href="/eui-showcase-ux-components-21.x/style-guide/components/eui-chip-list#truncateTagsLabel">sample</a>).
    - **Drag and Drop features** needs to be implemented on application side with <a href="https://material.angular.dev/cdk/drag-drop/overview" target="_blank">CDK Drag and Drop Directives</a>. (<a href="/eui-showcase-ux-components-21.x/style-guide/components/eui-chip-list#drag-n-drop">samples</a>).
    - **@Input() isChipsRemovable** has been removed. This property needs to be set directly on **eui-chip** with **@Input() isChipRemovable**.
    - **@Input() maxVisibleChipsCount, isMaxVisibleChipsOpened, toggleLinkMoreLabel, toggleLinkLessLabel** have been removed. This feature need to be implemented on application side. (<a href="/eui-showcase-ux-components-21.x/style-guide/components/eui-chip-list#max-visible-chips">sample</a>).
    - **@Input() isChipsSorted, chipsSortOrder** have been removed. This feature need to be implemented on application side. (<a href="/eui-showcase-ux-components-21.x/style-guide/components/eui-chip-list#sorting">sample</a>).
    - **@Output() chipRemove** has been removed. This property needs to be set directly on **eui-chip** with **@Output() remove**.

- **eui-chip model**
    - **typeClass** has been removed.

- **eui-datepicker**
    - **The default DateAdapter** provision has been removed along with the EuiDatepickerModule. Thus, you need to provide on your own the desired DateAdapter, otherwise you will get a corresponding error. You can find more details on the component's showcase overview section.

- **eui-date-range-selector**
    - **The default DateAdapter** provision has been removed along with the EuiDateRangeSelectorModule. Thus, you need to provide on your own the desired DateAdapter, otherwise you will get a corresponding error. You can find more details on the component's showcase overview section.

- **eui-discussion-thread**
    - **public function trackByFn** has been removed.

- **eui-editor**
    - **@Output() onEditorChanged** has been removed. Use **contentChange** instead

- **eui-fieldset**
    - **@Input() iconSvgType** has been removed use **iconSvgName** instead.

- **eui-icon-svg**
    - **@Input() variant** has been removed use **fillColor** instead.
    - **@Input() alias ('aria-label')** has been removed to prevent aria-prohibited attribute errors, use **ariaLabel** instead.

- **eui-icon-toggle**
    - **@Input() iconSet** has been removed use **iconSvgName** instead.

- **eui-popover**
    - **@Input() type** has been removed flat design (uncolored) is now the default according to design system specs.

- **eui-progress-circle**
    - **@Input() iconLabelClass and iconLabelStyleClass** have been removed use **icon** and **fillColor** instead.

- **eui-tab** (Child component of eui-tabs)
    - **@Input() isActive** has been removed. Tab's activation needs to be done with public method **activateTab** on &lt;eui-tabs&gt; parent.
    - **@Input() isHandleActivateTab** has been added to and feature removed from &lt;eui-tabs&gt; component.

- **eui-tabs** (FULLY REFACTORED)
    - **@Input() tabs** has been removed. Tabs needs to be declared in the component view with &lt;eui-tab&gt;.
    - **@Input() patchMatch** has been removed. **RouterModule** needs to be imported at component level (<a href="/eui-showcase-ux-components-21.x/style-guide/components/eui-tabs#using-router">sample</a>).
    - **@Input() isHandleChangeTab** has been renamed to **isHandleActivateTab** and moved to &lt;eui-tab&gt; component.
    - **@Input() isSubTabs** has been removed as tabs can be natively neseted.
    - **@Input() isVerticalTabs** has been removed.
    - **@Output() tabSelect** has been renamed to **tabActivate**.
    - public method **changeTab(tabIndex)** has been renamed to **activateTab(tabIndex)**.
    - **eui-tab-label, euiTabLabel** components has been renamed **eui-tab-header**.
    - **eui-tab-content, euiTabContent** components has been renamed **eui-tab-body**.

- **eui-table** (FULLY REFACTORED)
    - **@Input() rows** has been renamed to **data**.
    - **@Input() loading** has been renamed to **isLoading**.
    - **@Input() asyncTable** has been renamed to **isAsync**.
    - **@Input() paginable** has been removed as pagination needs to be done with **eui-paginator** component.
    - **@Input() euiTableResponsive** has been renamed to **isTableResponsive**.
    - **@Input() euiTableBordered** has been removed to align to Design System.
    - **@Input() euiTableFixedLayout** has been renamed to **isTableFixedLayout**.
    - **@Input() euiTableCompact** has been renamed to **isTableCompact**.
    - **@Input() hasStickyColumns** has been renamed to **hasStickyCols**.
    - **@Input() isSelectOnlyVisibleRows** default value is now **true**.
    - **@Input() isHoverable** has been removed to align to Design System.
    - **@Input() isStickyColumn** on **th** and **td** has been renamed to **isStickyCol**.
    - **@Input() isSelectableHeader** on **tr** has been renamed to **isHeaderSelectable**.
    - **@Input() isSelectable** on **tr** has been renamed to **isDataSelectable**.
    - **@Input() sortable** on **th** has been renamed to **isSortable**.
    - **@Input() defaultMultiOrder** on **th** has been removed. Sorting needs to be inited with **eui-table** public method **setSort(sorts: Sort[])**.
    - **@Output() selectedRows** has been renamed to **rowsSelect**.
    - **@Output() sortChange** emits now an array of **Sort** type.
    - **@Output() multiSortChange** has been removed as multi-sort is supported by **sortChange** Output.
    - **@Pipe euiTableHighlightFilter** has been renamed to **euiTableHighlight**.
    - public method **setSort(sort: string, order: "asc" | "desc")** is now **setSort(Sort[])**.
    - public variable **filteredRows** has been renamed to **getFilteredData**.
