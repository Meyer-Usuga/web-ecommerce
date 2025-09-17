interface ProductDescription {
  title: string;
  subtitle: string;
  price: string;
}

export interface ImageColor {
  color: string;
  imageUrl: string;
}

//TODO: Las propiedades size, color, deberían ser listas, ya que pueden tener variaciones
export interface Product {
  id: string;
  imageUrl: string;
  alt: string;
  description?: ProductDescription;
  size?: string[];
  color?: ImageColor[];
  collection?: string;
  special?: string | null;
  category?: string;
  availability?: string;
  rating?: string;
}
