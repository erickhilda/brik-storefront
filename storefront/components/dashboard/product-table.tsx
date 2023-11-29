"use client";

import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  PaginationState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Product } from "@/lib/api/types";
import { ReactNode, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/lib/utils";
import clsx from "clsx";
import Link from "next/link";

function ButtonIcon({
  children,
  ...props
}: {
  children: ReactNode;
  props: HTMLButtonElement;
}) {
  const { className } = props;
  return (
    <button className={clsx("border rounded p-2", className)} {...props}>
      {children}
    </button>
  );
}

async function deleteProduct(id: string) {
  try {
    const response = await fetch(`/api/product/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw response.statusText;
    }

    const { data, message } = await response.json();

    if (data.id) {
      window.location.reload();
    }
  } catch (error) {
    throw error;
  }
}

const columnHelper =
  createColumnHelper<Pick<Product, "name" | "description" | "price" | "id">>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("description", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("price", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("id", {
    cell: (info) => (
      <div className="flex items-center justify-center gap-2">
        <Link
          href={`/dashboard/${info.getValue()}/edit`}
          className="rounded px-4 py-1 text-sm bg-blue-500 hover:bg-blue-600"
        >
          Edit
        </Link>
        <button
          onClick={() => deleteProduct(info.getValue())}
          className="rounded px-4 py-1 text-sm bg-red-500 hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    ),
  }),
];

export default function ProductTable({
  products,
  count = 0,
}: {
  products: Product[];
  count: number;
}) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    columns,
    data: products,
    manualPagination: true,
    pageCount: Math.ceil(count / pagination.pageSize),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  function onChangeToPreviousPage() {
    router.push(
      createUrl(
        pathname,
        new URLSearchParams({
          size: searchParams.get("size") || 10,
          page: searchParams.get("page")
            ? Number(searchParams.get("page")) - 1
            : 0,
        })
      )
    );
    table.previousPage();
  }

  function onChangeToNextPage() {
    router.push(
      createUrl(
        pathname,
        new URLSearchParams({
          size: searchParams.get("size") || 10,
          page: searchParams.get("page")
            ? Number(searchParams.get("page")) + 1
            : 1,
        })
      )
    );
    table.nextPage();
  }

  return (
    <div className="mt-6">
      <table className="table-auto border border-collapse dark:border-neutral-500 w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border p-2 dark:border-neutral-500"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border p-2 dark:border-neutral-500"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center gap-2 mt-4">
        <ButtonIcon
          className="border rounded p-1 disabled:cursor-not-allowed"
          onClick={() => onChangeToPreviousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeftIcon className="h-4" />
        </ButtonIcon>

        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>

        <ButtonIcon
          className="border rounded p-1 disabled:cursor-not-allowed"
          onClick={() => onChangeToNextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRightIcon className="h-4" />
        </ButtonIcon>

        <span className="flex items-center gap-1">
          Showing{" "}
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}{" "}
          -{" "}
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            table.getState().pagination.pageSize >
          count
            ? count
            : table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
              table.getState().pagination.pageSize}{" "}
          of {count}
        </span>
      </div>
    </div>
  );
}
