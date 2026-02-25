# showcase design system   design tokens   full palettes

```html
<eui-showcase-doc-page id="Colors">

    <docPageSections>

        <!-- <eui-showcase-doc-section id="Default theme">
            <div class="row">
                <div class="col-sm-4 col-lg-3 col-xxl-2 col-xxxl-2 eui-u-mb-xl" *ngFor="let colorType of colorTypeKeys">
                    <div class="eui-u-text-h5 eui-u-mb-s">{{getColorType(colorType)}}</div>

                    <div *ngFor="let shade of colorTypes[colorType];" class="eui-showcase-raw-color-{{colorType}}-{{shade}}">
                        <div class="eui-u-flex eui-u-p-xs">
                            <span>{{shade}}</span>
                            <span class="eui-u-ml-auto eui-showcase-raw-color-value-{{colorType}}-{{shade}}"></span>
                            <span class="eui-u-ml-auto eui-u-f-s eui-showcase-ratio-{{colorType}}-{{shade}}"></span>
                        </div>
                    </div>
                </div>
            </div>
        </eui-showcase-doc-section> -->

        <eui-showcase-doc-section id="Default palette">
            <ng-container *ngFor="let colorType of colorTypeKeys">
                <div class="eui-u-flex eui-u-mb-xs">
                    <div class="eui-u-width-10">{{getColorType(colorType)}}</div>
                    <div class="eui-u-flex eui-u-flex-gap-xs">
                        <span *ngFor="let shade of colorTypes[colorType];" class="eui-showcase-raw-color-{{colorType}}-{{shade}} eui-u-p-s eui-u-f-s">
                            {{shade}}
                            <!-- <span class="eui-u-ml-auto eui-showcase-raw-color-value-{{colorType}}-{{shade}}"></span>
                            <span class="eui-u-ml-auto eui-u-f-xs eui-showcase-ratio-{{colorType}}-{{shade}}"></span> -->
                        </span>                        
                    </div>
                </div>
            </ng-container>
        </eui-showcase-doc-section>


        <eui-showcase-doc-section id="Other color palettes - Tailwind">

            <ng-container *ngFor="let colorType of colorTypeKeysRaw">
                <div class="eui-u-flex eui-u-mb-xs">
                    <div class="eui-u-width-10">{{colorType}}</div>
                    <div class="eui-u-flex eui-u-flex-gap-xs">
                        <span *ngFor="let shade of colorTypesRaw[colorType];" class="eui-showcase-raw-color-{{colorType}}-{{shade}} eui-u-p-s eui-u-f-s">{{shade}}</span>                        
                    </div>
                </div>
            </ng-container>
        </eui-showcase-doc-section>        


        <eui-showcase-doc-section id="Other color palettes - ECL color modes">

            <ng-container *ngFor="let colorType of colorTypeKeysRawEcl">
                <div class="eui-u-flex eui-u-mb-xs">
                    <div class="eui-u-width-10">{{colorType}}</div>
                    <div class="eui-u-flex eui-u-flex-gap-xs">
                        <span *ngFor="let shade of colorTypesRawEcl[colorType];" class="eui-showcase-raw-color-{{colorType}}-{{shade}} eui-u-p-s eui-u-f-s">{{shade}}</span>                        
                    </div>
                </div>
            </ng-container>
        </eui-showcase-doc-section>


    </docPageSections>
</eui-showcase-doc-page>
```
