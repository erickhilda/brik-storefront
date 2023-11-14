import fetcher from "@/lib/fetcher";
import { Product } from "../types";

export default async function getProductByCategory(id: string) {
  try {
    const products = await fetcher.get<Product[]>(`product/category/${id}`);

    return products.data;
  } catch (error) {
    throw error;
  }
}
