# showcase templates   list details flows   crud simple

```html
<eui-page>
    <eui-page-breadcrumb>
        <eui-breadcrumb>
            <eui-breadcrumb-item id="0" link="/" iconSvgName="eui-home" ariaLabel="Home"></eui-breadcrumb-item>
            <eui-breadcrumb-item id="1" label="List details flows" link="/list-details-flows"></eui-breadcrumb-item>
            <eui-breadcrumb-item id="2" label="Simple CRUD with inline edit"></eui-breadcrumb-item>
        </eui-breadcrumb>
    </eui-page-breadcrumb>

    <eui-page-header label="Todos management" subLabel="Simple CRUD todo's list with inline edition"></eui-page-header>

    <eui-page-content>

        <div class="row">
            <div class="col-md-6">
                <eui-fieldset label="Todo's list" isExpandable="false" isExpanded isLarge class="eui-u-mt-m">
                    <euiFieldsetLabelRightContent>
                        <button *ngIf="!isTaskCreate" euiButton euiSizeS euiPrimary euiOutline (click)="onTaskCreate()">
                            <eui-icon-svg icon="eui-edit"></eui-icon-svg>
                            Create a new task
                        </button>
                        <button *ngIf="isTaskCreate" euiButton euiSizeS euiDanger euiOutline (click)="onTaskCreate()">
                            <eui-icon-svg icon="eui-close"></eui-icon-svg>
                            Cancel create
                        </button>
                    </euiFieldsetLabelRightContent>

                    <div class="eui-u-flex" *ngIf="isTaskCreate || (todoService.todos$ | async).length === 0">
                        <app-todo-task-input (todoInserted)="onTodoInserted($event)"></app-todo-task-input>
                    </div>

                    <div *ngIf="(todoService.todos$ | async).length === 0; else hasTodos">
                        Todo's list is empty
                    </div>

                    <ng-template #hasTodos>
                        <app-todo-list-item *ngFor="let item of (todoService.todos$ | async)"
                            [todo]="item"
                            (todoUpdated)="onTodoUpdated(item)"
                            (todoDeleted)="onTodoDeleted(item)">
                        </app-todo-list-item>
                    </ng-template>

                </eui-fieldset>
            </div>
        </div>

    </eui-page-content>
</eui-page>


<!-- eUI Showcase related code -->
<eui-showcase-doc-page-code-fab showcase="templates" codeFolder="15-list-details-flows/01-crud-simple/">
    <p class="eui-u-text-paragraph eui-u-mt-l">
        This <strong>Todo's management list</strong> features a simple CRUD with inline edition.
        It uses a simple <strong>Todo Service</strong> which is in charge of the CRUD operations such as create, update and delete a task.
    </p>
    It uses 3 main components :
    <ul>
        <li>the Todo's <strong>list</strong>: is the main list container which displays the list of Todo's items as well as an action button to create a new task.</li>
        <li>the Todo's <strong>task creation</strong>: is a simple reactive form component from which a new task title has to be provided and added to the list.</li>
        <li>the Todo's <strong>list item</strong>: is a task with its state: active or done. A remove task action can also be performed for each item.</li>
    </ul>
</eui-showcase-doc-page-code-fab>
```
