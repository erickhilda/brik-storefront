import fetcher from "@/lib/fetcher";
import { ProductCategory } from "../types";

export default async function getProductCategory(params?: string) {
  try {
    const menu = await fetcher.get<ProductCategory[]>(`product-category?${params}`);

    return menu.data;
  } catch (error) {
    throw error;
  }
}
