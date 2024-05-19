"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="list-none p-0 m-0 flex items-center gap-5">
        <li className={cn("text-[15px] font-semibold text-slate-500 hover:text-slate-700", {
          "text-slate-700": pathname === "/"
        })}>
          <Link href="/">Home</Link>
        </li>
        <li className={cn("text-[15px] font-semibold text-slate-500 hover:text-slate-700", {
          "text-slate-700": pathname === "/templates"
        })}>
          <Link href="/templates">Templates</Link>
        </li>
        <li className={cn("text-[15px] font-semibold text-slate-500 hover:text-slate-700", {
          "text-slate-700": pathname === "/ui-kits"
        })}>
          <Link href="/ui-kits">Ui Kits</Link>
        </li>
        <li className={cn("text-[15px] font-semibold text-slate-500 hover:text-slate-700", {
          "text-slate-700": pathname === "/icons"
        })}>
          <Link href="/icons">Icons</Link>
        </li>
      </ul>
    </nav>
  )
}