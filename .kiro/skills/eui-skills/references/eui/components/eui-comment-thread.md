# eui-comment-thread

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | placeholder | string | 'eui.ADD-A-COMMENT' |
| Input | textareaPosition | ('top' \| 'bottom') | 'top' |
| Input | hasTextarea | boolean | true |
| Input | currentAuthorAvatarUrl | string | null |
| Input | isOpen | boolean | false |
| Input | isCollapsable | boolean | true |
| Output | commentCancel | unknown | new EventEmitter() |
| Output | commentSend | unknown | new EventEmitter<string>() |

## Samples

### [Default](samples/eui-comment-thread/default)

```html
<eui-comment-thread isOpen [isCollapsable]="false" [currentAuthorAvatarUrl]="'assets/images/sass.png'" (commentSend)="onCommentSend($event)" (commentCancel)="onCommentCancel()">
    @for (comment of comments; track comment.id) {
        <eui-comment-item
            [authorAvatarUrl]="comment.authorAvatarUrl"
            [authorName]="comment.authorName"
            [createdAt]="comment.createdAt | date"
            [currentAuthorAvatarUrl]="'assets/images/sass.png'"
            [hasChildren]="comment.children?.length > 0"
            (commentSend)="onCommentSend($event, comment.id)"
            (commentCancel)="onCommentCancel(comment.id)">
            {{ comment.content }}

            <eui-comment-item-right-actions>
                <ng-container *ngTemplateOutlet="rightActions; context: { $implicit: comment.id }"></ng-container>
            </eui-comment-item-right-actions>

            @for (level2 of comment.children; track level2.id) {
                <eui-comment-item
                    [authorAvatarUrl]="level2.authorAvatarUrl"
                    [authorName]="level2.authorName"
                    [createdAt]="level2.createdAt | date"
                    [currentAuthorAvatarUrl]="'assets/images/sass.png'"
                    [hasChildren]="level2.children?.length > 0"
                    (commentSend)="onCommentSend($event, level2.id)"
                    (commentCancel)="onCommentCancel(level2.id)">
                    {{ level2.content }}

                    <eui-comment-item-right-actions>
                        <ng-container *ngTemplateOutlet="rightActions; context: { $implicit: level2.id }"></ng-container>
                    </eui-comment-item-right-actions>

                    @for (level3 of level2.children; track level3.id) {
                        <eui-comment-item
                            [authorAvatarUrl]="level3.authorAvatarUrl"
                            [authorName]="level3.authorName"
                            [createdAt]="level3.createdAt | date"
                            [currentAuthorAvatarUrl]="'assets/images/sass.png'"
                            [hasChildren]="level3.children?.length > 0"
                            (commentSend)="onCommentSend($event, level3.id)"
                            (commentCancel)="onCommentCancel(level3.id)">
                            {{ level3.content }}

                            <eui-comment-item-right-actions>
                                <ng-container *ngTemplateOutlet="rightActions; context: { $implicit: level3.id }"></ng-container>
                            </eui-comment-item-right-actions>

                            @for (level4 of level3.children; track level4.id) {
                                <eui-comment-item
                                    [authorAvatarUrl]="level4.authorAvatarUrl"
                                    [authorName]="level4.authorName"
                                    [createdAt]="level4.createdAt | date"
                                    [currentAuthorAvatarUrl]="'assets/images/sass.png'"
                                    (commentSend)="onCommentSend($event, level4.id)"
                                    (commentCancel)="onCommentCancel(level4.id)">
                                    {{ level4.content }}

                                    <eui-comment-item-right-actions>
                                        <ng-container *ngTemplateOutlet="rightActions; context: { $implicit: level4.id }"></ng-container>
                                    </eui-comment-item-right-actions>
                                </eui-comment-item>
                            }
                        </eui-comment-item>
                    }
                </eui-comment-item>
            }
        </eui-comment-item>
    }
</eui-comment-thread>

<ng-template #rightActions let-commentId>
    <eui-dropdown>
        <button euiButton euiRounded euiIconButton euiBasicButton euiPrimary [attr.aria-label]="'More options'">
            <eui-icon-svg icon="eui-ellipsis-vertical" size="s" />
        </button>
        <eui-dropdown-content>
            <button euiDropdownItem (click)="onEdit(commentId)" aria-label="Edit">Edit</button>
            <button euiDropdownItem (click)="onDelete(commentId)" aria-label="Delete">Delete</button>
        </eui-dropdown-content>
    </eui-dropdown>
</ng-template>
```

```typescript
import { DatePipe, JsonPipe, NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';

import { EUI_AVATAR } from '@eui/components/eui-avatar';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_COMMENT_THREAD } from '@eui/components/eui-comment-thread';
import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EuiGrowlService } from '@eui/core';

@Component({
    // eslint-disable-next-line
    selector: 'default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_COMMENT_THREAD,
        ...EUI_AVATAR,
        ...EUI_DROPDOWN,
        ...EUI_BUTTON,
        ...EUI_ICON,
        DatePipe,
        NgTemplateOutlet,
    ],
})
export class DefaultComponent {
    currentAuthorAvatarUrl = 'assets/images/sass.png';
    comments: { id: number; authorAvatarUrl: string; authorName: string; createdAt: number; content: string; children?: any[]; }[] = [{
        id: 1,
        authorAvatarUrl: 'assets/images/avatars/small/panda.png',
        authorName: 'John Panda',
        createdAt: new Date('2025-01-01T00:00:00Z').getTime(),
        content: '111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sitzzzz amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consezzzctetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dozzzzzzzzzzzlor sit amzzzet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elitzzzzt. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolzor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetzzzzzzur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscizzzng elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dozlor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit ametzzzzz consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum zzzdolor sit amet, consectetur adipiscingz elitzzzzz. In ac posuere sem. Etiamznec velit dui.111Lorem ipsum dolor sit amet, consezzzzctetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.',
    },
    {
        id: 2,
        authorAvatarUrl: 'assets/images/avatars/small/cat.png',
        authorName: 'John Cat',
        createdAt: new Date('2025-01-02T00:00:00Z').getTime(),
        content: '111Lorem ipsum dolor sit amet, ...',
    },
    {
        id: 3,
        authorAvatarUrl: 'assets/images/avatars/small/panda.png',
        authorName: 'John Panda',
        createdAt: new Date('2025-01-03T00:00:00Z').getTime(),
        content: '1111Lorem ipsum dolor sit amet, ...',
        children: [
            {
                id: 4,
                authorAvatarUrl: 'assets/images/avatars/small/bear.png',
                authorName: 'John Bear',
                createdAt: new Date('2025-01-04T00:00:00Z').getTime(),
                content: '222Lorem ipsum dolor sit amet, ...',
            },
            {
                id: 5,
                authorAvatarUrl: 'assets/images/avatars/small/cat.png',
                authorName: 'John Cat',
                createdAt: new Date('2025-01-05T00:00:00Z').getTime(),
                content: '222Lorem ipsum dolor sit amet, ...',
            },
            {
                id: 6,
                authorAvatarUrl: 'assets/images/avatars/small/bear.png',
                authorName: 'John Bear',
                createdAt: new Date('2025-01-06T00:00:00Z').getTime(),
                content: '22Lorem ipsum dolor sit amet, ...',
                children: [
                    {
                        id: 7,
                        authorAvatarUrl: 'assets/images/avatars/small/rabbit.png',
                        authorName: 'John Rabbit',
                        createdAt: new Date('2025-01-07T00:00:00Z').getTime(),
                        content: '333Lorem ipsum dolor sit amet, ...',
                        children: [
                            {
                                id: 8,
                                authorAvatarUrl: 'assets/images/avatars/small/rabbit.png',
                                authorName: 'John Rabbit',
                                createdAt: new Date('2025-01-08T00:00:00Z').getTime(),
                                content: '444 Lorem ipsum dolor sit amet, ...',
                            },
                        ],
                    },
                ],
            }],
        },
        {
            id: 10,
            authorAvatarUrl: 'assets/images/avatars/small/panda.png',
            authorName: 'John Pandaend',
            createdAt: new Date('2025-01-09T00:00:00Z').getTime(),
            content: '111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sitzzzz amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consezzzctetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dozzzzzzzzzzzlor sit amzzzet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elitzzzzt. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolzor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetzzzzzzur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscizzzng elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dozlor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit ametzzzzz consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum zzzdolor sit amet, consectetur adipiscingz elitzzzzz. In ac posuere sem. Etiamznec velit dui.111Lorem ipsum dolor sit amet, consezzzzctetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.111Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac posuere sem. Etiam nec velit dui.',
        },
    ];

    private lastId = 10;
    private growlService = inject(EuiGrowlService);

    public onCommentSend(content: string, commentId: number = null) {
        this.lastId += 1; 
        const comment = {
            id: this.lastId,
            authorAvatarUrl: 'assets/images/avatars/small/rabbit.png',
            authorName: 'John Rabbit',
            createdAt: new Date().getTime(),
            content,
        }
        this.comments = this.addCommentChild(this.comments, commentId, comment);
        
        if (commentId) {
            this.growlService.growlSuccess(`Comment added on comment ${commentId}: ${content}`);
        } else {
            this.growlService.growlSuccess(`Comment added on thread: ${content}`);
        }
    }

    public onCommentCancel(commentId?: number) {
        if (commentId) {
            this.growlService.growlSuccess(`Comment added on comment ${commentId}`);
        } else {
            this.growlService.growlSuccess(`Comment added on thread`);
        }
    }

    public onEdit(commentId?: number) {
        if (commentId) {
            this.growlService.growlSuccess(`Comment edit ${commentId}`);
        } else {
            this.growlService.growlSuccess(`Comment edit`);
        }
    }

    public onDelete(commentId?: number) {
        if (commentId) {
            this.growlService.growlSuccess(`Comment delete ${commentId}`);
        } else {
            this.growlService.growlSuccess(`Comment delete`);
        }
    }

    private addCommentChild(comments: any[], parentId: number, newChild: any): any[] {
        if (parentId === null) {
            return [...comments, newChild];
        }

        return comments.map((comment) => {
            if (comment.id === parentId) {
                const children = comment.children ? [...comment.children, newChild] : [newChild];
                return { ...comment, children };
            }

            if (comment.children) {
                const updatedChildren = this.addCommentChild(comment.children, parentId, newChild);
                if (updatedChildren !== comment.children) {
                    return { ...comment, children: updatedChildren };
                }
            }

            return comment;
        });
    }

}
```

### Other examples

- [Misc: In eui-dialog](samples/eui-comment-thread/in-dialog)
