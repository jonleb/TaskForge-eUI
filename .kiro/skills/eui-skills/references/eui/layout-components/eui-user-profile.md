# eui-user-profile

## Overview

<eui-alert>
    This eui-user-profile used within an <strong>eui-toolbar-item wrapper</strong> wrapper component at eui-app / app.component.html root level of an eUI application.
    <br>
    When using a <strong>eui-header</strong>, it'll be used within the <strong>eui-header-user-profile</strong> component, same options applies.
    <br>
    When using a <strong>eui-app-sidebar-header</strong>, it'll be used within the <strong>eui-app-sidebar-header-user-profile</strong> component, same options applies.
</eui-alert>
<br>

<eui-alert euiSuccess>
    The UserProfile interface extends the standard user state to include impersonation capabilities and organizational information. When using it with UserService,
    always specify it as the generic type parameter: <b>private userService: UserService&lt;UserProfile&gt;</b>.

<pre>
export interface <b>UserProfile</b> extends UserState &#123;
    /** The profile of another user being impersonated, if applicable */
    <b>impersonatingUser?:</b> UserProfile;
    /** The user's function or role within the system */
    <b>function?:</b> string;
    /** The organization details associated with the user */
    <b>organisation?:</b> &#123;
        /** The unique code identifying the organization */
        code: string
    &#125;
&#125;
</pre>
</eui-alert>
<br>
<div class="eui-u-flex">
    Toggle impersonated view :
    <eui-slide-toggle class="eui-u-ml-xs eui-u-mr-m" (slideToggleChange)="onToggleImpersonated($event)"></eui-slide-toggle>
</div>
<br>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | impersonateLabel | string | 'acting as' |
| Input | showDetailsLabel | string | 'Show profile details' |
| Input | avatarUrl | string | - |
| Input | isShowAvatarInitials | boolean | true |
| Input | reverseNameOrder | boolean | false |
| Output | showProfileInfo | EventEmitter<void> | new EventEmitter() |
| Output | closeProfileMenu | EventEmitter<void> | new EventEmitter() |

## Samples

### [Default](samples/eui-user-profile/Default)

```html
<div class="doc-sample-section-title">Default - no options set</div>

<eui-user-profile></eui-user-profile>


<div class="doc-sample-section-title">With dropdown menu items - and control closing of the dropdown menu</div>

<br>
<eui-alert>
    click on the user profile to reveal the user-profile menu
</eui-alert>
<br>

<!-- <eui-alert euiWarning class="eui-u-mb-m">
    In order for keyboard navigation to work on the user profile menu, make sure that you project directly the eui-user-profile-menu-item components without using *ngTemplateOutlet. When EuiUserProfileMenuItemComponent is instantiated by *ngTemplateOutlet from the userProfileMenuItems, templates are not considered direct content children of eui-user-profile-menu in the way &#64;ContentChildren expects and thus the first item is not focused. More info can be found here: <a href="https://github.com/angular/angular/issues/14842" target="_blank">Angular issue #14842</a>.
 </eui-alert>
 <br> -->

<eui-user-profile #userProfile>
    <eui-user-profile-menu>
        <eui-user-profile-menu-item (click)="onItemClick('view-profile')">
            <eui-icon-svg icon="eui-user" size="s"/>
            View profile information
        </eui-user-profile-menu-item>
        <eui-user-profile-menu-item (click)="onItemClick('sign-out')">
            <eui-icon-svg icon="eui-sign-out" size="s"/>
            Sign out
        </eui-user-profile-menu-item>
    </eui-user-profile-menu> 
</eui-user-profile>



<div class="doc-sample-section-title">Using eui-user-profile-card and hasTabNavigation option to navigate to inner interactive elements with the Tab key</div>

<br>
<eui-alert>
    click on the user profile to reveal the user-profile menu
</eui-alert>
<br>

<eui-user-profile hasTabNavigation>
    <eui-user-profile-menu>
        <eui-user-profile-menu-item>
            <eui-user-profile-card/>
        </eui-user-profile-menu-item>
        <eui-user-profile-menu-item>
            <eui-icon-svg icon="eui-user" size="s"/>
            View profile information
        </eui-user-profile-menu-item>
        <eui-user-profile-menu-item>
            <eui-icon-svg icon="eui-sign-out" size="s"/>
            Sign out
        </eui-user-profile-menu-item>
    </eui-user-profile-menu>
</eui-user-profile>
```

```typescript
import { Component, ViewChild } from '@angular/core';
import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_BUTTON } from '@eui/components/eui-button';

import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_USER_PROFILE, EuiUserProfileComponent } from '@eui/components/eui-user-profile';

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_USER_PROFILE, ...EUI_ICON, ...EUI_ALERT, ...EUI_BUTTON],
})
export class DefaultComponent {

    @ViewChild('userProfile') userProfile: EuiUserProfileComponent;

    onItemClick(e: string) {
        alert(`Item clicked: ${e}`);
        this.userProfile.closeDropdown();
    }
}
```

### Other examples

- [Variants: euiPrimary](samples/eui-user-profile/eui-primary)
- [Variants: euiSizeS](samples/eui-user-profile/eui-sizes)
- [Variants: euiStatus variants](samples/eui-user-profile/status-variants)
- [Options: isReverse](samples/eui-user-profile/is-reverse)
- [Options: Setting welcomeLabel](samples/eui-user-profile/welcome-label)
- [Options: Using subInfos](samples/eui-user-profile/sub-infos)
- [Options: With hasWelcomeLabel=false](samples/eui-user-profile/no-welcome-label)
- [Options: With isShowUserInfos=false](samples/eui-user-profile/no-user-infos)
- [Main Features: Avatar image](samples/eui-user-profile/avatar-image)
- [Main Features: Avatar initials](samples/eui-user-profile/avatar-initials)

## Accessibility

<eui-alert>
    <eui-alert-title>N/A</eui-alert-title>
    this component has no interaction, it's a plain container used for rendering
</eui-alert>
