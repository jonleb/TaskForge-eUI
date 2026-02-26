import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { EuiGrowlService } from '@eui/core';
import { provideEuiCoreMocks, createGrowlServiceMock } from '../../../testing/test-providers';
import { MembersComponent } from './members.component';
import { ProjectContextService, ProjectService, Project, ProjectMember, MemberCandidate } from '../../../core/project';
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
    let growlServiceMock: ReturnType<typeof createGrowlServiceMock>;

    beforeEach(async () => {
        currentProject$ = new BehaviorSubject<Project | null>(null);
        projectServiceMock = {
            getProjectMembers: vi.fn().mockReturnValue(of(mockMembers)),
            getProjects: vi.fn(),
            getProject: vi.fn(),
            getUser: vi.fn(),
            createProject: vi.fn(),
            updateProject: vi.fn(),
            upsertMember: vi.fn(),
            removeMember: vi.fn(),
            searchCandidates: vi.fn(),
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
        growlServiceMock = createGrowlServiceMock();

        await TestBed.configureTestingModule({
            imports: [MembersComponent, TranslateModule.forRoot()],
            providers: [
                ...provideEuiCoreMocks(),
                { provide: ProjectContextService, useValue: { currentProject$ } },
                { provide: ProjectService, useValue: projectServiceMock },
                { provide: PermissionService, useValue: permissionMock },
                { provide: EuiGrowlService, useValue: growlServiceMock },
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

    // --- Change Role Dialog tests ---

    it('should store member and pre-fill role when openChangeRoleDialog is called', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.openChangeRoleDialog(mockMembers[1]);
        expect(component.selectedMember).toEqual(mockMembers[1]);
        expect(component.newRole).toBe('DEVELOPER');
        expect(component.changeRoleError).toBe('');
    });

    it('should call upsertMember and reload on successful role change', () => {
        const updatedMember = { ...mockMembers[1], role: 'VIEWER' };
        projectServiceMock['upsertMember'] = vi.fn().mockReturnValue(of(updatedMember));
        currentProject$.next(mockProject);
        fixture.detectChanges();

        component.openChangeRoleDialog(mockMembers[1]);
        component.newRole = 'VIEWER';
        component.onChangeRole();

        expect(projectServiceMock['upsertMember']).toHaveBeenCalledWith('1', { userId: '2', role: 'VIEWER' });
        expect(growlServiceMock.growl).toHaveBeenCalledWith(expect.objectContaining({ severity: 'success' }));
        expect(component.selectedMember).toBeNull();
    });

    it('should set changeRoleError on 403 response', () => {
        const error403 = new HttpErrorResponse({
            status: 403,
            error: { message: 'Cannot modify membership of a super administrator' },
        });
        projectServiceMock['upsertMember'] = vi.fn().mockReturnValue(throwError(() => error403));
        currentProject$.next(mockProject);
        fixture.detectChanges();

        component.openChangeRoleDialog(mockMembers[0]);
        component.newRole = 'DEVELOPER';
        component.onChangeRole();

        expect(component.changeRoleError).toBe('Cannot modify membership of a super administrator');
    });

    it('should show growl error on non-403 failure', () => {
        const error500 = new HttpErrorResponse({ status: 500, error: { message: 'Server error' } });
        projectServiceMock['upsertMember'] = vi.fn().mockReturnValue(throwError(() => error500));
        currentProject$.next(mockProject);
        fixture.detectChanges();

        component.openChangeRoleDialog(mockMembers[1]);
        component.newRole = 'REPORTER';
        component.onChangeRole();

        expect(component.changeRoleError).toBe('');
        expect(growlServiceMock.growl).toHaveBeenCalledWith(expect.objectContaining({ severity: 'error' }));
    });

    it('should clear state when resetChangeRoleForm is called', () => {
        component.selectedMember = mockMembers[0];
        component.newRole = 'DEVELOPER';
        component.changeRoleError = 'some error';

        component.resetChangeRoleForm();

        expect(component.selectedMember).toBeNull();
        expect(component.newRole).toBe('');
        expect(component.changeRoleError).toBe('');
    });

    it('should expose projectRoles constant', () => {
        expect(component.projectRoles).toEqual(['PROJECT_ADMIN', 'PRODUCT_OWNER', 'DEVELOPER', 'REPORTER', 'VIEWER']);
    });

    // --- Add Member Dialog tests ---

    const mockCandidates: MemberCandidate[] = [
        { id: '10', firstName: 'Alice', lastName: 'Wonder', email: 'alice@example.com', role: 'USER' },
        { id: '11', firstName: 'Charlie', lastName: 'Root', email: 'charlie@example.com', role: 'USER' },
    ];

    it('should reset add form when openAddDialog is called', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();

        component.candidateSearch = 'old';
        component.selectedCandidate = mockCandidates[0];
        component.addError = 'old error';
        component.openAddDialog();

        expect(component.candidateSearch).toBe('');
        expect(component.selectedCandidate).toBeNull();
        expect(component.selectedAddRole).toBe('DEVELOPER');
        expect(component.addError).toBe('');
        expect(component.candidates).toEqual([]);
    });

    it('should call searchCandidates when candidateSearch has >= 2 chars', () => {
        projectServiceMock['searchCandidates'] = vi.fn().mockReturnValue(of(mockCandidates));
        currentProject$.next(mockProject);
        fixture.detectChanges();

        component.candidateSearch = 'al';
        component.onCandidateSearch();

        expect(projectServiceMock['searchCandidates']).toHaveBeenCalledWith('1', 'al');
        expect(component.candidates).toEqual(mockCandidates);
    });

    it('should clear candidates when candidateSearch has < 2 chars', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();

        component.candidates = mockCandidates;
        component.candidateSearch = 'a';
        component.onCandidateSearch();

        expect(component.candidates).toEqual([]);
    });

    it('should set selectedCandidate when selectCandidate is called', () => {
        component.selectCandidate(mockCandidates[0]);
        expect(component.selectedCandidate).toEqual(mockCandidates[0]);
        expect(component.candidateSearch).toBe('');
        expect(component.candidates).toEqual([]);
    });

    it('should call upsertMember and reload on successful add', () => {
        const newMember: ProjectMember = {
            id: '99', userId: '10', role: 'DEVELOPER', joined_at: '2025-06-01',
            firstName: 'Alice', lastName: 'Wonder', email: 'alice@example.com',
        };
        projectServiceMock['upsertMember'] = vi.fn().mockReturnValue(of(newMember));
        currentProject$.next(mockProject);
        fixture.detectChanges();

        component.selectedCandidate = mockCandidates[0];
        component.selectedAddRole = 'DEVELOPER';
        component.onAddMember();

        expect(projectServiceMock['upsertMember']).toHaveBeenCalledWith('1', { userId: '10', role: 'DEVELOPER' });
        expect(growlServiceMock.growl).toHaveBeenCalledWith(expect.objectContaining({ severity: 'success' }));
        expect(component.selectedCandidate).toBeNull();
    });

    it('should set addError on add member failure', () => {
        const error = new HttpErrorResponse({ status: 400, error: { message: 'User already a member' } });
        projectServiceMock['upsertMember'] = vi.fn().mockReturnValue(throwError(() => error));
        currentProject$.next(mockProject);
        fixture.detectChanges();

        component.selectedCandidate = mockCandidates[0];
        component.selectedAddRole = 'VIEWER';
        component.onAddMember();

        expect(component.addError).toBe('User already a member');
    });

    it('should clear all add dialog state when resetAddForm is called', () => {
        component.candidates = mockCandidates;
        component.candidateSearch = 'test';
        component.selectedCandidate = mockCandidates[0];
        component.selectedAddRole = 'VIEWER';
        component.addError = 'some error';
        component.candidateLoading = true;

        component.resetAddForm();

        expect(component.candidates).toEqual([]);
        expect(component.candidateSearch).toBe('');
        expect(component.selectedCandidate).toBeNull();
        expect(component.selectedAddRole).toBe('DEVELOPER');
        expect(component.addError).toBe('');
        expect(component.candidateLoading).toBe(false);
    });
});
