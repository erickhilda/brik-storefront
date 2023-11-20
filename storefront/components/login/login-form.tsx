"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function LoginForm() {
  const router = useRouter();
  const [isDisplayPassword, setIsDisplayPassword] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const email = val.email as HTMLInputElement;
    const password = val.password as HTMLInputElement;
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.value, password: password.value }),
      });
      const result = await response.json();
      if (result.accessToken) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
      if (error instanceof Error) {
        setErrorMessages([error.message]);
      }
    }
  }
  return (
    <form
      onSubmit={onSubmit}
      className="w-max-[550px] w-full lg:w-80 xl:w-full p-3"
    >
      <div className="mb-3 relative">
        <input
          type="text"
          name="email"
          placeholder="Email"
          autoComplete="off"
          defaultValue=""
          className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
        />
      </div>

      <div className="mb-3 relative">
        <input
          type={isDisplayPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          autoComplete="off"
          defaultValue=""
          className={clsx(
            "w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500",
            "dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
          )}
        />
        {isDisplayPassword ? (
          <EyeIcon
            onClick={() => setIsDisplayPassword(false)}
            className="absolute right-0 top-0 mr-3 mt-3 h-4"
          />
        ) : (
          <EyeSlashIcon
            onClick={() => setIsDisplayPassword(true)}
            className="absolute right-0 top-0 mr-3 mt-3 h-4"
          />
        )}
      </div>

      <button
        className={clsx(
          "w-full bg-blue-600 hover:bg-blue-700 mt-4",
          "text-white font-semibold rounded-lg py-2"
        )}
        type="submit"
      >
        Sign In
      </button>

      <ul className="mt-4">
        {errorMessages.map((message) => (
          <li key={message} className="text-red-500">
            {message}
          </li>
        ))}
      </ul>
    </form>
  );
}
