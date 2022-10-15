import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexRealEstateComponent } from './index-real-estate.component';

describe('IndexRealEstateComponent', () => {
  let component: IndexRealEstateComponent;
  let fixture: ComponentFixture<IndexRealEstateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexRealEstateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexRealEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
