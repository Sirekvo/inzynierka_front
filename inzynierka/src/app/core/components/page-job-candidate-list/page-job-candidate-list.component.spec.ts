import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageJobCandidateListComponent } from './page-job-candidate-list.component';

describe('PageJobCandidateListComponent', () => {
  let component: PageJobCandidateListComponent;
  let fixture: ComponentFixture<PageJobCandidateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageJobCandidateListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageJobCandidateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
