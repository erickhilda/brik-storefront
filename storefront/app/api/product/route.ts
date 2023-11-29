import { api } from "@/lib/api";
import { API_URL } from "@/lib/env";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(request: Request, response: Response) {
  try {
    const cookiesStore = cookies();
    const accessToken = cookiesStore.get("access_token")?.value || "";
    const body = await request.json();

    const data = await api.productApi.addProduct(body, accessToken);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return new Response(
        JSON.stringify({
          message: "Invalid JSON",
        }),
        {
          status: 400,
          headers: { "content-type": "application/json" },
        }
      );
    }

    if (error instanceof Error) {
      return new Response(
        JSON.stringify({
          message: error.message,
        }),
        {
          status: 500,
          headers: { "content-type": "application/json" },
        }
      );
    }
  }
}
