# ecl-carousel

## Overview

Use the Carousel Component to let the user navigate through a collection of images in a sequential fashion, moving to the previous/next one through the arrows on the sides.
<br>
<more-info componentPartUrl="carousel/usage/"></more-info>

## API

API content

## Samples

### [Default](samples/ecl-carousel/Default)

```html
<ecl-carousel playInterval=2000 (slide)="onSlide($event)">
    @for (slide of slides; track slide.id) {
    <ecl-carousel-item [id]="slide.id" [isCurrent]="slide.isCurrent">
        <ecl-banner [boxBackground]="slide.boxBackground" [fontColor]="slide.fontColor" [copyright]="slide.footer" fontSize="s">
            @if (slide.image) {
            <picture eclBannerPicture>
                <img eclBannerImage src="{{slide.image}}" alt="alternative text" />
            </picture>
            }
            @if (slide.video) {
            <video eclBannerVideo playsinline autoplay muted loop poster="{{slide.videoPoster}}">
                <source src="{{slide.video}}" type="video/mp4">
            </video>
            }
            <div eclBannerTitle id="default-example-title">
                <span eclBannerTitleText>{{slide.title}}</span>
            </div>
            <p eclBannerDescription>
                <span eclBannerDescriptionText>{{slide.description}}</span>
            </p>
            <a eclLink routerLink="/" variant="primary" isHighlight aria-describedby="default-example-title">
                <span eclLinkLabel>Subscribe</span>
                <ecl-icon icon="corner-arrow" transform="rotate-90"></ecl-icon>
            </a>
        </ecl-banner>
    </ecl-carousel-item>
    }
</ecl-carousel>
```

```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EUI_ECL_BANNER } from '@eui/ecl/components/ecl-banner';
import { EclSlideEvent, EUI_ECL_CAROUSEL } from '@eui/ecl/components/ecl-carousel';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_BANNER, ...EUI_ECL_CAROUSEL, ...EUI_ECL_ICON, ...EUI_ECL_LINK],
})
export class DefaultComponent {
    readonly slides = [
        {
            id: 'first',
            title: 'Lorem ipsum dolor sit amet',
            description: 'Nullam sollicitudin suscipit diam, ac blandit ipsum tempor consectetur',
            boxBackground: 'light' as const,
            fontColor: 'dark' as const,
            image: 'https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg',
            isCurrent: false,
        },
        {
            id: 'second',
            title: 'Duis vitae pulvinar turpis',
            footer: 'Copyright or credit',
            description: 'Integer quis lorem tellus. Nullam sollicitudin suscipit diam, ac blandit ipsum tempor consectetur',
            boxBackground: 'dark' as const,
            fontColor: 'light' as const,
            image: 'https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg',
            isCurrent: false,
        },
        {
            id: 'third',
            title: 'Donec maximus pharetra ex a ultricies',
            description: 'Integer quis lorem tellus. Nullam sollicitudin suscipit diam, ac blandit ipsum tempor consectetur. Duis vitae pulvinar turpis. Donec maximus pharetra ex a ultricies',
            boxBackground: 'dark' as const,
            fontColor: 'light' as const,
            video: 'https://vod.prd.commavservices.eu/01/275521/019813ec-13ce-7136-ac0d-d7e24fec64c0/1080p-qaa.mp4',
            videoPoster: 'https://vod.prd.commavservices.eu/12/224712/THUMB_I224712EN1W_V_1.jpg',
            isCurrent: true,
        }
    ]

    onSlide(evt: EclSlideEvent) {
        // console.log('slide', evt);
    }
}
```

### Other examples

- [Different sizes](samples/ecl-carousel/sizes)
