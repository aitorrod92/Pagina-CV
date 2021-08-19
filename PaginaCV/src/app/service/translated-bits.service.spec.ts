import { TestBed } from '@angular/core/testing';

import { TranslatedBitsService } from './translated-bits.service';

describe('TranslatedBitsService', () => {
  let service: TranslatedBitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslatedBitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
