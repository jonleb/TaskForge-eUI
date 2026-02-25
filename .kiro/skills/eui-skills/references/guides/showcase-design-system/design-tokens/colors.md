# showcase design system   design tokens   colors

```html
<eui-showcase-doc-page id="Colors">

    <docPageSections>

        <eui-showcase-doc-section id="Overview">
            <eui-alert>
                Correspondig utility class and CSS variable follow same construct :
                <br>
                <code class="eui-u-text-code">eui-u-c-colorVariant</code> or
                <code class="eui-u-text-code">--eui-c-colorVariant</code>
                <br><br>
                utility classes example: <br>
                <code class="eui-u-text-code">eui-u-c-primary, eui-u-c-info, eui-u-c-success</code>
                <br><br>
                CSS variables example: <br>
                <code class="eui-u-text-code">--eui-c-primary, --eui-c-info, --eui-c-success</code>
            </eui-alert>

            <br><br>

            <img src="assets/images/eui-color-context-theme.png" style="max-width: 100%;"/>


        </eui-showcase-doc-section>

        
        <eui-showcase-doc-section id="Context colors">
            @for (colorState of colorStates; track colorState) {
                <div class="eui-u-flex eui-u-flex-wrap">
                @for (colorType of colorStateTypes; track colorType.name) {
                        @if (colorState === 'default') {
                            <div class="color-box" [style]="`background-color: var(--eui-c-${colorType.name});`">
                                <span class="color-box-label eui-u-f-xs">
                                    {{colorType.name}}
                                </span>
                            </div>

                        } @else {
                            <div class="color-box" [style]="`background-color: var(--eui-c-${colorType.name}-${colorState});`">
                                <span class="color-box-label">
                                    {{colorType.name}}-{{colorState}}
                                </span>
                                @if (colorState !== 'base' && colorState != 'light' && colorState != 'dark' && colorState !== 'darker' && colorState !== 'border' && colorState !== 'border-light' && colorState !== 'border-lighter') {
                                    <span class="on-color-box eui-u-f-xs" [style]="`color: var(--eui-c-${colorType.name}-on-${colorState});`">
                                        {{colorType.name}}-on-{{colorState}}
                                    </span>                                
                                }
                            </div>                            
                        }
                }
                </div>
            }
        </eui-showcase-doc-section>

        <eui-showcase-doc-section id="General context colors">
            <div class="eui-u-flex eui-u-flex-wrap">
                @for (varName of generalContextVars; track varName) {
                    <span class="color-box" [style]="`background-color: var(--eui-c-${varName});`">
                        <span class="color-box-label">
                            {{varName}}
                        </span>
                    </span>
                }
            </div>
        </eui-showcase-doc-section>


        <eui-showcase-doc-section id="Context state colors - component usage">

            <table class="eui-table-default eui-table-default--responsive eui-table-default--compact eui-table-default--align-middle">
                <thead>
                    <tr>
                        <th class="eui-u-width-12">Preview</th>
                        <th>Color type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="2" class="eui-u-f-bold">
                            Default text color on page / container background
                        </td>
                    </tr>
                    <tr *ngFor="let colorType of colorStateTypes">
                        <td style="background-color: var(--eui-c-bg);">
                            <div class="eui-u-p-xs eui-u-flex eui-u-mr-l eui-u-flex-justify-content-center">
                                @if (colorType.name === "accent") {
                                    N/A
                                } @else {
                                    <span [style]="`color: var(--eui-c-${colorType.name});`">
                                        Sample text
                                    </span>
                                }
                            </div>
                        </td>
                        <td>{{colorType.name}}</td>
                    </tr>

                    <tr>
                        <td colspan="2" class="eui-u-f-bold">
                            Default state background foreground / background
                        </td>
                    </tr>
                    <tr *ngFor="let colorType of colorStateTypes">
                        <td>
                            <div class="eui-u-p-xs eui-u-flex eui-u-mr-l eui-u-flex-justify-content-center"
                            [style]="`background-color: var(--eui-c-${colorType.name}-surface-light); border: 1px solid var(--eui-c-${colorType.name}-border);`">
                            <span [style]="`color: var(--eui-c-${colorType.name}-on-surface-light);`">
                                Sample text
                            </span>
                            </div>
                        </td>
                        <td>{{colorType.name}}</td>
                    </tr>

                    <!-- <tr>
                        <td colspan="2" class="eui-u-f-bold">
                            Default state background foreground / background - flat border
                        </td>
                    </tr>
                    <tr *ngFor="let colorType of colorStateTypes">
                        
                        <td>
                            <div class="eui-u-p-xs eui-u-flex eui-u-mr-l eui-u-flex-justify-content-center"
                            [style]="`background-color: var(--eui-c-${colorType.name}-surface-light); border: 1px solid var(--eui-c-${colorType.name}-border-light);`">
                                <span [style]="`color: var(--eui-c-${colorType.name}-on-surface-light);`">
                                    Sample text
                                </span>
                            </div>
                        </td>
                        <td>{{colorType.name}}</td>
                    </tr> -->

                    <tr>
                        <td colspan="2" class="eui-u-f-bold">
                            Outline variant
                        </td>
                    </tr>
                    <tr *ngFor="let colorType of colorStateTypes">
                        
                        <td>
                            <div class="eui-u-p-xs eui-u-flex eui-u-mr-l eui-u-flex-justify-content-center"
                            [style]="`background-color: var(--eui-c-white); border: 1px solid var(--eui-c-${colorType.name}-border);`">
                                <span [style]="`color: var(--eui-c-${colorType.name});`">
                                    Sample text
                                </span>
                            </div>
                        </td>
                        <td>{{colorType.name}}</td>
                    </tr>


                    <tr>
                        <td colspan="2" class="eui-u-f-bold">
                            Fill variant
                        </td>
                    </tr>
                    <tr *ngFor="let colorType of colorStateTypes">
                        
                        <td>
                            <div class="eui-u-p-xs eui-u-flex eui-u-mr-l eui-u-flex-justify-content-center"
                            [style]="`background-color: var(--eui-c-${colorType.name}-surface);`">
                                <span [style]="`color: var(--eui-c-${colorType.name}-on-surface);`">
                                    Sample text
                                </span>
                            </div>
                        </td>
                        <td>{{colorType.name}}</td>
                    </tr>
                </tbody>
            </table>


        </eui-showcase-doc-section>

    </docPageSections>
</eui-showcase-doc-page>
```
