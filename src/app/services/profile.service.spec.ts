import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';
import { AdminModule } from '../admin/admin.module';

describe('ProfileService', () => {
  let service: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        // FormsModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        // HttpClientModule,
        ReactiveFormsModule,
        AdminModule,
        CommonModule,],

    });
    service = TestBed.inject(ProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
