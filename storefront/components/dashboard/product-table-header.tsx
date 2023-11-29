"use client";

import { usePathname } from "next/navigation";

function ProductTableHeader() {
  const pathname = usePathname();

  if (pathname !== "/dashboard") return null;
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      <a
        href="/dashboard/add"
        className="rounded px-4 py-2 text-sm bg-green-500"
      >
        Add Product
      </a>
    </div>
  );
}

export default ProductTableHeader;
