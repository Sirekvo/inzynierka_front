import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexSeoAgencyComponent } from './index-seo-agency.component';

describe('IndexSeoAgencyComponent', () => {
  let component: IndexSeoAgencyComponent;
  let fixture: ComponentFixture<IndexSeoAgencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexSeoAgencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexSeoAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
