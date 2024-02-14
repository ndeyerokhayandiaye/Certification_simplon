import { TestBed } from '@angular/core/testing';

import { ServiceForumService } from './service-forum.service';

describe('ServiceForumService', () => {
  let service: ServiceForumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceForumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
