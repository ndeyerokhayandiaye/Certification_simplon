import { TestBed } from '@angular/core/testing';

import { ServiceForumService } from './service-forum.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { AdminModule } from '../admin/admin.module';
import { CommonModule } from '@angular/common';

describe('ServiceForumService', () => {
  let service: ServiceForumService;

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
    service = TestBed.inject(ServiceForumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
