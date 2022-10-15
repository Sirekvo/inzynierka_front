import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioGridThreeComponent } from './portfolio-grid-three.component';

describe('PortfolioGridThreeComponent', () => {
  let component: PortfolioGridThreeComponent;
  let fixture: ComponentFixture<PortfolioGridThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioGridThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioGridThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
