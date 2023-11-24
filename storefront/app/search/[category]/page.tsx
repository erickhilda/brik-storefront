import { Metadata } from "next";

import Grid from "@/components/grid";
import ProductGridItems from "@/components/layout/product-grid-items";
import { defaultSort, sorting } from "@/lib/constants";
import getProduct from "@/lib/api/product/getProduct";

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  return {
    title: params.category,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;
  const products = await getProduct(`category=${params.category}`);

  const { data } = products;

  if (!data) {
    return null;
  }

  return (
    <section>
      {data?.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={data || []} />
        </Grid>
      )}
    </section>
  );
}
