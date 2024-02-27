import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionUtilisateursComponent } from './gestion-utilisateurs.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CommonModule } from '@angular/common';
import { AdminModule } from '../admin.module';

describe('GestionUtilisateursComponent', () => {
  let component: GestionUtilisateursComponent;
  let fixture: ComponentFixture<GestionUtilisateursComponent>;

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
      declarations: [GestionUtilisateursComponent]
    });
    fixture = TestBed.createComponent(GestionUtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
