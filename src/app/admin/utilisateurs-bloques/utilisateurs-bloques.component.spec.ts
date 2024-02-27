import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateursBloquesComponent } from './utilisateurs-bloques.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AdminModule } from '../admin.module';
import { CommonModule } from '@angular/common';

describe('UtilisateursBloquesComponent', () => {
  let component: UtilisateursBloquesComponent;
  let fixture: ComponentFixture<UtilisateursBloquesComponent>;

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
      declarations: [UtilisateursBloquesComponent]
    });
    fixture = TestBed.createComponent(UtilisateursBloquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
