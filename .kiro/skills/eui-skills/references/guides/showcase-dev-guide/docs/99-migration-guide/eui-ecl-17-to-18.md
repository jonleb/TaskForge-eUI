# Migration from eUI ECL 17.x to 18.x

Please read general sections of eui 17.x to 18.x migration guide to learn about Angular and Node requirements for this
release.

## Starting the migration of your project

We recommend generating new application with `eui-cli` and then moving your code to the new application structure.
Please check "Getting started" and "Generate an app" sections for instructions how to use `eui-cli` to generate an
eUI-ecl application ("Generate an app" -> "eUI ECL Angular skeleton").

## Warnings

When using images please be informed, that the `picture` tag has been introduced. The legacy code has been removed.

### ecl-banner

**Breaking changes:**

- The `@Input() image` has been removed, the directives `eclBannerPicture` with `eclBannerImage` should be used instead.

**Example before:**

```html

<ecl-banner variant="text-box" image="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg">
    ...    
```

**Example current:**

```html

<ecl-banner variant="text-box">
    <picture eclBannerPicture>
        <img eclBannerImage src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg"/>
        ...
```

**Changes:**

- Three variants are available for the ecl-banner component:  `text-box`, `text-overlay` and `plain-background`. The
  variants `image-overlay` and `text-highlight` have been removed.
- The text in the banners is now left aligned by default. The `@Input() isCentered` can be used if text should be
  centred.
- The markup has changed, regarding the 'Copyright or credit' text, a new `@Input() copyright` has been introduced.

**Example before:**

```html

<ecl-banner variant="text-box">
    <picture eclBannerPicture>
        <img eclBannerImage
             src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg"
             alt="alternative text"/>
        ...
```

**Example current:**

```html

<ecl-banner variant="text-box" copyright="Copyright or credit">
    <picture eclBannerPicture>
        <img eclBannerImage src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image8.jpg"
             alt="alternative text"/>
        ...
```

### ecl-blockquote

**Breaking changes:**

- The `eclBlockquoteImage` directive has been changed, the directives `eclBlockquotePicture` with `eclBlockquoteImage`
  should be used
  instead.

**Example before:**

```html

<figure eclBlockquote author="President Juncker">
    An interconnected grid will help deliver the ultimate goal of the Energy Union, to
    ensure affordable, secure and sustainable energy, and also growth across the EU.
    <img eclBlockquoteImage
         src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image-square.jpg"/>
</figure>
```

**Example current:**

```html

<figure eclBlockquote author="Someone">
    <picture eclBlockquotePicture>
        <img eclBlockquoteImage
             src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image-square.jpg"
             alt="Image alternative text"/>
    </picture>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
    sodales, nisl tincidunt hendrerit elementum, purus risus tempus dui, sit amet cursus massa odio non lacus.
</figure>
```

### ecl-breadcrumb

**Breaking changes:**

- EC and EU variants of this component have been aligned, by removing `@Input() isNegative`.

### ecl-button

**Breaking changes:**

- The `@Input() variant` 'call' has been removed, `@Input() variant` 'cta' should be used instead.

**Changes:**

- Two new variants, 'ghost-inverted' and 'tertiary', are available for the `@Input() variant`.
- The `@Input() isIconOnly` can be used if text should be hidden. Please be aware that the label should still be
  included for accessibility reasons, although it will not be displayed.

### ecl-card

**Breaking changes:**

- Directive `div[eclCardImage]` has been removed, the directives `eclCardPicture` with `img[eclCardImage]` should be
  used instead.

**Example before:**

```html

<ecl-card>
    <div eclCardImage imageUrl="./assets/images/landing-page/guidelines.jpg"></div>
    ...
```

**Example current:**

```html

<ecl-card>
    <picture eclCardPicture aria-label="card image">
        <img eclCardImage src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg" alt="card image"/>
        ...
```

### ecl-content-item

**Breaking changes:**

- The `@Input() variant` 'image-right' has been removed. The `@Input() position` 'right' should be used instead.
- The `@Input() variant` 'event' has been removed. Additional `@Input()` for specifying variant related to the
  positioning
  is not required.

**Changes:**

- New value 'top' is available for the `@Input() position` in the `eclContentItemPicture` directive.

### ecl-date-block

**Breaking changes:**

- The ` @Input() variant` 'cancelled' and 'rescheduled' have been removed. The variants 'ongoing' or 'past' should be
  used instead.

### ecl-expandable

**Changes:**

- The variant for the button has been changed, it uses 'ghost' instead of 'secondary'.

### ecl-fact-figures

**Changes:**

- The size of the icon has been changed from `m` to `l`.

### ecl-featured-item

**Breaking changes:**

- This component is using the 'ecl-media-container' component, which was introduced with a breaking change. Check '
  ecl-media-container'
  description.

**Changes:**

- The `@Input() isExtended` has been renamed to `isHighlighted`.
- New component `eclFeaturedITemFooter` with new directives `eclFeaturedItemFooterPicture`
  and `eclFeaturedItemFooterLink` have been added,
  to handle a new section below the featured item.

### ecl-feedback-message

**Changes:**

- The semantics for `ecl-feedback-message` have been changed, `div eclFeedbackMessage` should be used instead
  of `span eclFeedbackMessage`.

### ecl-file

**Breaking changes:**

Several breaking changes have been implemented for ecl-file. These changes primarily involve the manual addition of
download links by users.
Additionally, adjustments have been made to align with updates from ECL 4.x, including the addition of IDs and
aria-labelledby attributes to enhance accessibility.

**Regarding the ecl-file:**

- The title and download link must be provided by the user.
- The `@Input(): eclTitle, hasCustomDownload, label, thumbnailUrl, href, downloadFileName, ariaLabel` have been removed.
- The `@Input() meta` has been modified. It is defined as a string, not a string array.
- New directive `eclFileDownload` has been introduced.
- The `Output itemDownload` has been removed.

**Example before:**

```html

<ecl-file thumbnailUrl="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg"
          eclTitle="State of the Union 2018 brochure"
          description="Description."
          language="English"
          labelInfo="highlighted"
          [detailMeta]="['RESOURCE TYPE', 'Publication date']"
          meta="(16.2 MB - PDF)"
          href="./assets/images/landing-page/portfolio/thumbnails/1.jpg"
          (itemDownload)="onItemDownload($event)"
          aria-label="Download file 'State of the Union 2018 brochure'">
```

**Example current:**

```html

<ecl-file id="ecl-file-th" langId="ecl-file-th-lang"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis lorem tellus. Nullam sollicitudin suscipit diam, ac blandit ipsum tempor consectetur. Duis vitae pulvinar turpis. Donec maximus pharetra ex a ultricies."
          language="English" labelInfo="highlighted" [detailMeta]="['META INFO', 'DD Month YYYY']"
          meta="(16.2 MB - PDF)">
    <div eclFileTitle id="ecl-file-th-title">State of the Union 2018 brochure</div>
    <picture eclFilePicture><img eclFileImage src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg"
                                 alt="thumbnail"/></picture>
    <a eclLink variant="standalone" href="./assets/images/landing-page/portfolio/thumbnails/1.jpg" eclFileDownload
       (click)="onItemDownload($event)" download="1.jpg"
       aria-labelledby="ecl-file-th-link-label ecl-file-th-title ecl-file-th-lang">
        <span eclLinkLabel id="ecl-file-th-link-label">Download</span>
        <ecl-icon icon="download" size="fluid"></ecl-icon>
    </a>
```

**Regarding the ecl-file-item:**

- The `@Input() hasCustomDownload, language, description, href, downloadFileName, ariaLabel` have been removed.
- The `@Output() itemDownload` has been removed.
- The `@Input() meta` has been modified, changing it from the string array to the string.
- New directive `eclFileTranslationDownload` has been introduced.

**Example before:**

```html

<ecl-file-item eclTitle="български" langDetail="bg" meta="(15.8 MB - PDF)"
               aria-label="Download file in bulgarian" href="./assets/images/landing-page/portfolio/thumbnails/2.jpg">
</ecl-file-item>
```

**Example current:**

```html

<ecl-file-item eclTitle="français" lang="fr" titleId="ecl-file-tr-2-lang" meta="(15.8 MB - PDF)">
    <a eclLink variant="standalone" eclFileTranslationDownload
       href="./assets/images/landing-page/portfolio/thumbnails/4.jpg"
       (click)="onItemDownload($event)" download="4.jpg"
       aria-labelledby="ecl-file-link-label ...">
        <span eclLinkLabel id="ecl-file-link-label">Download</span>
        <ecl-icon icon="download" size="fluid"></ecl-icon>
    </a></ecl-file-item>
```

### ecl-gallery

**Breaking changes:**

- Methods `canBeDownloaded` and `onDownload` have been removed, `canBeOpenInFullScreen` and `onFullScreenOpen` should be
  used instead.
- `@Input() isDownloadable` has been removed. `@Input() isOpenInFullScreenPossible` should be used instead.
- `@Output() download` has been removed. `@Output() openFullScreen` should be used instead.
- The `eclGalleryMedia` directive has been changed. For elements that are images, directive `eclBlockquotePicture`
  should be used with directive `eclBlockquoteImage`.

**Example before:**

```html

<ecl-gallery-item src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg"
                  label="label1"
                  meta="Copyright, Author, Licence for image 1"
                  description="The EU in brief, institutions and bodies, countries, symbols, history, facts and figures">
    <img eclGalleryMedia
         src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg"
         alt="Image 1"/>
</ecl-gallery-item>
```

**Example current:**

```html

<ecl-gallery-item src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg"
                  label="label1"
                  meta="Copyright, Author, Licence for image 1"
                  description="The EU in brief, institutions and bodies, countries, symbols, history, facts and figures">
    <picture eclGalleryPicture>
        <img eclGalleryImage
             src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg"
             alt="Image 1"/>
    </picture>
</ecl-gallery-item>
```

### ecl-icon

**Breaking changes:**

- The `@Input() isInverted` has been removed, `@Input() color` 'inverted' should be used instead.

**Example before:**

```html

<ecl-icon icon="audio" size="m" isInverted></ecl-icon>
```

**Example current:**

```html

<ecl-icon icon="audio" size="m" color="inverted"></ecl-icon>
```

### ecl-link

**Breaking changes:**

- The `@Input() isNegative` has been removed, `@Input() isInverted` should be used instead.

**Changes:**

- New `@Input() isIconOnly` has been added, for links with just an icon, without text. Please notice, that the label
  should still be
  included, for accessibility reasons, but it will not be displayed.

### ecl-list

**Breaking changes:**

- The `@Input variant` 'isNoBullet' for ordered/unordered list has been removed, variant 'isNoMarker' should be used
  instead.

**Changes:**

- For description list: `eclDescriptionListDefinition` directive has a new variant - `tag`, when presenting list
  of `tag components`. Markup has been updated to put links and taxonomies in dedicated `ul` lists:

**Example before:**

```html

<dt eclDescriptionListTerm>Label 05</dt>
<dd eclDescriptionListDefinition variant="inline">
    <a eclLink eclDescriptionListDefinitionItem routerLink="/">Standalone link</a>
    <a eclLink eclDescriptionListDefinitionItem routerLink="/">Standalone link</a>
</dd>
```

**Example current:**

```html

<dt eclDescriptionListTerm>Label 05</dt>
<dd eclDescriptionListDefinition variant="inline">
    <ul eclDescriptionListDefinitionList>
        <li eclDescriptionListDefinitionItem>
            <a eclLink variant="standalone" routerLink="/">Standalone link</a>
        </li>
        <li eclDescriptionListDefinitionItem>
            <a eclLink variant="standalone" routerLink="/">Standalone link</a>
        </li>
    </ul>
</dd>
```

### ecl-list-illustration

**Breaking changes:**

- The `div[eclListIllustrationImage]` has been removed. `eclListIllustrationPicture`
  with `img[eclListIllustrationImage]`
  should be used instead.

**Example before:**

```html

<ecl-list-illustration-item eclTitle="List with illustration item 1" eclValue="3.2 million">
    <div eclListIllustrationImage
         aria-label="alt text for image"
         imageUrl="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg">
    </div>
    Some description
</ecl-list-illustration-item>
```

**Example current:**

```html

<ecl-list-illustration-item eclTitle="List with illustration item 1" eclValue="3.2 million">
    <picture eclListIllustrationPicture>
        <img eclListIllustrationImage
             aria-label="alt text for image"
             src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg">
    </picture>
    Some description
</ecl-list-illustration-item>
```

### ecl-media-container

**Breaking changes:**

- The `img[eclMediaContainerItem]` has been removed. the directives `picture[eclMediaContainerPicture]`
  with `img[eclMediaContainerImage]` should be used instead.

**Example before:**

```html

<ecl-media-container>
    <img eclMediaContainerItem src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg" alt="EC Logo">
    ...
```

**Example current:**

```html

<ecl-media-container>
    <picture eclMediaContainerPicture>
        <img eclMediaContainerImage src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg"
             alt="EC Logo">
        ...
```

### ecl-menu

**Breaking changes:**

- The `@Input() isRtl` has been removed from the 'ecl-menu-mega' component. The RTL functionality is managed exclusively
  by the language change.

### ecl-message

**Breaking changes:**

- The name `ecl-message` of the component has been changed. `ecl-notification` should be used instead. The previous name
  of the component is no longer available.
- Directive `eclMessageTitle` has been removed, `eclNotificationTitle` directive should be used instead.

**Example before:**

```html

<ecl-message variant="info" [isCloseable]="true">
    <div eclMessageTitle>Information message</div>
    ...
```

**Example current:**

```html

<ecl-notification variant="info" [isCloseable]="true">
    <div eclNotificationTitle>Information notification</div>
    ...
```

### ecl-multiselect

- New `@Input() toggleLabel` for `eclMultiselect` directive has been introduced. It should be used to change the hidden
  label for the button.

### ecl-navigation-list

**Breaking changes:**

- Directive `div[eclNavigationListImage]` has been removed, the directives `eclNavigationListPicture`
  with `img[eclNavigationListImage]` should be used instead.

**Example before:**

```html

<ecl-navigation-list-item>
    <div eclNavigationListImage imageUrl="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg"></div>
    ...
```

**Example current:**

```html

<ecl-navigation-list-item>
    <picture eclNavigationListPicture>
        <img eclNavigationListImage
             src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg"
             alt="Alt text for the image"></picture>
    ...
```

**Changes:**

- New `@Input() hasBorders` for `ecl-navigation-list` has been introduced, by default it is 'true'.
- New `@Input() variant` for`ecl-navigation-list-item` has been introduced, can have empty or `illustration` value, by
  default it is ''.

### ecl-page-header

**Breaking changes:**

- The `@Input() isNegative` has been removed.
- The `@Input() backgroundImage` has been removed, the directives `eclPageHeaderBackgroundPicture`
  with `eclPageHeaderBackgroundImage` should be used instead.

**Example before:**

```html

<ecl-page-header backgroundImage="https://inno-ecl.s3.amazonaws.com/media/examples/example-image2.jpg">
    ...
```

**Example current:**

```html

<ecl-page-header>
    <picture eclPageHeaderBackgroundPicture>
        <img eclPageHeaderBackgroundImage
             src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image2.jpg"
             alt="Europe map"/>
    </picture>
    ...
```

- The semantics for `eclPageHeaderDescriptionThumbnail` directive have been changed, For elements that are images,
  directive `eclPageHeaderDescriptionPicture` should be used with directive `eclPageHeaderDescriptionImage`.

**Example before:**

```html

<div eclPageHeaderDescriptionContainer>
    <img eclPageHeaderDescriptionThumbnail
         src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image2.jpg"
         alt="Europe map">
    ...
```

**Example current:**

```html

<div eclPageHeaderDescriptionContainer>
    <picture eclPageHeaderDescriptionPicture>
        <img eclPageHeaderDescriptionImage
             src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image2.jpg"
             alt="Europe map">
    </picture>
    ...
```

**Changes:**

- New `@Input() isTitleVisible` for `eclPageHeaderTitle` directive has been introduced, by default it is 'true'.
- New `@Input() variantForImage` 'dark' and 'light' have been introduced. It should be used to add overlay for the
  background image.
- New `eclPageHeaderInfo` directive has been introduced. It should be used for adding page header info styling.

### ecl-pagination

**Changes:**

- New `@Input() isTruncated` has been introduced. It should be used to insert a placeholder for omitted items.
- New `@Input() pagesCount` has been introduced.

### ecl-popover

**Breaking changes:**

- Directives `eclPopoverList, eclPopoverItem, eclPopoverLink` have been removed. No additional styling when using lists is required.

### ecl-site-footer

**Changes:**

- The text color for the links have been changed. If you want to change the text color of links to white for the EC theme, should be used `@Input() isInverted`.

### ecl-site-header

**Changes:**

- New directives `eclSiteHeaderLink, eclSiteHeaderPicture, eclSiteHeaderImage` have been added. These directives should
  be used when the user
  wants to have another logo, different from the EU/EC logo. When the EU/EC logo is used, there is no change in the
  markup.

### ecl-social-media-follow

**Breaking changes:**

- Icon `share` and its variants has been removed from the social-media icons. It has been replaced by a new
  icon `chain`.

**Changes:**

- The link "Other social media networks" is no longer a popover. This is now a standard link, leading to a dedicated
  page, and added after the other links.

### ecl-social-media-share

**Deprecated:**

- The Social Media Share component is no longer supported by ECL and the Webtools Social bookmarking and networking
  widget should be used instead.

### ecl-spinner

**Breaking changes:**

- The name `ecl-spinner` of the component has been changed. `ecl-loading-indicator` should be used instead. The
  previous name of the component is no longer available.
- Variant`negative` has been removed, variant `inverted` should be used instead.
- Sizes`small`, `medium` and `large` has been replaced by `s`, `m` and `l`.
- Directive `eclSpinnerLabel` has been removed, `eclLoadingIndicatorLabel` should be used instead.
  `{{ 'ecl.spinner.LOADING' | translate }}` has been removed, `{{ 'ecl.loading-indicator.LOADING' | translate }}` should
  be used instead.

**Example before:**

```html

<div class="ecl-u-bg-blue" style="position:relative;height:200px">
    <ecl-spinner variant="negative">
        <div eclSpinnerLabel>
            {{ 'ecl.spinner.LOADING' | translate }}
            ...
```

**Example current:**

```html

<div class="ecl-u-bg-dark" style="position:relative;height:200px">
    <ecl-loading-indicator variant="inverted">
        <div eclLoadingIndicatorLabel>
            {{ 'ecl.loading-indicator.LOADING' | translate }}
            ...
```

- New`eclLoadingIndicatorOverlay` directive has been introduced. Please see the following example.

**Example current:**

```html

<div style="position:relative;height:200px">
    <div eclLoadingIndicatorOverlay></div>
    <ecl-loading-indicator>
        <div eclLoadingIndicatorLabel>
            {{ 'ecl.loading-indicator.LOADING' | translate }}
            ...
```

### ecl-table

**Changes:**

- New `Input sortButtonAriaLabel` for directive `eclTableHeader` has been introduced. It will set the 'aria-label'
  attribute for the sort button, which is required for the accessibility.

### ecl-tag

**Breaking changes:**

- The `@Input() variant` 'display' have been removed. This variant is no longer supported. 

**Changes:**

- New `@Input() isWrapped` has been introduced. It specifies whether to wrap long lines of text.

### ecl-timeline

**Breaking changes:**

- The `@Input() label` and `@Input eclTitle` have been removed, the directives `eclTimelineItemLabel`
  and `eclTimelineItemTitle` should be used instead.

**Changes:**

- The `@Input() toggleButtonLabel` in EclTimelineItemComponent is deprecated, `@Input() expandLabel` and `collapseLabel`
  should be used instead.
