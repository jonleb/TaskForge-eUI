# showcase templates   list details flows   crud advanced   details   :id

```html
<eui-page>
    <eui-page-header label="User management"></eui-page-header>

    <eui-page-content>

        <div class="eui-u-f-l eui-u-mb-xl eui-u-pb-m">
            <ng-template [ngIf]="!currentUser">
                Create a new user
            </ng-template>
            <ng-template [ngIf]="currentUser">
                User details for : <strong>{{currentUser.name}}</strong>
            </ng-template>
        </div>

        <form [formGroup]="form">
            <div class="row">
                <div class="col-md-6">

                    <div euiInputGroup>
                        <label euiLabel euiRequired>Username</label>
                        <div euiInputGroupAddOn>
                            <div euiInputGroupAddOnItem>
                                <eui-icon-svg icon="eui-user" fillColor="secondary"></eui-icon-svg>
                            </div>
                            <input euiInputText formControlName="username" placeholder="Type some text" />
                        </div>
                        <eui-feedback-message euiDanger *ngIf="render('username')">The user name is required</eui-feedback-message>
                    </div>

                    <div euiInputGroup>
                        <label euiLabel euiRequired>Full name</label>
                        <div euiInputGroupAddOn>
                            <div euiInputGroupAddOnItem>
                                <eui-icon-svg icon="eui-user" fillColor="secondary"></eui-icon-svg>
                            </div>
                            <input euiInputText formControlName="name" placeholder="Type some text" />
                        </div>
                        <eui-feedback-message euiDanger *ngIf="render('name')">The user's full name is required</eui-feedback-message>
                    </div>

                    <div euiInputGroup>
                        <label euiLabel euiRequired>Email</label>
                        <div euiInputGroupAddOn>
                            <div euiInputGroupAddOnItem>
                                <eui-icon-svg icon="eui-email" fillColor="secondary"></eui-icon-svg>
                            </div>
                            <input euiInputText formControlName="email" placeholder="Enter a valid email address" />
                        </div>
                        <eui-feedback-message euiDanger *ngIf="render('email')">The email address is required</eui-feedback-message>
                        <eui-feedback-message euiDanger *ngIf="checkEmail('email')">Not a valid email address</eui-feedback-message>
                    </div>
                </div>
            </div>
        </form>
    </eui-page-content>

    <eui-page-footer>
        <div class="eui-u-flex eui-u-flex-justify-content-end">
            <button euiButton euiSecondary (click)="onCancel($event)" class="eui-u-mr-s">Cancel</button>
            <button euiButton euiPrimary (click)="onSave($event)">Save</button>
        </div>
    </eui-page-footer>
</eui-page>
```
