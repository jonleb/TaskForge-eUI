# showcase design system   migration

```html
<eui-showcase-doc-page id="CSS variables - custom properties">

    <docPageSections>

        <eui-showcase-doc-section id="Overview">
            List of CSS variables to be used when overiding eUI styles within your stylesheet.<br>
            As always use it with caution, to not go against design system specific rules<br><br>
            Refer to corresponding <strong>Utilitiy class names</strong> to see their respective rendering examples.
        </eui-showcase-doc-section>

        <eui-showcase-doc-section id="CSS variables / custom properties">
            <table class="eui-table-default eui-table-default--responsive eui-table-default--compact">
                <thead>
                    <tr>
                        <th>CSS varible name</th>
                        <th>Legacy variable name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="3" class="eui-u-text-h5 eui-u-f-bold eui-u-c-bg-info-surface">
                            Colors
                        </td>
                    </tr>
                    <ng-container *ngFor="let colorType of colorTypes">
                        <tr *ngFor="let color of colorType.map">
                            <td class="eui-u-flex">
                                @if (color.new) {
                                    --eui-c-{{colorType.name}}-{{color.new}} / --eui-c-{{colorType.name}}-{{color.new}}-contrast
                                } @else {
                                    --eui-c-{{colorType.name}} / --eui-c-{{colorType.name}}-contrast
                                }
                            </td>
                            <td>
                                @if (colorType.name == 'branding') {
                                    N/A
                                } @else {
                                    @if (colorType.name === 'neutral') {
                                        @if (color.old) {
                                            --eui-base-color-grey-{{color.old}} / --eui-base-color-grey-{{color.old}}-contrast
                                        } @else {
                                            --eui-base-color-grey / --eui-base-color-grey-contrast
                                        }
                                    } @else {
                                        @if (color.old) {
                                            --eui-base-color-{{colorType.name}}-{{color.old}} / --eui-base-color-{{colorType.name}}-{{color.old}}-contrast
                                        } @else {
                                            --eui-base-color-{{colorType.name}} / --eui-base-color-{{colorType.name}}-contrast
                                        }
                                    }
                                }
                            </td>
                        </tr>
                    </ng-container>

                    <tr>
                        <td colspan="3" class="eui-u-text-h5 eui-u-f-bold eui-u-c-bg-info-surface">
                            Font family definitions
                        </td>
                    </tr>
                    <tr>
                        <td>
                            --eui-f-family
                        </td>
                        <td>
                            --eui-base-font-family
                        </td>
                    </tr>
                    <tr>
                        <td>
                            --eui-f-family-monospace
                        </td>
                        <td>
                            --eui-base-font-family-monospace
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3" class="eui-u-text-h5 eui-u-f-bold eui-u-c-bg-info-surface">
                            Base font-size
                        </td>
                    </tr>
                    <tr>
                        <td>
                            --eui-f-size-base
                        </td>
                        <td>
                            --eui-base-font-size
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3" class="eui-u-text-h5 eui-u-f-bold eui-u-c-bg-info-surface">
                            Font definitions
                        </td>
                    </tr>
                    <tr *ngFor="let size of fontSizes">
                        <td>
                            --eui-f-{{size}} / --eui-f-{{size}}-bold /
                        </td>
                        <td>
                            --eui-base-font-{{size}} / --eui-base-font-{{size}}-bold
                        </td>
                    </tr>

                    <tr>
                        <td colspan="3" class="eui-u-text-h5 eui-u-f-bold eui-u-c-bg-info-surface">
                            Spacing definitions
                        </td>
                    </tr>
                    <tr *ngFor="let size of spacingSizes">
                        <td>
                            --eui-s-{{size}}
                        </td>
                        <td>
                            --eui-base-spacing-{{size}}
                        </td>
                    </tr>

                </tbody>
            </table>
        </eui-showcase-doc-section>


        <eui-showcase-doc-section id="Utility classes">
            <table class="eui-table-default eui-table-default--responsive eui-table-default--compact">
                <thead>
                    <tr>
                        <th>Utility class name</th>
                        <th>Legacy class name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="3" class="eui-u-text-h5 eui-u-f-bold eui-u-c-bg-info-surface">
                            Colors
                        </td>
                    </tr>
                    <ng-container *ngFor="let colorType of colorTypes">
                        <tr *ngFor="let color of colorType.map">
                            <td class="eui-u-flex">
                                @if (color.new) {
                                    eui-u-c-{{colorType.name}}-{{color.new}} / eui-u-c-bg-{{colorType.name}}-{{color.new}}
                                } @else {
                                    eui-u-c-{{colorType.name}} / eui-u-c-bg-{{colorType.name}}
                                }
                            </td>
                            <td>
                                @if (colorType.name == 'branding') {
                                    N/A
                                } @else {
                                    @if (colorType.name === 'neutral') {
                                        @if (color.old) {
                                            eui-u-color-grey-{{color.old}} / eui-u-bg-color-grey-{{color.old}}
                                        } @else {
                                            eui-u-color-grey / eui-u-bg-color-grey
                                        }
                                    } @else {
                                        @if (color.old) {
                                            eui-u-color-{{colorType.name}}-{{color.old}} / eui-u-bg-color-{{colorType.name}}-{{color.old}}
                                        } @else {
                                            eui-u-color-{{colorType.name}} / eui-u-bg-color-{{colorType.name}}
                                        }
                                   }
                                }
                            </td>
                        </tr>
                    </ng-container>

                    <tr>
                        <td colspan="3" class="eui-u-text-h5 eui-u-f-bold eui-u-c-bg-info-surface">
                            Font family definitions
                        </td>
                    </tr>
                    <tr>
                        <td>
                            eui-u-f-regular
                        </td>
                        <td>
                            eui-u-font-regular
                        </td>
                    </tr>
                    <tr>
                        <td>
                            eui-u-f-monospace
                        </td>
                        <td>
                            eui-u-font-monospace
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3" class="eui-u-text-h5 eui-u-f-bold eui-u-c-bg-info-surface">
                            Font definitions
                        </td>
                    </tr>
                    <tr *ngFor="let size of fontSizes">
                        <td>
                            eui-u-f-{{size}} / eui-u-f-{{size}}-bold /
                        </td>
                        <td>
                            eui-u-font-{{size}} / eui-u-font-{{size}}-bold
                        </td>
                    </tr>

                    <tr>
                        <td colspan="3" class="eui-u-text-h5 eui-u-f-bold eui-u-c-bg-info-surface">
                            Spacing definitions
                        </td>
                    </tr>
                    <tr *ngFor="let size of spacingSizes">
                        <td>
                            eui-u-s-{{size}}
                        </td>
                        <td>
                            eui-u-spacing-{{size}}
                        </td>
                    </tr>

                </tbody>
            </table>
        </eui-showcase-doc-section>



    </docPageSections>
</eui-showcase-doc-page>
```
