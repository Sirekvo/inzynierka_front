import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostEditionComponent } from './post-edition.component';

describe('PostEditionComponent', () => {
  let component: PostEditionComponent;
  let fixture: ComponentFixture<PostEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostEditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
