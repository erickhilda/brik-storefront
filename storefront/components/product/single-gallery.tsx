"use client";

import Image from "next/image";
import { Product } from "@/lib/api/types";

export function SingleGallery({ product }: { product: Product }) {
  const buttonClassName =
    "h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center";

  return (
    <>
      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
        {product && (
          <Image
            className="h-full w-full object-contain"
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            alt={product?.name as string}
            src={product?.image_url as string}
            priority={true}
          />
        )}
      </div>
    </>
  );
}
