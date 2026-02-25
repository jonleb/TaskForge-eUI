# BreadcrumbService

Dynamic breadcrumb generation from route metadata.

## Setup

Create the service (not provided by eUI, implement yourself):

```typescript
@Injectable({ providedIn: 'root' })
export class EuiBreadcrumbService {
  public breadcrumbs$ = new BehaviorSubject<IBreadcrumb[]>([]);

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.buildBreadcrumbs());
  }

  private buildBreadcrumbs() {
    // Parse route tree and build breadcrumbs
  }
}
```

## Route Configuration

```typescript
// Static breadcrumb
{
  path: 'users',
  component: UsersComponent,
  data: { breadcrumbs: 'Users' }
}

// Dynamic breadcrumb with resolver data
{
  path: 'users/:id',
  component: UserDetailComponent,
  data: { breadcrumbs: '{{ user.name }}' },
  resolve: { user: UserResolver }
}

// Use URL fragment
{
  path: 'settings',
  component: SettingsComponent,
  data: { breadcrumbs: true }  // uses 'settings'
}
```

## Usage in Template

```typescript
@Component({
  template: `
    <eui-breadcrumb [items]="breadcrumbs$ | async"></eui-breadcrumb>
  `
})
export class AppComponent {
  breadcrumbs$ = this.breadcrumbService.breadcrumbs$;
  
  constructor(private breadcrumbService: EuiBreadcrumbService) {}
}
```

## Breadcrumb Interface

```typescript
interface IBreadcrumb {
  text: string;
  path: string;
}
```

## See Also

- [Full breadcrumb docs](../guides/showcase-dev-guide/docs/10-services/breadcrumb.md)
- [eui-breadcrumb component](../eui/layout-components/eui-breadcrumb.md)
