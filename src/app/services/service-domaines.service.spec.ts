import { TestBed } from '@angular/core/testing';

import { ServiceDomainesService } from './service-domaines.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AdminModule } from '../admin/admin.module';

describe('ServiceDomainesService', () => {
  let service: ServiceDomainesService;

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
    service = TestBed.inject(ServiceDomainesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
