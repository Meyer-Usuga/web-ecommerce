interface ProductDescription {
  title: string;
  subtitle: string;
  price: string;
}

export interface Product {
  id?: string;
  imageUrl: string;
  alt: string;
  description?: ProductDescription;
}
