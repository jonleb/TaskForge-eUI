import { Component, inject, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EUI_TABLE } from '@eui/components/eui-table';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EuiTemplateDirective } from '@eui/components/directives';
import { EuiDialogComponent } from '@eui/components/eui-dialog';
import { EuiInputTextComponent } from '@eui/components/eui-input-text';
import { EuiTextareaComponent } from '@eui/components/eui-textarea';
import { EuiHelperTextComponent } from '@eui/components/eui-helper-text';
import { EuiGrowlService } from '@eui/core';
import { EuiBreadcrumbService } from '@eui/components/eui-breadcrumb';
import { ProjectService, Project, CreateProjectPayload } from '../../../core/project';
import { PermissionService } from '../../../core/auth';

function keyFormatValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    return /^[A-Z0-9]{2,10}$/.test(value) ? null : { keyFormat: true };
}

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ReactiveFormsModule,
        ...EUI_PAGE,
        ...EUI_TABLE,
        ...EUI_BUTTON,
        ...EUI_LABEL,
        ...EUI_INPUT_GROUP,
        ...EUI_FEEDBACK_MESSAGE,
        EuiTemplateDirective,
        EuiDialogComponent,
        EuiInputTextComponent,
        EuiTextareaComponent,
        EuiHelperTextComponent,
    ],
})
export class PortfolioComponent implements OnInit {
    private readonly projectService = inject(ProjectService);
    private readonly permissionService = inject(PermissionService);
    private readonly router = inject(Router);
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly growlService = inject(EuiGrowlService);
    private readonly breadcrumbService = inject(EuiBreadcrumbService);
    private readonly fb = inject(FormBuilder);

    @ViewChild('createDialog') createDialog!: EuiDialogComponent;

    projects: Project[] = [];
    loading = false;
    hasError = false;
    isSuperAdmin = false;
    createError = '';

    createForm: FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        key: ['', [keyFormatValidator]],
        description: [''],
    });

    ngOnInit(): void {
        this.isSuperAdmin = this.permissionService.isSuperAdmin();
        this.breadcrumbService.setBreadcrumb([
            { id: 'projects', label: 'Projects', link: null },
        ]);
        this.loadProjects();
    }

    loadProjects(): void {
        this.loading = true;
        this.hasError = false;
        this.projectService.getProjects().subscribe({
            next: projects => {
                this.projects = projects;
                this.loading = false;
                this.cdr.markForCheck();
            },
            error: () => {
                this.projects = [];
                this.loading = false;
                this.hasError = true;
                this.growlService.growl({
                    severity: 'error',
                    summary: 'Load failed',
                    detail: 'Could not load projects. Please try again.',
                });
                this.cdr.markForCheck();
            },
        });
    }

    onOpenProject(project: Project): void {
        this.router.navigate(['screen/projects', project.id]);
    }

    onKeyInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        input.value = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        this.createForm.get('key')?.setValue(input.value, { emitEvent: false });
    }

    onCreateProject(): void {
        if (this.createForm.invalid) {
            this.createForm.markAllAsTouched();
            return;
        }

        this.createError = '';
        const payload: CreateProjectPayload = {
            name: this.createForm.get('name')?.value.trim(),
            description: this.createForm.get('description')?.value?.trim() || undefined,
            key: this.createForm.get('key')?.value || undefined,
        };

        this.projectService.createProject(payload).subscribe({
            next: project => {
                this.createDialog.closeDialog();
                this.resetCreateForm();
                this.growlService.growl({
                    severity: 'success',
                    summary: 'Project created',
                    detail: `${project.name} (${project.key}) has been created.`,
                });
                this.router.navigate(['screen/projects', project.id]);
            },
            error: err => {
                if (err.status === 409) {
                    this.createError = err.error?.message || 'A project with this name or key already exists';
                } else {
                    this.growlService.growl({
                        severity: 'error',
                        summary: 'Creation failed',
                        detail: err.error?.message || 'Could not create project. Please try again.',
                    });
                }
                this.cdr.markForCheck();
            },
        });
    }

    resetCreateForm(): void {
        this.createForm.reset();
        this.createError = '';
    }
}
