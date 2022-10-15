import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioGridSixComponent } from './portfolio-grid-six.component';

describe('PortfolioGridSixComponent', () => {
  let component: PortfolioGridSixComponent;
  let fixture: ComponentFixture<PortfolioGridSixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioGridSixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioGridSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
