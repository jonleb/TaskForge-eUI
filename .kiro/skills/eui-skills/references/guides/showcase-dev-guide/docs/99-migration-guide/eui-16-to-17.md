# Migration from eUI 16.x to 17.x

## Starting the migration of your project

<em>IMPORTANT : NodeJS "^18.13.0 || >=20.9.0" required (following Angular minimal engines)</em>

As usual it is recommended to generate a new **eUI CLI** application, and transfer your /src/app folder to the one created in this generated app.


## Breaking changes

### Angular : 17.x

  As expected, please follow their migration guide here for more info : https://update.angular.io/?l=3&v=16.0-17.0

  below you can find all the [breaking changes](https://github.com/angular/angular/blob/master/CHANGELOG.md#breaking-changes).





### eUI styles

#### Boostrap

Since v16 Bootstrap is now fully legacy, only the grid is within the eUI styles imported by default,
if you want to use still the Bootstrap utilities for margins/paddings, import : 
**eui-legacy-bootstrap-utilities.css** from eUI styles css distribution.

It's mandatory from now on to use the **eui-u-%** native utility classes as in next version, those legacy css won't be within eUI distribution anymore in the futre eUI releases.

#### eUI stylesheets and css classes / variables

##### Provided by default when generating a new **eUI CLI** application : 

- **eui.css** : main global eUI css - utilities taken out from it.
- **eui-utilities.css** : storing all utilities "eui-u-" classes.

##### Optional css : 

- **eui-print.css**: for print media if needed
- **eui-icons-flags.css** : replacing the former **flag-icons.min.css**.
- **eui-legacy-bootstrap-utilities.css** : as explained above.
- **eui-legacy-icons-font.css** : the eui-icon supported css, deprecated as of v17 and will be removed in future versions.
- **eui-theme-compact.css** : if you want to use the compact theme, **eui-t-compact** class set on **html** element.
- **eui-theme-dark.css** : if you want to use the dark theme, **eui-t-dark** class set on **html** element.
- **eui-theme-high-contrast.css** : if you want to use the dark theme, **eui-t-high-contrast** class set on **html** element.

##### Removal of **eui-u-colorVariant** utility classes and CSS variables **--eui-base-color-colorVariant** 
- replaced by respectively : **eui-u-colorVariant-100** and **--eui-base-colorVariant-100**, rest of the shades remains untouched. 
- Utility classes, f.e. : eui-u-color-primary, replaced by the base color definition : **eui-u-color-primary-100**
- CSS variables, f.e. : --eui-base-color-primary, replaced by the base color defiition : **--eui-base-color-primary-100**

##### Removal of **eui-u-font-size-SIZE** utility classes : 
- replaced by **eui-u-font-SIZE**
- Utility classes, f.e. : eui-u-font-size-xs, removed, use the **eui-u-font-xs** instead.






### eUI components removed / adapted

As announced since v13 : <em>All "ux-" components have been removed</em>, please upgrade to "**eui-** " counterparts.

#### eui-dropdown-button-menu 
removed and replaced by **eui-dropdown**

#### eui-picker
removed (was used internally and never exposed in the showcase)

#### eui-toolbar-item-notifications 
removed replaced by direct usage of eui-toolbar-item child :

**before**
```html
<eui-toolbar-item-notifications>
    <eui-notifications...></eui-notifications>
</eui-toolbar-item-notifications>
```

**after**
```html
<eui-toolbar-item>
    <eui-notifications...></eui-notifications>
</eui-toolbar-item>
```

#### eui-toolbar-item-search : 
removed replaced by direct usage of eui-toolbar-item child :

**before**
```html
<eui-toolbar-item-search>
    <eui-search...></eui-search>
</eui-toolbar-item-search>
```

**after**
```html
<eui-toolbar-item>
    <eui-search...></eui-search>
</eui-toolbar-item>
```

#### eui-toolbar-item-user-profile 
removed replaced by direct usage of eui-toolbar-item child :

**before**
```html
<eui-toolbar-item-user-profile>
    ...
</eui-toolbar-item-user-profile>
```

**after**
```html
<eui-toolbar-item>
    <eui-user-profile...></eui-user-profile>
</eui-toolbar-item>
```

#### eui-app 
removal of "userInfos", "userSubInfos", "impersonatedUserInfos" inputs the **eui-user-profile** are not relying exclusively on the <em>**@eui/core UserService and UserState**</em>

**before**
```html
<eui-app [userInfos]="userInfos?.fullName" 
         userSubInfos="{{myUserSubInfos}}" 
         impersonatedUserInfos="{{myImpersonatedUserInfos}}">
...
</eui-app>
```

**after** - including the transfer of the userSubInfos to eui-user-profile component as input (not part of the UserState)
```html
<eui-app>
...
    <eui-user-profile subInfos="{{myUserSubInfos}}">
...
</eui-app>
```

By default the eUI **UserState** is initialized through the **UserService.init()** method that you can find in the generated **eUI CLI** app (same as before).

If you don't intend to use the UserState fetch and initialize through the eUI UserService, you'll have to initialize it manually on your own :
```javascript

import { UserService, UserState } from '@eui/core';
...
constructor (private userService: UserService) {}
...
init() {
    const myUserState: UserState = {
        userId: "doejohn",
        firstName: "John",
        lastName: "DOE",
        impersonatingUser: null
    };
    this.userService.init(myUserState);
}
```







### UxAppShellService

#### UxAppShellService
replaced by **EuiAppShellService**

#### UxAppShellService.growl... 
all growl methods now to be executed from **EuiGrowlService** from @eui/core : already provided in the eui-app root.

**before**
```javascript
import { UxAppShellService } from '@eui/core';
...
constructor (private asService: UxAppShellService) {}
...
method() {
    this.asService.growl(...);
}
```

**after**
```javascript
import { EuiGrowlService } from '@eui/core';
...
constructor (private growlService: EuiGrowlService) {}
...
method() {
    this.growlService.growl(...);
}
```


#### UxAppShellService.modal...
now to be executed from eui-dialog as ux-modal/ux-dynamic-modal have been removed.

#### removed state props related to UserState 
**userInfos**, **userSubInfos**, **impersonedUserInfos** see above on the deprecation on the **eui-app**.






### Other breaking changes

- **UxLink**: removed as directly bound to **ux-** components, replaced by internal component model or **EuiMenuItem** for sidebar and top-menu entries.

- **UxBadge**: removed, as replaced on component side by **EuiChipComponent** and **EuiChip** model.

- **UX_COLORS, UX_COUNTRIES, UX_TIMEZONES** : constants replaced by **EUI_COLORS, EUI_COUNTRIES, EUI_TIMEZONES%** counterparts.

- **UxLanguage, UxEuLanguages, UxTimezone** : models replaced by **EuiLanguage, EuiEuLanguages, EuiTimezone** counterparts.

- **UxDynamicMenuService** : replaced by **EuiDynamicMenuService** handling EuiMenuItem as model.

- **UxDynamicComponentService** : replaced by **EuiDynamicComponentService**.

- **UxTimezonesService** : replaced by **EuiTimezonesService** handing EuiTimezone as model.

- **UxRootInjectorGuard** : removed

- **UxErrorFeedbackService, UxErrorManager** : removed

- **EuiChipList** : with tooltip, it is recommended to use the data approach.



### Removed / replaced deprecated Inputs, Outputs, methods
- **eui-tooltip**
    - **@Input() content** replaced by **@Input() contentAlignment**

- **eui-alert**
    - **@Input() euiAlertMuted** replaced by **@Input() isMuted**  
    - **@Output() close** replaced by **@Output() closeAlert**

- **eui-autocomplete**
    - <em>removed</em>: **@Output() closed, @Output() opened, @Output() selectionChanged, @Output() itemAdded, @Output() itemRemoved, @Output() inputChanged,  @Output() chipDragStarted, @Output() chipDragReleased, @Output() chipDropped**
    - **@Output() close** replaced by **panelClose**
    - **@Output() open** replaced by **panelOpen**
    - **@Output() blur** replaced by **inputBlur**
    - **@Output() focus** replaced by **inputFocus**
    - **@Input() addOnBlur** replaced by **isAddOnBlur**
    - **@Input() readonly** replaced by **isReadonly**
    - **@Input() async** replaced by **isAsync**

- **eui-card**
    - **@Output() onCollapsed** replaced by **collapse**

- **eui-card-header**
    - <em>removed</em> : **@Input() isHeaderBodyOnly**

- **eui-chip-list**
    - **@Output() chipDragStarted** replaced by **chipDragStart**
    - **@Output() chipDragReleased** replaced by **chipDragRelease**
    - **@Output() chipDropped** replaced by **chipDrop**

- **eui-dashboard-card**
    - **@Output() onClicked** replaced by **cardClick**
    - <em>removed</em> : **@Input() typeClass / styleClass / iconClass / iconTypeClass / imageHeight / imageWidth / buttonLinkLabel / buttonStyleClass**

- **eui-datepicker**
    - <em>removed</em>: **@Input() hasActionButtons, @Input() hasTodayButton**

- **eui-dialog**
    - **@Output() open** replaced by **dialogOpen**
    - **@Output() close** replaced by **dialogClose**

- **eui-fieldset**
    - **@Output() expanded** replaced by **expand**
    - <em>removed</em> **@Input() typeclass, @Input() headerStateClass, @Input() stateClass**, typeClass replaced by **iconSvgFillColor** other removed inputs not used as using default coerce inputs (see docs)

- **eui-file-upload**
    - **@Output() drop** replaced by **fileDrop**

- **eui-growl**
    - <em>removed</em> exposed variables: **differ, zIndex, stopDoCheckPropagation, timeout**
    - **@Output() clicked** replaced by **growlClick**

- **eui-menu**
    - <em>removed</em>: **@Input() expandMenuLabel, @Input() collapseMenuLabel**

- **eui-menu-item**
    - **@Output() expandToggled** replaced by **expandToggle**
    - **@Output() clicked** replaced by **itemClick**

- **eui-message-box**
    - **@Output() open** replaced by **messageBoxopen**
    - **@Output() close** replaced by **messageBoxClose**

- **eui-page-column**
    - <em>removed</em>: **@Input() interactiveScrollbars**
    - **@Output() collapsed** replaced by **collapse**
    - **@Output() headerCollapsed** replaced by **headerCollapse**

- **eui-popover**
    - **@Output() open** replaced by **popoverOpen**
    - **@Output() close** replaced by **popoverClose**

- **eui-sidebar-menu**
    - <em>removed</em>: **@Input() expandMenuLabel, @Input() collapseMenuLabel, @Input() externalLinkLabel**
    - **@Output() onClicked** replaced by **menuClick**
    - **@Output() onItemClicked** replaced by **itemClick**

- **eui-slide-toggle**
    - **@Output() changed** replaced by **slideToggleChange**

- **eui-table**
    - <em>removed</em> **@Input() scrollableContainerRef**

- **eui-table**
    - <em>removed</em> **@Input() styleClass** replaced by euiSTATE coerce input boolean (see doc page for samples)

- **eui-tabs**
    - **@Output() tabClosed** replaced by **tabClose**
    - **@Output() tabSelected** replaced by **tabSelect**

- **eui-editor**
    - <em>removed</em>: **@Input() style: any, @Input() customToolbarOptions: any, @Input() maxLength?: number, @Input() minLength?: number, @Input() formControlName: string, @Input() feedbackTypeClass = 'danger', @Input() validationErrorMessage: string, @Input() scrollingContainer?: HTMLElement | string | null, @Input() bounds?: HTMLElement | string, @Input() customOptions: any[] = [], @Input() trackChanges?: 'user' | 'all', @Output() onInit: EventEmitter, @Output() onTextChange: EventEmitter<any>, @Output() onSelectionChange: EventEmitter<any>, @Output() onEditorCreated = new EventEmitter<typeof QuillType>(), @Output() onEditorChanged = new EventEmitter<EditorChangeSelection | ContentChange>(), @Output() onContentChanged = new EventEmitter<ContentChange>(), @Output() onSelectionChanged = new EventEmitter<SelectionChange>(), @Output() onFocus = new EventEmitter<Focus>(), @Output() onBlur = new EventEmitter<Blur>(), @Output() getCharactersCounter = new EventEmitter<number>(), @Output() getWordsCounter = new EventEmitter<number>(), @Input() isRequired, @Input() isEditable, @Input() hasReadOnlyStyles, @Input() strict, @Input() preserveWhitespace, @Input() spellcheck, @Input() isImageUrl.**
- **eui-app-sidebar-menu**
    - **@Output() onSidebarItemClicked** replaced by **sidebarItemClick**
- **eui-top-message**
    - **@Output() close** replaced by **topMessageClose**
- **eui-toolbar-menu**
    - **@Output() menuItemClicked** replaced by **menuItemClick**



### Classes replaced by interfaces on components' model
- **eui-chip-list**
    - **EuiChipDragDrop class** replaced by **EuiChipDragDrop interface**

- **eui-date-range-selector**
    - **EuiDateRangeSelectorDates class** replaced by **EuiDateRangeSelectorDates interface**

- **eui-discussion-thread**
    - **EuiDiscussionThreadItem class** replaced by **EuiDiscussionThreadItem interface**

- **eui-file-upload**
    - **EuiUploadedFile class** replaced by **EuiUploadedFileInterface interface**

- **eui-paginator**
    - **EuiPaginationEvent class** replaced by **EuiPaginationEvent interface**

- **eui-table**
    - **EuiPaginationEvent class** replaced by **EuiPaginationEvent interface**
    - **SortEvent class** replaced by **SortEvent interface**
    
- **eui-timepicker**
    - **EuiDateTimePickerConfig class** replaced by **EuiDateTimePickerConfig interface**



(last updated 14/11/2023)
