import { TestBed } from '@angular/core/testing';

import { ClassListOpenedService } from './class-list-opened.service';

describe('ClassListOpenedService', () => {
  let service: ClassListOpenedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassListOpenedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
