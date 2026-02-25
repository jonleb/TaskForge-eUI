# Below you can find some of the most common accessibility errors that occur on the web and how to tackle them!

- ## Insufficient color contrast
 Low color contrast can make it difficult for users with visual impairments to read the content. Use tools like color contrast checkers to ensure that the foreground and background colors have sufficient contrast. Ensure color contrast of at least 4.5:1 for small text or 3:1 for large text. More info [here](https://dequeuniversity.com/rules/axe/4.1/color-contrast?application=RuleDescription). You can also find ratio examples [here](https://dequeuniversity.com/tips/color-contrast).

- ## Inaccessible form elements 
Ensure that form elements like input fields, checkboxes, and radio buttons have proper labels associated with them. This helps screen readers identify and describe the purpose of each form element. Try to avoid using `title` attributes instead of labels. The `title` and `aria-describedby` attributes are used to provide additional information such as a hint. Hints are exposed to accessibility APIs differently than labels and as such, this can cause problems with assistive technologies. When form inputs such as text entry fields, radio buttons, check boxes, and select menus contain no labels other than title and aria-describedby attribute values, screen readers interpret the content as advisory information only. Labels created by the title and aria-describedby values are not sufficient to create a true label that can be determined programmatically from the code to convey the purpose of the input form element. More info [here](https://dequeuniversity.com/rules/axe/3.5/label-title-only?application=axeAPI)

- ## Lack of keyboard accessibility
 Make sure that all interactive elements on your website can be accessed and operated using a keyboard alone. This is important for users who cannot use a mouse. For a detailed overview on keyboard navigation, please check [here](https://eui.ecdevops.eu/eui-showcase-ux-components-19.x/showcase-dev-guide/docs/02-accessibility/04-keyboard-navigation-roadmap).

- ## Missing alt text for images
 Alt text provides a textual description of an image for screen readers. To solve this error, add descriptive alt text to all images using the `alt` attribute, which should describe the purpose of the image, not necessarily the image itself. More info [here](https://dequeuniversity.com/tips/alt-text-should-describe-the-purpose).

- ## Missing Document Language
 The language used on a website needs to be specified so people who use screen readers can listen to a voice say the content in the correct pronunciation of the language. When configuring a screen reader, users select a default language. If the language of a webpage is not specified, the screen reader assumes the default language set by the user. Language settings become an issue for users who speak multiple languages and access website in more than one language. It is essential to specify a language and ensure that it is valid so website text is pronounced correctly. More info [here](https://dequeuniversity.com/rules/axe/3.5/html-has-lang?application=axeAPI).

- ## Lack of proper heading structure
 Headings help users navigate through the content. Ensure that you use the correct heading levels (h1, h2, h3, etc.) in a hierarchical order to provide a clear structure to your content.

- ## Missing alternative text for links
 Links should have descriptive text that conveys their purpose. Avoid using generic text like "click here" and instead provide meaningful and descriptive link text.

- ## Empty Buttons
 Buttons are used to do things on a page, for example submitting a form or show/hide things. A button is focusable and can be triggered by the Enter/space key. Similar to empty links, we need to make sure that buttons have text for screen readers to read when on focus. The solution for fixing empty buttons is similar to fixing empty links, which is to make sure text label is present on buttons. If an image or an icon is used inside a button, we can add an alt tag to the image and an aria-label attribute to the icon accordingly. This will ensure that when a user uses a screen reader, the image alt tag is read and the aria-label of the icon is also read. i.e. <code>`<button euiButton euiIconButton class="eui-u-mr-s eui-u-mb-s"><span euiIcon iconClass="eui-icon eui-icon-bell" aria-label="Bell Icon"></span></button>`</code>.

- ## Non-active elements in tab order 
This error occurs when a non-interactive element has been placed in the tab order using tabindex="0", which means it becomes focusable using the keyboard when it doesn’t need to be, reducing efficiency and increasing effort for keyboard users. Generally, only elements that are interactive, such as links, buttons and form input fields, should be included in focus order. Screen reader users have access to a wide range of additional keyboard commands to allow quick navigation through content, so there’s no need to include static text and images in the focus order.

- ## Positive tabindex values 
The tabindex attribute is a way to control which elements on a web page receive keyboard focus. In the past, developers would use different values of tabindex to try to control the focus order through a page. However, this approach is very brittle and difficult to maintain, and today, the only values of the tabindex attribute that should be used are either 0 or, in specific situations where focus is managed programmatically, -1. To optimize keyboard usability, don’t try to control focus order using positive tabindex values. More info [here](https://dequeuniversity.com/tips/tabindex-positive-numbers).

- ## Invalid aria-describedby/aria-labelledby attributes 
Sometimes, a control may need a description as well as a label, when users might need to know more details about the state or purpose of the control. The aria-describedby attribute can be used to provide a connection between a control and some descriptive text elsewhere on the page. But the ID value defined by aria-describedby must match an element on the page with the same ID, otherwise the connection between those elements will not be conveyed by assistive technologies. The same applies for the aria-labelledby attribute.

- ## Tables markup 
Often, tables are used for layout, yet the page author fails to consider the way the content will be linearized, which can lead to confusion for screen reader users. Another situation could be that actual data tables are lacking in the proper markup to allow a screen reader user to obtain the information required to fully understand the data that is contained within a specific data cell. Often a simple data table will be presented in a way that requires a complex data table, yet the required markup is not included, which creates accessibility issues. More info [here](https://dequeuniversity.com/tips/simplify-data-tables).
