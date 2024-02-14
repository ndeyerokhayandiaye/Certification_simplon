import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateursBloquesComponent } from './utilisateurs-bloques.component';

describe('UtilisateursBloquesComponent', () => {
  let component: UtilisateursBloquesComponent;
  let fixture: ComponentFixture<UtilisateursBloquesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
