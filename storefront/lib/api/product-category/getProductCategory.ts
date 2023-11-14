import fetcher from "@/lib/fetcher";
import { ProductCategory } from "../types";

export default async function getProductCategory(params?: string) {
  try {
    const categories = await fetcher.get<ProductCategory[]>(`product-category?${params}`);

    return categories.data;
  } catch (error) {
    throw error;
  }
}
