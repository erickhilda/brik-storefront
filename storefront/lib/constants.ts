export const NAVBAR_MENU = [
  {
    label: 'All',
    path: '/search'
  },
  {
    label: 'Makanan ringan',
    path: '/search/makanan-ringan'
  },
  {
    label: 'Bahan pokok',
    path: '/search/bahan-pokok'
  }
];

export const FOOTER_MENU = [
  {
    label: 'About',
    path: '/about'
  },
  {
    label: 'Contact',
    path: '/contact'
  },
  {
    label: 'Privacy Policy',
    path: '/privacy-policy'
  },
  {
    label: 'Terms & Conditions',
    path: '/terms-conditions'
  },
  {
    label: 'FAQ',
    path: '/faq'
  }
];

export type SortFilterItem = {
  name: string;
  slug: string | null;
  sortKey: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE';
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  name: 'Relevance',
  slug: null,
  sortKey: 'RELEVANCE',
  reverse: false
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  { name: 'Trending', slug: 'trending-desc', sortKey: 'BEST_SELLING', reverse: false }, // asc
  { name: 'Latest arrivals', slug: 'latest-desc', sortKey: 'CREATED_AT', reverse: true },
  { name: 'Price: Low to high', slug: 'price-asc', sortKey: 'PRICE', reverse: false }, // asc
  { name: 'Price: High to low', slug: 'price-desc', sortKey: 'PRICE', reverse: true }
];

export const TAGS = {
  collections: 'collections',
  products: 'products',
  cart: 'cart'
};

export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden';
export const DEFAULT_OPTION = 'Default Title';
export const SHOPIFY_GRAPHQL_API_ENDPOINT = '/api/2023-01/graphql.json';
