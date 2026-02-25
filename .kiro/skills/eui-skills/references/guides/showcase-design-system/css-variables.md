# showcase design system   css variables

```html
<eui-showcase-doc-page id="CSS variables - custom properties">

    <docPageSections>

        <eui-showcase-doc-section id="Overview">
            List of CSS variables to be used when overiding eUI styles within your stylesheet.<br>
            As always use it with caution, to not go against design system specific rules<br><br>
            Refer to corresponding <strong>Utilitiy class names</strong> to see their respective rendering examples.
        </eui-showcase-doc-section>


    <eui-showcase-doc-section id="Context generic colors">

        <table class="eui-table-default eui-table-default--responsive eui-table-default--compact eui-table-default--align-middle">
            <thead>
                <tr>
                    <th class="eui-u-width-4">Preview</th>
                    <th class="eui-u-width-30">CSS variable name</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let ctxVar of generalContextVars">
                    <td [style]="`background-color: var(--eui-c-${ctxVar});`"></td>
                    <td>
                        --eui-c-{{ctxVar}}
                    </td>
                </tr>    
            </tbody>
        </table>
    </eui-showcase-doc-section>


    <eui-showcase-doc-section id="Context state colors">

        <table class="eui-table-default eui-table-default--responsive eui-table-default--compact eui-table-default--align-middle">
            <thead>
                <tr>
                    <th class="eui-u-width-4">Preview</th>
                    <th>CSS variable name</th>
                </tr>
            </thead>
            <tbody>
                <ng-container *ngFor="let colorType of colorStateTypes">
                    <tr *ngFor="let colorState of colorStates">
                        @if (colorState === 'default') {
                            <td>
                                <div class="color-box" [style]="`background-color: var(--eui-c-${colorType.name});`">
                                    <span class="color-box-label">
                                        --eui-c-{{colorType.name}}
                                    </span>
                                </div>                                
                            </td>
                            <td>
                                --eui-c-{{colorType.name}}
                            </td>
                        }@else {
                            <td>
                                <div class="color-box" [style]="`background-color: var(--eui-c-${colorType.name}-${colorState});`">
                                    <span class="color-box-label">
                                        --eui-c-{{colorType.name}}-{{colorState}}
                                    </span>
                                    @if (colorState !== 'base' && colorState != 'light' && colorState != 'dark' && colorState !== 'darker' && colorState !== 'border' && colorState !== 'border-light' && colorState !== 'border-lighter') {
                                        <span class="on-color-box eui-u-f-xs" [style]="`color: var(--eui-c-${colorType.name}-on-${colorState});`">
                                            --eui-c-{{colorType.name}}-on-{{colorState}}
                                        </span>                                
                                    }
                                </div>                             
                            </td>
                            <!-- <td [style]="`background-color: var(--eui-c-${colorType.name}-${colorState});`"></td> -->
                            <td>
                                --eui-c-{{colorType.name}}-{{colorState}}
                                @if (colorState !== 'base' && colorState != 'light' && colorState != 'dark' && colorState !== 'darker' && colorState !== 'border' && colorState !== 'border-light' && colorState !== 'border-lighter') {
                                    / --eui-c-{{colorType.name}}-on-{{colorState}}
                                }
                            </td>
                        }
                    </tr>    
                </ng-container>
            </tbody>
        </table>
    </eui-showcase-doc-section>



    <eui-showcase-doc-section id="Context state colors - combined usage">

        <table class="eui-table-default eui-table-default--responsive eui-table-default--compact eui-table-default--align-middle">
            <thead>
                <tr>
                    <th class="eui-u-width-12">Preview</th>
                    <th class="eui-u-width-30">CSS variable name</th>
                    <th>Description</th>
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
                    <td>
                        @if (colorType.name === "accent") {
                            N/A
                        } @else {
                            --eui-c-{{colorType.name}}
                        }
                    </td>
                    <td>
                        foreground: {{colorType.name}}
                    </td>
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
                    <td>
                        background: --eui-c-{{colorType.name}}-surface-light <br>foreground: --eui-c-{{colorType.name}}-on-surface-light <br>border: --eui-c-{{colorType.name}}-border
                    </td>
                    <td>
                        {{colorType.name}}
                    </td>
                </tr>

                <tr>
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
                    <td>
                        background: --eui-c-{{colorType.name}}-surface-light  <br>foreground: -eui-c-s-{{colorType.name}}-on-surface-light <br>border: --eui-c-{{colorType.name}}-border-light
                    </td>
                    <td>
                        {{colorType.name}}
                    </td>
                </tr>

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
                    <td>
                        background: --eui-c-white <br>foreground: --eui-c-{{colorType.name}} <br>border: --eui-c-{{colorType.name}}-border
                    </td>
                    <td>
                        {{colorType.name}}
                    </td>
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
                    <td>
                        background: --eui-c-{{colorType.name}}-surface  <br>foreground: --eui-c-{{colorType.name}}-on-surface
                    </td>
                    <td>
                        {{colorType.name}}
                    </td>
                </tr>
            </tbody>
        </table>
    </eui-showcase-doc-section>



    <eui-showcase-doc-section id="Font">
        <table class="eui-table-default eui-table-default--responsive eui-table-default--compact">
            <thead>
                <tr>
                    <th class="eui-u-width-8">Preview</th>
                    <th class="eui-u-width-24">CSS varible name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                    <tr>
                        <td colspan="3" class="eui-u-text-h5 eui-u-f-bold eui-u-c-bg-info-surface">
                            Font family definitions
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div style="font-family: var(--eui-f-family);">Aaa</div>
                        </td>
                        <td>
                            --eui-f-family
                        </td>
                        <td>
                            Default set to <br>
                            <code class="eui-u-text-code">
                                Inter, Arial, 'Helvetica Neue', Helvetica, sans-serif;
                            </code>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div style="font-family: var(--eui-f-family-monospace);">Aaa</div>
                        </td>
                        <td>
                            --eui-f-family-monospace
                        </td>
                        <td>
                            Default set to <br>
                            <code class="eui-u-text-code">
                                'Consolas', 'Liberation Mono', 'Courier New', monospace;
                            </code>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3" class="eui-u-text-h5 eui-u-f-bold eui-u-c-bg-info-surface">
                            Base font-size
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div style="font-size: var(--eui-f-size-base);">Aaa</div>
                        </td>
                        <td>
                            --eui-f-size-base
                        </td>
                        <td>
                            Default set to <br>
                            <code class="eui-u-text-code">
                                16px
                            </code>
                            <br>
                            <strong class="eui-u-color-info-100">Note</strong> changing this font-size to 14px will adapt all the component to <strong>compact</strong> mode
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3" class="eui-u-text-h5 eui-u-f-bold eui-u-c-bg-info-surface">
                            Font definitions
                        </td>
                    </tr>
                    <tr *ngFor="let size of fontSizes">
                        <td>
                            <div [style]="'font: var(--eui-f-' + size + ');'">Aaa</div>
                        </td>
                        <td>
                            --eui-f-{{size}}
                        </td>
                        <td>
                            Font definition <strong>{{size}}</strong> css variable.
                            <br>
                            <strong class="eui-u-color-danger-100">Always</strong> use the font variable when you want to declare font within your stylesheet,<br>
                            <code class="eui-u-text-code">font: var(--eui-f-{{size}});</code><br>,
                            this will ensure proper line-height/font-size/font-family definition once applied
                        </td>
                    </tr>

                    <tr>
                        <td colspan="3" class="eui-u-text-h5 eui-u-f-bold eui-u-c-bg-info-surface">
                            Font definitions (light)
                        </td>
                    </tr>
                    <tr *ngFor="let size of fontSizes">
                        <td>
                            <div [style]="'font: var(--eui-f-' + size + '-light);'">Aaa</div>
                        </td>
                        <td>
                            --eui-f-{{size}}-light
                        </td>
                        <td>
                            Light font definition <strong>{{size}}</strong> css variable.
                            <br>
                            <strong class="eui-u-color-danger-100">Always</strong> use the font variable when you want to declare font within your stylesheet,<br>
                            <code class="eui-u-text-code">font: var(--eui-f-{{size}}-light);</code><br>,
                            this will ensure proper line-height/font-size/font-family definition once applied
                        </td>
                    </tr>

                    <tr>
                        <td colspan="3" class="eui-u-text-h5 eui-u-f-bold eui-u-c-bg-info-surface">
                            Font definitions (medium)
                        </td>
                    </tr>
                    <tr *ngFor="let size of fontSizes">
                        <td>
                            <div [style]="'font: var(--eui-f-' + size + '-medium);'">Aaa</div>
                        </td>
                        <td>
                            --eui-f-{{size}}-medium
                        </td>
                        <td>
                            Medium font definition <strong>{{size}}</strong> css variable.
                            <br>
                            <strong class="eui-u-color-danger-100">Always</strong> use the font variable when you want to declare font within your stylesheet,<br>
                            <code class="eui-u-text-code">font: var(--eui-f-{{size}}-medium);</code><br>,
                            this will ensure proper line-height/font-size/font-family definition once applied
                        </td>
                    </tr>

                    <tr>
                        <td colspan="3" class="eui-u-text-h5 eui-u-f-bold eui-u-c-bg-info-surface">
                            Font definitions (semi-bold)
                        </td>
                    </tr>
                    <tr *ngFor="let size of fontSizes">
                        <td>
                            <div [style]="'font: var(--eui-f-' + size + '-semi-bold);'">Aaa</div>
                        </td>
                        <td>
                            --eui-f-{{size}}-semi-bold
                        </td>
                        <td>
                            Semi-bold font definition <strong>{{size}}</strong> css variable.
                            <br>
                            <strong class="eui-u-color-danger-100">Always</strong> use the font variable when you want to declare font within your stylesheet,<br>
                            <code class="eui-u-text-code">font: var(--eui-f-{{size}}-semi-bold);</code><br>,
                            this will ensure proper line-height/font-size/font-family definition once applied
                        </td>
                    </tr>

                    <tr>
                        <td colspan="3" class="eui-u-text-h5 eui-u-f-bold eui-u-c-bg-info-surface">
                            Font definitions (bold)
                        </td>
                    </tr>
                    <tr *ngFor="let size of fontSizes">
                        <td>
                            <div [style]="'font: var(--eui-f-' + size + '-bold);'">Aaa</div>
                        </td>
                        <td>
                            --eui-f-{{size}}-bold
                        </td>
                        <td>
                            Bold font definition <strong>{{size}}</strong> css variable.
                            <br>
                            <strong class="eui-u-color-danger-100">Always</strong> use the font variable when you want to declare font within your stylesheet,<br>
                            <code class="eui-u-text-code">font: var(--eui-f-{{size}}-bold);</code><br>,
                            this will ensure proper line-height/font-size/font-family definition once applied
                        </td>
                    </tr>

                    <tr>
                        <td colspan="3" class="eui-u-text-h5 eui-u-f-bold eui-u-c-bg-info-surface">
                            Font sizes
                        </td>
                    </tr>
                    <tr *ngFor="let size of fontSizes">
                        <td>
                            <div [style]="'font-size: var(--eui-f-s-' + size + ');'">Aaa</div>
                        </td>
                        <td>
                            --eui-f-s-{{size}}
                        </td>
                        <td>
                            Font definition <strong>{{size}}</strong> css variable.
                            <br>
                            <code class="eui-u-text-code">font-size: var(--eui-f-s-{{size}});</code>
                        </td>
                    </tr>

                    <tr>
                        <td colspan="3" class="eui-u-text-h5 eui-u-f-bold eui-u-c-bg-info-surface">
                            Font weights
                        </td>
                    </tr>
                    <tr *ngFor="let size of fontWeights">
                        <td>
                            <div [style]="'font-weight: var(--eui-f-w-' + size + ');'">Aaa</div>
                        </td>
                        <td>
                            --eui-f-w-{{size}}
                        </td>
                        <td>
                            Font definition <strong>{{size}}</strong> css variable.
                            <br>
                            Applicable only for all variants to <strong>Inter font theme</strong>
                            <br>
                            <code class="eui-u-text-code">font-weight: var(--eui-f-w-{{size}});</code><br>,
                        </td>
                    </tr>
            </tbody>
        </table>
        </eui-showcase-doc-section>

        <eui-showcase-doc-section id="Spacing">
            <table class="eui-table-default eui-table-default--responsive eui-table-default--compact">
                <thead>
                    <tr>
                        <th class="eui-u-width-8">Preview</th>
                        <th class="eui-u-width-24">CSS varible name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let size of spacingSizes">
                        <td>
                            <div class="eui-u-c-bg-primary-surface" [style]="'height: 1.5rem; width: var(--eui-s-' + size + ');'"></div>
                        </td>
                        <td>
                            --eui-s-{{size}}
                        </td>
                        <td>
                            Spacing <strong>{{size}}</strong> css variable.
                            <br>
                            apply on margin / padding.
                        </td>
                    </tr>
                </tbody>
            </table>
        </eui-showcase-doc-section>

        <eui-showcase-doc-section id="Icon size">
            <table class="eui-table-default eui-table-default--responsive eui-table-default--compact">
                <thead>
                    <tr>
                        <th class="eui-u-width-8">Preview</th>
                        <th class="eui-u-width-24">CSS varible name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let size of iconSizes">
                        <td>
                            <eui-icon-svg icon="eui-home" fillColor="primary" [size]="size"></eui-icon-svg>
                        </td>
                        <td>
                            --eui-is-{{size}}
                        </td>
                        <td>
                            Icon size <strong>{{size}}</strong> css variable.
                            <br>
                            apply on height and width of svg
                        </td>
                    </tr>
                </tbody>
            </table>
        </eui-showcase-doc-section>

        <eui-showcase-doc-section id="Opacity">
            <table class="eui-table-default eui-table-default--responsive eui-table-default--compact">
                <thead>
                    <tr>
                        <th class="eui-u-width-8">Preview</th>
                        <th class="eui-u-width-24">CSS varible name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let op of opacities">
                        <td>
                            <div class="eui-u-c-bg-primary-surface" [style]="'height: 1.5rem; opacity: var(--eui-o-' + op + ');'"></div>
                        </td>
                        <td>
                            --eui-o-{{op}}
                        </td>
                        <td>
                            Opacity <strong>{{op}}</strong> css variable.
                        </td>
                    </tr>
                </tbody>
            </table>
        </eui-showcase-doc-section>



        <eui-showcase-doc-section id="Shadow">
            <table class="eui-table-default eui-table-default--responsive eui-table-default--compact">
                <thead>
                    <tr>
                        <th class="eui-u-width-8">Preview</th>
                        <th class="eui-u-width-24">CSS varible name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let shadow of shadows">
                        <td>
                            <div class="eui-u-c-bg-secondary-surface-lighter" [style]="'height: 1.5rem; width: 2.5rem; box-shadow: var(--eui-sh-' + shadow + ');'"></div>
                        </td>
                        <td>
                            --eui-sh-{{shadow}}<br>
                        </td>
                        <td>
                            Shadow <strong>{{shadow}}</strong> css variable.
                            <br>
                            apply on box-shadow.
                        </td>
                    </tr>

                </tbody>
            </table>
        </eui-showcase-doc-section>

        <eui-showcase-doc-section id="Border width">
            <table class="eui-table-default eui-table-default--responsive eui-table-default--compact">
                <thead>
                    <tr>
                        <th class="eui-u-width-8">Preview</th>
                        <th class="eui-u-width-24">CSS varible name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let bw of borderWidths">
                        <td>
                            <div class="eui-u-c-bg-secondary-surface-lighter" [style]="'height: 1.5rem; width: 2.5rem; border-color: var(--eui-c-primary); border-style: solid; border-width: var(--eui-bw-' + bw + ');'"></div>
                        </td>
                        <td>
                            --eui-bw-{{bw}}<br>
                        </td>
                        <td>
                            border width <strong>{{bw}}</strong> css variable.
                            <br>
                            apply on border
                        </td>
                    </tr>

                </tbody>
            </table>
        </eui-showcase-doc-section>

        <eui-showcase-doc-section id="Border radius">
            <table class="eui-table-default eui-table-default--responsive eui-table-default--compact">
                <thead>
                    <tr>
                        <th class="eui-u-width-8">Preview</th>
                        <th class="eui-u-width-24">CSS varible name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let br of borderRadiuses">
                        <td>
                            <div class="eui-u-c-bg-secondary-surface-lighter" [style]="'height: 1.5rem; width: 2.5rem; border: 1px solid var(--eui-c-primary); border-radius: var(--eui-br-' + br + ');'"></div>
                        </td>
                        <td>
                            --eui-br-{{br}}<br>
                        </td>
                        <td>
                            Border radius <strong>{{br}}</strong> css variable.
                            <br>
                            apply on border-radius
                        </td>
                    </tr>

                </tbody>
            </table>
        </eui-showcase-doc-section>
    </docPageSections>
</eui-showcase-doc-page>
```
