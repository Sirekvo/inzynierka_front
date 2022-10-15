import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexDeveloperComponent } from './index-developer.component';

describe('IndexDeveloperComponent', () => {
  let component: IndexDeveloperComponent;
  let fixture: ComponentFixture<IndexDeveloperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexDeveloperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
