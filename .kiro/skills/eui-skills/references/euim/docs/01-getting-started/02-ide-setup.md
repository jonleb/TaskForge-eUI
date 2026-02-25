# IDE Setup

As an editor of choice and open source, VSCode can be installed for your frontend development, all examples presented in the documentation will refer to it.

Download and install from [here](https://code.visualstudio.com/).

## VSCode extensions

Some extensions are recommended and are aligned to default config files provided by eUI default application once generated:

* EditorConfig for VSCode
* Stylelint
* TSLint

## IntelliJ IDEA - **Webstorm -** **PPPStorm** (Jetbrains)

In case you are using any IDE from Jetbrains (**IntelliJ Idea**, **Webstorm**, **PPPStorm,** etc.) you can configure the IDE for optimal coding experience with Angular and eUI.

After initializing an eUI project and downloading all packages using yarn either npm open the **Settings→ Language & Frameworks→ Javascript→ Libraries→ Add→ (_Click + button on the right_)→ Attach Files→ (Select the eUI packages, Core, Base)** Then repeat the same for Angular packages. Let the IDE index and voila, you should now be able to autocomplete components and directives.

Beware

Since these settings are project-specific you need to do this each time you create a new project with your Jetbrains software (Intellij Idea, Webstorm, etc.)

![](assets/docs/images/todo)


## Browser extensions (optional)

While working with the Angular app, it might be easy to be lost with many aspects of architecture while in runtime. For this, there are some useful browser extensions, which help to track things directly in browser inspector.

Augury is the most used Google Chrome Developer Tool extension for debugging and profiling Angular 2 applications. Augury helps Angular developers visualize the application through component trees and visual debugging tools. Developers get immediate insight into their application structure, change detection and performance characteristics. You can download and install it from [here](https://augury.angular.io/).
