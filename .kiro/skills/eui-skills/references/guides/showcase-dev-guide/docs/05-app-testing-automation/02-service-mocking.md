# Service Mocking

## Introduction
When building applications with eUI, it's common to need unit or end-to-end testing. A critical part of this process involves mocking eUI services, especially when your application heavily relies on eUI components. This document outlines various scenarios you might face in mocking eUI services and offers solutions for each.

## Component Unit Testing
Suppose you've created a component incorporating eUI elements like eui-button, eui-input-number, and eui-input-text. This component interacts with a backend service via the HttpClient module. Here's how you can approach testing:

### Example Component
```typescript
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-component',
  template: `
    <input euiInputText [(ngModel)]="name"></eui-input-text>
    <input euiInputNumber [(ngModel)]="age"></eui-input-number>
    <button euiButton (click)="submit()">Submit</eui-button>
  `
})
export class MyComponent {
  name: string;
  age: number;

  constructor(private http: HttpClient) {}

  submit() {
    this.http.post('/api/submit', { name: this.name, age: this.age });
  }
}
```

For effective testing, it's necessary to create mock classes for services like HttpClient and LocaleService (used by euiInputNumber) and integrate them into the TestBed configuration.
### TestBed Configuration
```typescript
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LocaleService, LocaleServiceMock } from '@eui/core';

import { MyComponent } from './my.component';

describe('Testing My Component', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, CommonModule, ReactiveFormsModule, EuiInputNumberDirectiveModule],
            providers: [{ provide: LocaleService, useClass: LocaleServiceMock }],
            declarations: [MyComponent],
        }).compileComponents();

        // Inject the http, test controller, and service-under-test
        // as they will be referenced by each test.
        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
    });

    mockResponse = { success: true };
    
    it('.....', () => {
        // test code
        ...
        const req = httpTestingController.expectOne('/api/submit');
        expect(req.request.method).toEqual('POST');

        // Provide each request with a mock response
        req.flush(mockResponse);
    });
})
```
This setup allows you to simulate responses and verify the behavior of your component under test conditions.

## Using Jasmine Spies for Service Testing

In some cases you might want to test a component that utilizes a service that is provided by the eUI library.
In order to do so you can use the jasmine spy functionality to mock some function calls of the service and their responses.
For that reason you will have to get the instance of the service from the TestBed and then use the jasmine spy functionality 
to mock a function call, for example the currentLocale function of the LocaleService.

```typescript
import { TestBed } from '@angular/core/testing';
import { LocaleService } from '@eui/core';

describe('Testing My Component', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [{ provide: LocaleService, useClass: LocaleServiceMock }],
        }).compileComponents();
    });

    it('.....', () => {
        // test code
        ...
        const localeService: LocaleService = TestBed.get(LocaleService);
        spyOn(localeService, 'getState').and.returnValue(of({id: 'en'}));
        ...
    });
})
```

## Mocking eUI configuration

In some cases you might want to mock the eUI configuration. For example you might want to mock the eUI configuration
in order to test the eUI components with different configurations. In order to do so you can use the EUI_CONFIG injection token
and provide a mock configuration to the TestBed configuration.

```typescript
import { TestBed } from '@angular/core/testing';
import { CoreModule as EuiCoreModule, EUI_CONFIG } from '@eui/core';

describe('Testing My Component', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EuiCoreModule.forRoot()],
            providers: [{
                provide: EUI_CONFIG_TOKEN,
                useValue: { appConfig: {}, environment: {} }
            }],
        }).compileComponents();
    });
})
```
In case you want some eUI service to be initialized with some specific configuration, you can
consult the "Advanced Concepts" section of the eUI documentation.

## Mocking an eUI Service

In some cases you might want to mock an eUI service. For example you might want to mock the I18nService
in order to test the eUI components with different locales. To do so you can create a mock class which will extend the eUI service
and provide it to the TestBed configuration.

```typescript
import { TestBed } from '@angular/core/testing';
import { I18nService } from '@eui/core';

export class I18nServiceMock extends I18nService {
    constructor() {
        super(null);
    }

    getState() {
        return of({id: 'en'});
    }
}

describe('Testing My Component', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [{ provide: I18nService, useClass: I18nServiceMock }],
        }).compileComponents();
    });
})
```
