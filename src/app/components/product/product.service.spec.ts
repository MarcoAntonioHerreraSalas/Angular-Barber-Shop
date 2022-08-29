import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let product: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    product = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(product).toBeTruthy();
  });
});
