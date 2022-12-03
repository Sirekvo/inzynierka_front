import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCreator } from './post-creator.component';

describe('PostCreator', () => {
  let component: PostCreator;
  let fixture: ComponentFixture<PostCreator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCreator ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCreator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
