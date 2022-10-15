import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexVideocallComponent } from './index-videocall.component';

describe('IndexVideocallComponent', () => {
  let component: IndexVideocallComponent;
  let fixture: ComponentFixture<IndexVideocallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexVideocallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexVideocallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
