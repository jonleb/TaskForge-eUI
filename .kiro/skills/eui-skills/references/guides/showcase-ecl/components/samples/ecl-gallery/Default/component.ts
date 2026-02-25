import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EclGalleryHideEvent, EclGalleryItemEvent, EclGalleryShareEvent, EclGalleryShowEvent, EUI_ECL_GALLERY } from '@eui/ecl/components/ecl-gallery';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_GALLERY, ...EUI_ECL_ICON, ...EUI_ECL_LINK],
})
export class DefaultComponent implements OnInit {
    sources: Array<any>;
    tracks: Array<any>;


    ngOnInit() {

        this.sources = [
            {
                src: 'https://inno-ecl.s3.amazonaws.com/media/videos/big_buck_bunny.mp4',
                type: 'video/mp4',
            },
            {
                src: 'https://inno-ecl.s3.amazonaws.com/media/videos/big_buck_bunny.webm',
                type: 'video/webm',
            }
        ];

        this.tracks = [
            {
                src: '/captions/bunny-en.vtt',
                kind: 'captions',
                srcLang: 'en',
                label: 'English',
            },
            {
                src: '/captions/bunny-fr.vtt',
                kind: 'captions',
                srcLang: 'fr',
                label: 'français',
            }
        ];
    }

    onShare(evt: EclGalleryShareEvent) {
        console.log('sharing..', evt);
    }

    onShow(evt: EclGalleryShowEvent) {
        console.log('show', evt);
    }

    onHide(evt: EclGalleryHideEvent) {
        console.log('hide', evt);
    }

    onItemSwitch(evt: EclGalleryItemEvent) {
        console.log('switch', evt);
    }
}
