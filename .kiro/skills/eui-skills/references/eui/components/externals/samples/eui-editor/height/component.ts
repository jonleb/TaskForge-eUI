import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';
import { EuiEditorModule } from '@eui/components/externals/eui-editor';

@Component({
    // eslint-disable-next-line
    selector: 'height',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        EuiEditorModule,
        ...EUI_SLIDE_TOGGLE,
        ...EUI_INPUT_GROUP,
        ...EUI_LABEL,
    ],
})
export class HeightComponent implements OnInit {
    public isReadOnly = false;

    public form: FormGroup;

    ngOnInit(): void {
        this.form = new FormGroup({
            emptyContent: new FormControl<string>(`<p>At vero eos et <strong style="color: rgb(230, 0, 0);">accusamus </strong>et iusto odio dignissimos ducimus qui
    blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non
    provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p><p>Et harum quidem rerum
    facilis est et expedita distinctio.</p><p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id
    quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p><h6 class="ql-align-right">
    <strong style="color: rgb(136, 136, 136);"><em>Cogito, ergo sum</em></strong></h6><p>At vero eos et <strong style="color: rgb(230, 0, 0);">accusamus </strong>et iusto odio dignissimos ducimus qui
    blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non
    provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p><p>Et harum quidem rerum
    facilis est et expedita distinctio.</p><p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id
    quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p><h6 class="ql-align-right">
    <strong style="color: rgb(136, 136, 136);"><em>Cogito, ergo sum</em></strong></h6><p>At vero eos et <strong style="color: rgb(230, 0, 0);">accusamus </strong>et iusto odio dignissimos ducimus qui
    blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non
    provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p><p>Et harum quidem rerum
    facilis est et expedita distinctio.</p><p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id
    quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p><h6 class="ql-align-right">
    <strong style="color: rgb(136, 136, 136);"><em>Cogito, ergo sum</em></strong></h6>`),
        });
    }

    toggleReadOnly(): void {
        this.isReadOnly = !this.isReadOnly;
    }
}
