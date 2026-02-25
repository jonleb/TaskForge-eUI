# Migration from eUI 18.x to 19.x

## Starting the migration of your project

<em>As usual it is recommended to generate a new **eUI CLI** application, and transfer your /src/app folder to the one created in this generated app.</em>

Note that: the eUI CLI generated app has been aligned to the latest **Angular CLI** app, and is now re-structured to the **standalone** default mode of Angular, where there's no **NgModule** declared, central **AppConfig** is used.


## Breaking changes

### Angular : 19.x

As expected, please follow their migration guide here for more info : https://angular.dev/update-guide?v=18.0-19.0&l=1

below you can find all the [breaking changes](https://github.com/angular/angular/blob/master/CHANGELOG.md#breaking-changes).

<em>The biggest change in this Angular release is the **standalone** default mode, for a quicker migration, you can run the **ng update** tool on your project, or set **standalone: false** on each of your components.</em>


### 3rd party dependencies

#### NgRx 
It has been removed from eUI's internal architecture and dependencies list. This change streamlines the library's state management approach by transitioning to a lightweight Signal-based implementation.

(check the v19 release note for more details)

#### ApexCharts

Migrated to 4.x, check the new model entries here : https://github.com/apexcharts/ng-apexcharts/blob/master/projects/ng-apexcharts/src/lib/model/apex-types.ts

**ChartComponent** in **@eui/components/externals/chart** has been replaced by **EuiApexChartComponent**

### Removed / replaced deprecated Inputs, Outputs, methods

- **eui-dialog (Service)**
    - **Property isClosedOnClickOutside** removed and replaced by **hasClosedOnClickOutside**.
    - **Property isClosedOnEscape** removed and replaced by **hasClosedOnEscape**.

- **eui-dialog (Template)**
    - **@Input() isClosedOnClickOutside** removed and replaced by **hasClosedOnClickOutside**.
    - **@Input() isClosedOnEscape** removed and replaced by **hasClosedOnEscape**.

- **eui-input-number**
    - **Module EuiInputNumberDirectiveModule** removed and replaced by **EuiInputNumberModule**.

- **eui-message-box (Service)**
    - **Property typeClass** in **EuiMessageBoxConfig** removed and replaced by **variant** with value: **primary**, **secondary**, **info**, **success**, **warning**, **danger**.

- **eui-message-box (Template)**
    - **@Input() typeClass** removed and replaced by **euiVariant** with value OR: **euiPrimary**, **euiSecondary**, **euiInfo**, **euiSuccess**, **euiWarning**, **euiDanger**.

- **eui-notifications-v2**
    - **@Input() customUnreadCount** removed.

- **eui-page-column**
    - **Property size** removed and replaced by **euiSizeVariant** with value OR **euiSizeS**, **euiSizeM**, **euiSizeL**, **euiSizeXL**, **euiSize2XL**, **euiSize3XL**, **euiSize4XL**.

- **eui-paginator**
    - **Event pageChange** is no longer emitted at component init but still emits as before when controls are clicked.

- **eui-popover**
    - **@Input() size** removed and replaced by **euiSizeVariant** with value OR **euiSizeS**, **euiSizeM**, **euiSizeL**, **euiSizeXL**, **euiSize2XL**, **euiSizeAuto**.
    - Public method **isPopoverOpen** removed and replaced by public method **isOpen**.

- **eui-table-v2**
    - **@Input() isTableCondensed** removed.

- **eui-tree**
    - **@Input() expandedIconClass** removed and replaced by **expandedSvgIconClass**.
    - **@Input() collapsedIconClass** removed and replaced by **collapsedSvgIconClass**.

- **eui-app-sidebar-menu**
    - **@Input() items** changed from **any** to **Items[]**;

- **eui-toolbar-menu**
    - **@Input() items** changed from **any** to **Items[]**;
    - **@Output() menuItemClick** changed from **EventEmitter&lt;EuiMenuItem&gt;()** to **EventEmitter&lt;ToolbarItem&gt;()**;
    - The component class interface is now **EuiToolbarMenuComponent<Item extends ToolbarItem = ToolbarItem>**

 - **eui-input-group-addon / eui-input-group-addon-item** css classes usage has now been replaced by the component selectors : respectively : **EuiInputGroupAddOn** and **EuiInputGroupAddOnItem**
    

- **eui-input-number**
    - `public onChangeCallback: (_: any) => void;` changed to `public onChangeCallback: <T>(_: T) => void;`
    - `onChange: any = (_: any): void` changed to `onChange: <T>(_: T) => void = <T>(_: T): void`
    - `onTouched: any = (): void =>` changed to `onTouched: () => void = (): void`

- For **I18nLoader** Class API changes
  -  FROM: `protected loadResource(resource: I18nResourceImpl, lang: string): Observable<any>`TO
  `protected loadResource(resource: I18nResourceImpl, lang: string): Observable<TranslationKeys | ResourceError>`

- For **I18nService** Class API Changes
  From
    ```javascript
    getState<K = T>(mapFn?: (state: T) => K): Observable<K>;  
    getState<a extends keyof Partial<T>>(key?: a): Observable<Partial<a>>;  
    getState<K>(keyOrMapFn?: ((state: T) => K) | string): Observable<Partial<K>>
    ```
    TO
    ```javascript
    getState(): Observable<T>;  
    /**  
     * @deprecated this will be removed in a future version  
     * @param mapFn  
     */  
    getState<K = T>(mapFn?: (state: T) => K): Observable<K>;  
    getState<a extends keyof DeepPartial<T>>(key?: a): Observable<DeepPartial<a>>;  
    getState<K = T>(keyOrMapFn?: ((state: T) => K) | string): Observable<DeepPartial<K>>
    ```
    
    `getState<K = T>(mapFn?: (state: T) => K): Observable<K>;`  has been deprecated and might be removed in the future. Try to avoid.
    ```javascript
    updateState(langState: T | I18nState): void;
    ```
    Changed to
    ```javascript
    updateState(state: DeepPartial<T>): void;
    updateState(slice: DeepPartial<T>, reducer: (state: T, action: DeepPartial<T>) => T): void;  
    updateState<K extends T>(state: DeepPartial<K>, reducer?: (state: T, action: DeepPartial<K>) => T): void
    ```
  
- For **LocaleService** Class API Changes
    ```javascript
    getState<a extends keyof T>(key?: a): Observable<T[a]>;
    getState<K>(keyOrMapFn?: ((state: T) => K) | string): Observable<K>;
    ```
    Changed to 
    ```javascript
    getState(): Observable<T>;
    getState<a extends keyof DeepPartial<T>>(key?: a): Observable<DeepPartial<a>>;
    getState<K = T>(keyOrMapFn?: ((state: T) => K) | string): Observable<DeepPartial<K>>;
    ```
    And
    ```javascript
    updateState(langState: T | I18nState): void;
    ```
    Changed to
    ```javascript
    updateState(state: DeepPartial<T>): void;
    updateState<K extends T>(state: Partial<K> | T): void;
    ```

- For **StoreService** Class API Changes 
  - `addAutoSaveHandler(stateSlice: string, handler: Function): void` changed to `addAutoSaveHandler(stateSlice: string, handler: Handler<T>): void`
  - `dispatch(action: any): void` changed to `dispatch(action: unknown): void` which is deprecated and it will be removed. Please use **updateState(...)** instead.
  - `dispatchAction(state: T, actionKey: string, reducer: ActionReducer<any, Action>): void` has been removed and replaced by `select(...)`.

- For **UserService** Class API Changes
   ```javascript
    getState<K = T>(mapFn?: (state: T) => K): Observable<K>;
    getState<a extends keyof T>(key?: a): Observable<T[a]>;
    getState<K>(keyOrMapFn?: ((state: T) => K) | string): Observable<K> 
   ```
  changed to 
   ```javascript
    getState(): Observable<T>;
    getState<K = T>(mapFn?: (state: T) => K): Observable<K>;
    getState<a extends keyof DeepPartial<T>>(key?: a): Observable<DeepPartial<a>>;
    getState<K = T>(keyOrMapFn?: ((state: T) => K) | string): Observable<DeepPartial<K>>; 
   ```
  and Update state
   ```javascript
    updateState(userState: T): void;
    updateState<a extends keyof T>(slice: T[a], reducer: (state: any, action: T[a]) => any): void;
    updateState<K extends UserState>(userState: K | T, reducer?: unknown): void;
   ```
  changed to
   ```javascript
    updateState(state: DeepPartial<T>): void;
    updateState(slice: DeepPartial<T>, reducer: (state: T, action: DeepPartial<T>) => T): void;
    updateState<K extends T>(state: DeepPartial<K>, reducer?: (state: T, action: DeepPartial<K>) => T): void
   ```
  
- For **ApiQueueService** Class API Changes
   - `processQueueItem(id: string): Observable<any>` changed to `processQueueItem<T>(id: string): Observable<T>`
   - `processAllQueueItems<T = any>(continueOnError = true): Observable<T[]>` changed to `processAllQueueItems<T>(continueOnError = boolean): Observable<T[]>`
   - `processAllQueueItemsSequential(ascending = true): Observable<any>` changed to `processAllQueueItemsSequential<T>(ascending: boolean): Observable<T[]>`

- The **euiInitApp** has been @deprecated Use `provideEuiInitializer()` instead. Beware that this should be declared as Environment providers.

- Beware that APP_INITIALIZER has been removed from EuiCoreModule and should be declared as Environment providers. Use `provideEuiInitializer()` instead.

- NgRX selectors - The selectors have been deprecated and will be removed in the future
    - getAppLoadedConfigModules
    - getLastAddedModule
    - CoreAppActionTypes
    - InitStoreAction
    - UpdateAppVersionAction
    - UpdateAppConnectionAction
    - AddAppLoadedConfigModulesAction
    - UpdateAppStatusAction
    - UpdateCurrentModuleAction
    - ActivatedRouteAction
    - AddApiQueueItemAction
    - RemoveApiQueueItemAction
    - EmptyApiQueueAction
    - CoreAppActions
  
    - CoreI18nActionTypes
    - UpdateI18nStateAction
    - CoreI18nActions

    - CoreLocaleActionTypes
    - UpdateLocaleStateAction
    - CoreLocaleActions

    - CoreNotificationsActionTypes
    - UpdateNotificationsListAction
    - CoreNotificationsActions
  
    - CoreUserActionTypes
    - UpdateUserStateAction
    - UpdateUserDetailsAction
    - UpdateUserPreferencesAction
    - UpdateUserRightsAction
    - UpdateUserDashboardAction
    - CoreUserActions
  
    - The **CoreAppEffects** have been all removed. Please contact eUI team for replacements.
    - coreAppReducers
    - coreReducers
    - updateI18nState
    - actionToReducerMap
    - corI18nReducers
    - updateLocaleState
    - actionToReducerMap
    - coreLocaleReducers
    - localStorageSync
    - sessionStorageSync
    - loadState
    - coreNotificationsReducers
    - coreUserReducers
