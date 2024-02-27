import { TestBed } from '@angular/core/testing';

import { ForumSujetService } from './forum-sujet.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from '../admin/admin.module';
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';

describe('ForumSujetService', () => {
  let service: ForumSujetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        AdminModule,
        CommonModule,],

    });
    service = TestBed.inject(ForumSujetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
