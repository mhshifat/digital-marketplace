'use server'

import { db } from "@/db/drizzle";
import { products, stripeAccounts } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { createId } from '@paralleldrive/cuid2';

export async function buyProduct(formData: FormData) {
  const user = await currentUser();
  if (!user) return null;

  const productId = formData.get("id") || "";
  if (!productId) return null;
  const [product] = await db
    .select({
      id: products.id,
      name: products.name,
      summary: products.summary,
      price: products.price,
      images: products.images,
    })
    .from(products)
    .where(
      eq(products.id, productId as string)
    );
  const [account] = await db
    .select({
      accountId: stripeAccounts.accountId
    })
    .from(stripeAccounts)
    .where(
      eq(stripeAccounts.userId, user.id)
    );
  
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment?status=canceled`,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment?status=success`,
      payment_intent_data: {
        application_fee_amount: (Math.round((product?.price || 0) * 100)) * 0.1,
        transfer_data: {
          destination: account.accountId
        }
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: Math.round((product?.price || 0) * 100),
            product_data: {
              name: product.name,
              description: product.summary,
              images: [JSON.parse(product.images || "[]")?.[0] || "https://via.placeholder.com/350x150"],
            }
          }
        }
      ]
    });
  
  return redirect(session.url as string);
}

export async function registerStripeAccount() {
  try {
    const user = await currentUser();
  if (!user) return null;
  
  let [account] = await db
    .select({
      accountId: stripeAccounts.accountId
    })
    .from(stripeAccounts)
    .where(
      eq(stripeAccounts.userId, user.id)
    );
  if (!account) {
    const stripeAccount = await stripe.accounts.create({
      email: user.emailAddresses[0].emailAddress,
      controller: {
        losses: {
          payments: "application"
        },
        fees: {
          payer: "application"
        },
        stripe_dashboard: {
          type: "express"
        }
      }
    });
    [account] = await db
      .insert(stripeAccounts)
      .values({
        accountId: stripeAccount.id,
        userId: user.id,
        connected: "false",
        test: "test",
        id: createId(),
      })
      .returning({ accountId: stripeAccounts.id });
  }

  return account;
  } catch (err) {
    return;
  }
}

export async function linkToStripeAccount() {
  const user = await currentUser();
  if (!user) return null;

  const [account] = await db
    .select({
      accountId: stripeAccounts.accountId
    })
    .from(stripeAccounts)
    .where(
      eq(stripeAccounts.userId, user.id)
    );

  const stripeLink = await stripe.accountLinks.create({
    type: "account_onboarding",
    account: account.accountId,
    refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing`,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/return/${account?.accountId}`,
  });

  return redirect(stripeLink.url as string);
}

export async function getStripeConnectionStatus() {
  const user = await currentUser();
  if (!user) return null;
  
  let [account] = await db
    .select({
      accountId: stripeAccounts.accountId,
      connected: stripeAccounts.connected,
    })
    .from(stripeAccounts)
    .where(
      eq(stripeAccounts.userId, user.id)
    );
  
  return account;
}

export async function getStripeExpressLink() {
  const user = await currentUser();
  if (!user) return null;
  
  let [account] = await db
    .select({
      accountId: stripeAccounts.accountId,
      connected: stripeAccounts.connected,
    })
    .from(stripeAccounts)
    .where(
      eq(stripeAccounts.userId, user.id)
    );
  
  const link = await stripe.accounts.createLoginLink(account.accountId);
  return redirect(link.url);
}