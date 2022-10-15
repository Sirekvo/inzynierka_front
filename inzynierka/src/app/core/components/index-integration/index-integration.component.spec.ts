import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexIntegrationComponent } from './index-integration.component';

describe('IndexIntegrationComponent', () => {
  let component: IndexIntegrationComponent;
  let fixture: ComponentFixture<IndexIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexIntegrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
