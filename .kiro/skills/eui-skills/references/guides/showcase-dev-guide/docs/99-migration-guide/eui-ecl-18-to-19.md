# Migration from eUI ECL 18.x to 19.x

Please read general sections of eui 18 to 19 migration guide to learn about Angular and Node requirements for this release

## Starting the migration of your project

We recommend generating new application with <code>eui-cli</code> and them moving your code to the new application structure. Please check "Getting started" section for instructions how to use <code>eui-cli</code> to generate an eUI-ecl application ("Getting started" -> "Generate an eUI app" -> "Types and options").

## Infos

### Components as sub-entries

As of 19.x, it is possible components to be imported as sub-entries. In 'OPTIONS & SAMPLES' of each component you will find how to import it. Of course if you want, you can still import <code>EclAllModules</code>, which includes all the components.


## Deprecations

<code>EclLanguage</code> model, <code>EclLanguageServie</code> and <code>EclDefaultLanguageService</code> have been deprecated and will be removed in v20. Please use <code>EuiLanguage</code> model and <code>EuiLanguages</code> model from @eui/base, and <code>i18nService</code> from @eui/core.

## Breaking changes


- **ecl-accordion**
    - **onClickOutsideAccordion() method** was removed. Not needed anymore, because accordion doesn't need to close item when another item is opened (changed by ECL).
    - **ecl-accordion-item** - **isActive** property and **removeActiveStatus()** method are removed, not needed anymore.

- **ecl-banner**
    - Removed **@Input() variant: 'text-box' | 'text-overlay' | 'plain-background'** - not used anymore (changed by ECL). New properties were introduced in v18, to help user modify the look of the banner (see showcase example).
    - Removed **@Input isCentered** - not used anymore, **horizontalAlignment="center"** can be used instead.

- **ecl-featured**
    - Removed **@Input() isHighlighted** use **@Input() variant: 'highlight' | 'simple'** instead.

- **ecl-form-label**
    - Removed **@Input isInvalid** and **@Input isDisabled**.

- **ecl-gallery**
    - Removed **@Input() galleryPlayerTitle** and **@Input() videoAriaLabel** -> they are constructed by the component, using **@Input() title**. **@Input() videoLabel** is removed - not used anymore. **@Input column** renamed to **columns**.
    - **ecl-gallery-item** - **@Input() label** is removed, use **@Input() title** instead. Removed **videoLabel** property - not used anymore.

- **ecl-menu**
    - Removed **@Input() group**, not used anymore (by ECL).
    - **ecl-menu-item** - **isFocused** is removed, not used anymore.

- **ecl-navigation-list**
    - Removed **eclNavigationListImage** component, not used anymore. You can use **picture[eclNavigationListPicture]** and **img[eclNavigationListImage]** directives instead.

- **ecl-page-header**
    - Removed **@Input() variantForImage** and (by ECL). **isOverlayPossible** was removed, the relevant functionality was removed by ECL.

- **ecl-site-header**
    - **ecl-site-header-language** - **@Input() languageCode** and **@Input() languageCodes** were removed. The reason for this, was to align with eUI and to have one main source of configuration. Please check <a href="https://eui.ecdevops.eu/eui-showcase-ux-components-19.x/showcase-dev-guide/docs/03-app-dev/03-crud-creation/04-customizations/02-i18n-config" target="_blank">here</a> how to configure languages and default language.
    

- **ecl-timeline-item**
    - Removed **@Input() toggleButtonLabel**. Please use **@Input() expandLabel** and **@Input() collapseLabel** instead.
