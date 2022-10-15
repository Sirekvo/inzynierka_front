import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexFreelancerComponent } from './index-freelancer.component';

describe('IndexFreelancerComponent', () => {
  let component: IndexFreelancerComponent;
  let fixture: ComponentFixture<IndexFreelancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexFreelancerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexFreelancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
