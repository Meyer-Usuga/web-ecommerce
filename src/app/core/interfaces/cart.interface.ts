import { Product } from './product.interface';

export interface Cart {
  items: CartItem[];
}

export interface CartItem extends Product {
  colorSelected: string;
  sizeSelected: string;
  quantity?: number;
}
