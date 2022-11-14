import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRedactorComponent } from './new-redactor.component';

describe('NewRedactorComponent', () => {
    let component: NewRedactorComponent;
    let fixture: ComponentFixture<NewRedactorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ NewRedactorComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NewRedactorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
