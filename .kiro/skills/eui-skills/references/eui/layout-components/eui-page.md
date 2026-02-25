# layout components   eui page

```html
<eui-page>
    <eui-page-header label="eui-page" subLabel="Use the yellow button to access the page source code"></eui-page-header>

    <eui-page-content>
        <p class="eui-u-text-paragraph">This is the default <code class="eui-u-text-code">eui-page</code> design layout using page header, content and footer sections.
        <br>
        Click on the bottom right button for more information and the code source.</p>
        <eui-showcase-doc-lorem-ipsum></eui-showcase-doc-lorem-ipsum>
    </eui-page-content>

    <eui-page-footer>
        Page footer (optional)
    </eui-page-footer>
</eui-page>




<!-- eUI Showcase related code - don't copy in your app code -->
<eui-showcase-doc-page-code-fab showcase="ux-components" codeFolder="../01b-style-guide/02-layout-components/eui-page">
    <p class="eui-u-text-paragraph">The structure of an <code class="eui-u-text-code">eui-page</code> is composed by the following sections :</p>
    <div class="eui-u-ml-m">
        <li>eui-page-header : contains the page title, optional page sub-title. See <a routerLink="/style-guide/layout-components/eui-page-header" class="eui-u-text-link">eui-page-header</a> documentation for more information.</li>
        <li>eui-page-content : is the main page body content.</li>
        <li>eui-page-columns : allows single or multi-columns layout within the page body content. See <a routerLink="/style-guide/layout-components/eui-page-column" class="eui-u-text-link">eui-page-column</a> documentation for more information.</li>
        <li>eui-page-footer : optional page footer content.</li>
    </div>
</eui-showcase-doc-page-code-fab>
```
