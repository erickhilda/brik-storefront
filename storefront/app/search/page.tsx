import Grid from "@/components/grid";
import ProductGridItems from "@/components/layout/product-grid-items";
import { api } from "@/lib/api";
import { defaultSort, sorting } from "@/lib/constants";

export const metadata = {
  title: "Search",
  description: "Search for products in the store.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await api.productApi.getProduct(
    `search=${searchValue || ""}`
  );
  const resultsText = products && products?.length > 1 ? "results" : "result";

  return (
    <>
      {searchValue ? (
        <p className="mb-4">
          {products?.length === 0
            ? "There are no products that match "
            : `Showing ${products?.length} ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {products ? (
        <>
          {products?.length > 0 ? (
            <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <ProductGridItems products={products || []} />
            </Grid>
          ) : null}
        </>
      ) : null}
    </>
  );
}