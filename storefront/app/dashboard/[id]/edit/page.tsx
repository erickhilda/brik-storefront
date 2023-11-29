import ProductForm from "@/components/dashboard/product-form";
import { api } from "@/lib/api";

async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await api.productApi.getProductById(params.id);
  if (!product) return null;

  const categories = await api.productCategoryApi.getProductCategory();

  if (!categories) {
    return null;
  }
  return (
    <div>
      <ProductForm
        title={`Edit ${product.name}`}
        categories={categories}
        productName={product.name}
        productDescription={product.description}
        productPrice={product.price}
        productCategory={product.category_id}
        productImage={product.image_url}
      />
    </div>
  );
}

export default EditProductPage;
