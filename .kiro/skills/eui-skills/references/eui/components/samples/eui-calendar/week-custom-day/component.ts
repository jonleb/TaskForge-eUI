import { Component, model, signal, TemplateRef, viewChild, WritableSignal } from '@angular/core';

import { EUI_CALENDAR, EuiCalendarEvent, EuiCalendarEventType, EuiCalendarMode } from '@eui/components/eui-calendar';
import { FormsModule } from '@angular/forms';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_DASHBOARD_CARD } from '@eui/components/eui-dashboard-card';
import { EUI_STATUS_BADGE } from '@eui/components/eui-status-badge';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_ICON_BUTTON } from '@eui/components/eui-icon-button';
import { NgStyle } from '@angular/common';
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_AVATAR } from '@eui/components/eui-avatar';


interface ExtendedEvent extends EuiCalendarEvent {
	metadata?: WritableSignal<{
		location?: string;
		specificContract?: string;
	}>;
}

@Component({
	// tslint:disable-next-line
	selector: 'week-custom-day',
	templateUrl: 'component.html',
	imports: [
		FormsModule,
		...EUI_CALENDAR,
		...EUI_CARD,
		NgStyle,
	],
})
export class WeekCustomDayComponent {
	week: number = 0;
	date = new Date();
	day = viewChild<TemplateRef<Event>>('dayTemplate');

	events = signal<ExtendedEvent[]>(this.getEventsForTheWeek(new Date()));
	startDayOfWeek = model<any | null>(0);
	protected readonly Mode = EuiCalendarMode;

	/**
	 * Create a list of events for each of the 7 days in the week. Using Lorem
	 * Ipsum to generate random event labels. Each event is allocated randomly
	 * across the week. Each day should contain between 1 and 8 events.
	 */
	getEventsForTheWeek(day: Date): ExtendedEvent[] {
		const allEvents: ExtendedEvent[] = [];

		// Get the start of the week (Sunday as first day, adjust if needed)
		const startOfWeek = new Date(day);
		startOfWeek.setDate(day.getDate() - day.getDay());
		startOfWeek.setHours(0, 0, 0, 0);

		// Generate events for each day of the week (7 days)
		for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
			const currentDay = new Date(startOfWeek);
			currentDay.setDate(startOfWeek.getDate() + dayOffset);

			// Each day gets between 1 and 8 events
			const eventCount = Math.floor(Math.random() * 8) + 1;

			for (let i = 0; i < eventCount; i++) {
				allEvents.push({
					label: signal('label'),
					id: crypto.randomUUID(),
					date: signal(new Date(currentDay)),
					subLabel: signal(Math.random() > 0.5 ? 'All Day' : `${Math.floor(Math.random() * 8) + 1}h`),
					type: signal([EuiCalendarEventType.primary, EuiCalendarEventType.info, EuiCalendarEventType.warning, EuiCalendarEventType.danger][Math.floor(Math.random() * 4)]),
					metadata: signal({
						// 4 choices one, two, three, four (evenly distributed)
						type: ['One', 'Two', 'Three', 'Four'][Math.floor(Math.random() * 4)],
						location: Math.random() > 0.5 ? 'Office' : 'Standard',
						specificContract: `SC ${Math.floor(Math.random() * 90000) + 10000}`,
					}),
				});
			}
		}

		return allEvents;
	}
}
