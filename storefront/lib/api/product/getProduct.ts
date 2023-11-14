import fetcher from "@/lib/fetcher";
import { Product } from "../types";

export default async function getProduct(params?: string) {
  try {
    const menu = await fetcher.get<Product[]>(`product?${params}`);

    return menu.data;
  } catch (error) {
    throw error;
  }
}
