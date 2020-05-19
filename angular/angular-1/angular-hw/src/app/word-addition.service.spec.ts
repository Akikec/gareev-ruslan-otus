import { TestBed } from '@angular/core/testing';

import { WordAdditionService } from './word-addition.service';

describe('WordAdditionService', () => {
  let service: WordAdditionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordAdditionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
