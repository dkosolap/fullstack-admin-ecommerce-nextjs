"use client"

import { cn } from "@/lib/utils"
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";

export const MainNav: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  className,
  ...props
}) => {
  const pathname = usePathname();
  const params = useParams();
  const routers = useMemo(
    () => [
      {
        href: `/${params.storeId}`,
        label: "Store page",
        isActive: pathname === `/${params.storeId}`,
      },
      {
        href: `/${params.storeId}/billboards`,
        label: "Billboards",
        isActive: new RegExp(`^/${params.storeId}/billboards`).test(pathname),
      },
      {
        href: `/${params.storeId}/categories`,
        label: "Categories",
        isActive: new RegExp(`^/${params.storeId}/categories`).test(pathname),
      },
      {
        href: `/${params.storeId}/sizes`,
        label: "Sizes",
        isActive: new RegExp(`^/${params.storeId}/sizes`).test(pathname),
      },
      {
        href: `/${params.storeId}/settings`,
        label: "Settings",
        isActive: pathname === `/${params.storeId}/settings`,
      },
    ],
    [params.storeId, pathname]
  );

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routers.map(({ label, isActive, href }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            isActive ? "text-black dark:text-white" : "text-muted-foreground"
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};
