import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainesActivitesComponent } from './domaines-activites.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from '../admin.module';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('DomainesActivitesComponent', () => {
  let component: DomainesActivitesComponent;
  let fixture: ComponentFixture<DomainesActivitesComponent>;

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
        CommonModule],

      declarations: [DomainesActivitesComponent]
    });
    fixture = TestBed.createComponent(DomainesActivitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
