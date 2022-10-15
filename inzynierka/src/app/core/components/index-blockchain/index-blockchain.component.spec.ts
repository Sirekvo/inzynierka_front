import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexBlockchainComponent } from './index-blockchain.component';

describe('IndexBlockchainComponent', () => {
  let component: IndexBlockchainComponent;
  let fixture: ComponentFixture<IndexBlockchainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexBlockchainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexBlockchainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
