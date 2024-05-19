"use server";

import { buyProduct } from "@/actions/stripe";
import { Button } from "@/components/ui/button";

export default async function BuyProductBtn({ id }: { id: string }) {
  return (
    <form action={buyProduct}>
      <input type="text" hidden name="id" value={id} />
      <Button type="submit" variant="default" size="sm">Buy</Button>
    </form>
  )
}