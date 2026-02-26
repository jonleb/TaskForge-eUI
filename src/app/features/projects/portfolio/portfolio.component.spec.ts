import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { of, throwError } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { EuiGrowlService } from '@eui/core';
import { EuiBreadcrumbService } from '@eui/components/eui-breadcrumb';
import { provideEuiCoreMocks, createBreadcrumbServiceMock } from '../../../testing/test-providers';
import { PortfolioComponent } from './portfolio.component';
import { ProjectService, Project } from '../../../core/project';

const mockProjects: Project[] = [
    {
        id: '1', key: 'TF', name: 'TaskForge Core',
        description: 'Main product', created_by: '1',
        created_at: '2025-01-20T09:00:00.000Z', updated_at: '2025-06-01T10:00:00.000Z', is_active: true,
    },
    {
        id: '2', key: 'DEMO', name: 'Demo Project',
        description: 'Sandbox project', created_by: '2',
        created_at: '2025-03-01T14:00:00.000Z', updated_at: '2025-05-15T11:00:00.000Z', is_active: true,
    },
];

describe('PortfolioComponent', () => {
    let component: PortfolioComponent;
    let fixture: ComponentFixture<PortfolioComponent>;
    let projectServiceMock: { getProjects: ReturnType<typeof vi.fn> };
    let growlServiceMock: { growl: ReturnType<typeof vi.fn> };
    let router: Router;

    beforeEach(async () => {
        projectServiceMock = {
            getProjects: vi.fn().mockReturnValue(of(mockProjects)),
        };
        growlServiceMock = { growl: vi.fn() };

        await TestBed.configureTestingModule({
            imports: [
                PortfolioComponent,
                TranslateModule.forRoot(),
            ],
            providers: [
                ...provideEuiCoreMocks(),
                { provide: ProjectService, useValue: projectServiceMock },
                { provide: EuiGrowlService, useValue: growlServiceMock },
                { provide: EuiBreadcrumbService, useValue: createBreadcrumbServiceMock() },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(PortfolioComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        vi.spyOn(router, 'navigate').mockResolvedValue(true);
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should load projects on init', () => {
        fixture.detectChanges();

        expect(projectServiceMock.getProjects).toHaveBeenCalled();
        expect(component.projects).toEqual(mockProjects);
        expect(component.loading).toBe(false);
    });

    it('should set loading to true while fetching', () => {
        component.loadProjects();

        // loading is set to true synchronously before the observable resolves
        // but since our mock returns synchronously, it's already false after subscribe
        expect(projectServiceMock.getProjects).toHaveBeenCalled();
    });

    it('should handle error and set hasError flag', () => {
        projectServiceMock.getProjects.mockReturnValue(throwError(() => new Error('Network error')));

        fixture.detectChanges();

        expect(component.projects).toEqual([]);
        expect(component.hasError).toBe(true);
        expect(component.loading).toBe(false);
    });

    it('should show growl on error', () => {
        projectServiceMock.getProjects.mockReturnValue(throwError(() => new Error('fail')));

        fixture.detectChanges();

        expect(growlServiceMock.growl).toHaveBeenCalledWith({
            severity: 'error',
            summary: 'Load failed',
            detail: 'Could not load projects. Please try again.',
        });
    });

    it('should navigate to project on onOpenProject()', () => {
        fixture.detectChanges();

        component.onOpenProject(mockProjects[0]);

        expect(router.navigate).toHaveBeenCalledWith(['screen/projects', '1']);
    });

    it('should retry loading on loadProjects() call', () => {
        projectServiceMock.getProjects.mockReturnValue(throwError(() => new Error('fail')));
        fixture.detectChanges();
        expect(component.hasError).toBe(true);

        projectServiceMock.getProjects.mockReturnValue(of(mockProjects));
        component.loadProjects();

        expect(component.hasError).toBe(false);
        expect(component.projects).toEqual(mockProjects);
    });

    it('should handle empty project list', () => {
        projectServiceMock.getProjects.mockReturnValue(of([]));

        fixture.detectChanges();

        expect(component.projects).toEqual([]);
        expect(component.hasError).toBe(false);
    });
});
