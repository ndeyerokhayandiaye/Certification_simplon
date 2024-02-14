import { TestBed } from '@angular/core/testing';

import { ServiceDomainesService } from './service-domaines.service';

describe('ServiceDomainesService', () => {
  let service: ServiceDomainesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceDomainesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
