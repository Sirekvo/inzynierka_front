import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexFinanceComponent } from './index-finance.component';

describe('IndexFinanceComponent', () => {
  let component: IndexFinanceComponent;
  let fixture: ComponentFixture<IndexFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexFinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
