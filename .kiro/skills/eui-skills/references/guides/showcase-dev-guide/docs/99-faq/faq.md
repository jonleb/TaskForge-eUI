# FAQ

## Release and general questions


<div class="eui-u-font-bold">
<br>
<span class="eui-u-color-primary">Question - 06-2021</span>
<p>
According to the 10.x release notes, all "ux-" components will progressively be deprecated but still maintained and in place for eUI10. Since most of the "eui-" components are not ready for production, it would be interesting to know:

What is exactly meant with "deprecated" components. Will they be supported? Will they be replaced seamlessly?
Is there an estimation on when the "eui-" components will be ready?
Is there a timeline for the next eUI version and what would be the implications?
</p>
</div>

<span class="eui-u-color-primary">Answer</span>
<p>
ux- components will be deprecated in current eUI 10.x and kept as legacy in the upcoming eUI 13.x (october).

As of version 10.4.0 foreseen next week, they will be marked as deprecated (

see https://eui.ecdevops.eu   for upcoming release in our DEV environment / staging for the future states of those components.

deprecated means : available and no more maintained / totally removed in release + 2 of eUI (major release +2 so totally removed in eUI 14.x in april 2022) and replaced by their eui- counterparts
most of the components will be ready as of 10.4.0
as said no implications, if the ux- components are used, they will be kept as legacy to limit the breaking changes in your app.
Exception to this, is the support of PrimeNG that will be totally deprecated / removed in eUI 13.x (October).
</p>

<hr>



<div class="eui-u-font-bold">
<br>
<span class="eui-u-color-primary">Question - 06-2021</span>
<p>
What is the best strategic to development right now? Because don't have enough eui components and ux components will be deprecated
</p>
</div>

<span class="eui-u-color-primary">Answer</span>
<p>
as of 10.4.0 used eui- components first, ux- components can still be used and can be progressively upgraded your side until eUI 14.x (april 2022) leaving you almost a year to do the transition if needed
</p>

<hr>



<div class="eui-u-font-bold">
<br>
<span class="eui-u-color-primary">Question - 06-2021</span>
<p>
</p>
</div>

<span class="eui-u-color-primary">Answer</span>
<p>
</p>

<hr>









## eUI core and components

<div class="eui-u-font-bold">
<br>
<span class="eui-u-color-primary">Question - 06-2023</span>
<p>How to extend an eUI Component class to access elementRef or inject extra services. Also styles don't seem to work.
</p>
</div>

<span class="eui-u-color-primary">Answer</span>
<p>Extending our classes means that you will create components of your own. Although is possible and not prohibited (since angular/typescript) we don't support that! We don't have any documentation on how to do that. We haven't planned to do that in the future since that is not a goal of the eUI project.
</p>
<p>Extending our class doesn't mean that you extend the metadata from the eUI Component Decorator. Thus you are not "extending" the styles. Eui styles are not global anymore and thus encapsulated so you cannot have eUI styles just by extending one of our component class.</p>
<p>
Assuming that you own the template of your component (and it's not part of a third-party component that you want to render eUI components inside) you can use @ViewChild or @ViewChildren.
</p>

For example
```ts
@ViewChildren(EuiInputCheckboxComponent, \{read: ElementRef}) public boxes: QueryList<ElementRef>[];
```

<p>In case you don't own the parent component (due to third-party usage), another technique is to create a directive of your own and apply it to the input element where euiInputCheckBox is.
</p>

```ts
@Directive({
selector: '[customizeEuiCheckbox][euiInputCheckBox]',
})
export class CustomizeEuiCheckboxDirective {
    constructor(private el: ElementRef, private euiCheckBox: EuiInputCheckboxComponent) {
        console.log('CustomizeEuiCheckboxDirective created');
        console.log(euiCheckBox);
        console.log(el);
    }
    ......
}
```
```html
<input id="default-checkbox0"
    aria-label="default checkbox unchecked"
    name="default-checkbox"
    euiInputCheckBox
    customizeEuiCheckbox
    />
<label euiLabel for="default-checkbox0">Label</label>
```

<div class="eui-u-font-bold">
<br>
<span class="eui-u-color-primary">Question - 05-2023</span>
<p>How to enable eui-growl inside eUI/ECL application
</p>
</div>

<span class="eui-u-color-primary">Answer</span>
<p>First please read how to integrate eUI and ECL libraries FAQ
</p>

**src/app/app.component.html**

Declare *eui-growl* component to make it available everywhere across your app

```html
	<ecl-app></ecl-app>

	<eui-growl [value]="euiGrowlService.growlMessages"
		[sticky]="euiGrowlService.isGrowlSticky"
		[life]="euiGrowlService.growlLife"
		[position]="euiGrowlService.growlPosition"
		(clicked)="euiGrowlService.growlCallback()">
	</eui-growl>
```

**src/app/app.component.ts**

Declare *EuiGrowlService* which is required for eui-growl.
Please read eUI documentation how to use growl with EuiGrowlService.

```ts
import { EuiGrowlService } from '@eui/core';

    constructor(
        private store: Store<any>,
        public euiGrowlService: EuiGrowlService
    ) {...}
```

**src/app/features/home.component.html**

Sample usage of growl inside home component. 
Same steps can be followed to enable it in any other place.

```html
	<button eclButton (click)="onShowGrowl()">Show growl message</button>
```

**src/app/features/home.component.html**

```ts
export class HomeComponent {
    constructor(
        @Inject(CONFIG_TOKEN) private config: EuiAppConfig,
        public euiGrowlService: EuiGrowlService
    ) { ... }

    public showGrowl() {
        this.euiGrowlService.growl({
            severity: 'type',
            summary: 'Summary text',
            detail: 'Message details' },
            false,
            false,
            3000,
            'bottom-right',
        );
    }
```

<hr>




<div class="eui-u-font-bold">
<br>
<span class="eui-u-color-primary">Question - 05-2023</span>
<p>How to integrate eUI and ECL libraries so both component sets can be used together?
</p>
</div>

<span class="eui-u-color-primary">Answer</span>
<p>It is possible to have both eUI and ECL components working together, though not recommended, as both are different design systems with different goals in mind.
</p>

Assuming eUI/ECL application is created, following steps will add eUI components:

**angular.json**

Add eui.css and eui-utilities.css files to include eUI styles.
```json
"styles": [
	"node_modules/@eui/styles/dist/eui-ecl-ec.css",
	"node_modules/@eui/styles/dist/eui.css",
    "node_modules/@eui/styles/dist/eui-utilities.css"
	"src/styles.scss"
]
```

**Add needed modules.**

Import the module/s for the eUI components, that you would like to use. For example, let's say you would like to use <code>eui-autocomplete</code> component from eUI in <code>home.component.html</code> (in eUI-ECL app). Then in your <code>home.component.ts</code> you should have:

```ts
import { EuiAutocompleteModule } from '@eui/components/eui-autocomplete';

@Component({
    templateUrl: './home.component.html',
    standalone: true,
    imports: [
        ...
        EuiAutocompleteModule,
        ...
    ],
})
```

<hr>

<div class="eui-u-font-bold">
<br>
<span class="eui-u-color-primary">Question - 06-2021</span>
<p>
form validation, info is minimal (for ex how to check that a date is bigger then today)
</p>
</div>

<span class="eui-u-color-primary">Answer</span>
<p>
We do provide some example on how to use the service and components in situation / recommended coding approach, and it has to stay minimal our side, for all related javascript question : stackoverflow / google is your friend
</p>

<hr>




<div class="eui-u-font-bold">
<br>
<span class="eui-u-color-primary">Question - 06-2021</span>
<p>
view /edit in modal dialog example, i downloaded the code and tried to implement it but the 'search filter' is not working
</p>
</div>

<span class="eui-u-color-primary">Answer</span>
<p>
the "is not working" is not enough to help you, please be more specific, in any case, this kind of questions should be asked on MS Teams channel (helpdesk / support) or DIGIT EUI SUPPORT
</p>

<hr>




<div class="eui-u-font-bold">
<br>
<span class="eui-u-color-primary">Question - 06-2021</span>
<p>
how to disable a save button as long as the form is not valid
</p>
</div>

<span class="eui-u-color-primary">Answer</span>
<p>
Angular related => google it, we can provide some example if needed but this is trivial, checking form state / set the isDisabled = true | false on the button according to the form validity (for example).
</p>

<hr>



<div class="eui-u-font-bold">
<br>
<span class="eui-u-color-primary">Question - 06-2021</span>
<p>
ux-editor gonna be depreciated but no eui-editor yet, and for our application when need rich text editing, same problem with datepicker that exist in ux- but not in eui-, as solution do we have to use something else as primeNg ?
</p>
</div>

<span class="eui-u-color-primary">Answer</span>
<p>
ux-editor will be migrated to eui-editor and still can be used right now as no counterpart exists, same goes for ux-datepicker, use this one now, the migrated component will be available in a later release : as solution in any case : DON'T USE PrimeNG, as those components exists in eUI and are still "active"
</p>

<hr>



## Dependencies and 3rd party library

<div class="eui-u-font-bold">
<br>
<span class="eui-u-color-primary">Question - 06-2021</span>
<p>
Why using Boostrap 4.5 since the official documentation is only supporting version 4.6, and why not using version 5.0 as it's a stable version. 
</p>
</div>

<span class="eui-u-color-primary">Answer</span>
<p>
Bootstrap is not used anymore in eUI except for the grid layout (row/col/breakpoints) so the version used there is perfectly fine.
</p>

<hr>
 



<div class="eui-u-font-bold">
<br>
<span class="eui-u-color-primary">Question - 06-2021</span>
<p>
Why using font awesome old version 4.7 and not build your own icons set using tool as iconmoon ?
</p>
</div>

<span class="eui-u-color-primary">Answer</span>
<p>
because we've our own set of icons using eui-icons set for generic icons / keep harmonization as design tokens accross eUI apps implementation.

So we just do this actually having our own iconmoon set that we're maintaining
</p>

<hr>
 



<div class="eui-u-font-bold">
<br>
<span class="eui-u-color-primary">Question - 06-2021</span>
<p>
As primeNg is now at version 12.0 and eui use version 9.X is it a problem if we install last version
</p>
</div>

<span class="eui-u-color-primary">Answer</span>
<p>
PrimeNG is used only for tables (and will be deprecated as of 10.4.0) and totally removed as of eUI 13.x (October). Also this version 12.x is for Angular 12.x and we're in Angular 10.x...
</p>

<hr>



<div class="eui-u-font-bold">
<br>
<span class="eui-u-color-primary">Question - 06-2021</span>
<p>
As  Angular material is now at version 12.0 and eui use version 10.X is it a problem if we install last version
</p>
</div>

<span class="eui-u-color-primary">Answer</span>
<p>
yes you can't install your own Angular version, that's why eUI exists to control for you the version of Angular that is validated for everyone at EC using eUI. We'll do the upgrade as of next major release to Angular 13 for eUI 13 in October.
</p>

<hr>
 







## Architecture / DevOps / CI / Bamboo related

<div class="eui-u-font-bold">
<br>
<span class="eui-u-color-primary">Question - 06-2021</span>
<p>
	validate if it's ok use weblogic
</p>
</div>

<span class="eui-u-color-primary">Answer</span>
<p>
Yes it's still part of the default DIGIT tech stack, for structure you have the possibility to generate an maven module app wrapping the angular eUI frontend and generating a WAR out of the box (together with specific JEE aspects).
</p>

<hr>
