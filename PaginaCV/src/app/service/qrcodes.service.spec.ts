import { TestBed } from '@angular/core/testing';

import { QRCodesService } from './qrcodes.service';

describe('QRCodesService', () => {
  let service: QRCodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QRCodesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
