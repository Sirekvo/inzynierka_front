import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioModernTwoComponent } from './portfolio-modern-two.component';

describe('PortfolioModernTwoComponent', () => {
  let component: PortfolioModernTwoComponent;
  let fixture: ComponentFixture<PortfolioModernTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioModernTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioModernTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
