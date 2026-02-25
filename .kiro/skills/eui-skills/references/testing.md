# Testing Guide

Testing stack for eUI Angular 21 applications.

## Stack

- **Unit Testing**: Karma + Jasmine (default), or Vitest
- **E2E Testing**: WebdriverIO + Chromedriver
- **Accessibility**: Axe-core
- **Coverage**: NYC/Istanbul

## Test File Location

Unit tests are co-located with source files:

```
src/app/
├── features/
│   └── users/
│       ├── users.component.ts
│       ├── users.component.spec.ts    ← unit test
│       ├── users.service.ts
│       └── users.service.spec.ts      ← service test
├── shared/
│   └── pipes/
│       ├── truncate.pipe.ts
│       └── truncate.pipe.spec.ts
```

E2E tests in separate folder:

```
e2e/
├── specs/
│   ├── login.e2e.ts
│   └── dashboard.e2e.ts
├── pages/                    ← page objects
│   ├── login.page.ts
│   └── dashboard.page.ts
└── wdio.conf.ts
```

Naming convention: `*.spec.ts` for unit tests, `*.e2e.ts` for E2E tests.

## Unit Testing Fundamentals

### TestBed Setup

```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('MyComponent', () => {
  let fixture: ComponentFixture<MyComponent>;
  let component: MyComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComponent], // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // trigger change detection
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### Arrange-Act-Assert Pattern

```typescript
it('should toggle isChecked when clicked', () => {
  // Arrange
  component.isChecked = false;
  
  // Act
  component.onToggle();
  
  // Assert
  expect(component.isChecked).toBeTrue();
});
```

### Querying the DOM

```typescript
// By CSS selector
const button = fixture.debugElement.query(By.css('button.submit'));

// By directive
const input = fixture.debugElement.query(By.directive(EuiInputTextDirective));

// Native element access
const element = button.nativeElement;
```

### Testing Inputs/Outputs

```typescript
it('should emit value on change', () => {
  spyOn(component.valueChange, 'emit');
  
  component.value = 'test';
  fixture.detectChanges();
  
  expect(component.valueChange.emit).toHaveBeenCalledWith('test');
});
```

### Triggering Events

```typescript
// Using triggerEventHandler
button.triggerEventHandler('click', null);

// Using dispatchEvent
button.nativeElement.dispatchEvent(new Event('click'));

fixture.detectChanges();
```

## Mocking eUI Services

### Mock Class Approach

```typescript
import { I18nService } from '@eui/core';
import { of } from 'rxjs';

export class I18nServiceMock extends I18nService {
  constructor() {
    super(null);
  }
  
  getState() {
    return of({ activeLang: 'en' });
  }
}

// In TestBed
providers: [{ provide: I18nService, useClass: I18nServiceMock }]
```

### Jasmine Spy Approach

```typescript
const localeService = TestBed.inject(LocaleService);
spyOn(localeService, 'getState').and.returnValue(of({ id: 'en' }));
```

### Mocking eUI Configuration

```typescript
import { EUI_CONFIG_TOKEN } from '@eui/core';

providers: [{
  provide: EUI_CONFIG_TOKEN,
  useValue: { appConfig: {}, environment: {} }
}]
```

## Testing Components with eUI Elements

```typescript
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LocaleService, LocaleServiceMock } from '@eui/core';

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      MyComponent,
    ],
    providers: [
      { provide: LocaleService, useClass: LocaleServiceMock }
    ],
  }).compileComponents();
  
  httpTestingController = TestBed.inject(HttpTestingController);
});

it('should submit data', () => {
  component.submit();
  
  const req = httpTestingController.expectOne('/api/submit');
  expect(req.request.method).toEqual('POST');
  req.flush({ success: true });
});
```

## Shallow vs Deep Rendering

### Shallow (Unit Test)

Ignore child components:

```typescript
import { NO_ERRORS_SCHEMA } from '@angular/core';

TestBed.configureTestingModule({
  declarations: [ParentComponent],
  schemas: [NO_ERRORS_SCHEMA], // ignore unknown elements
});
```

### Deep (Integration Test)

Include child components:

```typescript
TestBed.configureTestingModule({
  imports: [ParentComponent, ChildComponent],
});
```

### Fake Components

```typescript
@Component({ selector: 'app-child', template: '' })
class FakeChildComponent {
  @Input() data: any;
  @Output() action = new EventEmitter();
}

// Find and interact
const child = fixture.debugElement.query(By.directive(FakeChildComponent));
const childInstance = child.componentInstance as FakeChildComponent;
childInstance.action.emit('test');
```

## E2E Testing with WebdriverIO

### Page Object Pattern

```typescript
// pages/login.page.ts
class LoginPage {
  get usernameInput() { return $('input[name="username"]'); }
  get passwordInput() { return $('input[name="password"]'); }
  get loginButton() { return $('button[type="submit"]'); }
  
  async login(username: string, password: string) {
    await this.usernameInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }
}

export default new LoginPage();
```

### Test Example

```typescript
import LoginPage from '../pages/login.page';

describe('Login', () => {
  it('should login successfully', async () => {
    await browser.url('/login');
    await LoginPage.login('user', 'pass');
    await expect($('.dashboard')).toBeDisplayed();
  });
});
```

## Coverage

```bash
# Run tests with coverage
npm run test:coverage

# Thresholds (typical)
# - Statements: 80%
# - Branches: 75%
# - Functions: 80%
# - Lines: 80%
```

## Commands

```bash
# Unit tests
yarn test

# Unit tests with watch
yarn test:watch

# Coverage report
yarn test:coverage

# E2E tests
yarn e2e
```

## See Also

- [Full unit testing docs](guides/showcase-dev-guide/docs/05-app-testing-automation/01-unit-testing.md)
- [Service mocking](guides/showcase-dev-guide/docs/05-app-testing-automation/02-service-mocking.md)
