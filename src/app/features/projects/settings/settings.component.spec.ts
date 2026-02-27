import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { TranslateTestingModule, provideEuiCoreMocks } from '../../../testing/test-providers';
import { SettingsComponent } from './settings.component';
import { ProjectContextService, ProjectService, Project, Workflow } from '../../../core/project';

const mockProject: Project = {
    id: '1', key: 'TF', name: 'TaskForge Core',
    description: 'Main product', created_by: '1',
    created_at: '2025-01-20T09:00:00.000Z', updated_at: '2025-06-01T10:00:00.000Z', is_active: true,
};

const mockWorkflows: Workflow[] = [
    {
        id: '1', projectId: '1', ticketType: 'STORY',
        statuses: ['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'],
        transitions: { TO_DO: ['IN_PROGRESS'], IN_PROGRESS: ['IN_REVIEW', 'TO_DO'], IN_REVIEW: ['DONE', 'IN_PROGRESS'], DONE: [] },
        created_at: '2025-01-20T09:00:00.000Z',
    },
    {
        id: '2', projectId: '1', ticketType: 'BUG',
        statuses: ['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'],
        transitions: { TO_DO: ['IN_PROGRESS'], IN_PROGRESS: ['IN_REVIEW', 'TO_DO'], IN_REVIEW: ['DONE', 'IN_PROGRESS'], DONE: [] },
        created_at: '2025-01-20T09:00:00.000Z',
    },
    {
        id: '3', projectId: '1', ticketType: 'TASK',
        statuses: ['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'],
        transitions: { TO_DO: ['IN_PROGRESS'], IN_PROGRESS: ['IN_REVIEW', 'TO_DO'], IN_REVIEW: ['DONE', 'IN_PROGRESS'], DONE: [] },
        created_at: '2025-01-20T09:00:00.000Z',
    },
    {
        id: '4', projectId: '1', ticketType: 'EPIC',
        statuses: ['TO_DO', 'IN_PROGRESS', 'DONE'],
        transitions: { TO_DO: ['IN_PROGRESS'], IN_PROGRESS: ['DONE', 'TO_DO'], IN_REVIEW: [], DONE: [] },
        created_at: '2025-01-20T09:00:00.000Z',
    },
];

describe('SettingsComponent', () => {
    let fixture: ComponentFixture<SettingsComponent>;
    let component: SettingsComponent;
    let currentProject$: BehaviorSubject<Project | null>;
    let projectServiceMock: Record<string, ReturnType<typeof vi.fn>>;
    let projectContextMock: { currentProject$: BehaviorSubject<Project | null>; getCurrentProject: ReturnType<typeof vi.fn> };

    beforeEach(async () => {
        currentProject$ = new BehaviorSubject<Project | null>(null);
        projectServiceMock = {
            getWorkflows: vi.fn().mockReturnValue(of(mockWorkflows)),
        };
        projectContextMock = {
            currentProject$,
            getCurrentProject: vi.fn().mockReturnValue(mockProject),
        };

        await TestBed.configureTestingModule({
            imports: [SettingsComponent, TranslateTestingModule],
            providers: [
                ...provideEuiCoreMocks(),
                { provide: ProjectContextService, useValue: projectContextMock },
                { provide: ProjectService, useValue: projectServiceMock },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(SettingsComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call getWorkflows with project ID on init', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(projectServiceMock['getWorkflows']).toHaveBeenCalledWith('1');
    });

    it('should display 4 workflow sections for a standard project', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const sections = fixture.nativeElement.querySelectorAll('.workflow-section');
        expect(sections.length).toBe(4);
    });

    it('should show correct number of status badges for STORY workflow (4 statuses)', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const sections = fixture.nativeElement.querySelectorAll('.workflow-section');
        const storyBadges = sections[0].querySelectorAll('[euiStatusBadge]');
        expect(storyBadges.length).toBe(4);
    });

    it('should show correct number of status badges for EPIC workflow (3 statuses)', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const sections = fixture.nativeElement.querySelectorAll('.workflow-section');
        const epicBadges = sections[3].querySelectorAll('[euiStatusBadge]');
        expect(epicBadges.length).toBe(3);
    });

    it('should show loading state before project emits', () => {
        fixture.detectChanges();
        expect(component.isLoading).toBe(true);
        const loadingEl = fixture.nativeElement.querySelector('.loading-container');
        expect(loadingEl).toBeTruthy();
    });

    it('should show error state on API failure', () => {
        projectServiceMock['getWorkflows'] = vi.fn().mockReturnValue(throwError(() => new Error('fail')));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.hasError).toBe(true);
        const errorMsg = fixture.nativeElement.querySelector('eui-feedback-message');
        expect(errorMsg).toBeTruthy();
    });

    it('should show empty state when no workflows exist', () => {
        projectServiceMock['getWorkflows'] = vi.fn().mockReturnValue(of([]));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const feedbackMsg = fixture.nativeElement.querySelector('eui-feedback-message');
        expect(feedbackMsg).toBeTruthy();
        expect(feedbackMsg.textContent).toContain('settings.no-workflows');
    });

    it('should display page header with settings title', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const header = fixture.nativeElement.querySelector('eui-page-header');
        expect(header).toBeTruthy();
    });

    it('should have aria-label on transitions tables', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const tables = fixture.nativeElement.querySelectorAll('.transitions-table');
        expect(tables.length).toBe(4);
        tables.forEach((table: HTMLElement) => {
            expect(table.getAttribute('aria-label')).toBeTruthy();
        });
    });

    it('should retry loading workflows when retry button is clicked', () => {
        projectServiceMock['getWorkflows'] = vi.fn().mockReturnValue(throwError(() => new Error('fail')));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.hasError).toBe(true);

        // Now make it succeed on retry
        projectServiceMock['getWorkflows'] = vi.fn().mockReturnValue(of(mockWorkflows));
        const retryBtn = fixture.nativeElement.querySelector('button[euiButton]');
        retryBtn.click();
        fixture.detectChanges();

        expect(component.hasError).toBe(false);
        expect(component.workflows.length).toBe(4);
    });
});
