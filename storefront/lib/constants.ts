export const NAVBAR_MENU = [
  {
    label: "All",
    path: "/search",
  },
];

export const FOOTER_MENU = [
  {
    label: "Home",
    path: "/",
  },
];

export type SortFilterItem = {
  name: string;
  slug: string | null;
  sortKey: "RELEVANCE" | "CREATED_AT" | "PRICE";
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  name: "Relevance",
  slug: null,
  sortKey: "RELEVANCE",
  reverse: false,
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  {
    name: "Latest arrivals",
    slug: "latest-desc",
    sortKey: "CREATED_AT",
    reverse: true,
  },
  {
    name: "Price: Low to high",
    slug: "price-asc",
    sortKey: "PRICE",
    reverse: false,
  }, // asc
  {
    name: "Price: High to low",
    slug: "price-desc",
    sortKey: "PRICE",
    reverse: true,
  },
];
