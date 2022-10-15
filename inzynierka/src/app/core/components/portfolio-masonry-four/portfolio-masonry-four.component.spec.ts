import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioMasonryFourComponent } from './portfolio-masonry-four.component';

describe('PortfolioMasonryFourComponent', () => {
  let component: PortfolioMasonryFourComponent;
  let fixture: ComponentFixture<PortfolioMasonryFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioMasonryFourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioMasonryFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
