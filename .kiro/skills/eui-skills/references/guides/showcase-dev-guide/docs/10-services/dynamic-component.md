# Dynamic Component Service

## Overview
With CDK, you can dynamically inject a component into a view of your angular application. That process can be beneficial to improve the performance of your application.

For complete understanding, keep in mind:

* **ComponentPortal** is the component **to inject**
* **DomPortalHost** is the component in which ComponentPortal will **be injected**

## Getting started
To use that service, you need to provide it. Whether you provide that service (module or component) is up to your business logic. Also, you simply need to import in your module the **CoreModule** form the **@eui/core** package and inject it in the component of service that you want to use it. An example is provided below.
```javascript
...
import { EuiDynamicComponentService } from '@eui/core';
...
@Component({...})
export MyComp {
	...
	constructor(private dynamicService: EuiDynamicComponentService) {...}
}
```
## API

### Inject a component (EuiDynamicComponentService)

Use eUI helpers, first import dependencies.
```javascript
import { Portal, ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { EuiDynamicComponentService } from '@eui/core';
```
Keep in mind that the Component/s you are about to inject must be located at **entryComponents: \[\]** array of your module. This way, Angular can resolve their factories when you provide their instance.
  
Then call 'add' function
```javascript
this.EuiDynamicComponentService.add(component, null, config)
// or
this.EuiDynamicComponentService.add(component);
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
import { EuiDynamicComponentService } from '@eui/core';
```
Then call 'remove' function
```javascript
this.EuiDynamicComponentService.remove(portalHostRef, portalRef);
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


[//]: # (### Example)

[//]: # (To better understand how to use this service, let's see part of the **UxDynamicModal**. There's also a perfect pattern that you can use in general. It is about how to pass configuration and inject components in the view programmatically. Here we have the UxDynamicModalConfig, which is an interface of an object that you can pass specific data related to Modal. Of course, you can create your configuration for your component. That config object can contain values to function factories. For example, passing the onClick&#40;&#41; function at your component so you can define the logic from the parent component that dynamically injects your component.)

[//]: # ()
[//]: # (You should pay special attention to the part where you call the **add** Function where the last argument is the config itself. As we've discussed, what add&#40;&#41; is doing on the background is to create and inject the **DYNAMIC_COMPONENT_CONFIG** token where is contains the config you passed as an argument before.)

[//]: # (```javascript)

[//]: # (...)

[//]: # (openModal&#40;config: UxDynamicMessageBoxConfig | UxDynamicModalConfig&#41;: any {)

[//]: # ()
[//]: # (    let component;)

[//]: # ()
[//]: # (    document.body.classList.add&#40;'modal-open'&#41;;)

[//]: # ()
[//]: # (    if &#40;config instanceof UxDynamicModalConfig&#41; {)

[//]: # (        if &#40;!&#40;<UxDynamicModalConfig>config&#41;.onClose&#41; {)

[//]: # (            &#40;<UxDynamicModalConfig>config&#41;.onClose = this.closeModal.bind&#40;this&#41;;)

[//]: # (        })

[//]: # (        component = UxDynamicModalComponent;)

[//]: # (    } else {)

[//]: # (        component = UxDynamicMessageBoxComponent;)

[//]: # (    })

[//]: # ()
[//]: # (    this.openModalData = this.EuiDynamicComponentService.add&#40;component, null, config&#41;;)

[//]: # (    return this.openModalData;)

[//]: # (})

[//]: # ()
[//]: # (closeModal&#40;portalHostRef: DomPortalOutlet, portalRef: Portal<any>&#41; {)

[//]: # (    document.body.classList.remove&#40;'modal-open'&#41;;)

[//]: # (    this.EuiDynamicComponentService.remove&#40;portalHostRef, portalRef&#41;;)

[//]: # (    this.openModalData = null;)

[//]: # (})

[//]: # (...)

[//]: # (```)
