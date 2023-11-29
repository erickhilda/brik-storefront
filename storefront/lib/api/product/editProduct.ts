import fetcher from "@/lib/fetcher";

export default async function editProduct(
  body: {
    name: string;
    description: string;
    price: number;
    category_id: number;
    image_url: string;
  },
  token: string,
  id: string
) {
  try {
    const product = await fetcher.put<{ id: number }>(`product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    return product;
  } catch (error) {
    throw error;
  }
}
