import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditiondutilisationComponent } from './conditiondutilisation.component';

describe('ConditiondutilisationComponent', () => {
  let component: ConditiondutilisationComponent;
  let fixture: ComponentFixture<ConditiondutilisationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConditiondutilisationComponent]
    });
    fixture = TestBed.createComponent(ConditiondutilisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
