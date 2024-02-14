import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumSujetComponent } from './forum-sujet.component';

describe('ForumSujetComponent', () => {
  let component: ForumSujetComponent;
  let fixture: ComponentFixture<ForumSujetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForumSujetComponent]
    });
    fixture = TestBed.createComponent(ForumSujetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
