import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexHospitalComponent } from './index-hospital.component';

describe('IndexHospitalComponent', () => {
  let component: IndexHospitalComponent;
  let fixture: ComponentFixture<IndexHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexHospitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
