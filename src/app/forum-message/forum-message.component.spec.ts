import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumMessageComponent } from './forum-message.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminModule } from '../admin/admin.module';
import { CommonModule } from '@angular/common';

describe('ForumMessageComponent', () => {
  let component: ForumMessageComponent;
  let fixture: ComponentFixture<ForumMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        AdminModule,
        CommonModule,],

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
