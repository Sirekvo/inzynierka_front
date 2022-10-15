import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioClassicSixComponent } from './portfolio-classic-six.component';

describe('PortfolioClassicSixComponent', () => {
  let component: PortfolioClassicSixComponent;
  let fixture: ComponentFixture<PortfolioClassicSixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioClassicSixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioClassicSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
