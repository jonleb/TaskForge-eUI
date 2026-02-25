import { Component } from '@angular/core';
import { EuiInputTextComponent } from '@eui/components/eui-input-text';
import { EuiLabelComponent } from '@eui/components/eui-label';
import { EuiSncComponent } from '@eui/components/eui-snc';
import { EuiTextareaComponent } from '@eui/components/eui-textarea';
import { EuiInputGroupComponent } from '@eui/components/eui-input-group';

@Component({
	// eslint-disable-next-line
	selector: 'Default',
	templateUrl: 'component.html',
	imports: [
		EuiInputTextComponent,
		EuiLabelComponent,
		EuiSncComponent,
		EuiTextareaComponent,
		EuiInputGroupComponent,
	],
})
export class DefaultComponent {
}
