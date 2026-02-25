# DialogService

Programmatic modal dialogs.

## Basic Usage

```typescript
import { EuiDialogService, EuiDialogConfig } from '@eui/components/eui-dialog';

@Component({...})
export class MyComponent {
  constructor(private dialogService: EuiDialogService) {}

  openDialog() {
    const config = new EuiDialogConfig({
      title: 'Confirm Action',
      content: 'Are you sure you want to proceed?',
      accept: () => console.log('Accepted'),
      dismiss: () => console.log('Dismissed'),
    });

    this.dialogService.openDialog(config);
  }
}
```

## With Custom Component

```typescript
import { MyDialogBodyComponent } from './my-dialog-body.component';

openCustomDialog() {
  const config = new EuiDialogConfig({
    title: 'Edit User',
    bodyComponent: MyDialogBodyComponent,
    accept: (instances) => {
      const body = instances.bodyComponent;
      console.log('Form data:', body.formData);
    },
  });

  this.dialogService.openDialog(config);
}
```

## Configuration Options

```typescript
new EuiDialogConfig({
  title: 'Dialog Title',
  content: 'Simple text content',      // or use bodyComponent
  bodyComponent: MyComponent,          // custom component
  
  // Callbacks
  open: () => {},
  close: (instances) => {},
  accept: (instances) => {},
  dismiss: (instances) => {},
  clickOutside: (instances) => {},
  
  // Appearance
  width: '600px',
  height: 'auto',
  classList: 'my-custom-class',
  
  // Buttons
  acceptLabel: 'Confirm',
  dismissLabel: 'Cancel',
  hideAcceptButton: false,
  hideDismissButton: false,
  disableAcceptButton: false,
  disableDismissButton: false,
  
  // Behavior
  draggable: false,
  closeOnClickOutside: true,
  closeOnEscape: true,
});
```

## Template-Driven Alternative

For simpler cases, use the template approach:

```html
<button euiButton (click)="dialog.open()" aria-haspopup="dialog">Open</button>

<eui-dialog #dialog title="My Dialog" (accept)="onAccept()" (dismiss)="onDismiss()">
  <p>Dialog content here</p>
</eui-dialog>
```

## See Also

- [eui-dialog-service](../eui/components/eui-dialog-service.md)
- [eui-dialog-template](../eui/components/eui-dialog-template.md)
