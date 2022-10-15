import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioDetailThreeComponent } from './portfolio-detail-three.component';

describe('PortfolioDetailThreeComponent', () => {
  let component: PortfolioDetailThreeComponent;
  let fixture: ComponentFixture<PortfolioDetailThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioDetailThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioDetailThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
