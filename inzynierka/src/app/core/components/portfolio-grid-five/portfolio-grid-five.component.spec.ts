import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioGridFiveComponent } from './portfolio-grid-five.component';

describe('PortfolioGridFiveComponent', () => {
  let component: PortfolioGridFiveComponent;
  let fixture: ComponentFixture<PortfolioGridFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioGridFiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioGridFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
