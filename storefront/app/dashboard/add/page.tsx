import ProductForm from "@/components/dashboard/product-form";
import { api } from "@/lib/api";

async function AddProductPage() {
  const categories = await api.productCategoryApi.getProductCategory();

  if (!categories) {
    return null;
  }
  return (
    <div>
      <ProductForm title="Add New Product" categories={categories} />
    </div>
  );
}

export default AddProductPage;
