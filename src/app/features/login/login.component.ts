import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';

import { AuthService } from '../../core/auth';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [
        ReactiveFormsModule,
        ...EUI_BUTTON,
        ...EUI_INPUT_TEXT,
        ...EUI_LABEL,
        ...EUI_INPUT_GROUP,
        ...EUI_FEEDBACK_MESSAGE,
    ],
})
export class LoginComponent implements OnInit {
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);
    private readonly cdr = inject(ChangeDetectorRef);

    loginForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    errorMessage = '';
    isLoading = false;

    ngOnInit(): void {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/screen/home']);
        }
    }

    onSubmit(): void {
        this.loginForm.markAllAsTouched();

        if (this.loginForm.invalid) {
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';

        const username = this.loginForm.get('username')?.value ?? '';
        const password = this.loginForm.get('password')?.value ?? '';

        this.authService.login(username, password).subscribe({
            next: () => {
                this.router.navigate(['/screen/home']);
            },
            error: (err) => {
                this.isLoading = false;
                this.errorMessage = err.error?.message || 'An unexpected error occurred';
                this.cdr.detectChanges();
            },
        });
    }
}
