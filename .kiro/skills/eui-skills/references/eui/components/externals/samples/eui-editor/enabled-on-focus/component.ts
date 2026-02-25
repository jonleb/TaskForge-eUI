import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';
import { EuiEditorModule } from '@eui/components/externals/eui-editor';

@Component({
    // eslint-disable-next-line
    selector: 'enabled-on-focus',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        EuiEditorModule,
        ...EUI_SLIDE_TOGGLE,
        ...EUI_INPUT_GROUP,
        ...EUI_LABEL,
        ...EUI_INPUT_TEXT,
    ],
})
export class EnabledOnFocusComponent implements OnInit {
    htmlContent = `<h3 class="eui-u-text-h3"><strong>Click</strong> on me to <strong style="color: rgb(230, 0, 0);">enable</strong> the edit mode or
    <strong>focus</strong> me with thte tab key.</h3><p class="eui-u-text-paragraph"><br></p><p class="eui-u-text-paragraph">At vero eos et
    <strong style="color: rgb(230, 0, 0);">accusamus </strong>et iusto odio dignissimos ducimus qui <strong>blanditiis </strong>praesentium
    voluptatum deleniti atque corrupti quos dolores et <u>quas molestias excepturi</u> sint occaecati cupiditate non provident, similique
    sunt in <strong style="color: rgb(230, 0, 0);">culpa </strong>qui officia deserunt mollitia animi, id est <strong>laborum </strong>et
    dolorum fuga.</p><blockquote class="eui-u-text-blockquote"><strong style="color: rgb(0, 71, 178);"><em>Pellentesque posuere mollis sem. In lacinia consectetur nibh,
    quis convallis elit ornare quis. In non arcu eu nibh fringilla aliquet. Suspendisse placerat lectus in rutrum rutrum. Nullam varius
    ullamcorper massa, id ultrices metus commodo ac. Maecenas pretium arcu lorem, sed aliquam libero ullamcorper at. Vestibulum ac
    convallis justo, id condimentum tellus.</em></strong></blockquote><p class="eui-u-text-paragraph">Nam libero
    <strong class="ql-size-large" style="color: rgb(0, 71, 178);"><em>tempore</em></strong>, cum soluta
    <strong class="ql-size-large" style="color: rgb(0, 71, 178);"><em>nobis</em></strong><strong class="ql-size-large"><em> </em></strong>
    est eligendi optio cumque nihil impedit quo minus id quod
    <strong class="ql-size-large" style="color: rgb(0, 71, 178);"><em><u>maxime </u></em></strong>placeat facere possimus,
    omnis voluptas assumenda est, omnis dolor repellendus.</p>`;

    form: FormGroup;
    placeholder = 'Compose an epic...';
    isEnabledOnFocus = true;

    ngOnInit(): void {
        this.form = new FormGroup({
            htmlContent: new FormControl<string>(this.htmlContent),
        });
    }

}
