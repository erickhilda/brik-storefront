import fetcher from "@/lib/fetcher";
import { Product } from "../types";

export default async function getProduct(params?: string) {
  try {
    const products = await fetcher.get<Product[]>(`product?${params}`);

    return products.data;
  } catch (error) {
    throw error;
  }
}
