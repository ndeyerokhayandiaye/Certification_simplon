import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumSujetSpecificComponent } from './forum-sujet-specific.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminModule } from '../admin/admin.module';
import { CommonModule } from '@angular/common';

describe('ForumSujetSpecificComponent', () => {
  let component: ForumSujetSpecificComponent;
  let fixture: ComponentFixture<ForumSujetSpecificComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        RouterModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        AdminModule,
        CommonModule,],
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
