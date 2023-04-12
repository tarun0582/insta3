import { TestBed } from '@angular/core/testing';

import { RealsService } from './reals.service';

describe('RealsService', () => {
  let service: RealsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
