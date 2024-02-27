import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SujetsComponent } from './sujets.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CommonModule } from '@angular/common';
import { AdminModule } from '../admin.module';

describe('SujetsComponent', () => {
  let component: SujetsComponent;
  let fixture: ComponentFixture<SujetsComponent>;

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
      declarations: [SujetsComponent]
    });
    fixture = TestBed.createComponent(SujetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
