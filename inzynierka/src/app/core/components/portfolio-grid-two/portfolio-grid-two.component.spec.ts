import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioGridTwoComponent } from './portfolio-grid-two.component';

describe('PortfolioGridTwoComponent', () => {
  let component: PortfolioGridTwoComponent;
  let fixture: ComponentFixture<PortfolioGridTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioGridTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioGridTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
