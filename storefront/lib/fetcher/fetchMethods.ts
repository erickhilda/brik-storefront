import { API_URL } from "../env";

const enum FetchMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

type RequestInit = {
  headers?: Record<string, string>;
  body?: BodyInit;
  method?: FetchMethods;
  next?: Record<string, any>;
};

type FetchResponse<T> = {
  data?: T;
  message?: string;
  count?: number;
};

type Fetcher = {
  get<T>(url: string, config?: RequestInit): Promise<FetchResponse<T>>;
  post<T>(url: string, config?: RequestInit): Promise<FetchResponse<T>>;
  put<T>(url: string, config?: RequestInit): Promise<FetchResponse<T>>;
  del<T>(url: string, config?: RequestInit): Promise<FetchResponse<T>>;
};

export default function fetchMethods(): Fetcher {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  async function fetchFn(url: string, config: RequestInit = {}) {
    try {
      const response = await fetch(`${API_URL}/${url}`, {
        ...config,
        // cache: "no-cache",
        next: { revalidate: 0 },
        headers: { ...headers, ...config.headers },
      });

      if (!response.ok) {
        const error = new Error(response.statusText);
        // error.response = response;
        throw "Something went wrong";
      }

      return await response.json();
    } catch (error) {
      return { error };
    }
  }

  function get(url: string, config?: RequestInit) {
    return fetchFn(url, { ...config, method: FetchMethods.GET });
  }

  function post(url: string, config?: RequestInit) {
    return fetchFn(url, { ...config, method: FetchMethods.POST });
  }

  function put(url: string, config?: RequestInit) {
    return fetchFn(url, { ...config, method: FetchMethods.PUT });
  }

  function del(url: string, config?: RequestInit) {
    return fetchFn(url, { ...config, method: FetchMethods.DELETE });
  }

  return { get, post, put, del };
}
