import { TestBed } from '@angular/core/testing';

import { BtnAgregarService } from './btn-agregar.service';

describe('BtnAgregarService', () => {
  let service: BtnAgregarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BtnAgregarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
