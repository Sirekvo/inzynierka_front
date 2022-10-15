import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexLandingFourComponent } from './index-landing-four.component';

describe('IndexLandingFourComponent', () => {
  let component: IndexLandingFourComponent;
  let fixture: ComponentFixture<IndexLandingFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexLandingFourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexLandingFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
