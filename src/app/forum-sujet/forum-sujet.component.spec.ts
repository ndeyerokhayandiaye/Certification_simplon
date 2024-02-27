import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumSujetComponent } from './forum-sujet.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminModule } from '../admin/admin.module';
import { CommonModule } from '@angular/common';

describe('ForumSujetComponent', () => {
  let component: ForumSujetComponent;
  let fixture: ComponentFixture<ForumSujetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
      NgModule,
    ActivatedRoute,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AdminModule,
    CommonModule,],
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
