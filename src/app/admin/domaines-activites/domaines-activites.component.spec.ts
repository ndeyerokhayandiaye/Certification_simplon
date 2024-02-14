import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainesActivitesComponent } from './domaines-activites.component';

describe('DomainesActivitesComponent', () => {
  let component: DomainesActivitesComponent;
  let fixture: ComponentFixture<DomainesActivitesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
