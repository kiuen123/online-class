import { TestBed } from '@angular/core/testing';

import { UserListOpenedService } from './user-list-opened.service';

describe('UserListOpenedService', () => {
  let service: UserListOpenedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserListOpenedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
