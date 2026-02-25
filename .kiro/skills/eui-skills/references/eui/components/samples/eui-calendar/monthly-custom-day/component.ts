import { Component, model, signal, TemplateRef, viewChild, WritableSignal } from '@angular/core';

import {
	EUI_CALENDAR,
	EuiCalendarEvent,
	EuiCalendarEventType,
	EuiCalendarMode,
} from '@eui/components/eui-calendar';
import { FormsModule } from '@angular/forms';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { NgStyle } from '@angular/common';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_STATUS_BADGE } from '@eui/components/eui-status-badge';

interface ExtendedEvent extends EuiCalendarEvent {
	metadata?: WritableSignal<{
		location?: string;
		specificContract?: string;
	}>;
}

@Component({
	// tslint:disable-next-line
	selector: 'monthly-custom-day',
	templateUrl: 'component.html',
	imports: [
		NgStyle,
		FormsModule,
		...EUI_CALENDAR,
		...EUI_CHIP,
		...EUI_LABEL,
		...EUI_STATUS_BADGE,
	],
})
export class MonthlyCustomDayComponent {
	week: number = 0;
	date = new Date();
	day = viewChild<TemplateRef<ExtendedEvent>>('dayTemplate');

	events = signal<ExtendedEvent[]>([
		{
			label: signal('Team Sprint'),
			id: crypto.randomUUID(),
			date: signal(new Date(new Date().setDate(new Date().getDate() - 1))),
			subLabel: signal('4h'),
			type: signal(EuiCalendarEventType.info),
			metadata: signal({ location: 'Office', specificContract: 'SC 99999' }),
		},
		{
			label: signal('Team Meeting'),
			id: crypto.randomUUID(),
			date: signal(new Date(new Date().setDate(new Date().getDate() + 1))),
			subLabel: signal('7h'),
			type: signal(EuiCalendarEventType.primary),
			metadata: signal({ location: 'Standard', specificContract: 'SC 99999' }),
		},
		{
			label: signal('Client Call'),
			id: crypto.randomUUID(),
			type: signal(EuiCalendarEventType.warning),
			date: signal(new Date()),
			subLabel: signal('3h'),
		},
		{
			label: signal('Project Review'),
			id: crypto.randomUUID(),
			date: signal(new Date(new Date().setDate(new Date().getDate() - 2))),
			subLabel: signal('1h'),
		},
		{
			label: signal('Lunch with Sarah'),
			id: crypto.randomUUID(),
			date: signal(new Date()),
			subLabel: signal('8h'),
		},
		{
			label: signal('Webinar'),
			id: crypto.randomUUID(),
			date: signal(new Date(new Date().setDate(new Date().getDate() + 2))),
			subLabel: signal('Webinar'),
		},
	]);
	startDayOfWeek = model<any | null>(0);
	protected readonly Mode = EuiCalendarMode;
	protected readonly EventType = EuiCalendarEventType;

	onTodayClicked(event: Date) {
		this.date = event;
	}
}
