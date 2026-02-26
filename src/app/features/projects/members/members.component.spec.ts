import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { provideEuiCoreMocks } from '../../../testing/test-providers';
import { MembersComponent } from './members.component';
import { ProjectContextService, ProjectService, Project, ProjectMember } from '../../../core/project';
import { PermissionService } from '../../../core/auth';

const mockProject: Project = {
    id: '1', key: 'TF', name: 'TaskForge Core',
    description: 'Main product', created_by: '1',
    created_at: '2025-01-20T09:00:00.000Z', updated_at: '2025-06-01T10:00:00.000Z', is_active: true,
};

const mockMembers: ProjectMember[] = [
    { id: '1', userId: '1', role: 'PROJECT_ADMIN', joined_at: '2025-01-20', firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
    { id: '2', userId: '2', role: 'DEVELOPER', joined_at: '2025-02-10', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' },
    { id: '3', userId: '3', role: 'VIEWER', joined_at: '2025-03-05', firstName: 'Bob', lastName: 'Brown', email: 'bob@example.com' },
];

describe('MembersComponent', () => {
    let fixture: ComponentFixture<MembersComponent>;
    let component: MembersComponent;
    let currentProject$: BehaviorSubject<Project | null>;
    let projectServiceMock: Record<string, ReturnType<typeof vi.fn>>;
    let permissionMock: Record<string, ReturnType<typeof vi.fn>>;

    beforeEach(async () => {
        currentProject$ = new BehaviorSubject<Project | null>(null);
        projectServiceMock = {
            getProjectMembers: vi.fn().mockReturnValue(of(mockMembers)),
            getProjects: vi.fn(),
            getProject: vi.fn(),
            getUser: vi.fn(),
            createProject: vi.fn(),
            updateProject: vi.fn(),
        };
        permissionMock = {
            isSuperAdmin: vi.fn().mockReturnValue(false),
            getUserId: vi.fn().mockReturnValue('99'),
            hasGlobalRole: vi.fn().mockReturnValue(false),
            getGlobalRole: vi.fn().mockReturnValue('USER'),
            getOriginalRole: vi.fn().mockReturnValue('USER'),
            setUser: vi.fn(),
            clear: vi.fn(),
            showAccessDenied: vi.fn(),
            hasProjectRole: vi.fn(),
        };

        await TestBed.configureTestingModule({
            imports: [MembersComponent, TranslateModule.forRoot()],
            providers: [
                ...provideEuiCoreMocks(),
                { provide: ProjectContextService, useValue: { currentProject$ } },
                { provide: ProjectService, useValue: projectServiceMock },
                { provide: PermissionService, useValue: permissionMock },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(MembersComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load members when project is set', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(projectServiceMock['getProjectMembers']).toHaveBeenCalledWith('1');
        expect(component.members).toEqual(mockMembers);
    });

    it('should display member names in table', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const cells = fixture.nativeElement.querySelectorAll('td[data-col-label="Name"]');
        expect(cells.length).toBe(3);
        expect(cells[0].textContent).toContain('John Doe');
        expect(cells[1].textContent).toContain('Jane Smith');
        expect(cells[2].textContent).toContain('Bob Brown');
    });

    it('should display member emails in table', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const cells = fixture.nativeElement.querySelectorAll('td[data-col-label="Email"]');
        expect(cells.length).toBe(3);
        expect(cells[0].textContent).toContain('john@example.com');
    });

    it('should display member roles as chips', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const chips = fixture.nativeElement.querySelectorAll('td[data-col-label="Role"] eui-chip');
        expect(chips.length).toBe(3);
        expect(chips[0].textContent).toContain('PROJECT_ADMIN');
        expect(chips[1].textContent).toContain('DEVELOPER');
        expect(chips[2].textContent).toContain('VIEWER');
    });

    it('should have aria-label on table', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const table = fixture.nativeElement.querySelector('table[aria-label="Project members"]');
        expect(table).toBeTruthy();
    });

    it('should have scope="col" on header cells', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const ths = fixture.nativeElement.querySelectorAll('th[scope="col"]');
        expect(ths.length).toBeGreaterThanOrEqual(3);
    });

    it('should show Add Member button for SUPER_ADMIN', () => {
        permissionMock['isSuperAdmin'].mockReturnValue(true);
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector('button[euibutton]');
        expect(btn).toBeTruthy();
        expect(btn.textContent).toContain('Add Member');
    });

    it('should show action buttons for SUPER_ADMIN', () => {
        permissionMock['isSuperAdmin'].mockReturnValue(true);
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const iconBtns = fixture.nativeElement.querySelectorAll('eui-icon-button');
        // 2 per row (edit + trash) × 3 rows = 6
        expect(iconBtns.length).toBe(6);
    });

    it('should hide Add Member button and actions for non-manager', () => {
        permissionMock['isSuperAdmin'].mockReturnValue(false);
        permissionMock['getUserId'].mockReturnValue('99');
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector('button[euibutton]');
        expect(btn).toBeFalsy();
        const iconBtns = fixture.nativeElement.querySelectorAll('eui-icon-button');
        expect(iconBtns.length).toBe(0);
    });

    it('should grant manager status to PROJECT_ADMIN member', () => {
        permissionMock['isSuperAdmin'].mockReturnValue(false);
        permissionMock['getUserId'].mockReturnValue('1'); // userId '1' is PROJECT_ADMIN
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.isManager).toBe(true);
        const btn = fixture.nativeElement.querySelector('button[euibutton]');
        expect(btn).toBeTruthy();
    });

    it('should set memberError on fetch failure', () => {
        projectServiceMock['getProjectMembers'] = vi.fn().mockReturnValue(throwError(() => new Error('fail')));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.memberError).toBe(true);
        expect(component.membersLoading).toBe(false);
    });

    it('should show error message in noData template on failure', () => {
        projectServiceMock['getProjectMembers'] = vi.fn().mockReturnValue(throwError(() => new Error('fail')));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const noData = fixture.nativeElement.querySelector('td.eui-u-text-center');
        expect(noData?.textContent).toContain('Unable to load members');
    });

    it('should show "No members found" when list is empty', () => {
        projectServiceMock['getProjectMembers'] = vi.fn().mockReturnValue(of([]));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const noData = fixture.nativeElement.querySelector('td.eui-u-text-center');
        expect(noData?.textContent).toContain('No members found');
    });

    it('should have data-col-label on body cells', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const nameCells = fixture.nativeElement.querySelectorAll('td[data-col-label="Name"]');
        const emailCells = fixture.nativeElement.querySelectorAll('td[data-col-label="Email"]');
        const roleCells = fixture.nativeElement.querySelectorAll('td[data-col-label="Role"]');
        expect(nameCells.length).toBe(3);
        expect(emailCells.length).toBe(3);
        expect(roleCells.length).toBe(3);
    });
});
