import fetcher from "@/lib/fetcher";

export default async function addProduct(body: {
  name: string;
  description: string;
  price: number;
  category_id: number;
  image: string;
}, token: string) {
  try {
    const product = await fetcher.post<{ id: number }>("product", {
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
