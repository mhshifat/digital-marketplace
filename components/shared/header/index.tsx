import Link from "next/link";
import NavLinks from "./_components/nav-links";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default async function Header() {
  const user = await currentUser();

  return (
    <header className="shadow-sm py-4 px-8 flex items-center justify-between gap-5">
      <Link href="/" className="font-semibold text-xl uppercase tracking-tighter">Logo</Link>

      <NavLinks />

      <nav className="flex items-center gap-2">
        {!user?.id ? (
          <ul className="list-none p-0 m-0 flex items-center gap-2">
            <li>
              <Button asChild size="sm">
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </li>
            <li>
              <Button asChild size="sm" variant="outline">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </li>
          </ul>
        ) : (
          <>
            <Button asChild size="sm" variant="ghost">
              <Link href="/sell">Sell your product</Link>
            </Button>
            <ClerkLoaded>
              <UserButton afterSignOutUrl="/" />
            </ClerkLoaded>
            <ClerkLoading>
              <Loader2 className="animate-spin text-slate-500" />
            </ClerkLoading>
          </>
        )}
      </nav>
    </header>
  )
}