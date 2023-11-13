"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FOOTER_MENU } from "@/lib/constants";

const FooterMenuItem = ({
  item,
}: {
  item: { label: string; path: string };
}) => {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname === item.path);

  useEffect(() => {
    setActive(pathname === item.path);
  }, [pathname, item.path]);

  return (
    <li>
      <Link
        href={item.path}
        className={clsx(
          "block p-2 text-lg underline-offset-4 hover:text-black hover:underline dark:hover:text-neutral-300 md:inline-block md:text-sm",
          {
            "text-black dark:text-neutral-300": active,
          }
        )}
      >
        {item.label}
      </Link>
    </li>
  );
};

export default function FooterMenu({ menu }: { menu: typeof FOOTER_MENU }) {
  if (!menu.length) return null;

  return (
    <nav>
      <ul>
        {menu.map((item) => {
          return <FooterMenuItem key={item.label} item={item} />;
        })}
      </ul>
    </nav>
  );
}
