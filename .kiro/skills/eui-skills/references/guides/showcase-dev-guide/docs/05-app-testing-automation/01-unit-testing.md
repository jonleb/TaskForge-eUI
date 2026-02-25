# Unit testing

## Introduction
On the eUI side, some default script tools are present in the generated eUI CLI app for the test runner to be executed, using Karma / Jasmine, see root **package.json** of your app for more info.

## Unit testing fundamentals

In eUI we are using **Karma** as the testing suite and **Jasmine** as the testing framework language.\
The Angular team provides an environment named **TestBed** where particular application parts like components and services can be safely and easily tested. The TestBed comes with a testing Module that is configured like normal Modules where Components, Directives and Pipes can be declared, Services and other Injectables can be provided and other Modules can be imported. After declaring the component that we want to test, we need to compile it by calling <code>TestBed.compileComponents();</code> and render it calling <code>TestBed.createComponent(TestComponent);</code> which returns a <code>ComponentFixture</code>, essentially a wrapper around the Component with useful testing tools.<br>

As in our testing environment there is no automatic change detection, only the static HTML is present and the dynamic HTML like template bindings is missing. Therefore it's important to trigger the change detection manually by calling <code>**fixture.detectChanges();**</code>. The fixture references the Component instance via the componentInstance property <code>const component = fixture.componentInstance;</code> which is mainly used to set Inputs and subscribe to Outputs.
#### Code Sample
```typescript
describe('TestComponent', () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let element: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestComponentModule, /* other imports needed */],
            declarations: [TestComponent],
        }).compileComponents();
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
    });
})
```
For accessing elements in the DOM, Angular has another abstraction: The <code>**DebugElement**</code> which wraps the native DOM element. The fixture’s debugElement property returns the Component’s host element. The DebugElement offers handy properties like properties, attributes, classes and styles to examine the DOM element itself. The properties parent, children and childNodes help navigating in the DOM tree. Often it is necessary to unwrap the DebugElement to access the native DOM element inside. Every DebugElement has a nativeElement property. Every DebugElement features the methods query and queryAll for finding descendant elements (children, grandchildren and so forth). <code>query</code> returns the first descendant element that meets a condition whereas <code>queryAll</code> returns an array of all matching elements. Both methods expect a predicate, that is a function judging every element and returning true or false. <br>
DebugElement has a useful method for firing events named <code>triggerEventHandler</code>. This method calls all event handlers for a given event type like click. As a second parameter, it expects a fake event object that is passed to the handlers.<br>
Angular ships with predefined predicate functions to query the DOM using familiar CSS selectors. i.e. <code>const h1 = debugElement.query(By.css('h1'));</code>. The return value of query is a DebugElement again, that of queryAll is an array of DebugElements (DebugElement[] in TypeScript. notation).
#### Code Sample
```typescript
it('should bind component--responsive class when isResponsive', () => {
    component.isResponsive = true;

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.component--responsive'))).toBeTruthy();
});
```

## Arrange-Act-Assert Pattern

**Arrange-Act-Assert** is a great way to structure test cases. It prescribes an order of operations:

- *Arrange* inputs and targets. Arrange steps should set up the test case. Does the test require any objects or special settings? Does it need to log into a web app? Handle all of these operations at the start of the test.
- *Act* on the target behavior. Act steps should cover the main thing to be tested. This could be calling a function or method, calling a REST API, or interacting with a web page. Keep actions focused on the target behavior.
- *Assert* expected outcomes. Act steps should elicit some sort of response. Assert steps verify the goodness or badness of that response. Sometimes, assertions are as simple as checking numeric or string values. Other times, they may require checking multiple facets of a system. Assertions will ultimately determine if the test passes or fails.
#### Code Sample
```typescript
it('should toggle isChecked when onToggle is called and isChecked and isReadOnly are set to false', () => {
    //Arrange
    component.isChecked = false;
    component.isReadOnly = false;
    //Act
    component.onToggle();
    //Assert
    expect(component.isChecked).toBeTrue();
});
```
## Testing components with children

So far we discussed about testing an independent Component that renders plain HTML elements, but no child Components. These Components are called **presentational Components** since they directly present a part of the user interface using HTML and CSS. In eUI though there are also plenty of "high-level" Components that bring multiple "low-level" Components together. These components are known as **container components**, they pull data from different sources, like Services and state managers, and distribute it to their children. Container Components have several types of dependencies. They depend on the nested child Components, but also Injectables i.e. Services. <br>

There are two fundamental ways to test Components with children: <br>
- Test using **shallow rendering** where the child Components are not rendered.
- Test using **deep rendering** where the child Components are rendered. This turns the test into an `integration test`.

In a unit test that uses *shallow rendering* the inner workings of the child components are not relevant. The selectors of the child components end up in the DOM tree, but they remain empty. What matters is to test that the template contains the children and that they are wired up correctly with the parent component via Inputs and Outputs. The testing module should't include the child components in the declarations array cause this will turn the test into an integration test(*deep rendering*). If Angular warnings about unknown elements occur, we should inform Angular to ignore the unknown elements by using the `NO_ERRORS_SCHEMA` value on the schemas property when configuring the testing Module i.e. <code>schemas: [NO_ERRORS_SCHEMA]</code>. <br><br>
In order to check for **Inputs** each DebugElement has a properties object that contains DOM properties together with its values. In addition, it contains certain property bindings. (The type is <code>{ [key: string]: any }</code>).Properties contains the Inputs of a child Component and it can be accessed as <code>properties.inputName</code>. <br><br>
Regarding the **Outputs**, we can simulate an Output event using the triggerEventHandler method. This method expects two parameters, the name of the Eventemitter and the emitted value <code>triggerEventHandler('eventEmitterName', emittedValue);</code>. Under the hood, triggerEventHandler runs the executed method with $event being the emittedValue we passed as a second parameter on the triggerEventHandler function. If i.e. the executed method is a console.log that logs the emittedValue, we can use Jasmine's spyOn method to verify that the console.log has been called i.e. <code>**spyOn**(console, 'log');</code>. Then in the Assert phase we can expect that the spy has been called with the emittedValue. <br><br>
There is a middle ground between a naive unit test and an integration test. Instead of working with empty custom elements, we can render **fake child Components**.
A fake Component has the same selector, Inputs and Outputs, but has no dependencies and does not have to render anything. When testing a Component with children, we substitute the children for fake Components. In order to to find a nested fake Component we can use query together with the By.directive predicate function i.e. <code>const element = fixture.debugElement.query(By.directive(FakeComponent));</code>. By.directive finds all kinds of Directives. A Component is a kind of Directive. query returns a DebugElement or null in case no match was found. We can access the rendered FakeComponent via the componentInstance property i.e. <code>const fakeComp: FakeComponent = element.componentInstance;</code>.<br>
Having access to the child Component instance, we can make expectations against it. First of all, we can verify it's presence, check for Inputs values(i.e. <code>fakeComp.inputName</code>) and verify that Outputs emit the correct value. As mentioned earlier, an Output is an EventEmitter property on the Component instance. Previously, we have simulated an Output event using the triggerEventHandler abstraction. Now we can access the Output directly and call its emit method i.e. <code>fakeComp.eventEmitterName.emit(emittedValue);</code>. <br><br>
To recap, working with the Component instance is more intuitive than working with the DebugElement abstraction. We can read Component properties to learn about Inputs and Outputs. Basic JavaScript and Angular knowledge suffices to write specs against such an instance.
#### Code Sample
Below you can find a test coming from the eui-datepicker component that summarizes most of the techniques described above:
- sets the <code>dateOutputFormat</code> Input property to the desired format
- calls <code>spyOn</code> to spy the dateSelect function
- checks whether the <code>emit</code> method is called with the formatted value
- calls through the <code>componentInstance</code> the openCalendar() method to open the calendar
- uses the <code>query(By.directive()</code> technique to access the nested Action Button components
- uses the <code>dispatchEvent</code> method to dispatch a click event on the Apply button
```typescript
it('should fire the dateSelect and emit the formatted value of dateOutputFormat when there is a change on the input value', () => {
    comp.dateOutputFormat = 'YYYY/MM/DD';
    const firstMonthFormattedDay = moment().startOf('month').format(comp.dateOutputFormat);
    fixture.detectChanges();
    const dp = fixture.debugElement.query(By.css('eui-datepicker'));
    spyOn(dp.componentInstance.dateSelect, 'emit');

    fixture.detectChanges();
    dp.componentInstance.openCalendar();
    fixture.detectChanges();

    const calendar = fixture.debugElement.query(By.directive(MatCalendar));
    const dateButton = calendar.nativeElement.querySelector('button.mat-calendar-body-cell');
    dateButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const actionButtons = fixture.debugElement.query(By.directive(EuiActionButtonsDirective));
    const applyButton = actionButtons.nativeElement.querySelector('button.apply');
    applyButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(dp.componentInstance.dateSelect.emit).toHaveBeenCalledWith(firstMonthFormattedDay);
});
```
## Statistics
Additional effort has been made from eUI15 version onwards on increasing the unit testing code coverage of eui-components: Below you can find the list of the components that were fully tested at the beginning of eUI15 compared to the beginning of eUI17 and the corresponding coverage summary.

<div style="display: flex;">
    <div style="flex: 1;">
       <h5> eUI15 fully tested components</h5>
        <ul>
            <li>eui-autocomplete</li>
            <li>eui-dashboard-button</li>
            <li>eui-datepicker</li>
            <li>eui-input-checkbox</li>
            <li>eui-input-number</li>
            <li>eui-input-radio</li>
            <li>eui-input-text</li>
            <li>eui-menu</li>
            <li>eui-slide-toggle</li>
        </ul>
        <img src="assets/docs/images/eUI14_testing_coverage.png" alt="eUI14 testing coverage">
    </div>
    <div style="flex: 1;">
        <h5> eUI17 fully tested components</h5>
        <ul>
            <li>eui-autocomplete</li>
            <li>eui-dashboard-button</li>
            <li>eui-datepicker</li>
            <li>eui-input-checkbox</li>
            <li>eui-input-number</li>
            <li>eui-input-radio</li>
            <li>eui-input-text</li>
            <li>eui-menu</li>
            <li>eui-slide-toggle</li>
            <li>eui-alert</li>
            <li>eui-block-content</li>
            <li>eui-button</li>
            <li>eui-card</li>
            <li>eui-chip</li>
            <li>eui-chip-list</li>
            <li>eui-dashboard-card</li>
            <li>eui-dialog</li>
            <li>eui-fieldset</li>
            <li>eui-file-upload</li>
            <li>eui-icon-toggle</li>
            <li>eui-list</li>
            <li>eui-message-box</li>
            <li>eui-paginator</li>
            <li>eui-progress-bar</li>
            <li>eui-progress-circle</li>
            <li>eui-select</li>
            <li>eui-textarea</li>
            <li>eui-timeline</li>
            <li>eui-timepicker</li>
        </ul>
        <img src="assets/docs/images/eui_17_testing_coverage.png" alt="eUI17 testing coverage">
    </div>
</div>

#### References

- https://testing-angular.com/testing-components/#testing-components
- https://automationpanda.com/2020/07/07/arrange-act-assert-a-pattern-for-writing-good-tests/
- https://angular.io/guide/testing
