import fetcher from "@/lib/fetcher";
import { ProductCategory } from "../types";

export default async function getProductCategory() {
  try {
    const menu = await fetcher.get<ProductCategory[]>("product-category");

    return menu.data;
  } catch (error) {
    throw error;
  }
}
