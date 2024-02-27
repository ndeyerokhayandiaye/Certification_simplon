import { TestBed } from '@angular/core/testing';

import { ServiceLoginService } from './service-login.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { baseUrl } from './url';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { AdminModule } from '../admin/admin.module';
import { CommonModule } from '@angular/common';

describe('ServiceLoginService', () => {
  let service: ServiceLoginService;

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
    service = TestBed.inject(ServiceLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
