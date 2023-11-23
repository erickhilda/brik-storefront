import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <div className="grid grid-cols-12 mt-5">
        <div className="col-span-10 col-start-2 flex flex-col p-4">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          {children}
        </div>
      </div>
    </Suspense>
  );
}
