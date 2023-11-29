import { API_URL } from "@/lib/env";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(request: Request, response: Response) {
  try {
    const cookiesStore = cookies();
    const body = await request.json();
    const result = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!result.ok) {
      // throw the error to trigger the catch
      return new Response(
        JSON.stringify({
          message: "Invalid credentials",
        }),
        {
          status: 400,
          headers: { "content-type": "application/json" },
        }
      );
    }

    const { data, message } = await result.json();

    cookiesStore.set("access_token", data.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return new Response(
      JSON.stringify({
        message,
        ...data,
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
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
