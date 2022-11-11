import { TestBed } from '@angular/core/testing';

import { PqvDataService } from './data.service';

describe('DataService', () => {
  let service: PqvDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PqvDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
