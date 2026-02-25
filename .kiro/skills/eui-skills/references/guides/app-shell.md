# app shell

```html
<eui-showcase-doc-page id="eui-app">

    <docPageSections>
        <eui-showcase-doc-section id="Overview">
            <p class="eui-u-text-paragraph">
                The "shell" of eUI is the mandatory element of your application.
            </p>
            <p class="eui-u-text-paragraph">
                Once you generate a default <code class="eui-u-text-code">&#64;eui/cli</code> application, the default setup is located in your <code class="eui-u-text-code">app.component.ts/html</code> files at the root of your src/app folder.
            </p>
            <br>
            <p class="eui-u-text-paragraph">
                Click on the <strong>generator</strong> here to explore the available options available to build your shell.
            </p>
        </eui-showcase-doc-section>

        <eui-showcase-doc-section id="Generator">
            <button euiButton euiPrimary (click)="onDialogOpen()">Open generator interactive</button>
        </eui-showcase-doc-section>
    </docPageSections>
</eui-showcase-doc-page>


<eui-dialog #dialog
    [title]="'eui-app generator'" (close)="onDialogClose()"
    [height]="'90vh'" [width]="'95vw'">
    @if (dialog.isOpen) {
        <app-shell-modal-interactive></app-shell-modal-interactive>
    }
</eui-dialog>
```
