import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';
import { EUI_ECL_SITE_FOOTER } from '@eui/ecl/components/ecl-site-footer';
import { EUI_ECL_SOCIAL_MEDIA_FOLLOW } from '@eui/ecl/components/ecl-social-media-follow';

@Component({
    // tslint:disable-next-line
    selector: 'ec-harmonised',
    templateUrl: 'component.html',
    imports: [RouterLink, TranslateModule, ...EUI_ECL_SITE_FOOTER, ...EUI_ECL_ICON, ...EUI_ECL_LINK,
        ...EUI_ECL_SOCIAL_MEDIA_FOLLOW],
})
export class HarmonisedECComponent {}
