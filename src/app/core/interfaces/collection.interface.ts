import { Product } from './product.interface';

export interface Collection {
  type: 'all' | 'men' | 'women' | 'kid';
  amount: number;
  featured: Product;
}
