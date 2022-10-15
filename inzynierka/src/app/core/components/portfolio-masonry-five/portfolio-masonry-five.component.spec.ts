import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioMasonryFiveComponent } from './portfolio-masonry-five.component';

describe('PortfolioMasonryFiveComponent', () => {
  let component: PortfolioMasonryFiveComponent;
  let fixture: ComponentFixture<PortfolioMasonryFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioMasonryFiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioMasonryFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
