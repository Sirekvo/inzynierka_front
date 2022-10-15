import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioMasonryTwoComponent } from './portfolio-masonry-two.component';

describe('PortfolioMasonryTwoComponent', () => {
  let component: PortfolioMasonryTwoComponent;
  let fixture: ComponentFixture<PortfolioMasonryTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioMasonryTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioMasonryTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
