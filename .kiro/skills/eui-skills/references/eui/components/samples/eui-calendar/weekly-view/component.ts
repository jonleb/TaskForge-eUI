import { Component, model, signal, TemplateRef, viewChild, WritableSignal } from '@angular/core';

import {
	EUI_CALENDAR,
	EuiCalendarDayHeaderActionOption,
	EuiCalendarEvent,
	EuiCalendarEventType,
	EuiCalendarMode,
} from '@eui/components/eui-calendar';
import { FormsModule } from '@angular/forms';
import { EuiCalendarDay } from '@eui/components/eui-calendar';
import { NgStyle } from '@angular/common';

interface ExtendedEvent extends EuiCalendarEvent {
	metadata?: WritableSignal<{
		location?: string;
		specificContract?: string;
	}>;
}

@Component({
	// tslint:disable-next-line
	selector: 'weekly-view',
	templateUrl: 'component.html',
	imports: [
		FormsModule,
		NgStyle,
		...EUI_CALENDAR
	],
})
export class WeeklyViewComponent {
	week: number = 0;
	date = new Date();
	day = viewChild<TemplateRef<EuiCalendarEvent>>('dayTemplate');
	header = viewChild<TemplateRef<EuiCalendarDay>>('dayHeaderTemplate');
	events = signal<ExtendedEvent[]>([
		{
			label: signal('Team Sprint'),
			id: crypto.randomUUID(),
			date: signal(new Date(new Date().setDate(new Date().getDate()))),
			subLabel: signal('4h'),
			type: signal(EuiCalendarEventType.info),
			metadata: signal({ location: 'Office', specificContract: 'SC 99999' }),
		},
	]);
	startDayOfWeek = model<any | null>(0);
	options = signal<Array<EuiCalendarDayHeaderActionOption> | null>([
		{
			id: '0',
			label: 'Action',
			callback: ($event: MouseEvent | KeyboardEvent) => {
				alert(`Custom action clicked`);
			},
		},
		{
			id: '1',
			label: 'Another Action',
			callback: ($event: MouseEvent | KeyboardEvent) => {
				alert(`Another action clicked`);
			},
		},
	]);
	protected readonly Mode = EuiCalendarMode;

	onTodayClicked(event: Date) {
		this.date = event;
	}
}
