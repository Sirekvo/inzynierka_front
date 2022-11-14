import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderEditorComponent } from './slider-editor.component';

describe('SliderEditorComponent', () => {
    let component: SliderEditorComponent;
    let fixture: ComponentFixture<SliderEditorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ SliderEditorComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SliderEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
