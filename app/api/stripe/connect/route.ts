import { db } from "@/db/drizzle";
import { stripeAccounts } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;
  
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_CONNECT_WEBHOOK_SECRET!);
  } catch (err) {
    console.log(err);
    return new Response("Webhook error", { status: 400 });
  }

  switch (event.type) {
    case "account.updated":
      const account = event.data.object;
      await db
        .update(stripeAccounts)
        .set({
          connected: account.capabilities?.transfers === "active" ? "true" : "false"
        })
        .where(
          eq(stripeAccounts.accountId, account.id)
        );
      break;
    default:
      break;
  }

  return new Response(null, { status: 200 });
}