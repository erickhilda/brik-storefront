import fetcher from "@/lib/fetcher";

export default async function deleteProduct(token: string, id: string) {
  try {
    const product = await fetcher.del<{ id: number }>(`product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return product;
  } catch (error) {
    throw error;
  }
}
