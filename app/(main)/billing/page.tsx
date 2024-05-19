import { getStripeConnectionStatus, getStripeExpressLink, linkToStripeAccount } from "@/actions/stripe";
import { Button } from "@/components/ui/button";

export default async function BillingPage() {
  const account = await getStripeConnectionStatus();
  return (
    <div>
      {account?.connected === "true" ? (
        <form action={getStripeExpressLink}>
          <Button type="submit">
            Check Payments
          </Button>
        </form>
      ) : (
        <form action={linkToStripeAccount}>
          <Button type="submit">
            Link to your Stripe account
          </Button>
        </form>
      )}
    </div>
  )
}