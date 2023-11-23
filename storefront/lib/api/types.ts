export type ProductCategory = {
  id: number;
  name: string;
  path: string;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}

export type Product = {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category_id: number;
  description: string;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}

