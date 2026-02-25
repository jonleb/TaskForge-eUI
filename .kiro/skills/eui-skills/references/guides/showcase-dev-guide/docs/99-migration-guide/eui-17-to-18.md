# Migration from eUI 17.x to 18.x

## Starting the migration of your project

<em>IMPORTANT : Node.js "^18.19.1 || ^20.11.1 || >=22.0.0", required (following Angular minimal engines)</em>

<em>As usual it is recommended to generate a new **eUI CLI** application, and transfer your /src/app folder to the one created in this generated app.</em>


## ECL EC theme integration

- **ECL v4.x EC theme** is now the default theme for ensuring the **official corporate visual identity**, if you want to transition to it at your pace, we've included the **eui-theme-eui-legacy.css** which is applying the previous version of eUI colors.
- **Design tokens** have been reviewed completely and now are a direct match of **ECL EC v4.x** ones, contextual tokens have been introduced to allow custom theming your side. See example here : https://eui.ecdevops.eu/eui-showcase-ux-components-19.x/showcase-design-system/design-tokens/colors for the colors
- **CSS variables and utility classes** have also been switched to those contextual design tokens, you can find the migration guide of those here : https://eui.ecdevops.eu/eui-showcase-ux-components-19.x/showcase-design-system/migration


## OpenID connect client removal - BFF usage only in v18

OpenIDs implementation has been aligned with the EU Login recommendations to prevent JavaScript engine access to any of the OpenID Connect tokens, as those should be exclusively handled by backend APIs.

### BFF Documentation 

You can find more information here : 
https://citnet.tech.ec.europa.eu/CITnet/stash/projects/APIGTW/repos/openid-connect-bff-reference-implementation/browse

### eUI CLI implication 

The option have been removed from the eUI CLI app skeleton generation



## Breaking changes

### Angular : 18.x

As expected, please follow their migration guide here for more info : https://update.angular.io/?v=17.0-18.0

below you can find all the [breaking changes](https://github.com/angular/angular/blob/master/CHANGELOG.md#breaking-changes).


### 3rd party dependencies

- **prettier and eslint plugin related** : removed from eUI dependencies as not used internally, if you intend to use prettier, import the related dependencies on top of eUI CLI generated app.


### eUI styles

- **@eui/styles-base** : sub-package mostly used internally removed
- **@eui/styles** : distribution location for css files updated to **@eui/styles/dist** instead of **@eui/styles/dist/styles**, @eui/cli generated app adapted accordingly
- **Tokens / component size variants removed** : font-size 2xs - badge size XS - button size XS and L - chip size XS and S and L

### eUI Components removed

- **eui-icon** : removed as announced since v15, **eui-icon-svg** should be used instead
- **eui-buttons** : removed / used internally in patterns, can be achieved with composition


### eUI Components moved or renamed

- **eui-language-selector** : not part of @eui/components/layout => own sub-entry @eui/components/language-selector
- **eui-icon-color** : not part of @eui/components/eui-icon => own sub-entry @eui/components/eui-icon-color (exported in EuiIconColorModule)
- **eui-breadcrumb** : not part of @eui/components/layout => own sub-entry @eui/components/eui-breadcrumb
- **eui-user-profile** : not part of @eui/components/layout => own sub-entry @eui/components/eui-user-profile, must be imported when used within your app, eUI CLI app skeleton adapted accordingly.
- **eui-icon-svg-button** : replaced by eui-icon-button from @eui/components/eui-icon-button
- **eui-search** : renamed to **eui-toolbar-search**

### Removed / replaced deprecated Inputs, Outputs, methods

- **eui-app** 
    - **@Input() isSidebarExpandOnHover** has been **removed**, when collapsing the sidebar-menu only shows the tooltip over corresponding menu-item label if the sidebarMenu as the hasTooltip option (true by default).

- **eui-app-shell-service**
    - **isSidebarHover, isSidebarInnerActive, isSidebarStateCloseWithIcons, isSidebarExpandOnHover** properties have been removed from Observable state
    - **Css variables methods**, mainly used internally by the layout components, moved to **CssUtils** static class of @eui/core
    - **openModal(), openMessageBox(), closeMessageBox(), isModalOpen(), closeModal()** methods have been removed, was used by all UX components, left for transition in v17

- **eui-toolbar-menu**
    - **@Input() hasLowercaseItems** : has been **removed**, now default rendering is normal/initial text transform
- **eui-sidebar-menu**
    - **@Input() hasLowercaseItems** : has been **removed**, now default rendering is normal/initial text transform

- **eui-toolbar**
    - **Input() hasLanguageSelector**: has been **removed**, as now eui-language-selector has to be declared directly in the template or not if no language selection is needed.

- **eui-autocomplete**
    - **EuiAutocompleteItem** is now an interface. Instead of: new EuiAutoCompleteItem({ id: 1: label: 'myLabel' }), use now: { id: 1: label: 'myLabel' }
    - **iconClass** property value of **EuiAutocompleteItem** is **replaced** by **iconSvgName**, it needs to be used with eui-icon-svg

- **eui-button**
    - **@Input() isLoading** : has been **removed**, replaced by eui-icon-svg isLoading used in the template.
    - **@Input() euiSizeXS** : has been **removed**, only euiSizeS and euiSizeM (default) are available according to DS specs
    - **@Input() euiSizeL** : has been **removed**, only euiSizeS and euiSizeM (default) are available according to DS specs

- **eui-badge**
    - **@Input() euiSizeXS** : has been **removed**, only euiSizeS and euiSizeM (default) are available according to DS specs

- **eui-card**
    - **@Input() avatarUrl, iconClass, avatarDescription, iconDescription** : have been **removed**, replaced by eui-header-left-content with eui-avatar and eui-icon-svg direct usage in projected template.

- **eui-chip**¨
    - **@Input() euiSizeS** : has been **removed**, only default size is available according to DS specs
    - **@Input() euiSizeM** : has been **removed**, only default size is available according to DS specs
    - **@Input() euiSizeL** : has been **removed**, only default size is available according to DS specs
    - **@Input() euiSizeVariant** : has been **removed**, only default size is available according to DS specs
    - **@Input() isSquared** : has been **removed**, only rounded eui-chip is available according to DS specs

- **eui-datepicker**
    - **@Input() styleClass** : has been **removed**, direct "class" input can be used instead on the component.

- **eui-date-range-selector**
    - **@Input() styleClass** : has been **removed**, direct "class" input can be used instead on the component.

- **eui-dialog**
    - **@Input() isClosedOnClickOutside** replaced by **hasClosedOnClickOutside**
    - **@Input() isClosedOnEscape** replaced by **hasClosedOnEscape**
  
- **eui-dropdown**
    - **@Input() isClosedOnClickInside** replaced by **hasClosedOnClickInside**

- **eui-message-box**
    - **@Input() isClosedOnClickOutside** replaced by **hasClosedOnClickOutside**
    - **@Input() isClosedOnEscape** has been **removed**. For accessibility reason, a message-box can always be closed on escape.
    - **@Output() messageBoxopen** replaced by **messageBoxOpen**

- **eui-dashboard-card**
    - **@Input() isDisabled** replaced by **euiDisabled**

- **eui-fieldset**¨
    - **@Input() isLabelLowercase** : has been **removed**, default label is displayed according to the DS specifications

- **eui-input-text, eui-input-number, eui-textarea, eui-input-radio, eui-input-group**
    - **@Input() styleClass** : **removed**, default "class" on html element must be used instead

- **eui-icon-toggle** : removal of eui-icon usage 
    -**@Input() styleClass, styleClassOn, styleClassOff, iconClassOn, iconClassOff**: replaced by eui-icon-svg inputs

- **eui-icon-button** :
    - **@Input() hasFocusBorder** : has been **removed**, default focus / hover is now applied based on usage context (toolbar / other containers)

- **eui-toolbar-items**
    - **@Input() euiPositionRight** : replaced by **euiEnd**

- **eui-wizard**
    - **@Input() indexIconClass**:  has been **removed** in **EuiWizardStep** model and replaced by **indexIconSvgName**

- **eui-growl**
    - **remove(msg: EuiGrowlMessage, msgel?: any): void** : has been **removed**, use **remove(msg: EuiGrowlMessage): void** instead

- **eui-notification**
    - **@Input() nbUnreadCount** : has been **removed**

- **eui-tree-list-toolbar**
    - **onFilter()** : not publicly exposed anymore
    - **onExpandAll()** : not publicly exposed anymore
    - **onCollapseAll()** : not publicly exposed anymore

- **EuiTreeListToolbarButtons**: Directive has been removed as it is not used.

### Other breaking changes

#### eui-language-selector
Not part anymore of internal eui-toolbar OR eui-header it has to be explicitly declared within the app.component.html template.
i18n service state is feeding it same as before with active language value coming from app-starter-service.ts.

eUI CLI app skeleton has been adapted to this.

**before**
```html
<eui-toolbar>
    ...
</eui-toolbar>
OR
<eui-header>
    ...
</eui-header>
```

**after**
```html
<eui-toolbar>
    ...
    <eui-language-selector></eui-language-selector>
</eui-toolbar>
OR
<eui-header>
    ...
    <eui-language-selector></eui-language-selector>
</eui-header>
```

### Interfaces

The interfaces below are no more accepting other keys than the ones defined in the interface. If you want to provide extra attributes you need to extend them.
For example
```typescript
export interface EuiGrowlCustomMessage extends EuiGrowlMessage {
    myCustomAttribute: string;
}
```
* `EuiGrowlMessage`
* `UxErrorOutput`: The `DETAILS` generic is unknown by default
* `UxErrorInfo`: The `DETAILS` generic is unknown by default
* `GlobalConfig`: The showConnectionStatus type is only ConnectionStatus.
* `EuiTimezones`: Removed
* `EuiMenuItem`: Changed to interface
* `LocaleState`: Does not accept extra keys anymore
* `NotificationsState`: Does not accept extra keys anymore
* `GlobalConfig`: property `showConnectionStatus` is now of type `ConnectionStatus` instead of `boolean`
* `UserState`: Does not accept extra keys anymore.
* `CoreState`: Does not accept extra keys anymore.

### Classes

* `RouterMock` has been removed. Use the Angular RouterTestingModule instead. https://angular.io/api/router/testing/RouterTestingModule
* `storeMockInjector` has been removed.
* `StoreMock` has been removed. NGRX provides its own https://NGRX.io/guide/store/testing

### Functions
* `getUserLocale` has been removed. Use a custom ngrx selector instead.

### Tokens

Removed SHOW_CONNECTION_STATUS_TOKEN, use the new ConnectionStatus enum instead.

### Coerce Decorator
Removal of the coerce decorators in favor of the Angular transforms API on Inputs.
https://angular.dev/guide/components/inputs#input-transforms

## New components

### eui-accordion to match ECL EC implementation

### eui-table-v2 as future replacement of eui-table as of v19

How to migrate from eui-table : 

- **@Input() rows** replaced by **@Input() data**
- **@Input() hasStickyColumns** replaced by **@Input() hasStickyCols**
- **@Input() euiTableResponsive** replaced by **@Input() isTableResponsive**
- **@Input() euiTableBordered** replaced by **@Input() isTableBordered**
- **@Input() euiTableCompact** replaced by **@Input() isTableCondensed**
- **@Input() loading** replaced by **@Input() isLoading**
- **@Input() asyncTable** replaced by **@Input() isAsync**
- **@Input() euiTableDraggable** has been removed. Placeholder and preview styles come with table styles.
- **@Input() isHoverable** has been removed. Hover state styles are default.
- **@Input() paginable** has been removed. Was not used.
- **@Input() euiTableBordered** has been removed. Borders are now default.
- **@Input() isSelectOnlyVisibleRows** default was false, is now true.

- **@Output() selectedRows** replaced by **@Output() rowsSelect**
- **@Output() sortChange** emitted a **SortEvent**, is now emitting **Sort[]**
- **@Output() multiSortChange** has been removed. Multisort changes can be listened through sortChange

- **eui-table-v2-filter** (How to migrate from eui-table-filter)
    - **@Input() autoSearch** has been removed. Was not used.

- **isHeaderSelectable** (How to migrate from isSelectableHeader)
    - **@Input() isSelectableHeader** replaced by **@Input() isHeaderSelectable**

- **isDataSelectable** (How to migrate from isSelectable)
    - **@Input() isSelectable** replaced by **@Input() isDataSelectable**

- **isSortable** (How to migrate from sortable)
    - Sortable feature emitted **SortEvent** and emits now **Sort[]**


(last updated 10/06/2024)
