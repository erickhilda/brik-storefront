import fetcher from "@/lib/fetcher";
import { Product } from "../types";

export default async function getProduct() {
  try {
    const menu = await fetcher.get<Product[]>("product");

    return menu.data;
  } catch (error) {
    throw error;
  }
}
