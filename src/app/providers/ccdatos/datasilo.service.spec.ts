import { TestBed } from '@angular/core/testing';

import { DatasiloService } from './datasilo.service';

describe('DatasiloService', () => {
  let service: DatasiloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatasiloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
