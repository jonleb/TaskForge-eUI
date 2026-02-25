import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, beforeEach, expect } from 'vitest';
import { TranslateModule } from '@ngx-translate/core';
import { CONFIG_TOKEN, I18nService, I18nState } from '@eui/core';
import { Observable, of } from 'rxjs';
import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
    let component: UsersComponent;
    let fixture: ComponentFixture<UsersComponent>;

    beforeEach(async () => {
        type GetStateReturnType<T> = T extends keyof I18nState ? Observable<I18nState[T]> : Observable<I18nState>;

        const i18nServiceMock = {
            init: () => {},
            getState: <K extends keyof I18nState>(key?: K): GetStateReturnType<K> => {
                if (typeof key === 'string') {
                    return of({ activeLang: 'en' }[key]) as GetStateReturnType<K>;
                }
                return of({ activeLang: 'en' }) as GetStateReturnType<K>;
            },
        };

        await TestBed.configureTestingModule({
            imports: [UsersComponent, TranslateModule.forRoot()],
            providers: [
                { provide: I18nService, useValue: i18nServiceMock },
                { provide: CONFIG_TOKEN, useValue: { global: {}, modules: {} } },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(UsersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should render the page header with "User Administration"', () => {
        const header = fixture.nativeElement.querySelector('eui-page-header');
        expect(header).toBeTruthy();
        expect(header.getAttribute('label')).toBe('User Administration');
    });

    it('should render placeholder content', () => {
        const content = fixture.nativeElement.querySelector('eui-page-content p');
        expect(content).toBeTruthy();
        expect(content.textContent).toContain('User management features');
    });
});
