import { DatePipe, JsonPipe, NgTemplateOutlet } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';

import { EUI_AVATAR } from '@eui/components/eui-avatar';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_COMMENT_THREAD } from '@eui/components/eui-comment-thread';
import { EuiDialogComponent, EUI_DIALOG, EuiDialogService } from '@eui/components/eui-dialog';
import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EuiGrowlService } from '@eui/core';

@Component({
    // eslint-disable-next-line
    selector: 'in-dialog',
    templateUrl: 'component.html',
    imports: [
        ...EUI_COMMENT_THREAD,
        ...EUI_AVATAR,
        ...EUI_DROPDOWN,
        ...EUI_BUTTON,
        ...EUI_ICON,
        DatePipe,
        ...EUI_DIALOG,
        NgTemplateOutlet,
    ],
    providers: [
        EuiDialogService,
    ],
})
export class InDialogComponent {
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

    @ViewChild('dialog') dialog: EuiDialogComponent;

    public openDialog(): void {
        this.dialog.openDialog();
    }

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
            setTimeout(() => {
                this.dialog.scrollToBottom();
            });
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
