# showcase templates   list details flows   crud advanced

```html
<eui-page>
    <eui-page-breadcrumb>
        <eui-breadcrumb>
            <eui-breadcrumb-item id="0" link="/" iconSvgName="eui-home" ariaLabel="Home"></eui-breadcrumb-item>
            <eui-breadcrumb-item id="1" label="List details flows" link="/list-details-flows"></eui-breadcrumb-item>
            <eui-breadcrumb-item id="2" label="Advanced CRUD with in page edit"></eui-breadcrumb-item>
        </eui-breadcrumb>
    </eui-page-breadcrumb>

    <eui-page-header label="Advanced template" subLabel="Advanced Users management CRUD with in page edit"></eui-page-header>

    <eui-page-content>

        <eui-card euiNoContentPadding>
            <eui-card-header>
                <eui-card-header-title>
                    LIST OF USERS
                    <span class="eui-u-f-regular eui-u-ml-s">
                        <span euiBadge>{{users.length}}</span> result<span *ngIf="users.length > 1">s</span> found
                    </span>
                </eui-card-header-title>

                <eui-card-header-right-content class="eui-u-flex-gap-m">
                    <button euiButton euiPrimary (click)="onCreateUser($event)">
                        <eui-icon-svg icon="eui-add"></eui-icon-svg>
                        Create a new user
                    </button>
                    <eui-table-filter euiResponsive #filter placeholder="Search filter..."></eui-table-filter>
                </eui-card-header-right-content>
            </eui-card-header>

            <eui-card-content>

                <!-- The optional scrollable wrapper around the table allows dynamic scroll when the table is too big -->
                <div class="eui-table__scrollable-wrapper">
                    <table euiTable isTableResponsive [data]="users" [filter]="filter" [paginator]="paginator">
                        <ng-template euiTemplate="header">
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th class="eui-u-text-center">Actions</th>
                            </tr>
                        </ng-template>
                        <ng-template let-user euiTemplate="body">
                            <tr>
                                <td><eui-badge euiSecondary>{{ user.id }}</eui-badge></td>
                                <td>{{ user.username }}</td>
                                <td>{{ user.name }}</td>
                                <td>
                                    <div class="eui-u-flex">
                                        <eui-icon-svg icon="eui-email" class="eui-u-mr-xs"></eui-icon-svg>
                                        <a class="eui-u-text-link" href="mailto:{{ user.email }}">{{ user.email }}</a>
                                    </div>
                                </td>
                                <td>
                                    <div class="eui-u-flex eui-u-flex-justify-content-center">
                                        <button euiButton euiBasicButton euiRounded euiIconButton euiPrimary euiTooltip="Edit" (click)="onEditUser(user)">
                                            <eui-icon-svg icon="eui-edit" fillColor="primary"></eui-icon-svg>
                                        </button>
                                        <button euiButton euiBasicButton euiRounded euiIconButton euiDanger euiTooltip="Delete" (click)="onDeleteUser(user)">
                                            <eui-icon-svg icon="eui-trash" fillColor="danger"></eui-icon-svg>
                                        </button>
                                        <eui-dropdown euiTooltip="More actions">
                                            <button euiButton euiBasicButton euiIconButton euiRounded euiPrimary>
                                                <eui-icon-svg icon="eui-ellipsis-vertical" size="m" fillColor="primary"></eui-icon-svg>
                                            </button>
                                            <eui-dropdown-content>
                                                <button euiDropdownItem (click)="onAddPicture(user)">
                                                    <eui-icon-svg icon="eui-image" size="m" fillColor="secondary" class="eui-u-mr-s" />
                                                    Add picture
                                                </button>
                                                <button euiDropdownItem (click)="onAddComment(user)">
                                                    <eui-icon-svg icon="chat-centered-text:regular" size="s" fillColor="secondary" class="eui-u-mr-s" />
                                                    Leave a comment
                                                </button>
                                            </eui-dropdown-content>
                                        </eui-dropdown>
                                    </div>
                                </td>
                            </tr>
                        </ng-template>
                    </table>
                </div>
                <eui-paginator #paginator [pageSizeOptions]="[5, 10, 25, 50, 100]" [pageSize]="5" hasPageNumberNavigation [nbPageNumberNavigation]="5"></eui-paginator>

            </eui-card-content>
        </eui-card>

    </eui-page-content>
</eui-page>

<eui-message-box #messageBox
    euiDanger
    [title]="'Confirm user deletion'"
    (accept)="onAccept()"
    (dismiss)="onDismiss()">
    <div>
        <p class="eui-u-text-paragraph">Are you sure you want to delete the user</p>
        <p class="eui-u-text-paragraph"><strong>{{selectedUser?.name}}</strong>?</p>
    </div>
</eui-message-box>


<!-- eUI Showcase related code -->
<eui-showcase-doc-page-code-fab showcase="templates" codeFolder="15-list-details-flows/05-crud-advanced/">
    <p class="eui-u-text-paragraph">
        This <strong>Advanced Users management list</strong> features advanced CRUD with in page edition.
        It uses an <strong>Http Users Service</strong> which is in charge of the CRUD operations (get, put, post, delete).
    </p>
    <p class="eui-u-text-paragraph">The in page edition is reached by navigating through the <strong>router outlet</strong> and passing the user Id through the Url params (see defined routes).</p>

    It uses 2 main components :
    <ul>
        <li>the User's <strong>list</strong>: uses an <code class="eui-u-text-code">eui-card</code> containing an <code class="eui-u-text-code">eui-table</code> for displaying the users' list items as well as the actions for each table row.</li>
        <li>the User's <strong>details</strong>: is an edit page, displaying the user detailed information (or when creating a new user), using Angular's reactive forms with save and cancel actions.</li>
    </ul>
</eui-showcase-doc-page-code-fab>
```
