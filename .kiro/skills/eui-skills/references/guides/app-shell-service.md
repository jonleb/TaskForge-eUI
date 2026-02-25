# app shell service

```html
<eui-showcase-doc-page id="EuiAppShellService">
    <docPageSections>

        <eui-showcase-doc-section id="Overview">
            <p>
                The EuiappShellService gathers helpers / state of your eUI application.
            </p>
            <p>
                You can programatically control some inner state if needed, and subscribe to provided slices to do some action your side,
                or fine-grain the control of the layout (respond to breakpoints f.e.)
            </p>
            <br>

            To use it within your component code, you just need to declare into the constructor :
            <pre><code class="language-javascript eui-u-c-bg-secondary-bg-light" euiCode>{{ asServiceUsageJS }}</code></pre>

            <p>
                Click on the <strong>playground</strong> button to explore the available options to build your App shell.
            </p>
            <br>
            <button euiButton euiPrimary (click)="onDialogOpen()">Open playground</button>
        </eui-showcase-doc-section>


        <eui-showcase-doc-section id="Features">

            <table class="eui-table-default eui-table-default--responsive eui-table-default--compact eui-table-default--shadowed eui-table-default--align-middle">
                <thead>
                    <tr>
                        <th class="eui-u-width-16">Feature</th>
                        <th>Code sample</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="2" class="eui-u-text-h5 eui-u-f-bold">
                            Sidebar
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Toggle sidebar
                        </td>
                        <td>
                            <pre><code class="language-javascript" euiCode>
this.asService.sidebarToggle();
                            </code></pre>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Open / close sidebar
                        </td>
                        <td>
                            <pre><code class="language-javascript" euiCode>
this.asService.isSidebarOpen = true | false;
                            </code></pre>
                        </td>
                    </tr>

                    <tr>
                        <td colspan="2" class="eui-u-text-h5 eui-u-f-bold">
                            Breakpoints
                        </td>
                    </tr>
                    <tr>
                        <td>
                            breakpoints$ state
                        </td>
                        <td>
                            <pre><code class="language-javascript" euiCode>{{ breakpointsStateJS }}</code></pre>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            breakpoint$ state
                        </td>
                        <td>
                            <pre><code class="language-javascript" euiCode>{{ breakpointStateJS }}</code></pre>
                        </td>
                    </tr>




                    <tr>
                        <td colspan="2" class="eui-u-text-h5 eui-u-f-bold">
                            Dimensions
                        </td>
                    </tr>
                    <tr>
                        <td>
                            windowHeight/windowWidth sub-states
                            <br><br>
                            listened within the eui-app, to avoid having this within your code, as this listener is quite costly, it's debounced only single time per app
                        </td>
                        <td>
                            <pre><code class="language-javascript" euiCode>{{ windowHeightWidthJS }}</code></pre>
                        </td>
                    </tr>





                    <tr>
                        <td colspan="2" class="eui-u-text-h5 eui-u-f-bold">
                            Device Info
                        </td>
                    </tr>
                    <tr>
                        <td>
                            deviceInfo sub-state
                        </td>
                        <td>
                            <pre><code class="language-javascript" euiCode>{{ deviceInfoJS }}</code></pre>

                            <br><strong>Your current deviceInfo : </strong>

                            <pre><code class="language-javascript" euiCode>
{{ (asService.state$ | async).deviceInfo | json }}
                            </code></pre>
                        </td>
                    </tr>









                    <tr>
                        <td colspan="2" class="eui-u-text-h5 eui-u-f-bold">
                            Language list
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Set custom languages list
                        </td>
                        <td>
                            <pre><code class="language-javascript" euiCode>{{ languageSetStateJS }}</code></pre>
                        </td>
                    </tr>
                </tbody>
            </table>

        </eui-showcase-doc-section>

    </docPageSections>
</eui-showcase-doc-page>

<eui-dialog #dialog
    [title]="'eui-app generator'" (close)="onDialogClose()"
    [height]="'90vh'" [width]="'95vw'">
    <app-shell-modal></app-shell-modal>
</eui-dialog>
```
