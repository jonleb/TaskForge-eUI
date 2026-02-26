import { Component, inject, OnInit, OnDestroy, AfterViewInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EUI_TABLE, Sort } from '@eui/components/eui-table';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EuiTemplateDirective } from '@eui/components/directives';
import { EuiDialogComponent } from '@eui/components/eui-dialog';
import { EuiInputTextComponent } from '@eui/components/eui-input-text';
import { EuiTextareaComponent } from '@eui/components/eui-textarea';
import { EuiHelperTextComponent } from '@eui/components/eui-helper-text';
import { EuiPaginatorComponent } from '@eui/components/eui-paginator';
import { EUI_TOGGLE_GROUP, EuiToggleGroupItemComponent } from '@eui/components/eui-toggle-group';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EuiIconButtonComponent } from '@eui/components/eui-icon-button';
import { EuiGrowlService } from '@eui/core';
import { EuiBreadcrumbService } from '@eui/components/eui-breadcrumb';
import { ProjectService, Project, CreateProjectPayload, UpdateProjectPayload, ProjectListParams } from '../../../core/project';
import { PermissionService } from '../../../core/auth';

function keyFormatValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    return /^[A-Z0-9]{2,10}$/.test(value) ? null : { keyFormat: true };
}

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.scss'],
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
        EuiPaginatorComponent,
        ...EUI_TOGGLE_GROUP,
        ...EUI_CHIP,
        EuiIconButtonComponent,
    ],
})
export class PortfolioComponent implements OnInit, AfterViewInit, OnDestroy {
    private readonly projectService = inject(ProjectService);
    private readonly permissionService = inject(PermissionService);
    private readonly router = inject(Router);
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly growlService = inject(EuiGrowlService);
    private readonly breadcrumbService = inject(EuiBreadcrumbService);
    private readonly fb = inject(FormBuilder);
    private readonly destroy$ = new Subject<void>();
    private readonly searchSubject = new Subject<string>();
    private paginatorReady = false;

    @ViewChild('createDialog') createDialog!: EuiDialogComponent;
    @ViewChild('editDialog') editDialog!: EuiDialogComponent;

    projects: Project[] = [];
    total = 0;
    loading = false;
    hasError = false;
    isSuperAdmin = false;
    createError = '';
    editError = '';
    selectedProject: Project | null = null;
    activeStatusFilter: 'all' | 'active' | 'inactive' = 'all';

    params: ProjectListParams = {
        _page: 1,
        _limit: 10,
        _sort: 'name',
        _order: 'asc',
    };

    createForm: FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        key: ['', [keyFormatValidator]],
        description: [''],
    });

    editForm: FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        description: [''],
    });

    ngOnInit(): void {
        this.isSuperAdmin = this.permissionService.isSuperAdmin();
        this.breadcrumbService.setBreadcrumb([
            { id: 'projects', label: 'Projects', link: null },
        ]);

        this.searchSubject.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            takeUntil(this.destroy$),
        ).subscribe(q => {
            this.params = { ...this.params, q: q || undefined, _page: 1 };
            this.loadProjects();
        });

        this.loadProjects();
    }

    ngAfterViewInit(): void {
        this.paginatorReady = true;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    loadProjects(): void {
        this.loading = true;
        this.hasError = false;
        this.projectService.getProjects(this.params).subscribe({
            next: res => {
                this.projects = res.data;
                this.total = res.total;
                this.loading = false;
                this.cdr.markForCheck();
            },
            error: () => {
                this.projects = [];
                this.total = 0;
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

    onFilterChange(searchTerm: string): void {
        this.searchSubject.next(searchTerm);
    }

    onSortChange(sort: Sort[]): void {
        if (sort.length > 0) {
            this.params = {
                ...this.params,
                _sort: sort[0].sort,
                _order: sort[0].order.toLowerCase() as 'asc' | 'desc',
                _page: 1,
            };
        }
        this.loadProjects();
    }

    onPageChange(event: { page: number; pageSize: number }): void {
        if (!this.paginatorReady) return;
        this.params = {
            ...this.params,
            _page: event.page + 1,
            _limit: event.pageSize,
        };
        this.loadProjects();
    }

    onStatusFilterChange(item: EuiToggleGroupItemComponent): void {
        const filterMap: Record<string, 'all' | 'active' | 'inactive'> = {
            'status-all': 'all',
            'status-active': 'active',
            'status-inactive': 'inactive',
        };
        this.activeStatusFilter = filterMap[item.id] ?? 'all';

        const isActiveMap: Record<string, 'true' | 'false' | undefined> = {
            'all': undefined,
            'active': 'true',
            'inactive': 'false',
        };
        this.params = {
            ...this.params,
            is_active: isActiveMap[this.activeStatusFilter],
            _page: 1,
        };
        this.loadProjects();
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

    openEditDialog(project: Project): void {
        this.selectedProject = project;
        this.editError = '';
        this.editForm.patchValue({
            name: project.name,
            description: project.description || '',
        });
        this.editForm.markAsUntouched();
        this.editDialog.openDialog();
    }

    onUpdateProject(): void {
        if (this.editForm.invalid) {
            this.editForm.markAllAsTouched();
            return;
        }
        if (!this.selectedProject) return;

        this.editError = '';
        const payload: UpdateProjectPayload = {
            name: this.editForm.get('name')?.value.trim(),
            description: this.editForm.get('description')?.value?.trim() ?? '',
        };

        this.projectService.updateProject(this.selectedProject.id, payload).subscribe({
            next: updated => {
                this.editDialog.closeDialog();
                this.resetEditForm();
                this.growlService.growl({
                    severity: 'success',
                    summary: 'Project updated',
                    detail: `${updated.name} has been updated.`,
                });
                this.loadProjects();
            },
            error: err => {
                if (err.status === 409) {
                    this.editError = err.error?.message || 'A project with this name already exists';
                } else {
                    this.growlService.growl({
                        severity: 'error',
                        summary: 'Update failed',
                        detail: err.error?.message || 'Could not update project. Please try again.',
                    });
                }
                this.cdr.markForCheck();
            },
        });
    }

    resetEditForm(): void {
        this.editForm.reset();
        this.editError = '';
        this.selectedProject = null;
    }

    get emptyStateMessage(): string {
        if (this.hasError) {
            return 'Could not load projects. Please try again.';
        }
        if (this.params.q) {
            return 'No projects match your search criteria.';
        }
        if (this.activeStatusFilter === 'active') {
            return 'No active projects found.';
        }
        if (this.activeStatusFilter === 'inactive') {
            return 'No inactive projects found.';
        }
        return 'No projects available.';
    }
}
