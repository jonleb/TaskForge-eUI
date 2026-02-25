# What's new in the eui prefixed components

After testing eui-components using the technics mentioned in the [a11y testing-tools](https://eui.ecdevops.eu/eui-showcase-dev-guide-10.x/docs/02-accessibility/01-a11y-testing-tools) section, we analyzed the errors we got, proposing corresponding solutions based on suggestions/best practises from major accessibility providers like [Deque](https://www.deque.com/).

## Summary of issues that have been tackled on eui-components  

* **Buttons** must have discernible text.
* Elements must have sufficient **color contrast**.
* Ensure that **scrollable region** has keyboard access.
* **IDs** of active elements must be unique.
* **Form** elements must have labels.
* All page content must be contained by **landmarks**.
* **ul** and **ol** must only direct contain **li**, **script** or **template** elements.
* Certain **ARIA roles** must be contained by particular parents.
* **Images** must have alternate text.
* **li** elements must be contained in a **ul** or **ol** element.
* Elements must only use **allowed ARIA attributes**.
* **html** element must have a lang attribute.  
&nbsp;  

**You can find a detailed overview of the above mentioned issues along with screenshots, analysis on the received errors and suggested solutions here: [a11y testing and analysis on the new eui prefixed components](https://citnet.tech.ec.europa.eu/CITnet/confluence/display/EUI/a11y+testing+and+analysis+on+the+new+eui+prefixed+components).**
