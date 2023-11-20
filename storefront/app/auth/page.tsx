import LoginForm from "@/components/login/login-form";
import { SITE_NAME } from "@/lib/env";

export const metadata = {
  title: "Auth",
};

export default function AuthPage() {
  return (
    <div className="grid grid-cols-12 mt-5">
      <div className="col-span-4 col-start-5 flex flex-col items-center p-4 border dark:border-neutral-800 rounded-md">
        {SITE_NAME} dashboard
        <LoginForm />
      </div>
    </div>
  );
}
