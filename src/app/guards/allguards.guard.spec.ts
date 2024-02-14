import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { allguardsGuard } from './allguards.guard';

describe('allguardsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => allguardsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
