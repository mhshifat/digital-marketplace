import { registerStripeAccount } from "@/actions/stripe";
import Header from "@/components/shared/header";
import { PropsWithChildren } from "react";

export default async function MainLayout({ children }: PropsWithChildren) {
  await registerStripeAccount();

  return (
    <>
      <Header />
      <main className="px-8 py-5">
        {children}
      </main>
    </>
  )
}