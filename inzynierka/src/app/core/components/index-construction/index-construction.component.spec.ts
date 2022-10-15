import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexConstructionComponent } from './index-construction.component';

describe('IndexConstructionComponent', () => {
  let component: IndexConstructionComponent;
  let fixture: ComponentFixture<IndexConstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexConstructionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexConstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
