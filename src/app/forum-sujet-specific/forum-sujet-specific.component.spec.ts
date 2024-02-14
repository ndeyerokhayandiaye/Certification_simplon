import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumSujetSpecificComponent } from './forum-sujet-specific.component';

describe('ForumSujetSpecificComponent', () => {
  let component: ForumSujetSpecificComponent;
  let fixture: ComponentFixture<ForumSujetSpecificComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForumSujetSpecificComponent]
    });
    fixture = TestBed.createComponent(ForumSujetSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
