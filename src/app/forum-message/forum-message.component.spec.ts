import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumMessageComponent } from './forum-message.component';

describe('ForumMessageComponent', () => {
  let component: ForumMessageComponent;
  let fixture: ComponentFixture<ForumMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForumMessageComponent]
    });
    fixture = TestBed.createComponent(ForumMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
