# a11y testing tools

## Manual and Automated Testing

Accessibility Testing can be splitted into two main categories: <u>Manual Testing</u> and <u>Automated Testing</u>.

### Automated Testing
Automated evaluation can be carried out by anyone with access to an accessibility testing tool. Accessibility testing tools run a set of scripts checking web content against certain criteria based on WCAG standards.

Automated Testing can be divided into three categories: 

* Development Testing which ensures that the accessibility criteria of the page can be verified and fixed if required proactively during the    development process. Development Testing can be done by making use of browser plugins that would analyze the page on the target tab and generate an onscreen report containing a list of errors and warnings. Also in the same category belong IDE extensions that can highlight elements that you should consider changing and give a hint on how you should change them.
* Automated Testing using Command-Line Interface (CLI) testing tools triggered by the user providing as a url the page that needs to be tested along with additional configuration.
* Automated Testing that can run as a command line process every time a build is triggered, as a configuration of a CI tool process (CI integration. If the number of errors/warnings go beyond a specified threshold then the automated test process can be exited and the build would fail.

### Manual Testing
Testing performed manually by an accessibility expert using assistive technologies ( screen readers, Accessibility Developer Tools, keyboard only testing using the tab key, et al.)who checks a subset of pages or app screens (usually 5 - 20) against WCAG criteria, i.e. if there is correct HTML structure, proper color contrast and keyboard functionality, whether certain a11y attributes have been applied etc.

### Manual vs Automated

Although Automated testing is great it can track up to 30%-50% of a11y errors. Therefore manual testing will still be necessary for a detailed a11y check.

![eui-automatedvsmanual](assets/docs/02-accessibility/automatedvsmanual.png)

Scenarios where automatic testing fails:

* Valid but not accessible code e.g. DIV buttons with scripting
* contrast checks on absolute positioned elements
* tab traps (invisible focus indicator) in the tab sequence
* logical heading order / document structure / correct semantics
* correct meanings of alt text, labels, tooltips or error messages
* voice commands / voice interaction
* keyboard shortcuts

<u>Conclusion</u>

Automated and manual testing complement each other and should both be used to assess the level of accessibility of a website or app. Generally speaking, automated testing can identify some of the issues found on pages across the site but manual testing can find all of the issues on a subset of pages if applied properly by an accessibility expert.

### Automated Testing Tools
As mentioned earlier Automated Testing can be divided into 3 sub-categories:

Bellow you can find a few recommendations for each category (Some of the tools offer solutions in all of the categories mentioned). Feel free to pick the one that fits your needs and the scope of your project or even other than the ones mentioned here.  You can also check for Accessibility evaluation tool lists to help you more on selecting the proper a11y testing tool [here](https://www.w3.org/WAI/ER/tools/?q=wcag-21-w3c-web-content-accessibility-guidelines-21&q=command-line-tool).

- **Development Testing Tools**

    * Browser Extensions
        * [Storybook](https://github.com/storybookjs/storybook/tree/master/addons/a11y)
        * [Wave](https://wave.webaim.org/)
        * [Tenon](https://tenon.io/)
        * [Google Lighthouse](https://developers.google.com/web/tools/lighthouse/)
        
        <u>Testing eUI10 showcase home page using  Google Lighthouse:</u>
        ![eui-google-lighthouse](assets/docs/02-accessibility/test_with_Lighthouse.gif)
    
    * IDE extensions
        * [Visual Studio Code Accessibility Extension](https://marketplace.visualstudio.com/items?itemName=MaxvanderSchee.web-accessibility)

        <u>Using VsCode a11y extension on ux-timepicker.component.html</u>:
        ![eui-vdcode-extension](assets/docs/02-accessibility/test_usingVsCode_extension.gif)

- **Automated testing using Command-Line Interface (CLI) testing tools**
    * [Pa11y](https://pa11y.org/)
    * [Axe-cli](https://github.com/dequelabs/axe-cli)

        <u>Using axe-cli to test eUI10 showcase home page:</u>
        ![eui-axe-cli](assets/docs/02-accessibility/testing_with_axe-cli.gif)

- **Automated Testing using tools that provide CI/CD integration**
    * [ARC Monitoring](https://www.tpgi.com/arc-platform/monitoring/)
    * [Axe DevTools](https://www.deque.com/axe/devtools/)
    * [Pa11y CI](https://github.com/pa11y/pa11y-ci)

        <u>Using Pa11y CI to test 10 urls of eUI10 showcase:</u>

        With Pa11y CI you can pass a config file in order to configure your test and add as many urls you want to test: For this reason we created a new script within eUI tools named  **a11y-app** that can be called via the eui-scripts **a11y-app project-name** (in our case will be eui-scripts a11y-app eui-showcase-ux).  The script is actually calling pa11y-ci, passing a config file named **a11y-config.json** that needs to exist at the root level of your project. The config file has the following structure in our case:
        
        ![eui-a11y-config](assets/docs/02-accessibility/a11y-config.png)

        So , this config file is specifying as **standard** the default one (WCAG2AA), as test **level** the errors(no warnings or notices) and provides an object of **defaults** that as the name implies provides the default configuration for all the urls. The properties within this defaults object can be overridden within each url by specifying a corresponding property (i.e. timeout) with different value. So, in the above mentioned defaults object we specify a **timeout** of 30secs which relates to the duration of the tests, a **wait** of 2secs in order to wait for some elements (i.e. images) to come before starting the test, we set as **runner** the axe-core which detects more errors than the default HTML Code Sniffer (htmlcs). We also **ignore** principles that we are not interested in, as well as notices and warnings. We set a **concurrency** of 2 to run 2 tests at the same time and we specify options for the Headless Chrome instance through the **chromeLaunchConfig** in order for Pa11y to run in a container based pipeline. So we wrapped the scripts mentioned above in one called eui-showcse-ux:a11y and we added it on our scripts.json file. So if we run it with the above mentioned config file we will get the following results:

        ![eui-test-with-Pa11yCI](assets/docs/02-accessibility/testing_eUI10_with_pa11y-ci.gif)

        <u>A more advanced example using actions to bypass EU Login authentication</u>

        On this example we are using pa11y-ci within pmo-mobile app and we are using **actions** on the specified url in order to bypass EU Login authentication that comes first when we serve the app.

        The corresponding part of the config file is the following:

        ![eui-actions](assets/docs/02-accessibility/actions.png)

        The rest of the options in the config file are the same as the ones in the previous example with the difference that here we specify a **"concurrency": 1**, as we want to run the tests one by one and not i.e. two at the same time due to the authentication process that we need to bypass.

        So as soon as the first page that comes from EU login is the one requesting for the username, we set the corresponding field to the specified username.  After each action we take a **screenshot** in order to verify that we passed the action successfully. We store all the screenshots on the **screenshots-output** folder we created at the root level of our app and we cross check the images after the end of the tests.

        So the username.png img we received is:

        ![eui-username](assets/docs/02-accessibility/username-screenshot.png)

        which means that our **first action** has been applied successfully!

        The **second action** is to click the element which holds the next button shown above and we take a screenshot: 

        The next-click img we received is:

        ![eui-next-button](assets/docs/02-accessibility/next-button-screenshot.png)

        Although it's a blank page, this is normal as it's the step after clicking the next button and before receiving the next page, which means that our second action was also successful.

        The **third action** is to set the #password field to the corresponding password and take a screenshot.

        The password img we received is:

        ![eui-pass](assets/docs/02-accessibility/pass-screenshot.png)

        which means that our third action was also applied successfully.

        Next we apply **3 actions together**: We first click on the Sign in button, we wait for the url to be localhost:4200/home ( the home page of the app) and we also wait for the img (the pmo-mobile logo) to be visible in order to take a screenshot and verify that we moved to the pmo-mobile app home page.

        The home img we received is :
        
        ![eui-home](assets/docs/02-accessibility/home-img.png)

        which means that we are redirected on the home page of the app and we successfully bypassed the EU login authentication.

        ** Bear in mind that on the url we applied the above mentioned actions we specified a **timeout** of 60 secs in order to override the default one for this test, as we need more time in order to apply our actions. Also in cases you apply actions on a url that include redirections and "waiting for a another url" to come like the ones above, you might face that your test will fail with the following error:  **"Error: waiting for function failed: timeout 30000ms exceeded"**. This timeout error is not related to the timeout property (the duration) of the test, but to the fact that certain elements i.e. images or http calls didn't appear once the test started and that's why it failed. In these cases you might need to add an additional **wait** property on this specific url to override the default one in order to wait for these elements or http calls to happen.

        So, if we run the corresponding script with the above mentioned config on 8 urls of the pmo-mobile app we will get the following results:

        ![eui-pmo-testing](assets/docs/02-accessibility/testing_pmo-mob_with_pa11y-ci.gif)

        ### References

        * VsCode Extension  
            [https://marketplace.visualstudio.com/items?itemName=MaxvanderSchee.web-accessibility](https://marketplace.visualstudio.com/items?itemName=MaxvanderSchee.web-accessibility)
        * Automated vs Manual Testing  
            [https://blog.tenon.io/automated-testings-strength-comes-from-efficiency](https://blog.tenon.io/automated-testings-strength-comes-from-efficiency)  
            [https://microserve.io/blogs/accessibility-testing-manual-or-automated](https://microserve.io/blogs/accessibility-testing-manual-or-automated)
        * A11y Evaluation Tools List  
            [https://www.w3.org/WAI/ER/tools/?q=wcag-21-w3c-web-content-accessibility-guidelines-21&q=command-line-tool](https://www.w3.org/WAI/ER/tools/?q=wcag-21-w3c-web-content-accessibility-guidelines-21&q=command-line-tool)
            [https://awesomeopensource.com/projects/accessibility](https://awesomeopensource.com/projects/accessibility)
        * Automated a11y testing tools  
            [https://github.com/storybookjs/storybook/tree/master/addons/a11y](https://github.com/storybookjs/storybook/tree/master/addons/a11y)  
            [https://www.tpgi.com/arc-platform/monitoring/](https://www.tpgi.com/arc-platform/monitoring/)  
            [https://medium.com/myplanet-musings/comparing-3-top-automated-accessibility-testing-tools-wave-tenon-io-and-google-lighthouse-d3897d7bb311](https://medium.com/myplanet-musings/comparing-3-top-automated-accessibility-testing-tools-wave-tenon-io-and-google-lighthouse-d3897d7bb311)  
            [https://docs.gitlab.com/ee/user/project/merge_requests/accessibility_testing.html](https://docs.gitlab.com/ee/user/project/merge_requests/accessibility_testing.html)  
            [https://www.deque.com/blog/build-vs-buy-automated-accessibility-tools/](https://www.deque.com/blog/build-vs-buy-automated-accessibility-tools/)  
            [https://saucelabs.com/blog/best-practices-for-shifting-accessibility-testing-left](https://saucelabs.com/blog/best-practices-for-shifting-accessibility-testing-left)  
            [https://www.adrianbolonio.com/en/testing-web-accessibility-part-2/](https://www.adrianbolonio.com/en/testing-web-accessibility-part-2/)  
        * Axe  
            [https://www.deque.com/axe/](https://www.deque.com/axe/)   
            [https://github.com/dequelabs/axe-core-npm/tree/develop/packages/cli](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/cli)     
            [https://github.com/dequelabs/axe-cli](https://github.com/dequelabs/axe-cli)       
            [https://github.com/microsoft/playwright/issues/1638](https://github.com/microsoft/playwright/issues/1638)       
            [https://www.deque.com/axe/devtools/](https://www.deque.com/axe/devtools/) 
        * Pa11y + Pa11y CI  
            [https://pa11y.org/](https://pa11y.org/)       
            [https://github.com/pa11y/pa11y#command-line-interface](https://github.com/pa11y/pa11y#command-line-interface)       
            [https://github.com/pa11y/pa11y-ci](https://github.com/pa11y/pa11y-ci)       
            [https://hackernoon.com/using-pa11y-ci-and-drone-as-accessibility-testing-gatekeepers-a8b5a3415227](https://hackernoon.com/using-pa11y-ci-and-drone-as-accessibility-testing-gatekeepers-a8b5a3415227)       
            [https://bitsofco.de/pa11y/](https://bitsofco.de/pa11y/)       
            [https://webdesign.tutsplus.com/tutorials/web-accessibility-testing-via-the-command-line-with-pa11y--cms-34538](https://webdesign.tutsplus.com/tutorials/web-accessibility-testing-via-the-command-line-with-pa11y--cms-34538)       
            [https://www.zodiacmedia.co.uk/blog/how-to-meet-accessibility-regulations](https://www.zodiacmedia.co.uk/blog/how-to-meet-accessibility-regulations)       
            [https://www.a11ywithlindsey.com/blog/exploring-accessibility-cli-tools](https://www.a11ywithlindsey.com/blog/exploring-accessibility-cli-tools)       
            [https://cruft.io/posts/automated-accessibility-testing-node-travis-ci-pa11y/](https://cruft.io/posts/automated-accessibility-testing-node-travis-ci-pa11y/)       
            [http://hollsk.co.uk/posts/view/using-actions-in-pa11y](http://hollsk.co.uk/posts/view/using-actions-in-pa11y)       
            [https://24ways.org/2017/automating-your-accessibility-tests](https://24ways.org/2017/automating-your-accessibility-tests)       
            [https://medium.com/@f3igao/how-to-automate-web-accessibility-testing-921512bdd4bf](https://medium.com/@f3igao/how-to-automate-web-accessibility-testing-921512bdd4bf)       
            [https://scotch.io/@Godwin%20Ekuma/-2](https://scotch.io/@Godwin%20Ekuma/-2)       
            [https://benmatselby.dev/post/pa11y-accessibility-ci/](https://benmatselby.dev/post/pa11y-accessibility-ci/)       
            [https://support.acquia.com/hc/en-us/articles/360044761014-Automated-Accessibility-Testing-Using-Pa11y-BLT-and-Continuous-Integration](https://support.acquia.com/hc/en-us/articles/360044761014-Automated-Accessibility-Testing-Using-Pa11y-BLT-and-Continuous-Integration)       
            [https://andrewmee.com/posts/automated-accessibility-testing-node-travis-ci-pa11y/](https://andrewmee.com/posts/automated-accessibility-testing-node-travis-ci-pa11y/)       
            [https://github.com/flexion/ef-cms/pull/4362](https://github.com/flexion/ef-cms/pull/4362)       
            [https://github.com/pa11y/pa11y-ci/issues/61#issuecomment-499374714](https://github.com/pa11y/pa11y-ci/issues/61#issuecomment-499374714)
