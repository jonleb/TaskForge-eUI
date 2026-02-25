# Migration from eUI ECL 19.x to 21.x

Please read general sections of eui 19 to 21 migration guide to learn about Angular and Node requirements for this release.

## Starting the migration of your project

We recommend generating new application with <code>eui-cli</code> and them moving your code to the new application structure. Please check "Getting started" section for instructions how to use <code>eui-cli</code> to generate an eUI-ecl application ("Getting started" -> "Generate an eUI app" -> "Types and options").

### Components as sub-entries

<em>All components' modules have been removed, use import components array instead.</em>

<em>EclAllModules has been removed, use standalone imports of individual components instead (as shown in the examples in the showcase).</em>

## Deprecations

- **ecl-site-footer**
    - **ecl-site-footer** selector is deprecated, please use **footer[eclSiteFooter]** instead.


## Breaking changes

- **ecl-breadcrumb**
    - **ecl-breadcrumb-segment** selector is removed, use **li[eclBreadcrumbSegment]** instead.
    - the syntax of the component has changed:

**Example before:**

```html
<ecl-breadcrumb>
    <ecl-breadcrumb-segment>Home</ecl-breadcrumb-segment>
    <ecl-breadcrumb-segment>About the European Commission</ecl-breadcrumb-segment>
    <ecl-breadcrumb-segment isCurrentPage> News</ecl-breadcrumb-segment>
</ecl-breadcrumb>    
```

**Example current:**

```html
<ecl-breadcrumb>
    <ol eclBreadcrumbContainer>
        <li eclBreadcrumbSegment>Home</li>
        <li eclBreadcrumbSegment>About the European Commission</li>
        <li eclBreadcrumbSegment isCurrentPage>News</li>
    </ol>
</ecl-breadcrumb>
```
    

- **ecl-button**
    - **'cta', 'ghost', 'ghost-inverted'** variants are removed. You can use instead: **variant="primary" + eclStyle="highlight"** (cta), **variant="tertiary"** (ghost), **variant="tertiary" + eclStyle="inverted"** (ghost-inverted).

- **ecl-separator**
    - renamed to **eclDivider** (instead **eclSeparator**).

- **ecl-featured**
    - Variant **simple** is removed, only variant **highlight** remains.
    - **ecl-featured-item-footer** and the associated directives are removed. Not used anymore.

- **ecl-gallery**
    - Thumbnails should be always added by user, for example:
    ```html
    <picture eclGalleryThumbnail hasZoom>
        <img eclGalleryImage src="https://inno-ecl.s3.amazonaws.com/media/examples/example-external-video.jpg"
                alt="New digital strategy - Video" />
    </picture>
    ```
    - **hasGalleryThumbnail()** getter is removed.

- **ecl-inpage-navigation**
    - **ecl-inpage-navigation-item** selector is removed, use **li[eclInpageNavigationItem]** instead. Use **ul[eclInpageNavigationList]** as parent component for list items.

- **ecl-list-illustration**
    - **isSquare** is not set on the image itself (*eclListIllustrationImage*), but only on the parent component (*eclListIllustrationPicture*).

- **ecl-mega-menu**
    - **labelId** in <code>eclMegaMenuSubitem</code> is removed, not used.

- **ecl-modal**
    - **isScrollable** input on *eclModalBody* component is removed. Not used anymore (handled by the component).

- **ecl-pagination**
    - **ecl-pagination-item** is removed, use **li[eclPaginationItem]** instead.

- **ecl-popover**
    - **isHidden** property is now protected, public method **onClose()** is now protected and renamed to 'doClose()'.

- **ecl-search-form**
    - **search** output is renamed to **searchEvent**.

- **ecl-site-footer**
    - The selector for this component has changed, from **ecl-site-footer** to **footer[eclSiteFooter]**.
    - The input **isColumns** in *eclSiteFooterList* directive is removed.
    - **eclSiteFooterContent** directive is removed.
    - For *eclSiteFooterSection*: **isCondensed** input is removed, not used anymore; **isSiteInfo** input is removed, use **variant="site-info"** instead;
    - **isSplitList** input and **hasSeparator** input is removed.
    - Directives **eclSiteFooterLogoList**, **eclSiteFooterLogoItem** and **eclSiteFooterLogo** have been removed, not used anymore.

- **ecl-site-header**
    - **logoUrl** input is removed, not used anymore.
    - in **ecl-site-header-search** component, the output **search** is renamed to **searchEvent**.

- **ecl-social-media-share** component is removed. Use the component from webtools instead.

- **ecl-social-media-follow** - all the color variants have been removed.

- **ecl-tabs**
    - the **ecl-tabs** selector is removed, use **div[eclTabs]** instead.
    - the **ecl-tab** selector is removed, use **div[eclTab]** instead.
    - public method **onTabBlur(evt: KeyboardEvent)** is removed.
