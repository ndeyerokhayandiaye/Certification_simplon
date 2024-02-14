import { TestBed } from '@angular/core/testing';

import { ForumSujetService } from './forum-sujet.service';

describe('ForumSujetService', () => {
  let service: ForumSujetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForumSujetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
