# Migration from eUI ECL 16.x to 17.x

Please read general sections of eui 16 to 17 migration guide to learn about Angular and Node requirements for this release

## Starting the migration of your project

We recommend generating new application with <code>eui-cli</code> and them moving your code to the new application structure. Please check "Getting started" section for instructions how to use <code>eui-cli</code> to generate an eUI-ecl application ("Getting started" -> "Generate an eUI app" -> "Types and options").

## Infos

### EC / EU Themes available

As of 16.x ECL themes are available, so EC and EU themes can be used according to application requirements.
When generating fresh app using **eui/cli** tool, user will be prompted which theme is desired. Based on that choice, it will generate fresh application with chosen theme and proper configuration / starting files.

## Warnings

For all the usages of images in the project, the <code>picture</code> tag is introduced. The old code will also work, but is deprecated and will be removed in eUI-ECL 18. All the upgrades and new features, regarding images will be available within the new markup. The old code will remain just for compatibility.

## Deprecations

### ecl-banner

The semantics for <code>ecl-banner</code> changed, when using image. New <code>eclBannerPicture</code> and <code>eclBannerImage</code> directives are introduced.
<code>@Input() image</code> is deprecated.

**Example before:**
```html
    <ecl-banner variant="text-box"
        image="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg">
        <div eclBannerTitle> ...
```
**Example current:**
```html
    <ecl-banner variant="text-box">
        <picture eclBannerPicture>
            <img eclBannerImage src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg" />
        </picture>
        <div eclBannerTitle> ...
```

### ecl-card

The semantics for <code>ecl-card</code> changed, new <code>eclCardPicture</code> directive is introduced.
Directive <code>div[eclCardImage]</code> is deprecated, use <code>eclCardPicture</code> with <code>img[eclCardImage]</code> instead.

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
            <img eclCardImage src="./assets/images/landing-page/guidelines.jpg" alt="card image" />
        </picture>
        ...
```


### ecl-file

The semantics for <code>ecl-file</code> changed, when using image. New <code>eclFilePicture</code> directive is introduced.
Property <code>thumbnailUrl</code> is deprecated.

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
    <ecl-file
        eclTitle="State of the Union 2018 brochure"
        description="Description."
        language="English"
        labelInfo="highlighted"
        [detailMeta]="['RESOURCE TYPE','Publication date']"
        meta="(16.2 MB - PDF)"
        href="./assets/images/landing-page/portfolio/thumbnails/1.jpg"
        (itemDownload)="onItemDownload($event)" aria-label="Download file 'State of the Union 2018 brochure'">
        <picture eclFilePicture><img eclFileImage
            src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg"
            alt="thumbnail" /></picture>
```

### ecl-list-illustration

The semantics for <code>ecl-list-illustration-item</code> changed, new <code>eclListIllustrationPicture</code> directive is introduced.
Directive <code>div[eclListIllustrationImage]</code> is deprecated. Use <code>eclListIllustrationPicture</code> with <code>img[eclListIllustrationImage]</code> instead.

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

### ecl-menu

<code>@Input() isRtl</code> in **ecl-menu-mega** is deprecated and will have no effect when used. The RTL functionality is managed only by language change.

### ecl-navigation-list

The semantics for <code>ecl-navigation-list-item</code> changed, new <code>eclNavigationListPicture</code> directive is introduced.
Directive <code>div[eclNavigationListImage]</code> is deprecated, use <code>eclNavigationListPicture</code> with <code>img[eclNavigationListImage]</code> instead.

**Example before:**
```html
    <ecl-navigation-list-item>
        <div eclNavigationListImage imageUrl="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg"></div>
        ...
```
**Example current:**
```html
    <ecl-navigation-list-item>
        <picture eclNavigationListPicture><img eclNavigationListImage
                 src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg"
                 alt="Alt text for the image"></picture>
                 ...
```

### ecl-page-header

1). The semantics for <code>ecl-page-header</code> changed, new <code>eclPageHeaderBackgroundPicture</code> and <code>eclPageHeaderBackgroundImage</code> directives are introduced. They will replace <code>backgroundImage</code> input, which is deprecated.

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
                alt="Europe map" />
        </picture>
        ...
```
2). The semantics for <code>eclPageHeaderDescriptionThumbnail</code> changed, new <code>eclPageHeaderDescriptionPicture</code> directive is introduced.

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

### ecl-timeline

Input <code>toggleButtonLabel</code> in EclTimelineItemComponent is deprecated, you can use <code>expandLabel</code> and <code>collapseLabel</code> instead.


## Changes

The markup for these components has changed (see also 'Deprecations' section). The old code is still working, but if you are now migrating your application, please use the new html below.

### ecl-blockquote

The semantics for <code>ecl-blockquote</code> changed, new <code>eclBlockquotePicture</code> directive is introduced.

**Example before:**
```html
    <figure eclBlockquote
            author="President Juncker">
        An interconnected grid will help deliver the ultimate goal of the Energy Union, to
        ensure affordable, secure and sustainable energy, and also growth across the EU.
        <img eclBlockquoteImage
             src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image-square.jpg" />
    </figure>
```

**Example current:**
```html
    <figure eclBlockquote
            author="President Juncker">
        An interconnected grid will help deliver the ultimate goal of the Energy Union, to
        ensure affordable, secure and sustainable energy, and also growth across the EU.
        <picture eclBlockquotePicture>
            <img eclBlockquoteImage
                 src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image-square.jpg" />
        </picture>
    </figure>
```

### ecl-gallery


By default, elements are shareable but if it should be disabled use the following:

Input:
isShareable="false"

**Example:**
```html
<ecl-gallery-item src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg"
                  label="label1"
                  meta="Copyright, Author, Licence for image 1"
                  description="The EU in brief, institutions and bodies, countries, symbols, history, facts and figures"
                  isShareable="false">
                ...
```

Download being replaced with open in full screen.

**Deprecated:**

Methods:
canBeDownloaded
onDownload


Input:
isDownloadable

Output:
download

**Use instead:**

Methods:
canBeOpenInFullScreen
onFullScreenOpen

Input:
isOpenInFullScreenPossible

Output:
openFullScreen


The semantics for <code>ecl-gallery-item</code> changed, new <code>eclGalleryPicture</code> directive is introduced.

**Example before:**
```html
    <ecl-gallery-item src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg"
        label="label1"
        meta="Copyright, Author, Licence for image 1"
        description="The EU in brief, institutions and bodies, countries, symbols, history, facts and figures">
        <img eclGalleryMedia
            src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg"
            alt="Image 1" />
    </ecl-gallery-item>
```

**Example current:**
```html
    <ecl-gallery-item src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg"
        label="label1"
        meta="Copyright, Author, Licence for image 1"
        description="The EU in brief, institutions and bodies, countries, symbols, history, facts and figures">
        <picture eclGalleryPicture>
            <img eclGalleryMedia
                 src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg"
                 alt="Image 1" />
        </picture>
    </ecl-gallery-item>
```

### ecl-media-container

The semantics for <code>ecl-media-container</code> changed, new <code>eclMediaContainerPicture</code> directive is introduced.

**Example before:**
```html
    <ecl-media-container>
            <img eclMediaContainerItem src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg" alt="EC Logo">
        The European Commission has put forward ambitious yet realistic
        proposals for a modern EU budget. It is time for an EU budget that reflects rapid developments in innovation, the
        economy, the environment and geopolitics, amongst others.
    </ecl-media-container>
```

**Example current:**
```html
    <ecl-media-container>
        <picture eclMediaContainerPicture>
            <img eclMediaContainerImage src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg" alt="EC Logo">
        </picture>
        The European Commission has put forward ambitious yet realistic
        proposals for a modern EU budget. It is time for an EU budget that reflects rapid developments in innovation, the
        economy, the environment and geopolitics, amongst others.
    </ecl-media-container>
```

## Breaking changes

Some components, that were deprecate in eUI-ECL 15.x will be removed in the 17.x version.

These are:

**ecl-app-core, ecl-app-harmonised, ecl-app-standardised** are removed, use <code>ecl-app</code> instead.

**ecl-breadcrumb-core, ecl-breadcrumb-harmonised, ecl-breadcrumb-standardised** are removed, use <code>ecl-breadcrumb</code> instead.

**ecl-page-header-core, ecl-page-header-harmonised, ecl-page-header-standardised** are removed, use <code>ecl-page-header</code> instead.

**ecl-site-header-core, ecl-site-header-harmonised, ecl-site-header-standardised** are removed, use <code>ecl-site-header</code> instead.

**ecl-site-footer-core, ecl-site-footer-harmonised, ecl-site-footer-standardised** are removed, use <code>ecl-site-footer</code> instead.

**ecl-hero-banner** and  **ecl-page-banner** are removed, use <code>ecl-banner</code> instead.

**ecl-language-list** is removed, it is not a standalone component anymore, but a part of the <code>ecl-site-header</code>.

**ecl-multiselect** - selector <code>option[eclSelectOption]</code> is removed, use <code>option[eclMultiselectOption]</code> instead.

**ecl-tabs** - <code>@Input() direction</code> is removed, it should not be used.
