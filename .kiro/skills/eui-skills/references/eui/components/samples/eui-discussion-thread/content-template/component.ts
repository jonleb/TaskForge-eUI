import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { uniqueId, markFormGroupTouched, EuiGrowlService } from '@eui/core';
import { EUI_DISCUSSION_THREAD, EuiDiscussionThreadItem } from "@eui/components/eui-discussion-thread";

@Component({
    // eslint-disable-next-line
    selector: 'contentTemplate',
    templateUrl: 'component.html',
    imports: [...EUI_DISCUSSION_THREAD],
})
export class ContentTemplateComponent implements OnInit {
    dateToday: string = new Date('06/08/1987').toISOString();

    newMessages: EuiDiscussionThreadItem[];

    messages: EuiDiscussionThreadItem[] = [
        {
            id:uniqueId(),
            typeClass: 'secondary',
            date: new Date('06/08/1987').toISOString(),
            author: 'Name Firstname',
            body: 'This is the content of the message <b>body.</b>',
            tooltip: 'secondary tooltip message',
        },
        {
            id:uniqueId(),
            typeClass: 'primary',
            date: new Date('06/08/1987').toISOString(),
            author: 'Name Firstname',
            body: 'This is the content of the message body',
            tooltip: 'primary tooltip message',
        },
        {
            id:uniqueId(),
            typeClass: 'info',
            date: new Date('06/08/1987').toISOString(),
            author: 'Name Firstname',
            body: 'This is the content of the message body',
            tooltip: 'info tooltip message',
        },
        {
            id:uniqueId(),
            typeClass: 'success',
            date: new Date('06/08/1987').toISOString(),
            author: 'Name Firstname',
            body: 'This is the content of the message body',
            tooltip: 'success tooltip message',
        },
        {
            id:uniqueId(),
            typeClass: 'warning',
            date: new Date('06/08/1987').toISOString(),
            author: 'Name Firstname',
            body: 'This is the content of the message body',
            tooltip: 'warning tooltip message',
        },
        {
            id:uniqueId(),
            typeClass: 'danger',
            date: new Date('06/08/1987').toISOString(),
            author: 'Name Firstname',
            body: 'This is the content of the message body',
            tooltip: 'danger tooltip message',
        },
        {
            id:uniqueId(),
            typeClass: 'accent',
            date: new Date('06/08/1987').toISOString(),
            author: 'Name Firstname',
            body: 'This is the content of the message body',
            tooltip: 'accent tooltip message',
        },
    ];

    messagesModal: EuiDiscussionThreadItem[] = [
        {
            id:uniqueId(),
            typeClass: 'secondary',
            date: new Date('06/08/1987').toISOString(),
            author: 'Name Firstname',
            body: 'This is the content of the message <b>body.</b>',
            tooltip: 'Comment tooltip message',
        },
    ];

    formValidation: FormGroup;

    selectOptions: any[] = [
        { id: 'com', value: 'Comment' },
        { id: 'sug', value: 'Suggestion' },
        { id: 'cla', value: 'Clarification' },
        { id: 'rfc', value: 'Request for Change' },
    ];

    constructor(private fb: FormBuilder, public growlService: EuiGrowlService,) { }

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm(): void {

        this.formValidation = this.fb.group({
            'inputMessage': [null, [Validators.required]],
            'selectValue': [null, [Validators.required]],
        });

    }

    onFormSubmit(event: any) {
        markFormGroupTouched(this.formValidation.controls);
        if (this.formValidation.valid) {
            switch (this.formValidation.value.selectValue) {
                case 'sug':
                    this.messagesModal.push({
                        id:uniqueId(),
                        typeClass: 'accent',
                        date: new Date('06/08/1987').toISOString(),
                        author: 'Name Firstname',
                        body: this.formValidation.value.inputMessage,
                        tooltip: 'Suggestion',
                    });
                    break;
                case 'cla':
                    this.messagesModal.push({
                        id:uniqueId(),
                        typeClass: 'warning',
                        date: new Date('06/08/1987').toISOString(),
                        author: 'Name Firstname',
                        body: this.formValidation.value.inputMessage,
                        tooltip: 'Clarification',
                    });
                    break;
                case 'rfc':
                    this.messagesModal.push({
                        id:uniqueId(),
                        typeClass: 'danger',
                        date: new Date('06/08/1987').toISOString(),
                        author: 'Name Firstname',
                        body: this.formValidation.value.inputMessage,
                        tooltip: 'Request for Change',
                    });
                    break;
                default:
                    this.messagesModal.push({
                        id:uniqueId(),
                        typeClass: 'secondary',
                        date: new Date('06/08/1987').toISOString(),
                        author: 'Name Firstname',
                        body: this.formValidation.value.inputMessage,
                        tooltip: '',
                    });
                    break;
            }
            this.growlService.growlSuccess('Message successfully send...');
            this.formValidation.reset();
        } else {
            this.growlService.growlError('Mandatory fields are missing !');
        }
    }

    onReset(event: any) {
        this.newMessages = [];
        setTimeout(() => {
            this.newMessages = this.messages;
        }, 250);

    }
}
