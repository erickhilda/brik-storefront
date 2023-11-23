import ProductTable from "@/components/dashboard/product-table";
import { api } from "@/lib/api";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { page, size } = searchParams as { [key: string]: string };

  const products = await api.productApi.getProduct(
    `page=${page || 0}&size=${size || 10}`
  );
  return (
    <>
      <ProductTable products={products.data || []} count={products.count || 0} />
    </>
  );
}
