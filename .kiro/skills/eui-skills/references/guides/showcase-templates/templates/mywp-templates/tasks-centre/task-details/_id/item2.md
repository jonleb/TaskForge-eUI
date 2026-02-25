# showcase templates   templates   mywp templates   tasks centre   task details   :id   item2

```html
<eui-card label="Documents" [euiHighlighted]="(uiStateService.state$ | async).isEditActive">
    <eui-card-content>
        
        <form [formGroup]="form" enctype="multipart/form-data" class="eui-u-flex">
            <div euiInputGroup>
                <label euiLabel>Choose file(s) from your device :</label>
                <eui-file-upload formControlName="image" [progress]="progress" hasPreviewAsIcon="true" hasPreviewAsImage="false" hasDragArea>
                    <button euiButton euiPrimary (click)="submit()" class="eui-u-mr-m">Submit</button>
                </eui-file-upload>
            </div>
        </form>

    </eui-card-content>
</eui-card>
```
