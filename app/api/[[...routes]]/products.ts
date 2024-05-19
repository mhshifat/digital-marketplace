import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { insertProductSchema, products } from "@/db/schema";
import { db } from "@/db/drizzle";
import { createId } from '@paralleldrive/cuid2';
import { and, eq } from "drizzle-orm";
import { z } from "zod";

const productsApi = new Hono()
  .get(
    "/",
    clerkMiddleware(),
    async (ctx) => {
      const auth = await getAuth(ctx);
      if (!auth?.userId) return ctx.json({ message: "unauthorized" }, 401);
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
      return ctx.json({ data }, 200);
    }
  )
  .post(
    "/",
    clerkMiddleware(),
    zValidator("json", insertProductSchema.omit({ id: true, userId: true })),
    async (ctx) => {
      try {
        const auth = await getAuth(ctx);
        if (!auth?.userId) return ctx.json({ message: "unauthorized" }, 401);
        const body = ctx.req.valid("json");
        const payload = {
          id: createId(),
          userId: auth.userId,
          name: body.name,
          category: body.category,
          price: body.price,
          summary: body.summary,
          description: body.description || "",
          images: body.images || "",
          file: body.file || "",
        }
        const data = await db
        .insert(products)
        .values(payload)
        .returning({ id: products.id });
        return ctx.json({ data }, 201);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err?.message);
          return ctx.json({ message: err?.message }, 500);
        }
        return ctx.json({ message: "Internal server error" }, 500);
      }
    }
  )
  .delete(
    "/:id",
    clerkMiddleware(),
    zValidator("param", z.object({
      id: z.string()
    })),
    async (ctx) => {
      try {
        const auth = await getAuth(ctx);
        if (!auth?.userId) return ctx.json({ message: "unauthorized" }, 401);
        const { id } = ctx.req.valid("param");
        const data = await db
        .delete(products)
        .where(
          and(
            eq(products.userId, auth.userId),
            eq(products.id, id)
          )
        )
        .returning({ id: products.id });
        return ctx.json({ data }, 200);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err?.message);
          return ctx.json({ message: err?.message }, 500);
        }
        return ctx.json({ message: "Internal server error" }, 500);
      }
    }
  );

export default productsApi;