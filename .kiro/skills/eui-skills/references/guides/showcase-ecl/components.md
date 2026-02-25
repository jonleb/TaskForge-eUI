# showcase ecl   components

```html
<eui-page>
    <eui-page-header label="Style guide - NEXT" subLabel="Brand new eUI 10.x components"></eui-page-header>

    <eui-page-content>
        <h3 class="eui-u-font-bold eui-u-color-info">Overview</h3>
        <eui-card euiInfo>
            <eui-card-header>
                <eui-card-header-title>
                    Import usage & recommendations
                </eui-card-header-title>
            </eui-card-header>
            <eui-card-content style="height: 20rem">
                <p>It is recommended to import all eUI components from a <strong>Shared Module</strong> which can gather
                    both eUI components as well as your custom reusable components and directives.</p>
                Usage of SharedModule is to provide access to each import/export from any of your app pages.
                Prefer importing a componentModule which gathers the component itself and all its dependencies.
                You can also import single custom components or from external libraries.
                <br>

                Example of <code>.../shared/shared.module.ts</code>
                <pre><small>
<span class="eui-u-color-success">// Imports all eUI 10.x components & directives</span>
import &#123; EuiAllModule &#125; from '&#64;eui/components-next';

&#64;NgModule(&#123;
    imports: [
        CommonModule,
        EuiAllModule,
    ],
    exports: [
        EuiAllModule,
    ],
&#125;)
export class SharedModule &#123; &#125;
</small>
</pre>
            </eui-card-content>
        </eui-card>
    </eui-page-content>
</eui-page>
```
