# showcase design system   design tokens   typography

```html
<eui-showcase-doc-page id="Typography">
    <docPageSections>

        <eui-showcase-doc-section id="Overview">
            <eui-alert>
                eUI uses the <strong>Inter</strong> font typeface as the <strong>default eui-font</strong>.
            </eui-alert>
        </eui-showcase-doc-section>


        <eui-showcase-doc-section id="Typography - responsive">
            @for (size of fontSizesUI; track size) {
                <div class="eui-u-f-2xl-bold">Font size : {{ size }}</div> 
                <hr/>
                <table class="eui-table-default">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Font-size</th>
                            <th>Line-height</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Mobile xs (< 480px)</td>
                            <td>
                                <span class="eui-showcase-typography-size-{{size}}-mobilexs"></span> - 
                                <span class="eui-showcase-typography-size-value-{{size}}-mobilexs"></span> -
                                <span class="eui-showcase-typography-size-value-px-{{size}}-mobilexs"></span>
                            </td>
                            <td>
                                <span class="eui-showcase-typography-line-height-{{size}}-mobilexs"></span> - 
                                <span class="eui-showcase-typography-line-height-value-{{size}}-mobilexs"></span>
                            </td>
                            <td class="eui-showcase-typography-value-{{size}}-mobilexs">
                                Lorem ipsum dolor sit amet
                            </td>
                        </tr>
                        <tr>
                            <td>Mobile s (>= 480px - < 768px)</td>
                            <td>
                                <span class="eui-showcase-typography-size-{{size}}-mobile"></span> - 
                                <span class="eui-showcase-typography-size-value-{{size}}-mobile"></span> -
                                <span class="eui-showcase-typography-size-value-px-{{size}}-mobile"></span>
                            </td>
                            <td>
                                <span class="eui-showcase-typography-line-height-{{size}}-mobile"></span> - 
                                <span class="eui-showcase-typography-line-height-value-{{size}}-mobile"></span>
                            </td>
                            <td class="eui-showcase-typography-value-{{size}}-mobile">
                                Lorem ipsum dolor sit amet
                            </td>
                        </tr>                        
                        <tr>
                            <td>Tablet (>= 768px - < 996px</td>
                            <td>
                                <span class="eui-showcase-typography-size-{{size}}-tablet"></span> - 
                                <span class="eui-showcase-typography-size-value-{{size}}-tablet"></span> -
                                <span class="eui-showcase-typography-size-value-px-{{size}}-tablet"></span>
                            </td>
                            <td>
                                <span class="eui-showcase-typography-line-height-{{size}}-tablet"></span> - 
                                <span class="eui-showcase-typography-line-height-value-{{size}}-tablet"></span>
                            </td>
                            <td class="eui-showcase-typography-value-{{size}}-tablet">
                                Lorem ipsum dolor sit amet
                            </td>
                        </tr>                        
                        <tr>
                            <td>Desktop (>= 996px)</td>
                            <td>
                                <span class="eui-showcase-typography-size-{{size}}-desktop"></span> - 
                                <span class="eui-showcase-typography-size-value-{{size}}-desktop"></span>-
                                <span class="eui-showcase-typography-size-value-px-{{size}}-desktop"></span>
                            </td>
                            <td>
                                <span class="eui-showcase-typography-line-height-{{size}}-desktop"></span> - 
                                <span class="eui-showcase-typography-line-height-value-{{size}}-desktop"></span>
                            </td>
                            <td class="eui-showcase-typography-value-{{size}}-desktop">
                                Lorem ipsum dolor sit amet
                            </td>
                        </tr>                        
                    </tbody>
                </table>
                <br><br><br>
            }



        </eui-showcase-doc-section> 



        <eui-showcase-doc-section id="Font sizes">
            <p class="eui-u-text-paragraph">See also the <a class="eui-u-text-link" routerLink="/css-utilities/overview">CSS utilities</a> section from menu.</p>


            <h3 class="eui-u-text-h3 eui-u-c-info-darker eui-u-mt-2xl">
                Light - font-weight 300
            </h3>
            <ng-container *ngFor="let fontSize of fontSizesUI">
                <div class="eui-u-f-{{fontSize}}-light">{{fontSize}} - Sample text</div>
            </ng-container>

            <h3 class="eui-u-text-h3 eui-u-c-info-darker eui-u-mt-2xl">
                Regular - font-weight 400
            </h3>
            <ng-container *ngFor="let fontSize of fontSizesUI">
                <div class="eui-u-f-{{fontSize}}">{{fontSize}} - Sample text</div>
            </ng-container>


            <h3 class="eui-u-text-h3 eui-u-c-info-darker eui-u-mt-2xl">
                Medium - font-weight 500
            </h3>
            <ng-container *ngFor="let fontSize of fontSizesUI">
                <div class="eui-u-f-{{fontSize}}-medium">{{fontSize}} - Sample text</div>
            </ng-container>


            <h3 class="eui-u-text-h3 eui-u-c-info-darker eui-u-mt-2xl">
                Semi-bold - font-weight 600
            </h3>

            <ng-container *ngFor="let fontSize of fontSizesUI">
                <div class="eui-u-f-{{fontSize}}-semi-bold">{{fontSize}} - Sample text</div>
            </ng-container>



            <h3 class="eui-u-text-h3 eui-u-c-info-darker eui-u-mt-2xl">
                Bold - font-weight 700
            </h3>
            <ng-container *ngFor="let fontSize of fontSizesUI">
                <div class="eui-u-f-{{fontSize}}-bold">{{fontSize}} - Sample text</div>
            </ng-container>
        </eui-showcase-doc-section>


        <eui-showcase-doc-section id="Default multiline sample - line-height evolving following font definition used">
            <ng-container *ngFor="let fontSize of fontSizesUI">
                <div class="eui-u-mt-xl">{{fontSize}}</div>
                <section class="eui-u-f-{{fontSize}}">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh viverra non semper suscipit posuere a pede.
                    Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.
                </section>
            </ng-container>
        </eui-showcase-doc-section>


        <eui-showcase-doc-section id="Font styles">
            <p class="eui-u-text-paragraph"><strong>eui-font</strong> is available in the following styles & variants : </p>

            <br>

            <table class="eui-table-default eui-table-default--compact eui-table-default--shadowed eui-table-default--align-middle ">
                <thead>
                    <tr>
                        <th>Style</th>
                        <th>Preview</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>regular</td>
                        <td><span class="eui-u-f-m">The quick brown fox jumps over the lazy dog</span></td>
                    </tr>
                    <tr>
                        <td>medium</td>
                        <td><span class="eui-u-f-m-medium">The quick brown fox jumps over the lazy dog</span></td>
                    </tr>                    
                    <tr>
                        <td>semi-bold</td>
                        <td>
                            <span class="eui-u-f-m-semi-bold">The quick brown fox jumps over the lazy dog</span>
                        </td>
                    </tr>
                    <tr>
                        <td>bold</td>
                        <td>
                            <span class="eui-u-f-m-bold">The quick brown fox jumps over the lazy dog</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </eui-showcase-doc-section>

        <eui-showcase-doc-section id="Headings">

            <table class="eui-table-default eui-table-default--responsive eui-table-default--nowrap eui-table-default--compact eui-table-default--shadowed eui-table-default--align-middle ">
                <thead>
                    <tr>
                        <th width="130px">Headings</th>
                        <!-- <th>Value</th> -->
                        <th>Preview</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><h1 class="eui-u-text-h1">heading-1 - h1 - 4XL</h1></td>
                        <!-- <td>4xl</td> -->
                        <td><span class="eui-u-text-h1">Lorem ipsum dolor sit amet</span></td>
                    </tr>
                    <tr>
                        <td><h2 class="eui-u-text-h2">heading-2 - h2 - 3XL</h2></td>
                        <!-- <td>3xl</td> -->
                        <td><span class="eui-u-text-h2">Lorem ipsum dolor sit amet</span></td>
                    </tr>
                    <tr>
                        <td><h4 class="eui-u-text-h3">heading-3 - h3 - 2XL</h4></td>
                        <!-- <td>2xl</td> -->
                        <td><span class="eui-u-text-h3">Lorem ipsum dolor sit amet</span></td>
                    </tr>
                    <tr>
                        <td><h4 class="eui-u-text-h4">heading-4 - h4 - XL</h4></td>
                        <!-- <td>xl</td> -->
                        <td><span class="eui-u-text-h4">Lorem ipsum dolor sit amet</span></td>
                    </tr>
                    <tr>
                        <td><h5 class="eui-u-text-h5">heading-5 - h5 - L</h5></td>
                        <!-- <td>l</td> -->
                        <td><span class="eui-u-text-h5">Lorem ipsum dolor sit amet</span></td>
                    </tr>
                    <tr>
                        <td><h6 class="eui-u-text-h6">heading-6 - h6 - M</h6></td>
                        <!-- <td>m</td> -->
                        <td><span class="eui-u-text-h6">Lorem ipsum dolor sit amet</span></td>
                    </tr>
                </tbody>
            </table>
        </eui-showcase-doc-section>



        <eui-showcase-doc-section id="Styles samples">
            <div class="doc-sample-section-title">Normal</div>

            <div class="flex-container" *ngFor="let fontSize of fontSizesUI">
                <span class="eui-u-f-{{fontSize}}">The quick brown fox jumps over the lazy dog</span>
                <div class="ml-auto">{{fontSize}}</div>
            </div>

            <div class="doc-sample-section-title">Extended charset</div>
            <div class="flex-container">
                <span style="font-size: 1rem;">Η γρήγορη καφέ αλεπού πηδάει πάνω από το τεμπέλικο σκυλί</span>
                <div class="ml-auto">1rem</div>
            </div>

            <div class="doc-sample-section-title"><em>Italic</em></div>
            <div class="flex-container" *ngFor="let fontSize of fontSizesUI">
                <span class="eui-u-f-{{fontSize}}"><em>The quick brown fox jumps over the lazy dog</em></span>
                <div class="ml-auto">{{fontSize}}</div>
            </div>

            <div class="doc-sample-section-title">Extended charset</div>
            <div class="flex-container">
                <span style="font-size: 1rem;"><em>Η γρήγορη καφέ αλεπού πηδάει πάνω από το τεμπέλικο σκυλί</em></span>
                <div class="ml-auto">1rem</div>
            </div>

            <div class="doc-sample-section-title">Extended charset</div>
            <div class="flex-container">
                <span style="font-size: 1rem;"><strong>Η γρήγορη καφέ αλεπού πηδάει πάνω από το τεμπέλικο σκυλί</strong></span>
                <div class="ml-auto">1rem</div>
            </div>


            <div class="doc-sample-section-title"><strong><em>Bold italic</em></strong></div>
            <div class="flex-container" *ngFor="let fontSize of fontSizesUI">
                <span class="eui-u-f-{{fontSize}}"><strong><em>The quick brown fox jumps over the lazy dog</em></strong></span>
                <div class="ml-auto">{{fontSize}}</div>
            </div>

            <div class="doc-sample-section-title">Extended charset</div>
            <div class="flex-container">
                <span style="font-size: 1rem;"><strong><em>Η γρήγορη καφέ αλεπού πηδάει πάνω από το τεμπέλικο σκυλί</em></strong></span>
                <div class="ml-auto">1rem</div>
            </div>

        </eui-showcase-doc-section>


        <eui-showcase-doc-section id="Font weights">

            <div class="doc-sample-section-title">Regular (default)</div>
            <div class="flex-container" *ngFor="let fontSize of fontSizesUI">
                <span class="eui-u-f-{{fontSize}}">The quick brown fox jumps over the lazy dog</span>
                <div class="ml-auto">{{fontSize}}</div>
            </div>

            <div class="doc-sample-section-title"><strong>Medium</strong></div>
            <div class="flex-container" *ngFor="let fontSize of fontSizesUI">
                <span class="eui-u-f-{{fontSize}}-medium">The quick brown fox jumps over the lazy dog</span>
                <div class="ml-auto">{{fontSize}}</div>
            </div>

            <div class="doc-sample-section-title"><strong>Semi-bold</strong></div>
            <div class="flex-container" *ngFor="let fontSize of fontSizesUI">
                <span class="eui-u-f-{{fontSize}}-semi-bold">The quick brown fox jumps over the lazy dog</span>
                <div class="ml-auto">{{fontSize}}</div>
            </div>

            <div class="doc-sample-section-title"><strong>Bold</strong></div>
            <div class="flex-container" *ngFor="let fontSize of fontSizesUI">
                <span class="eui-u-f-{{fontSize}}-bold">The quick brown fox jumps over the lazy dog</span>
                <div class="ml-auto">{{fontSize}}</div>
            </div>

        </eui-showcase-doc-section>

        <eui-showcase-doc-section id="Misc typography">

            <div class="doc-sample-section-title">eui-u-text-paragraph on Paragraph "p"</div>

            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo odit explicabo recusandae inventore dolore tempora sunt dicta
            optio! Dolorem veniam, impedit nam modi architecto beatae veritatis neque nisi id consectetur?</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo odit explicabo recusandae inventore dolore tempora sunt dicta
            optio! Dolorem veniam, impedit nam modi architecto beatae veritatis neque nisi id consectetur?</p>


            <div class="doc-sample-section-title">blockquote</div>

            <blockquote class="eui-u-text-blockquote">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi voluptatum totam impedit tempora accusamus quae voluptas
            modi maiores maxime quas dignissimos natus dolorum non obcaecati, ullam iure doloribus blanditiis, suscipit?</blockquote>


            <div class="doc-sample-section-title">hr</div>

            <hr  class="eui-u-text-hr"/>


            <div class="doc-sample-section-title">pre</div>

            <pre class="eui-u-text-pre">This text is inside pre</pre>


            <div class="doc-sample-section-title">code</div>

            Please use the following shortcut <code class="eui-u-text-code">Ctrl + F</code> to find elements on the page


            <div class="doc-sample-section-title">code inside pre</div>

            <pre class="eui-u-text-pre"><code class="eui-u-text-code">&lt;p&gt;Sample text here...&lt;/p&gt;
            &lt;p&gt;And another line of sample text here...&lt;/p&gt;
            </code></pre>



            <div class="doc-sample-section-title">kbd</div>

            To switch directories, type <kbd class="eui-u-text-kbd">cd</kbd> + <kbd class="eui-u-text-kbd">enter</kbd> followed by the name of the directory.<br> To edit settings,
            press <kbd class="eui-u-text-kbd"><kbd class="eui-u-text-kbd">Ctrl</kbd> + <kbd class="eui-u-text-kbd">T</kbd></kbd>


            <div class="doc-sample-section-title">Anchors</div>

            This is a <a href="#">link</a> to page. <br>
            This is a <a class="eui-u-text-link" href="#">link</a> to page. <br>
            This is a <a class="eui-u-text-link-external" href="#">link</a> to page. <br>
            This is a <a class="eui-u-text-link-standalone" href="#">link</a> to page. <br>


            <div class="doc-sample-section-title">mark</div>

            You can use the mark tag to <mark class="eui-u-text-mark">highlight</mark> text.


            <div class="doc-sample-section-title">hightlight</div>

            You can use the mark tag to <mark class="eui-u-text-highlight">highlight</mark> text.


            <div class="doc-sample-section-title">abbr</div>

            <p><abbr title="attribute" class="eui-u-text-abbr">attr</abbr></p>
            <p><abbr title="HyperText Markup Language" class="initialism" class="eui-u-text-abbr">HTML</abbr></p>


            <div class="doc-sample-section-title">small</div>

            <small class="eui-u-text-small">This line of text is using the small html tag.</small>
        </eui-showcase-doc-section>

    </docPageSections>
</eui-showcase-doc-page>
```
