# showcase design system   design tokens   spacings

```html
<eui-showcase-doc-page id="Spacings">
    <docPageSections>
        <eui-showcase-doc-section id="Overview">
            Unified family of spacing tokens provides consistent layout and spacing between UI elements
        </eui-showcase-doc-section>

        <eui-showcase-doc-section id="Spacing tokens">
            <p class="eui-u-text-paragraph">See also the <a class="eui-u-text-link" routerLink="/css-utilities/overview">CSS utilities</a> section from menu.</p>
            <br>

            <table class="eui-table-default eui-table-default--responsive eui-table-default--compact">
                <thead>
                    <tr>
                        <th class="eui-u-width-10">Preview</th>
                        <th class="eui-u-width-10">Name</th>
                        <th>Size</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let spacing of spacings">
                        <td><div [ngStyle]="{'height': '1.5rem', 'background-color': 'var(--eui-c-primary)', 'width': 'var(--eui-s-' + spacing + ')'}"></div></td>
                        <td>{{spacing}}</td>
                        <td class="eui-showcase-spacing-size-{{spacing}}"></td>
                    </tr>
                </tbody>
            </table>

        </eui-showcase-doc-section>
    </docPageSections>
</eui-showcase-doc-page>
```
