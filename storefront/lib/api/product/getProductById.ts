import fetcher from "@/lib/fetcher";
import { Product } from "../types";

export default async function getProductById(id: string) {
  try {
    const product = await fetcher.get<Product>(`product/${id}`);

    return product.data;
  } catch (error) {
    throw error;
  }
}
