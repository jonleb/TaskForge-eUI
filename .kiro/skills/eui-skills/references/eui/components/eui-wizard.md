# eui-wizard

## Overview

The <code class="eui-u-text-code">eui-wizard</code> and <code class="eui-u-text-code">eui-wizard-step</code> components features a <strong>visual step by step navigator</strong> 
which focuses the user to the relevant context from which some tasks needs to be completed in order to go to the next step.
<p class="eui-u-text-paragraph">Its usage is particularly interesting on some page details when having form data inputs which needs to be driven by user interactions.</p>

The <code class="eui-u-text-code">eui-wizard-step</code> component is in charge of displaying the big bullet containing an icon or short <code class="eui-u-text-code">indexLabel</code> (ex: 1, 2, 3 / A, B, C).
It features 5 different states mapped to various visual colors :
<br><br>

<table class="eui-table-default eui-table-default--responsive">
    <thead>
        <tr>
            <th>State</th>
            <th>Description</th>
            <th class="eui-u-width-20">Preview</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>isActive</td>
            <td>This is the current active step<br>State color : primary</td>
            <td>
                <eui-wizard>
                    <eui-wizard-step label="ACTIVE" isActive>
                        <p class="eui-u-text-paragraph">Step content...</p>
                    </eui-wizard-step>
                </eui-wizard>
            </td>
        </tr>
        <tr>
            <td>isCompleted</td>
            <td>The step task(s) are completed<br>State color : success</td>
            <td>
                <eui-wizard>
                    <eui-wizard-step label="COMPLETED" isCompleted>
                        <p class="eui-u-text-paragraph">Step content...</p>
                    </eui-wizard-step>
                </eui-wizard>
            </td>
        </tr>
        <tr>
            <td>isWarning</td>
            <td>The step task(s)/context contains warnings and requires the user's attention<br>State color : warning</td>
            <td>
                <eui-wizard>
                    <eui-wizard-step label="WARNING" isWarning>
                        <p class="eui-u-text-paragraph">Step content...</p>
                    </eui-wizard-step>
                </eui-wizard>
            </td>
        </tr>
        <tr>
            <td>isInvalid</td>
            <td>The step task(s)/context contains errors that must be fixed to go further<br>State color : danger</td>
            <td>
                <eui-wizard>
                    <eui-wizard-step label="INVALID" isInvalid>
                        <p class="eui-u-text-paragraph">Step content...</p>
                    </eui-wizard-step>
                </eui-wizard>
            </td>
        </tr>
        <tr>
            <td>isDisabled</td>
            <td>The step task(s)/context is disabled and not accessible<br>State color : secondary</td>
            <td>
                <eui-wizard>
                    <eui-wizard-step label="DISABLED" isDisabled>
                        <p class="eui-u-text-paragraph">Step content...</p>
                    </eui-wizard-step>
                </eui-wizard>
            </td>
        </tr>
    </tbody>
</table>

## API

API content

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | activeStepIndex | number | - |
| Input | steps | Array<EuiWizardStep> | [] |
| Input | tabindex | number | 0 |
| Input | e2eAttr | string | 'eui-wizard' |
| Input | isCustomContent | boolean | false |
| Input | isShowStepTitle | boolean | false |
| Input | isNavigationAllowed | boolean | true |
| Output | selectStep | EventEmitter<EuiWizardStep> | new EventEmitter() |

## Samples

### [Default](samples/eui-wizard/Default)

```html
<div class="doc-sample-section-title">Basic wizard steps</div>


<eui-wizard (selectStep)="onSelectStepDefault($event)">

    <eui-wizard-step label="STEP 1">
        <div class="eui-u-pv-m">
            <div class="eui-u-text-h5">STEP 1 title</div>
            Step 1 content...
        </div>
    </eui-wizard-step>

    <eui-wizard-step label="STEP 2">
        <div class="eui-u-pv-m">
            <div class="eui-u-text-h5">STEP 2 title</div>
            Step 2 content...
        </div>
    </eui-wizard-step>
</eui-wizard>



<div class="doc-sample-section-title">With states</div>


<div class="eui-u-flex">
    <button euiButton euiPrimary (click)="onToggleNavigation($event)">
        <span>
        @if (isNavigationAllowed) {
            Deactivate navigation
        } @else {
            Activate navigation
        }
        </span>
    </button>
    <div class="eui-u-ml-l">
        <code class="eui-u-text-code">isNavigationAllowed = {{isNavigationAllowed}}</code>
    </div>
</div>

<br><br>

<eui-wizard (selectStep)="onSelectStep($event)" [isNavigationAllowed]="isNavigationAllowed">

    <eui-wizard-step label="STEP 1" subLabel="completed" [isCompleted]="true">
        <div class="eui-u-pv-m">
            <div class="eui-u-text-h5">STEP 1 title</div>
            Step 1 content...
        </div>
    </eui-wizard-step>

    <eui-wizard-step label="STEP 2" subLabel="active" [isActive]="true">
        <div class="eui-u-pv-m">
            <div class="eui-u-text-h5">STEP 2 title</div>
            Step 2 content...
        </div>
    </eui-wizard-step>

    <eui-wizard-step label="STEP 3" subLabel="default">
        <div class="eui-u-pv-m">
            <div class="eui-u-text-h5">STEP 3 title</div>
            Step 3 content...
        </div>
    </eui-wizard-step>

    <eui-wizard-step label="STEP 4" subLabel="invalid" [isInvalid]="true">
        <div class="eui-u-pv-m">
            <div class="eui-u-text-h5">STEP 4 title</div>
            Step 4 content...
        </div>
    </eui-wizard-step>

    <eui-wizard-step label="STEP 5" subLabel="warning" [isWarning]="true">
        <div class="eui-u-pv-m">
            <div class="eui-u-text-h5">STEP 5 title</div>
            Step 5 content...
        </div>
    </eui-wizard-step>

    <eui-wizard-step label="STEP 6" subLabel="disabled" [isDisabled]="true">
        <div class="eui-u-pv-m">
            <div class="eui-u-text-h5">STEP 6 title</div>
            Step 6 content...
        </div>
    </eui-wizard-step>
</eui-wizard>

<div class="doc-sample-section-title">Event status : selectStep()</div>
<pre class="eui-u-f-s">
    @if (stepSelected) {
        {{ stepSelected | json }}
    }
</pre>
```

```typescript
import { Component } from "@angular/core";
import { JsonPipe } from "@angular/common";

import { EUI_WIZARD, EuiWizardStep } from "@eui/components/eui-wizard";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_WIZARD, ...EUI_BUTTON, JsonPipe],
})
export class DefaultComponent {
    stepSelected: any;
    isNavigationAllowed = true;
    currentStepIndex = 1;
    stepsCount = 3;

    onSelectStepDefault(event: EuiWizardStep) {
        this.stepSelected = event;
    }
    
    onSelectStep(event: EuiWizardStep) {
        this.stepSelected = event;
    }

    onToggleNavigation(event: any) {
        this.isNavigationAllowed = !this.isNavigationAllowed;
    }

    onSelectStepRemoteNav(event: any) {
        this.currentStepIndex = event.index;
    }

    onNavigation(increment: number) {
        const newIndex: number = this.currentStepIndex + increment;
        if (newIndex >= 1 && newIndex <= this.stepsCount ) {
            this.currentStepIndex = newIndex;
        }
    }
}
```

### Other examples

- [Options: Custom icons](samples/eui-wizard/custom-icons)
- [Options: indexLabel](samples/eui-wizard/indexLabel)
- [Options: isShowStepTitle](samples/eui-wizard/isShowStepTitle)
- [Main features: Remote navigation](samples/eui-wizard/remote-navigation)

## Accessibility

<code class="eui-u-text-code">eui-wizard</code> is a <code class="eui-u-text-code">div</code> container that behaves as a <code class="eui-u-text-code">role="tablist"</code> with horizontal orientation that holds several steps that behave as <code class="eui-u-text-code">role="tab"</code>. <br>
Each step has a unique id, a label and a sub label which are announced to the screen reader through the <code class="eui-u-text-code">aria-label</code> attribute. If the step is disabled, a corresponding state is announced via the <code class="eui-u-text-code">aria-disabled</code> attribute. The active step is announced to the screen reader through the <code class="eui-u-text-code">aria-selected</code> attribute. <br>
Each step is associated with a corresponding content which is projected by the user. The projected contect is linked with each step through the <code class="eui-u-text-code">aria-controls</code> attribute and it is announced to the screen reader when the step is active through the <code class="eui-u-text-code">aria-describedby</code> attribute. <br>
The rest of the content that is used for presentational purposes (i.e. icons, indicator wrapper) is marked as <code class="eui-u-text-code">role="presentation"</code>. <br>




<h6 class="eui-u-text-h6 section-title eui-u-mt-m">Keyboard interaction</h6>
Provided that the isNavigationAllowed property is set to true, the following keyboard interactions are available:
<table class="eui-table-default eui-table-default--responsive eui-table-default--bordered eui-table-default--compact">
    <thead>
        <tr>
            <th>Shortcut</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><kbd class="eui-u-text-kbd">Tab</kbd></td>
            <td>Move focus to the next step</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Shift</kbd> + <kbd class="eui-u-text-kbd">Tab</kbd></td>
            <td>Move focus to the previous step</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">ArrowRight</kbd></td>
            <td>Activates the next step</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">ArrowLeft</kbd></td>
            <td>Activates the previous step</td>
        </tr>
    </tbody>
</table>
