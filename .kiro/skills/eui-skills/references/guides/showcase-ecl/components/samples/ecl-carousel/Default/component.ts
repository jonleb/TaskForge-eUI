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
