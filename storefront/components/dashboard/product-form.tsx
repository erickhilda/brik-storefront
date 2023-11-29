"use client";

import { ProductCategory } from "@/lib/api/types";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

function ProductForm({
  title = "Product Form",
  productName = "",
  productDescription = "",
  productPrice = 0,
  productCategory = 2,
  productImage = "https://dummyimage.com/300x300/000/fff",
  categories = [],
}: {
  title?: string;
  productName?: string;
  productDescription?: string;
  productPrice?: number;
  productCategory?: number;
  productImage?: string;
  categories?: ProductCategory[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isEditPage = pathname.includes("edit");
  const isAddPage = pathname.includes("add");

  const [isLoading, setIsLoading] = useState(false);

  async function addNewProduct(body: any) {
    try {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw response.statusText;
      }

      const { data, message } = await response.json();

      if (data.id) {
        router.push("/dashboard?page=1&size=10");
      }
    } catch (error) {
      throw error;
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setIsLoading(true);
      const target = e.target as typeof e.target & {
        "product-name": { value: string };
        "product-description": { value: string };
        "product-price": { value: number };
        "product-category": { value: number };
        "product-image": { value: string };
      };
      const productName = target["product-name"].value;
      const productDescription = target["product-description"].value;
      const productPrice = target["product-price"].value;
      const productCategory = target["product-category"].value;
      const productImage = target["product-image"].value;
      const body = {
        name: productName,
        description: productDescription,
        price: productPrice,
        category_id: productCategory,
        image_url: productImage,
      };
      if (isAddPage) {
        await addNewProduct(body);
      }

      if (isEditPage) {
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function onReset(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.reset();
    router.push("/dashboard?page=1&size=10");
  }

  return (
    <div className="mb-3 relative flex flex-col justify-center items-center">
      <h3 className="text-2xl mb-3">{title}</h3>

      <form
        className="w-max-[640px] w-full xl:w-full p-3 flex flex-col gap-3"
        onSubmit={handleSubmit}
        onReset={(e) => onReset(e)}
      >
        <input
          name="product-name"
          placeholder="Product Name"
          autoComplete="off"
          defaultValue={productName}
          type="text"
          className={clsx(
            "w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500",
            "dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
          )}
        />

        <textarea
          name="product-description"
          placeholder="Product Description"
          defaultValue={productDescription}
          rows={4}
          className={clsx(
            "w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500",
            "dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
          )}
        />

        <input
          name="product-price"
          placeholder="Product Price"
          defaultValue={productPrice}
          type="number"
          className={clsx(
            "w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500",
            "dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
          )}
        />

        <select
          name="product-category"
          defaultValue={productCategory}
          className={clsx(
            "w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500",
            "dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
          )}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <input
          name="product-image"
          placeholder="Product Image URL"
          defaultValue={productImage}
          type="text"
          className={clsx(
            "w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500",
            "dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
          )}
        />

        <div className="flex flex-row gap-3">
          <button
            disabled={isLoading}
            type="submit"
            className={clsx(
              "w-full bg-blue-600 hover:bg-blue-700 mt-4",
              "text-white font-semibold rounded-lg py-2",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            Save
          </button>

          <button
            disabled={isLoading}
            type="reset"
            className={clsx(
              "w-full bg-red-600 hover:bg-red-700 mt-4",
              "text-white font-semibold rounded-lg py-2",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
