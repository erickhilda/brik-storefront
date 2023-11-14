import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { GridTileImage } from "@/components/grid/tile";
import Footer from "@/components/layout/footer";
import { ProductDescription } from "@/components/product/product-description";
import Link from "next/link";
import { api } from "@/lib/api";
import { SingleGallery } from "@/components/product/single-gallery";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = await api.productApi.getProductById(params.id);

  if (!product) return notFound();

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await api.productApi.getProductById(params.id);

  if (!product) return notFound();

  return (
    <>
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <SingleGallery product={product} />
          </div>

          <div className="basis-full lg:basis-2/6">
            <ProductDescription product={product} />
          </div>
        </div>
        <Suspense>
          <RelatedProducts categoryId={product.category_id} />
        </Suspense>
      </div>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}

async function RelatedProducts({ categoryId }: { categoryId: number }) {
  const relatedProducts = await api.productApi.getProductByCategory(
    categoryId.toString()
  );

  if (!relatedProducts) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.id}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link
              className="relative h-full w-full"
              href={`/product/${product.id}`}
            >
              <GridTileImage
                alt={product.name}
                label={{
                  title: product.name,
                  amount: product.price.toString(),
                  currencyCode: "IDR",
                }}
                src={product.image_url}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
