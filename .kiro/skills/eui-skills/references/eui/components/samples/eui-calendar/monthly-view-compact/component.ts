import { Component, model, signal, TemplateRef, viewChild, WritableSignal } from '@angular/core';

import { EUI_CALENDAR, EuiCalendarEvent, EuiCalendarEventType, EuiCalendarMode } from '@eui/components/eui-calendar';
import { FormsModule } from '@angular/forms';
import { EUI_BUTTON } from '@eui/components/eui-button';

interface ExtendedEvent extends EuiCalendarEvent {
	metadata?: WritableSignal<{
		location?: string;
		specificContract?: string;
	}>;
}

@Component({
	// tslint:disable-next-line
	selector: 'monthly-view-compact',
	templateUrl: 'component.html',
	imports: [
		FormsModule,
		...EUI_CALENDAR,
		...EUI_BUTTON,
	],
	styles: [`
        .custom-day {
            text-align: center;
            align-content: center;
        }
	`],
})
export class MonthlyViewCompactComponent {
	todayNumber: number = new Date().getDay();
	week: number = 0;
	date = new Date();
	day = viewChild<TemplateRef<EuiCalendarEvent>>('dayTemplate');

	eventList = [...Array(5).fill({
		label: signal('Long Meetings'),
		id: crypto.randomUUID(),
		date: signal(new Date(new Date().setDate(new Date().getDate() - 1))),
		subLabel: signal('8h'),
		type: signal(EuiCalendarEventType.danger),
		metadata: signal({ location: 'Standard', specificContract: 'SC 99999' }),
	})].map((event, index) => {
		event.id = crypto.randomUUID();
		event.label = signal('label');
		event.subLabel = signal(Math.random() > 0.5 ? 'All Day' : `${Math.floor(Math.random() * 8) + 1}h`);
		return event;
	});

	events = signal<ExtendedEvent[]>([
		...this.eventList,
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
			subLabel: signal('Team Meeting'),
			type: signal(EuiCalendarEventType.primary),
			metadata: signal({ location: 'Standard', specificContract: 'SC 99999' }),
		},
		{
			label: signal('Client Call'),
			id: crypto.randomUUID(),
			type: signal(EuiCalendarEventType.warning),
			date: signal(new Date()),
			subLabel: signal('Client Call'),
		},
		{
			label: signal('Project Review'),
			id: crypto.randomUUID(),
			date: signal(new Date(new Date().setDate(new Date().getDate() - 2))),
			subLabel: signal('Project Review'),
		},
		{
			label: signal('Lunch with Sarah'),
			id: crypto.randomUUID(),
			date: signal(new Date()),
			subLabel: signal('Lunch with Sarah'),
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

	onTodayClicked(event: Date) {
		this.date = event;
	}

	protected readonly isNaN = isNaN;
}
