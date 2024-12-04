import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { vetementGuard } from './vetement.guard';

describe('vetementGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => vetementGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
