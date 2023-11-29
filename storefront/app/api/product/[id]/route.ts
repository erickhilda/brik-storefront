import { api } from "@/lib/api";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookiesStore = cookies();
    const accessToken = cookiesStore.get("access_token")?.value || "";
    const body = await request.json();

    const data = await api.productApi.editProduct(body, accessToken, params.id);

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookiesStore = cookies();
    const accessToken = cookiesStore.get("access_token")?.value || "";

    const data = await api.productApi.deleteProduct(accessToken, params.id);

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
