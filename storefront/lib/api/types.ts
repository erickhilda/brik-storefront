export interface ProductCategory {
  id: number;
  name: string;
  path: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category_id: number;
}