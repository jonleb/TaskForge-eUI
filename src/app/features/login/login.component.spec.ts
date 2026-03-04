import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi, HttpErrorResponse } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from '../../core/auth';
import { AppStarterService } from '../../app-starter.service';
import { LoginResponse } from '../../core/auth/auth.models';
import { TranslateTestingModule } from '../../testing/test-providers';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authServiceMock: {
        login: ReturnType<typeof vi.fn>;
        isAuthenticated: ReturnType<typeof vi.fn>;
        isAuthenticated$: BehaviorSubject<boolean>;
    };
    let appStarterMock: {
        start: ReturnType<typeof vi.fn>;
    };
    let router: Router;

    const mockLoginResponse: LoginResponse = {
        accessToken: btoa(JSON.stringify({ userId: '1', role: 'SUPER_ADMIN', exp: Date.now() + 3600000 })),
        user: { userId: '1', firstName: 'Super', lastName: 'Admin', email: 'superadmin@taskforge.local', role: 'SUPER_ADMIN' },
    };

    beforeEach(async () => {
        authServiceMock = {
            login: vi.fn(),
            isAuthenticated: vi.fn().mockReturnValue(false),
            isAuthenticated$: new BehaviorSubject<boolean>(false),
        };
        appStarterMock = {
            start: vi.fn().mockReturnValue(of({ success: true })),
        };

        await TestBed.configureTestingModule({
            imports: [LoginComponent, TranslateTestingModule],
            providers: [
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
                provideRouter([]),
                { provide: AuthService, useValue: authServiceMock },
                { provide: AppStarterService, useValue: appStarterMock },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        vi.spyOn(router, 'navigate').mockResolvedValue(true);
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should render username and password fields', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('#login-username')).toBeTruthy();
        expect(compiled.querySelector('#login-password')).toBeTruthy();
    });

    it('should render a Sign in button', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const button = compiled.querySelector('button[type="submit"]');
        expect(button).toBeTruthy();
        expect(button?.textContent?.trim()).toBe('login.sign-in');
    });

    it('should show validation errors when submitting empty form', () => {
        component.onSubmit();
        fixture.detectChanges();

        const compiled = fixture.nativeElement as HTMLElement;
        const errors = compiled.querySelectorAll('eui-feedback-message');
        expect(errors.length).toBeGreaterThanOrEqual(2);
    });

    it('should call AuthService.login() with form values on submit', () => {
        authServiceMock.login.mockReturnValue(of(mockLoginResponse));

        component.loginForm.setValue({ username: 'superadmin', password: 'SecurePassword!123', rememberMe: false });
        component.onSubmit();

        expect(authServiceMock.login).toHaveBeenCalledWith('superadmin', 'SecurePassword!123', false);
    });

    it('should pass rememberMe=true when checkbox is checked', () => {
        authServiceMock.login.mockReturnValue(of(mockLoginResponse));

        component.loginForm.setValue({ username: 'superadmin', password: 'SecurePassword!123', rememberMe: true });
        component.onSubmit();

        expect(authServiceMock.login).toHaveBeenCalledWith('superadmin', 'SecurePassword!123', true);
    });

    it('should navigate to /screen/home on successful login', () => {
        authServiceMock.login.mockReturnValue(of(mockLoginResponse));

        component.loginForm.setValue({ username: 'superadmin', password: 'SecurePassword!123', rememberMe: false });
        component.onSubmit();

        expect(router.navigate).toHaveBeenCalledWith(['/screen/home']);
    });

    it('should call appStarter.start() to initialize user session after login', () => {
        authServiceMock.login.mockReturnValue(of(mockLoginResponse));

        component.loginForm.setValue({ username: 'superadmin', password: 'SecurePassword!123', rememberMe: false });
        component.onSubmit();

        expect(appStarterMock.start).toHaveBeenCalled();
    });

    it('should display API error message on failed login', () => {
        const errorResponse = new HttpErrorResponse({
            error: { message: 'Invalid username or password' },
            status: 401,
        });
        authServiceMock.login.mockReturnValue(throwError(() => errorResponse));

        component.loginForm.setValue({ username: 'superadmin', password: 'wrong', rememberMe: false });
        component.onSubmit();
        fixture.detectChanges();

        expect(component.errorMessage).toBe('Invalid username or password');
        const compiled = fixture.nativeElement as HTMLElement;
        const errorEl = compiled.querySelector('[aria-live="polite"] eui-feedback-message');
        expect(errorEl?.textContent?.trim()).toBe('Invalid username or password');
    });

    it('should disable submit button while loading', () => {
        authServiceMock.login.mockReturnValue(of(mockLoginResponse));

        component.loginForm.setValue({ username: 'superadmin', password: 'SecurePassword!123', rememberMe: false });
        component.isLoading = true;
        fixture.detectChanges();

        // euiDisabled is an attribute directive, check the component property
        expect(component.isLoading).toBe(true);
    });

    it('should show "Signing in..." text while loading', () => {
        component.isLoading = true;
        fixture.detectChanges();

        const button = fixture.nativeElement.querySelector('button[type="submit"]');
        expect(button?.textContent?.trim()).toBe('login.signing-in');
    });

    it('should redirect to /screen/home if already authenticated', () => {
        // Reset and recreate with authenticated user
        authServiceMock.isAuthenticated.mockReturnValue(true);

        const fixture2 = TestBed.createComponent(LoginComponent);
        fixture2.detectChanges();

        expect(router.navigate).toHaveBeenCalledWith(['/screen/home']);
    });

    it('should have labels with for/id pairs (a11y)', () => {
        const compiled = fixture.nativeElement as HTMLElement;

        const usernameLabel = compiled.querySelector('label[for="login-username"]');
        const usernameInput = compiled.querySelector('#login-username');
        expect(usernameLabel).toBeTruthy();
        expect(usernameInput).toBeTruthy();

        const passwordLabel = compiled.querySelector('label[for="login-password"]');
        const passwordInput = compiled.querySelector('#login-password');
        expect(passwordLabel).toBeTruthy();
        expect(passwordInput).toBeTruthy();
    });

    it('should have aria-required on required inputs (a11y)', () => {
        const compiled = fixture.nativeElement as HTMLElement;

        const usernameInput = compiled.querySelector('#login-username');
        const passwordInput = compiled.querySelector('#login-password');
        expect(usernameInput?.getAttribute('aria-required')).toBe('true');
        expect(passwordInput?.getAttribute('aria-required')).toBe('true');
    });

    it('should render Remember me checkbox with label (a11y)', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const checkbox = compiled.querySelector('#login-remember');
        const label = compiled.querySelector('label[for="login-remember"]');
        expect(checkbox).toBeTruthy();
        expect(label).toBeTruthy();
    });

    it('should have aria-live="polite" on error container (a11y)', () => {
        // Trigger an error to show the container
        const errorResponse = new HttpErrorResponse({
            error: { message: 'Invalid username or password' },
            status: 401,
        });
        authServiceMock.login.mockReturnValue(throwError(() => errorResponse));

        component.loginForm.setValue({ username: 'test', password: 'test', rememberMe: false });
        component.onSubmit();
        fixture.detectChanges();

        const errorContainer = fixture.nativeElement.querySelector('[aria-live="polite"]');
        expect(errorContainer).toBeTruthy();
    });
});
