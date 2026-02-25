# Dynamic Component Service

## Overview
With CDK, you can dynamically inject a component into a view of your angular application. That process can be beneficial to improve the performance of your application. Full examples of uses can be found here:

- [UX Dynamic Modal](https://euidev.ecdevops.eu/eui-showcase-ux-10.x/style-guide/components/ux-dynamic-modal)
- [UX Dynamic Message Box](https://euidev.ecdevops.eu/eui-showcase-ux-10.x/style-guide/components/ux-dynamic-message-box)

For complete understanding, keep in mind:

* **ComponentPortal** is the component **to inject**
* **DomPortalHost** is the component in which ComponentPortal will **be injected**

## Getting started
To use that service, you simply need to import in your module the **CoreModule** form the **@eui/core** package and inject it in the component of service that you want to use it. An example is provided below.
```javascript
...
import { UxDynamicComponentService } from '@eui/core';
...
@Component({...})
export MyComp {
	...
	constructor(private dynamicService: UxDynamicComponentService) {...}
}
```
## API

### Inject a component (UxDynamicComponentService)

Use eUI helpers, first import dependencies.
```javascript
import { Portal, ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { UxDynamicComponentService } from '@eui/core';
```
Keep in mind that the Component/s you are about to inject must be located at **entryComponents: \[\]** array of your module. This way, Angular can resolve their factories when you provide their instance.
  
Then call 'add' function
```javascript
this.uxDynamicComponentService.add(component, null, config)
// or
this.uxDynamicComponentService.add(component);
```
Parameters:

* **component**: [@Component](https://angular.io/api/core/Component) to inject
* **el** (optional): [ElementRef](https://angular.io/api/core/ElementRef) - Default: document.body
* **config** (optional)

Return value

* { portalHost, portal }: An object containing a reference to the DomPortalHost and a reference to the ComponentPortal.

It will inject a component in the provided el (document.body if not defined) and will pass config to a component.

### Remove a component dynamically
Use eUi helpers, first import dependencies.
```javascript
import { Portal, ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { UxDynamicComponentService } from '@eui/core';
```
Then call 'remove' function
```javascript
this.uxDynamicComponentService.remove(portalHostRef, portalRef);
```
Parameters:

* **portalHostRef**: A reference to DomPortalHost
* **portalRef**: A reference to ComponentPortal

(Those two params are returned by add function)

### Retrieve config in the injected component
You can easily retrieve the config object with @Inject decorator.
```javascript
...
import { Inject } from '@angular/core';
import { DYNAMIC_COMPONENT_CONFIG } from '@eui/core';
import { ComponentInjectedConfig } from './component-injected.config.model';

...
constructor(@Inject(DYNAMIC_COMPONENT_CONFIG) private componentInjectedConfig: ComponentInjectedConfig) {
    this.config = componentInjectedConfig;
}
...
```
As to keep consistency through all injection of the component, it is recommended to type the config object with a model.

We can consider the config object replace standard [@Input()](https://angular.io/api/core/Input) and [@Output()](https://angular.io/api/core/Output) params.

You will retrieve two properties in the config:

* **portalHostRef**: A reference to DomPortalHost
* **portalRef**: A reference to ComponentPortal

## Use case
Think of a use case that you want to render a Modal which contains a considerable form. Typically to do that, your parent component template should hold the modal template also. This is problematic in terms of maintenance and performance. Now think of another scenario that the modal holds a form that might change a bit based on different inputs. In that case, you would end up in a substantial ngIf statement maze both on your template and your typescript file. The Best way would have been to create modal and inject it to your parent component dynamically. This way is always more efficient in terms of performance.

### Example
To better understand how to use this service, let's see part of the **UxDynamicModal**. There's also a perfect pattern that you can use in general. It is about how to pass configuration and inject components in the view programmatically. Here we have the UxDynamicModalConfig, which is an interface of an object that you can pass specific data related to Modal. Of course, you can create your configuration for your component. That config object can contain values to function factories. For example, passing the onClick() function at your component so you can define the logic from the parent component that dynamically injects your component.

You should pay special attention to the part where you call the **add** Function where the last argument is the config itself. As we've discussed, what add() is doing on the background is to create and inject the **DYNAMIC_COMPONENT_CONFIG** token where is contains the config you passed as an argument before.
```javascript
...
openModal(config: UxDynamicMessageBoxConfig | UxDynamicModalConfig): any {

    let component;

    document.body.classList.add('modal-open');

    if (config instanceof UxDynamicModalConfig) {
        if (!(<UxDynamicModalConfig>config).onClose) {
            (<UxDynamicModalConfig>config).onClose = this.closeModal.bind(this);
        }
        component = UxDynamicModalComponent;
    } else {
        component = UxDynamicMessageBoxComponent;
    }

    this.openModalData = this.uxDynamicComponentService.add(component, null, config);
    return this.openModalData;
}

closeModal(portalHostRef: DomPortalOutlet, portalRef: Portal<any>) {
    document.body.classList.remove('modal-open');
    this.uxDynamicComponentService.remove(portalHostRef, portalRef);
    this.openModalData = null;
}
...
```
