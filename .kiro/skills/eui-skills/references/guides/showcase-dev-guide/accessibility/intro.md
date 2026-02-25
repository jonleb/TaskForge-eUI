# showcase dev guide   accessibility   intro

```html
<eui-page>
    <eui-page-header label="Accessibility (a11y)" subLabel="Overview"></eui-page-header>

    <eui-page-content>
        <div class="row">
            <div class="col">
                <p><strong>Accessibility</strong> abbreviated to "a11y", is the practice of making websites usable by as many people as possible. According to the European Disability Forum(<a href="http://www.edf-feph.org/">EDF</a>) there are more than 100 million persons in Europe with disabilities, which corresponds to a ration of 1 in 5 citizens. But accessibility is not referring only to people with disabilities, the practice of making sites accessible also benefits other groups such as those using mobile devices, or those with slow network connections.</p>
                <p>According to the UN Convention on the Rights of Persons with Disabilities, which has been signed by the European Union, persons with disabilities include those who have ‘long-term physical, mental, intellectual or sensory impairments which in interaction with various barriers may hinder their full and effective participation in society on an equal basis with others’.
                    Users can experience problems when using the web because of different kinds of disabilities, functional limitations, environmental factors or technology-related issues, such as:</p>
                    <ul>
                        <li>motor impairment: experiencing difficulty using the mouse pointer or using touch input devices, experiencing excessive multi-directional scrolling or excessive multi-level navigational expansion</li>
                        <li>visual impairment: experiencing colour blindness, a degree of loss of vision, blindness</li>
                        <li>cognitive impairment: experiencing dyslexia, ADHD, or challenges in understanding content due to cultural differences, such as unfamiliarity with idioms, metaphors, or culturally specific references</li>
                        <li>auditory or physical disabilities</li>
                        <li>low computer literacy</li>
                        <li>technology-related limitations or incompatibilities: browsers, platforms, devices, mobile web</li>
                        <li>environmental factors: place, lighting, noise, slow internet connection</li>
                    </ul>
                <p>Creating content in line with the latest accessibility standards means that all users – regardless of the device or software they are using and the environment they are working in – can use the information, services and tools we provide. Our content should be compatible with current and future browsers, devices, software and assistive technologies, ensuring we do not exclude anyone who needs to access it.</p>
            </div>
        </div>

        <h4 class="section-title">Web Content Accessibility Guidelines (WCAG)</h4>
            <div class="row">
                <div class="col">
                    <p> <strong>WCAG</strong> is developed through the <a href="https://www.w3.org/WAI/standards-guidelines/w3c-process/">W3C process</a> in cooperation with individuals and organizations around the world, with a goal of providing a single shared standard for web content accessibility that meets the needs of individuals, organizations, and governments internationally.</p>

                    <p>Every standard includes all the requirements of the previous standards and comprises of 3 conformance levels:</p>
                        <ul>
                            <li>For <em>Level A</em> conformance (the minimum level of conformance), the Web page satisfies all the Level A Success Criteria, or a conforming alternate version is provided.</li>
                            <li>For <em>Level AA</em> conformance, the Web page satisfies all the Level A and Level AA Success Criteria, or a Level AA conforming alternate version is provided.</li>
                            <li>For <em>Level AAA</em> conformance, the Web page satisfies all the Level A, Level AA and Level AAA Success Criteria, or a Level AAA conforming alternate version is provided.</li>
                        </ul>

                    <p><strong>WCAG 2.0, 2.1, 2.2</strong></p>
                        <ul>
                            <li>WCAG 2.0 was published on 11 December 2008 with 12 guidelines.</li>
                            <li>WCAG 2.1 was published on 5 June 2018 and adds 1 guideline and 17 success criteria.</li>
                            <li>WCAG 2.2 was published on 5 October 2023 and adds 9 success criteria.</li>
                        </ul>

                    <p>WCAG 2.0, 2.1, and 2.2 are designed to be “backwards compatible”, which means content that conforms to WCAG 2.2 also conforms to WCAG 2.1 and WCAG 2.0. If you want to meet the all versions, you can use the WCAG 2.2 resources and you don’t need to bother looking earlier versions.</p>.

                    <p><strong>What’s New in WCAG 2.1</strong></p>
                    <p>WCAG 2.1 provides 17 additional success criteria to address:</p>
                        <ul>
                            <li>mobile accessibility</li>
                            <li>people with low vision</li>
                            <li>people with cognitive and learning disabilities</li>
                        </ul>

                    <p><strong>What’s New in WCAG 2.2</strong></p>
                    <p>The 2.0 and 2.1 success criteria are essentially the same in 2.2, with one exception: 4.1.1 Parsing is obsolete and removed from WCAG 2.2. More information is in <a href="https://www.w3.org/WAI/standards-guidelines/wcag/faq/#parsing411">WCAG 2 FAQ, 4.1.1 Parsing</a>. WCAG 2.2 includes Notes about different languages; more information is in <a href="https://www.w3.org/WAI/standards-guidelines/wcag/faq/#i18n22">WCAG 2 FAQ, internationalization</a>.</p>
                    <p>WCAG 2.2 provides 9 additional success criteria</p>
                    <ul>
                        <li>2.4.11 Focus Not Obscured (Minimum) (AA)</li>
                        <li>2.4.12 Focus Not Obscured (Enhanced) (AAA)</li>
                        <li>2.4.13 Focus Appearance (AAA)</li>
                        <li>2.5.7 Dragging Movements (AA)</li>
                        <li>2.5.8 Target Size (Minimum) (AA)</li>
                        <li>3.2.6 Consistent Help (A)</li>
                        <li>3.3.7 Redundant Entry (A)</li>
                        <li>3.3.8 Accessible Authentication (Minimum) (AA)</li>
                        <li>3.3.9 Accessible Authentication (Enhanced) (AAA)</li>
                    </ul>
                    You can find more details on the newly added success criteria <a href="https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/">here</a>.
                </div>
            </div>

        <h4 class="section-title">The EU Web Accessibility Directive (WAD)</h4>
        <div class="row">
            <div class="col">
                <p>In 2016 the <strong>Directive (EU) 2016/2102</strong> of the European Parliament and of the Council of 26 October 2016 on the accessibility of the websites and mobile applications of public sector bodies was released and came into full effect in June 2021.</p>
                <p>The <a href="https://digital-strategy.ec.europa.eu/en/policies/web-accessibility-directive-standards-and-harmonisation">EU Web Accessibility Directive</a> sets out rules on making public sector websites and mobile apps accessible to everyone, including people with disabilities.
                    The directive specifies <strong><a href="https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf">EN 301 549</a></strong> as the recommended standard.</p>
                <p>Standards can take a long time to be developed, as they require agreement from many different parties. As far as the WAD is concerned, only once a modified standard is harmonised through a reference in the Official Journal, does it have legal significance. So new versions of the WCAG or of EN 301 549 do not automatically change the legal obligations of the Member States with respect to the WAD. In order for changes to have an effect on the WAD, first, the standard has to be updated, and then it needs to be referenced in the Official Journal. 
                    The last change happened in August 2021. In this case EN 301 549 v2.1.2, which was referenced in the Official Journal in 2018, was replaced by v3.2.1. You can find more about the latests changes regarding the accessibility standard <a href="https://digital-strategy.ec.europa.eu/en/policies/latest-changes-accessibility-standard">here</a>.</p>
                <p>Member States have to regularly inform the European Commission about the implementation of the Web Accessibility Directive and every three years, they must publish a report on the outcome of the monitoring and on the enforcement activities. The first such official reports are linked <a href="https://digital-strategy.ec.europa.eu/en/library/web-accessibility-directive-monitoring-reports">here</a>.</p>
                <p>Although the Directive does not directly apply to EU institutions, the institutions are really commited to a11y and that's why a Web Accessibility Action Plan 2022-2025 was adopted in January 2023 and this applies to the EU institutions and their web presence. The aim is to ensure compliance of the institutions' docs, websites and all the material of the Europa domain with the applicable a11y standards. You can find more on the Web accessibility action plan <a href="https://www.eud.eu/web-accessibility-action-plan%EF%BF%BC/">here</a>.</p>
                <p> You can find more on all the EU actions concerning digital inclusion and a11y <a routerLink="/showcase-dev-guide/docs/02-accessibility/03-ec-actions-fostering-a11y">here</a>.

            </div>
        </div>

        <h4 class="section-title">Accessibility features</h4>

           <p>A website developed with accessibility in mind might have the following features :</p>

            <div class="row">
                <div class="col">
                    <table class="ux-table ux-table--compact ux-table--shadowed">
                        <thead>
                            <tr>
                                <th style="width: 25%">Features</th>
                                <th>Description</th>
                                <th>Implementation</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Accessibility support</td>
                                <td>Make sure all applications are accessible</td>
                                <td>eUI provides overall accessibility for mainly all its library's components</td>
                            </tr>
                            <tr>
                                <td>Support the motor-impaired</td>
                                <td>Provide keyboard-only support for the motor impaired</td>
                                <td>Globally, all eUI components and designed user interfaces using them can be driven by keyboard</td>
                            </tr>
                            <tr>
                                <td>Support the visually impaired</td>
                                <td>Foresee an option to have high-contrast, colour-independent, large/readable fonts, and ideally also a dyslexia-tolerant font.</td>
                                <td>eUI provides theming capabities which allows to apply various color palettes to match user preferences. Read more about <a routerLink="/showcase-design-system/theming">Theming</a></td>
                            </tr>
                            <tr>
                                <td>Support the blind</td>
                                <td>Annotate your content with descriptive labels and meaning for non-textual/graphical content.</td>
                                <td>Text-to-speech capabilities plus providing a meaningful label whenever there is no text related content is now part of all eui-prefixed components  in order to announce them properly to the screen reader users. </td>
                            </tr>
                            <tr>
                                <td>Support touch input</td>
                                <td>Make sure any control on screen has a minimum size of at least 48x48px and sufficient margins.</td>
                                <td>eUI theming combined with responsive design layout also provides accessibility on mobile devices</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        <h4 class="section-title">Do's & Don'ts</h4>
            <div class="row">
                <div class="col-md-6">
                    <eui-card euiSuccess>
                        <eui-card-header iconClass="eui-icon eui-icon-thumb-up eui-u-c-success">
                            <eui-card-header-title>DO's</eui-card-header-title>
                        </eui-card-header>
                        <eui-card-content>
                            <ul>
                                <li>Check the <a href="https://www.w3.org/TR/wai-aria-1.0/states_and_properties">WAI-ARIA states & properties</a> for matching component states.</li>
                                <li>Identify the main focus HTML element that will control the (entire) component. This HTML element will focus using the tabindex attribute.</li>
                                <li>Support minimum accessibility is not only necessary, it has become mandatory for all EC websites and applications.</li>
                                <li>Allow navigation and control using a keyboard will greatly improve accessibility and comfort.</li>
                                <li>If the component has child components that can be activated or focused upon individually, detect the arrow keys and allow the focus or active child to be controlled by arrow keys. Use the keyboard combination ALT + arrow key to cycle through the child components..</li>
                                <li>Add descriptive labels and meaning to allow screen readers to more clearly describe content and meaning to the visually impaired.</li>
                                <li>If the content of the main focus HTML element does not contain the label, then set the aria-label attribute. If the content contains text that is not relevant to the label, use the role="presentation"attribute to let the screen reader ignore the text.</li>
                                <li>Provide content touch-enabled for mobile devices by increasing elements spacings.</li>
                                <li>Check high-contrast for text on background, focus outline, content separators.</li>
                                <li>If applicable, check the text content for ambiguity, cultural bias, overly complex or lengthy sentences, spelling & grammar mistakes, assumed esotericism or jargon.</li>
                            </ul>
                        </eui-card-content>
                    </eui-card>
                </div>
                <div class="col-md-6">
                    <eui-card euiDanger>
                        <eui-card-header iconClass="eui-icon eui-icon-thumb-down eui-u-c-danger">
                            <eui-card-header-title>DON'Ts</eui-card-header-title>
                        </eui-card-header>
                        <eui-card-content>
                            <ul>
                                <li>Reading content with insufficient contrast, size, and proportions, can be very hard for the visually impaired, or for people with cognitive disabilities.</li>
                                <li>Never set or override the outline class to none.</li>
                                <li>Do not use elements which are disabled.</li>
                            </ul>
                        </eui-card-content>
                    </eui-card>
                </div>
            </div>

        <h4 class="section-title">References</h4>
            <div class="row">
                <div class="col">
                    <ul>
                        <li><a class="eui-u-text-link-external" href="https://eur-lex.europa.eu/eli/dir/2016/2102/oj" target="_blank">The Web Accessibility Directive (Directive (EU) 2016/2102)</a></li>
                        <li> <a class="eui-u-text-link-external" href="https://commission.europa.eu/accessibility-statement_en" target="_blank">Europa Web Guide-Accessibility statement</a></li>
                        <li><a class="eui-u-text-link-external" href="https://www.w3.org/WAI/ARIA/apg/" target="_blank">ARIA Authoring Practices Guide (APG)</a></li>
                        <li><a class="eui-u-text-link-external" href="https://www.w3.org/WAI/standards-guidelines/w3c-process/" target="_blank">W3C process</a></li>
                        <li><a class="eui-u-text-link-external" href="https://a11yproject.com/patterns/" target="_blank">"The A11Y project's patterns</a></li>
                        <li><a class="eui-u-text-link-external" href="https://developer.mozilla.org/en-US/docs/Learn/Accessibility/What_is_accessibility" target="_blank">What is accessibility</a></li>
                        <li><a class="eui-u-text-link-external" href="http://www.edf-feph.org/" target="_blank">European Disability Forum</a></li>
                        <li><a class="eui-u-text-link-external" href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank">WCAG Overview</a></li>
                        <li><a class="eui-u-text-link-external" href="https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22//" target="_blank">WCAG 2.2</a></li>
                        <li><a class="eui-u-text-link-external" href="https://www.w3.org/TR/wai-aria-1.0/states_and_properties" target="_blank">WAI-aria-states and properties </a></li>
                        <li><a class="eui-u-text-link-external" href="https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf" target="_blank">EN 301 549 standard</a></li>
                        <li> <a href="https://www.w3schools.com/colors/colors_names.asp" target="_blank">W3C’s Html color names supported by all browsers</a></li>
                        <li> <a href="http://www.uxmatters.com/mt/archives/2007/01/applying-color-theory-to-digital-displays.php" target="_blank">UXmatters – Applying color theory to digital displays</a></li>
                        <li><a href="http://uxmovement.com/content/6-surprising-bad-practices-that-hurt-dyslexic-users/" target="_blank">UXmovement - Good practices for dyslexic users</a></li>
                        <li> <a href="http://colororacle.org/" target="_blank">Color Oracle</a></li>
                        <li> <a href="https://www.smashingmagazine.com/2016/06/improving-color-accessibility-for-color-blind-users/" target="_blank">Improving The Color Accessibility For Color-Blind Users</a></li>
                    </ul>
                </div>
            </div>
    </eui-page-content>
</eui-page>
```
