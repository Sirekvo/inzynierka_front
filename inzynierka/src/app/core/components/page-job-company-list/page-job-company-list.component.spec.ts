import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageJobCompanyListComponent } from './page-job-company-list.component';

describe('PageJobCompanyListComponent', () => {
  let component: PageJobCompanyListComponent;
  let fixture: ComponentFixture<PageJobCompanyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageJobCompanyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageJobCompanyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
