import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCryptoTwoComponent } from './index-crypto-two.component';

describe('IndexCryptoTwoComponent', () => {
  let component: IndexCryptoTwoComponent;
  let fixture: ComponentFixture<IndexCryptoTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCryptoTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCryptoTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
