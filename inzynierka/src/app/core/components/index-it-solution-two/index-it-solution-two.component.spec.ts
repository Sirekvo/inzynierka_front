import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexItSolutionTwoComponent } from './index-it-solution-two.component';

describe('IndexItSolutionTwoComponent', () => {
  let component: IndexItSolutionTwoComponent;
  let fixture: ComponentFixture<IndexItSolutionTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexItSolutionTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexItSolutionTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
