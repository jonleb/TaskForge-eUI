import { Component, ViewChild } from '@angular/core';

import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_ICON_COLOR } from "@eui/components/eui-icon-color";
import { EuiTooltipDirective } from "@eui/components/directives";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_DIALOG, EuiDialogComponent, EuiDialogService } from "@eui/components/eui-dialog";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'eui-icons-migration',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON,
        ...EUI_ICON_COLOR,
        EuiTooltipDirective,
        ...EUI_BUTTON,
        ...EUI_ALERT,
        ...EUI_DIALOG,
        EuiDialogComponent,
    ],
    styleUrls: ['../../module.component.scss'],
    providers: [
        EuiDialogService,
    ],    
})
export class EuiIconsMigrationComponent {
    public euiIcons: any = [];
    public euiIconsv19: any = [];
    
    @ViewChild('dialog') dialog: EuiDialogComponent;

    constructor( ) {

        this.euiIconsv19 = [
            { oldIcon: "eui-add", newIcon: "eui-add" },
            { oldIcon: "eui-alert-circle", newIcon: "eui-state-danger" },
            { oldIcon: "eui-alert", newIcon: "eui-alert" },
            { oldIcon: "eui-arrow-back", newIcon: "eui-arrow-left" },
            { oldIcon: "eui-arrow-down-thin", newIcon: "eui-arrow-down" },
            { oldIcon: "eui-arrow-down", newIcon: "eui-arrow-down" },
            { oldIcon: "eui-arrow-forward", newIcon: "eui-arrow-right" },
            { oldIcon: "eui-arrow-left-thin", newIcon: "eui-arrow-left" },
            { oldIcon: "eui-arrow-redo", newIcon: "eui-redo" },
            { oldIcon: "eui-arrow-right-thin", newIcon: "eui-arrow-right" },
            { oldIcon: "eui-arrow-undo", newIcon: "eui-undo" },
            { oldIcon: "eui-arrow-up-thin", newIcon: "eui-arrow-up" },
            { oldIcon: "eui-arrow-up", newIcon: "eui-arrow-up" },
            { oldIcon: "eui-bolt", newIcon: "eui-flash" },
            { oldIcon: "eui-bookmark-outline", newIcon: "bookmark-simple:regular" },
            { oldIcon: "eui-bookmark", newIcon: "bookmark-simple:fill" },
            { oldIcon: "eui-calendar-outline", newIcon: "eui-calendar" },
            { oldIcon: "eui-calendar", newIcon: "eui-calendar" },
            { oldIcon: "eui-camera-add", newIcon: "camera-plus:regular" },
            { oldIcon: "eui-caret-down", newIcon: "eui-caret-down" },
            { oldIcon: "eui-caret-first", newIcon: "eui-caret-first" },
            { oldIcon: "eui-caret-last", newIcon: "eui-caret-last" },
            { oldIcon: "eui-caret-left", newIcon: "eui-caret-left" },
            { oldIcon: "eui-caret-right", newIcon: "eui-caret-right" },
            { oldIcon: "eui-caret-up", newIcon: "eui-caret-up" },
            { oldIcon: "eui-chain", newIcon: "eui-link" },
            { oldIcon: "eui-chart-area", newIcon: "chart-pie:regular" },
            { oldIcon: "eui-chart-bar", newIcon: "chart-bar:regular" },
            { oldIcon: "eui-chart-line", newIcon: "chart-line:regular" },
            { oldIcon: "eui-check", newIcon: "check-square:regular" },
            { oldIcon: "eui-checkbox-intermediate", newIcon: "minus-square:fill" },
            { oldIcon: "eui-checkbox-outline", newIcon: "check-square:regular" },
            { oldIcon: "eui-checkbox", newIcon: "check-square:fill" },
            { oldIcon: "eui-checkmark-done", newIcon: "eui-checkmark-done" },
            { oldIcon: "eui-checkmark", newIcon: "eui-checkmark" },
            { oldIcon: "eui-chevron-back", newIcon: "eui-chevron-left" },
            { oldIcon: "eui-chevron-down", newIcon: "eui-chevron-down" },
            { oldIcon: "eui-chevron-forward", newIcon: "eui-chevron-right" },
            { oldIcon: "eui-chevron-up", newIcon: "eui-chevron-up" },
            { oldIcon: "eui-clock-history", newIcon: "clock-counter-clockwise:regular" },
            { oldIcon: "eui-close", newIcon: "eui-close" },
            { oldIcon: "eui-code", newIcon: "eui-code" },
            { oldIcon: "eui-comment", newIcon: "chat-circle:regular" },
            { oldIcon: "eui-copyright", newIcon: "eui-copyright" },
            { oldIcon: "eui-create", newIcon: "eui-add" },
            { oldIcon: "eui-dashboard", newIcon: "none" },
            { oldIcon: "eui-dedent", newIcon: "text-outdent:regular" },
            { oldIcon: "eui-delete-forever", newIcon: "eui-trash" },
            { oldIcon: "eui-delete", newIcon: "eui-trash" },
            { oldIcon: "eui-e-help", newIcon: "none" },

            {
                "oldIcon": "eui-ecl-arrow-left",
                "newIcon": "ecl-arrow-left:ecl"
            },
            {
                "oldIcon": "eui-ecl-audio",
                "newIcon": "ecl-audio:ecl"
            },
            {
                "oldIcon": "eui-ecl-back",
                "newIcon": "ecl-back:ecl"
            },
            {
                "oldIcon": "eui-ecl-blog",
                "newIcon": "ecl-blog:ecl"
            },
            {
                "oldIcon": "eui-ecl-book",
                "newIcon": "ecl-book:ecl"
            },
            {
                "oldIcon": "eui-ecl-brochure",
                "newIcon": "ecl-brochure:ecl"
            },
            {
                "oldIcon": "eui-ecl-budget",
                "newIcon": "ecl-budget:ecl"
            },
            {
                "oldIcon": "eui-ecl-calendar",
                "newIcon": "ecl-calendar:ecl"
            },
            {
                "oldIcon": "eui-ecl-camera",
                "newIcon": "ecl-camera:ecl"
            },
            {
                "oldIcon": "eui-ecl-chain",
                "newIcon": "ecl-chain:ecl"
            },
            {
                "oldIcon": "eui-ecl-check-filled",
                "newIcon": "ecl-check-filled:ecl"
            },
            {
                "oldIcon": "eui-ecl-check",
                "newIcon": "ecl-check:ecl"
            },
            {
                "oldIcon": "eui-ecl-clock-filled",
                "newIcon": "ecl-clock-filled:ecl"
            },
            {
                "oldIcon": "eui-ecl-clock",
                "newIcon": "ecl-clock:ecl"
            },
            {
                "oldIcon": "eui-ecl-close-filled",
                "newIcon": "ecl-close-filled:ecl"
            },
            {
                "oldIcon": "eui-ecl-close-outline",
                "newIcon": "ecl-close-outline:ecl"
            },
            {
                "oldIcon": "eui-ecl-close",
                "newIcon": "ecl-close:ecl"
            },
            {
                "oldIcon": "eui-ecl-copy",
                "newIcon": "ecl-copy:ecl"
            },
            {
                "oldIcon": "eui-ecl-corner-arrow",
                "newIcon": "ecl-corner-arrow:ecl"
            },
            {
                "oldIcon": "eui-ecl-data",
                "newIcon": "ecl-data:ecl"
            },
            {
                "oldIcon": "eui-ecl-digital",
                "newIcon": "ecl-digital:ecl"
            },
            {
                "oldIcon": "eui-ecl-document",
                "newIcon": "ecl-document:ecl"
            },
            {
                "oldIcon": "eui-ecl-download",
                "newIcon": "ecl-download:ecl"
            },
            {
                "oldIcon": "eui-ecl-edit",
                "newIcon": "ecl-edit:ecl"
            },
            {
                "oldIcon": "eui-ecl-email",
                "newIcon": "ecl-email:ecl"
            },
            {
                "oldIcon": "eui-ecl-energy",
                "newIcon": "ecl-energy:ecl"
            },
            {
                "oldIcon": "eui-ecl-error",
                "newIcon": "ecl-error:ecl"
            },
            {
                "oldIcon": "eui-ecl-euro",
                "newIcon": "ecl-euro:ecl"
            },
            {
                "oldIcon": "eui-ecl-external-events",
                "newIcon": "ecl-external-events:ecl"
            },
            {
                "oldIcon": "eui-ecl-external",
                "newIcon": "ecl-external:ecl"
            },
            {
                "oldIcon": "eui-ecl-facebook",
                "newIcon": "ecl-facebook:ecl"
            },
            {
                "oldIcon": "eui-ecl-faq",
                "newIcon": "ecl-faq:ecl"
            },
            {
                "oldIcon": "eui-ecl-feedback",
                "newIcon": "ecl-feedback:ecl"
            },
            {
                "oldIcon": "eui-ecl-file",
                "newIcon": "ecl-file:ecl"
            },
            {
                "oldIcon": "eui-ecl-flickr",
                "newIcon": "ecl-flickr:ecl"
            },
            {
                "oldIcon": "eui-ecl-folder",
                "newIcon": "ecl-folder:ecl"
            },
            {
                "oldIcon": "eui-ecl-foursquare",
                "newIcon": "ecl-foursquare:ecl"
            },
            {
                "oldIcon": "eui-ecl-fullscreen",
                "newIcon": "ecl-fullscreen:ecl"
            },
            {
                "oldIcon": "eui-ecl-gear",
                "newIcon": "ecl-gear:ecl"
            },
            {
                "oldIcon": "eui-ecl-generic-lang",
                "newIcon": "ecl-generic-lang:ecl"
            },
            {
                "oldIcon": "eui-ecl-global",
                "newIcon": "ecl-global:ecl"
            },
            {
                "oldIcon": "eui-ecl-gmail",
                "newIcon": "ecl-gmail:ecl"
            },
            {
                "oldIcon": "eui-ecl-growth",
                "newIcon": "ecl-growth:ecl"
            },
            {
                "oldIcon": "eui-ecl-hamburger",
                "newIcon": "ecl-hamburger:ecl"
            },
            {
                "oldIcon": "eui-ecl-image",
                "newIcon": "ecl-image:ecl"
            },
            // {
            //     "oldIcon": "eui-ecl-infographic",
            //     "newIcon": "ecl-infographic:ecl"
            // },
            {
                "oldIcon": "eui-ecl-information",
                "newIcon": "ecl-information:ecl"
            },
            {
                "oldIcon": "eui-ecl-instagram",
                "newIcon": "ecl-instagram:ecl"
            },
            {
                "oldIcon": "eui-ecl-laco-filled",
                "newIcon": "ecl-laco-filled:ecl"
            },
            {
                "oldIcon": "eui-ecl-laco",
                "newIcon": "ecl-laco:ecl"
            },
            {
                "oldIcon": "eui-ecl-language",
                "newIcon": "ecl-language:ecl"
            },
            {
                "oldIcon": "eui-ecl-linkedin",
                "newIcon": "ecl-linkedin:ecl"
            },
            {
                "oldIcon": "eui-ecl-list",
                "newIcon": "ecl-list:ecl"
            },
            {
                "oldIcon": "eui-ecl-livestreaming",
                "newIcon": "ecl-livestreaming:ecl"
            },
            {
                "oldIcon": "eui-ecl-location",
                "newIcon": "ecl-location:ecl"
            },
            {
                "oldIcon": "eui-ecl-log-in",
                "newIcon": "ecl-log-in:ecl"
            },
            {
                "oldIcon": "eui-ecl-logged-in",
                "newIcon": "ecl-logged-in:ecl"
            },
            {
                "oldIcon": "eui-ecl-mastodon",
                "newIcon": "ecl-mastodon:ecl"
            },
            {
                "oldIcon": "eui-ecl-messenger",
                "newIcon": "ecl-messenger:ecl"
            },
            {
                "oldIcon": "eui-ecl-minus",
                "newIcon": "ecl-minus:ecl"
            },
            {
                "oldIcon": "eui-ecl-multiple-files",
                "newIcon": "ecl-multiple-files:ecl"
            },
            {
                "oldIcon": "eui-ecl-organigram",
                "newIcon": "ecl-organigram:ecl"
            },
            {
                "oldIcon": "eui-ecl-package",
                "newIcon": "ecl-package:ecl"
            },
            {
                "oldIcon": "eui-ecl-pause-filled",
                "newIcon": "ecl-pause-filled:ecl"
            },
            {
                "oldIcon": "eui-ecl-pause",
                "newIcon": "ecl-pause:ecl"
            },
            {
                "oldIcon": "eui-ecl-pinterest",
                "newIcon": "ecl-pinterest:ecl"
            },
            {
                "oldIcon": "eui-ecl-play-filled",
                "newIcon": "ecl-play-filled:ecl"
            },
            {
                "oldIcon": "eui-ecl-play-outline",
                "newIcon": "ecl-play-outline:ecl"
            },
            {
                "oldIcon": "eui-ecl-play",
                "newIcon": "ecl-play:ecl"
            },
            {
                "oldIcon": "eui-ecl-plus",
                "newIcon": "ecl-plus:ecl"
            },
            // {
            //     "oldIcon": "eui-ecl-presentation",
            //     "newIcon": "ecl-presentation:ecl"
            // },
            {
                "oldIcon": "eui-ecl-print",
                "newIcon": "ecl-print:ecl"
            },
            {
                "oldIcon": "eui-ecl-qzone",
                "newIcon": "ecl-qzone:ecl"
            },
            {
                "oldIcon": "eui-ecl-reddit",
                "newIcon": "ecl-reddit:ecl"
            },
            {
                "oldIcon": "eui-ecl-regulation",
                "newIcon": "ecl-regulation:ecl"
            },
            {
                "oldIcon": "eui-ecl-rss",
                "newIcon": "ecl-rss:ecl"
            },
            {
                "oldIcon": "eui-ecl-search",
                "newIcon": "ecl-search:ecl"
            },
            {
                "oldIcon": "eui-ecl-settings",
                "newIcon": "ecl-settings:ecl"
            },
            {
                "oldIcon": "eui-ecl-share",
                "newIcon": "ecl-share:ecl"
            },
            {
                "oldIcon": "eui-ecl-shopping-bag",
                "newIcon": "ecl-shopping-bag:ecl"
            },
            {
                "oldIcon": "eui-ecl-skype",
                "newIcon": "ecl-skype:ecl"
            },
            {
                "oldIcon": "eui-ecl-sms",
                "newIcon": "ecl-sms:ecl"
            },
            {
                "oldIcon": "eui-ecl-solid-arrow",
                "newIcon": "ecl-solid-arrow:ecl"
            },
            {
                "oldIcon": "eui-ecl-spinner",
                "newIcon": "ecl-spinner:ecl"
            },
            {
                "oldIcon": "eui-ecl-spotify",
                "newIcon": "ecl-spotify:ecl"
            },
            {
                "oldIcon": "eui-ecl-spreadsheet",
                "newIcon": "ecl-spreadsheet:ecl"
            },
            {
                "oldIcon": "eui-ecl-star-filled",
                "newIcon": "ecl-star-filled:ecl"
            },
            {
                "oldIcon": "eui-ecl-star-outline",
                "newIcon": "ecl-star-outline:ecl"
            },
            {
                "oldIcon": "eui-ecl-success",
                "newIcon": "ecl-success:ecl"
            },
            {
                "oldIcon": "eui-ecl-tag",
                "newIcon": "ecl-tag:ecl"
            },
            {
                "oldIcon": "eui-ecl-telegram",
                "newIcon": "ecl-telegram:ecl"
            },
            {
                "oldIcon": "eui-ecl-trash",
                "newIcon": "ecl-trash:ecl"
            },
            {
                "oldIcon": "eui-ecl-twitter",
                "newIcon": "ecl-twitter:ecl"
            },
            {
                "oldIcon": "eui-ecl-typepad",
                "newIcon": "ecl-typepad:ecl"
            },
            {
                "oldIcon": "eui-ecl-video",
                "newIcon": "ecl-video:ecl"
            },
            {
                "oldIcon": "eui-ecl-warning",
                "newIcon": "ecl-warning:ecl"
            },
            {
                "oldIcon": "eui-ecl-weibo",
                "newIcon": "ecl-weibo:ecl"
            },
            {
                "oldIcon": "eui-ecl-whatasapp",
                "newIcon": "ecl-whatasapp:ecl"
            },
            {
                "oldIcon": "eui-ecl-yahoomail",
                "newIcon": "ecl-yahoomail:ecl"
            },
            {
                "oldIcon": "eui-ecl-yammer",
                "newIcon": "ecl-yammer:ecl"
            },
            {
                "oldIcon": "eui-ecl-youtube",
                "newIcon": "ecl-youtube:ecl"
            },

            { oldIcon: "eui-ellipse", newIcon: "eui-circle" },
            { oldIcon: "eui-ellipsis-horizontal", newIcon: "eui-ellipsis-horizontal" },
            { oldIcon: "eui-ellipsis-vertical", newIcon: "eui-ellipsis-vertical" },
            { oldIcon: "eui-exclamation", newIcon: "eui-alert" },
            { oldIcon: "eui-exit", newIcon: "eui-sign-out" },

            { oldIcon: "eui-file-archive-o", newIcon: "eui-file-archive:eui-file" },
            { oldIcon: "eui-file-archive", newIcon: "eui-file-archive:eui-file" },
            { oldIcon: "eui-file-audio-alt", newIcon: "eui-file-audio:eui-file" },
            { oldIcon: "eui-file-audio-o", newIcon: "eui-file-audio:eui-file" },
            { oldIcon: "eui-file-audio", newIcon: "eui-file-audio:eui-file" },
            { oldIcon: "eui-file-checked", newIcon: "check-square:regular" },
            { oldIcon: "eui-file-code", newIcon: "eui-file-code:eui-file" },
            { oldIcon: "eui-file-csv", newIcon: "eui-file-csv:eui-file" },
            { oldIcon: "eui-file-download", newIcon: "eui-file-download:eui-file" },
            { oldIcon: "eui-file-edit-o", newIcon: "eui-edit" },
            { oldIcon: "eui-file-edit", newIcon: "eui-edit" },
            { oldIcon: "eui-file-empty-o", newIcon: "eui-file-empty:eui-file" },
            { oldIcon: "eui-file-empty", newIcon: "eui-file-empty:eui-file" },
            { oldIcon: "eui-file-excel-o", newIcon: "eui-file-xls:eui-file" },
            { oldIcon: "eui-file-excel", newIcon: "eui-file-xls:eui-file" },
            { oldIcon: "eui-file-export", newIcon: "arrow-square-out:regular" },
            { oldIcon: "eui-file-image-o", newIcon: "eui-file-image:eui-file" },
            { oldIcon: "eui-file-image", newIcon: "eui-file-image:eui-file" },
            { oldIcon: "eui-file-import", newIcon: "arrow-square-in:regular" },
            { oldIcon: "eui-file-odp", newIcon: "new" },
            { oldIcon: "eui-file-ods", newIcon: "new" },
            { oldIcon: "eui-file-odt", newIcon: "new" },
            { oldIcon: "eui-file-pdf-o", newIcon: "eui-file-pdf:eui-file" },
            { oldIcon: "eui-file-pdf", newIcon: "eui-file-pdf:eui-file" },
            { oldIcon: "eui-file-powerpoint-o", newIcon: "eui-file-ppt:eui-file" },
            { oldIcon: "eui-file-powerpoint", newIcon: "eui-file-ppt:eui-file" },
            { oldIcon: "eui-file-signature", newIcon: "pen-nib:regular" },
            { oldIcon: "eui-file-signed", newIcon: "pen-nib:regular" },
            { oldIcon: "eui-file-text", newIcon: "eui-file-text:eui-file" },
            { oldIcon: "eui-file-upload", newIcon: "eui-file-upload:eui-file" },
            { oldIcon: "eui-file-video-o", newIcon: "eui-file-video:eui-file" },
            { oldIcon: "eui-file-video", newIcon: "eui-file-video:eui-file" },
            { oldIcon: "eui-file-word-o", newIcon: "eui-file-doc:eui-file" },
            { oldIcon: "eui-file-word", newIcon: "eui-file-doc:eui-file" },

            { oldIcon: "eui-filter", newIcon: "funnel:regular" },
            { oldIcon: "eui-flag-o", newIcon: "flag:regular" },
            { oldIcon: "eui-flag", newIcon: "flag:fill" },
            { oldIcon: "eui-home", newIcon: "eui-home" },
            { oldIcon: "eui-image", newIcon: "eui-image" },
            { oldIcon: "eui-indent", newIcon: "text-indent:regular" },
            { oldIcon: "eui-info", newIcon: "eui-state-info" },
            { oldIcon: "eui-level-down", newIcon: "eui-level-down" },
            { oldIcon: "eui-level-up", newIcon: "eui-level-up" },
            // { oldIcon: "eui-logo", newIcon: "eui-logo" },
            { oldIcon: "eui-logout-thin", newIcon: "eui-sign-out" },
            { oldIcon: "eui-menu", newIcon: "eui-menu" },
            { oldIcon: "eui-notifications-off", newIcon: "eui-notifications" },
            { oldIcon: "eui-notifications", newIcon: "eui-notifications" },
            { oldIcon: "eui-options-vertical", newIcon: "eui-options-vertical" },
            { oldIcon: "eui-options", newIcon: "eui-options" },
            { oldIcon: "eui-pencil", newIcon: "eui-edit" },
            { oldIcon: "eui-person-thin-o", newIcon: "eui-user" },
            { oldIcon: "eui-person-thin", newIcon: "eui-user" },
            { oldIcon: "eui-pie-chart", newIcon: "chart-pie:regular" },
            { oldIcon: "eui-plug", newIcon: "plugs:regular" },
            { oldIcon: "eui-print", newIcon: "eui-print" },
            { oldIcon: "eui-question-circle", newIcon: "eui-state-primary" },
            { oldIcon: "eui-question", newIcon: "eui-state-primary" },
            { oldIcon: "eui-radio-button-off", newIcon: "eui-circle" },
            { oldIcon: "eui-radio-button-on", newIcon: "eui-circle-fill" },
            { oldIcon: "eui-redo", newIcon: "eui-redo" },
            { oldIcon: "eui-refresh", newIcon: "eui-refresh" },
            { oldIcon: "eui-reload", newIcon: "eui-refresh" },
            { oldIcon: "eui-remove", newIcon: "eui-remove" },
            { oldIcon: "eui-reorder-three", newIcon: "dots-six:regular" },
            { oldIcon: "eui-rss-o", newIcon: "ecl-rss:ecl" },
            { oldIcon: "eui-rss", newIcon: "ecl-rss:ecl" },
            { oldIcon: "eui-scheduled-list", newIcon: "calendar-check:regular" },
            { oldIcon: "eui-search", newIcon: "eui-search" },
            { oldIcon: "eui-send", newIcon: "eui-send" },
            { oldIcon: "eui-settings", newIcon: "eui-settings" },
            { oldIcon: "eui-sitemap", newIcon: "eui-tree-view" },
            { oldIcon: "eui-square-outline", newIcon: "eui-square" },
            { oldIcon: "eui-square", newIcon: "eui-square-fill" },
            { oldIcon: "eui-star", newIcon: "eui-star" },
            { oldIcon: "eui-swap-horizontal", newIcon: "eui-arrows-left-right" },
            { oldIcon: "eui-swap-vertical", newIcon: "eui-arrows-down-up" },
            { oldIcon: "eui-thumb-down", newIcon: "eui-thumbs-down" },
            { oldIcon: "eui-thumb-up", newIcon: "eui-thumbs-up" },
            { oldIcon: "eui-today-outline", newIcon: "eui-calendar-today" },
            { oldIcon: "eui-undo", newIcon: "eui-undo" },
            { oldIcon: "eui-user-preferences", newIcon: "eui-user-gear" },
            { oldIcon: "eui-widget", newIcon: "eui-widget" },
            { oldIcon: "eui-workspaces", newIcon: "eui-stack" },
            { oldIcon: "eui-zoom-in", newIcon: "eui-zoom-in" },
            { oldIcon: "eui-zoom-out", newIcon: "eui-zoom-out" },
        ];
    }

    public openDialog(): void {
        this.dialog.openDialog();
    }

    public onClose(): void {
        console.log('close from output');
    }

    public onAccept(): void {
        console.log('accept from output');
    }
}
