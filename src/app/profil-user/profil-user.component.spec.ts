import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilUserComponent } from './profil-user.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';
import { AdminModule } from '../admin/admin.module';

describe('ProfilUserComponent', () => {
  let component: ProfilUserComponent;
  let fixture: ComponentFixture<ProfilUserComponent>;

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
      declarations: [ProfilUserComponent]
    });
    fixture = TestBed.createComponent(ProfilUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
