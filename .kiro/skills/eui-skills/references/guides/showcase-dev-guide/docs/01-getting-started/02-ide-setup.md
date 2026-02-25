# Integrated Development Environment Configuration

In our commitment to leveraging open-source solutions for software development, we recommend Visual Studio Code (VSCode) as the preferred editor for frontend development. Our documentation consistently references this tool, underscoring its alignment with our development standards.

Please proceed to [download and install VSCode](https://code.visualstudio.com/) to align with our development environment.

## Visual Studio Code Extensions

To enhance the development experience and ensure conformity with our coding standards, the following VSCode extensions are suggested. These extensions are compatible with the default configuration files provided by the eUI default application upon initialization:

* [EditorConfig for VSCode](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) - Ensures consistent coding styles.
* [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) - Provides linting for style sheets.
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Facilitates JavaScript and TypeScript linting.
* [SonarLint](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode) - Integrates code quality and security analyses.
* [axe Accessibility Linter](https://marketplace.visualstudio.com/items?itemName=deque-systems.vscode-axe-linter) - Assists in maintaining web accessibility standards.

These extensions support our commitment to maintaining high-quality, consistent, and accessible codebases.

## Configuration Guidelines for JetBrains IDEs (IntelliJ IDEA, WebStorm, PPPStorm)

For developers utilizing JetBrains' suite of Integrated Development Environments (IDEs) such as IntelliJ IDEA, WebStorm, or PPPStorm, we recommend specific configurations to optimize your coding experience, particularly for Angular and eUI projects.

### Setting Up Your IDE for Angular and eUI

Once you have initialized an eUI project and completed the package downloads using Yarn or npm, follow these steps to configure your IDE:

1. Navigate to `Settings` → `Language & Frameworks` → `JavaScript` → `Libraries`.
2. Click on `Add`. Select the '+' button on the right.
3. Choose `Attach Files`, and then select the eUI packages (Core, Base).
4. Repeat the above steps for Angular packages.
5. Allow the IDE to index these settings.

Post-indexing, the IDE should offer enhanced autocomplete capabilities for components and directives.

### Important Note

<em>Please be aware that these settings are project-specific. Consequently, it is necessary to repeat this configuration process for each new project initiated within your JetBrains software (IntelliJ IDEA, WebStorm, etc.).</em>

## Browser Extensions for Angular Development (Optional)

### Augury: Angular Application Insights

Augury is a highly-regarded Google Chrome Developer Tool extension designed for debugging and profiling Angular applications. It offers a visual representation of the application structure through component trees and debugging tools. Augury provides valuable insights into the application's structure, change detection, and performance characteristics, which are instrumental for developers. To install Augury, please visit the following link: [Download Augury](#).

### axe Accessibility Linter: Ensuring Web Accessibility

For accessibility testing within Angular applications, we recommend the axe Accessibility Linter extension for Google Chrome. This tool is essential for ensuring that your web applications meet accessibility standards. To download and install the axe Accessibility Linter extension, access this link: [Download axe Accessibility Linter](#).
