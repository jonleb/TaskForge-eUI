# layout components   eui page column resizable

```html
<eui-page>
    <eui-page-header label="eui-page-columns"
                     subLabel="with resizable columns">
    </eui-page-header>

    <eui-page-content>
        <eui-page-columns>
            <eui-page-column euiResizable label="Size M" euiSizeVariant="m" [isCollapsible]="true" [isCollapsed]="isColumnCollapsed2" (collapse)="onToggleColumnCollapsed2($event)">
                <eui-page-column-body>
                    <eui-showcase-doc-lorem-ipsum />
                </eui-page-column-body>
            </eui-page-column>

            <eui-page-column euiResizable label="Size L" euiSizeVariant="l" [isCollapsible]="true" [isCollapsed]="isColumnCollapsed3" (collapse)="onToggleColumnCollapsed3($event)">
                <eui-page-column-header-body>
                    <div class="eui-u-f-s eui-u-c-neutral-darker"><strong><em>This is the column header body which remains sticky when scrolling into the column's content</em></strong></div>
                </eui-page-column-header-body>
                <eui-page-column-body>
                    <p class="eui-u-text-paragraph"><b>This column can be scrolled to show how overlay components get the relative scrolling reference from the column.</b></p>
                    <eui-showcase-doc-lorem-ipsum></eui-showcase-doc-lorem-ipsum>
                </eui-page-column-body>
                <eui-page-column-footer>
                    Default column footer
                </eui-page-column-footer>
            </eui-page-column>

            <eui-page-column euiResizable label="Size XL" euiSizeVariant="xl" [isCollapsible]="true" [isCollapsed]="isColumnCollapsed4" (collapse)="onToggleColumnCollapsed4($event)">
                <eui-page-column-header-right-content>
                    <eui-dropdown>
                        <button euiButton euiBasicButton euiSecondary euiRounded euiIconButton euiSizeS aria-label="More actions">
                            <eui-icon-svg icon="eui-ellipsis-vertical"></eui-icon-svg>
                        </button>
                        <eui-dropdown-content>
                            <button euiDropdownItem>Menu item 1</button>
                            <button euiDropdownItem>Menu item 2</button>
                            <button euiDropdownItem>Menu item 3</button>
                        </eui-dropdown-content>
                    </eui-dropdown>
                </eui-page-column-header-right-content>
                <eui-page-column-body>
                    <p class="eui-u-text-paragraph"><b>This column can be scrolled to show how overlay components get the relative scrolling reference from the column.</b></p><br/>
                    <eui-showcase-doc-lorem-ipsum></eui-showcase-doc-lorem-ipsum>
                </eui-page-column-body>
            </eui-page-column>

            <eui-page-column>
                <eui-page-column-header-left-content>
                    <div class="eui-u-flex">
                        <strong>Main column (responsive dynamic size)</strong>
                        <eui-icon-svg icon="information-circle" class="eui-u-ml-s" euiTooltip="This column auto-grows with custom right content" euiTooltipAccent></eui-icon-svg>
                    </div>
                </eui-page-column-header-left-content>
                <eui-page-column-header-right-content>
                    <button euiButton euiOutline euiSecondary euiSizeS class="eui-u-mr-s">Secondary action</button>
                    <button euiButton euiPrimary euiSizeS class="eui-u-mr-s">Primary action</button>
                    <eui-dropdown>
                        <button euiButton euiBasicButton euiSecondary euiRounded euiIconButton euiSizeS title="More actions">
                            <eui-icon-svg icon="eui-ellipsis-vertical"></eui-icon-svg>
                        </button>
                        <eui-dropdown-content>
                            <button euiDropdownItem>Menu item 1</button>
                            <button euiDropdownItem>Menu item 2</button>
                            <button euiDropdownItem>Menu item 3</button>
                        </eui-dropdown-content>
                    </eui-dropdown>
                </eui-page-column-header-right-content>

                <eui-page-column-body>
                    <eui-card>
                        <eui-card-header>
                            <eui-card-header-title>This is the main column with left & right custom content</eui-card-header-title>
                        </eui-card-header>
                        <eui-card-content>
                            <p class="eui-u-text-paragraph"><strong>This is the content of the card.</strong></p>
                            <eui-showcase-doc-lorem-ipsum></eui-showcase-doc-lorem-ipsum>
                        </eui-card-content>
                    </eui-card>
                </eui-page-column-body>
            </eui-page-column>
        </eui-page-columns>
    </eui-page-content>

</eui-page>


<!-- eUI Showcase related code - don't copy in your app code -->
<eui-showcase-doc-page-code-fab showcase="ux-components" codeFolder="../01b-style-guide/02-layout-components/eui-page-column-resizable">
    <p class="eui-u-text-paragraph">Use the <code class="eui-u-text-code">euiResizable</code> directive next to the <code class="eui-u-text-code">eui-page-column</code> tag.</p>
    Please note that the minimum resized width is limited by the eui-page-column size.
    Also, it is not recommended to resize the main column which automatically resizes based on other layout elements (responsive).

    <h4 class="eui-u-mb-none">Anatomy of the resizable page column</h4>
<pre class="language-markup" tabindex="0">
<code euiCode class="language-markup">&lt;eui-page&gt;
    &lt;eui-page-header&gt;...&lt;/eui-page-header&gt;
    &lt;eui-page-content&gt;
        &lt;eui-page-columns&gt;
            &lt;eui-page-column euiResizable euiSizeVariant="l"&gt;Column 1&lt;/eui-page-column&gt;
            &lt;eui-page-column euiResizable euiSizeVariant="xl"&gt;Column 2&lt;/eui-page-column&gt;
            &lt;eui-page-column&gt;Main column&lt;/eui-page-column&gt;
        &lt;/eui-page-columns&gt;
    &lt;/eui-page-content&gt;
    &lt;eui-page-footer&gt;...&lt;/eui-page-footer&gt;
&lt;/eui-page&gt;
</code></pre>
</eui-showcase-doc-page-code-fab>
```
