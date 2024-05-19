'use server'

import { db } from "@/db/drizzle";
import { products } from "@/db/schema";

export async function getProducts() {
  const data = await db
    .select({
      id: products.id,
      name: products.name,
      summary: products.summary,
      category: products.category,
      price: products.price,
      images: products.images,
      userId: products.userId,
    })
    .from(products);

  return data;
}