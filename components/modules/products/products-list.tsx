import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import DeleteProductBtn from "./delete-product-btn";
import { buyProduct } from "@/actions/stripe";
import { getProducts } from "@/actions/products";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";

export default async function ProductsList() {
  const user = await currentUser();
  const products = await getProducts();

  return (
    <div className="flex items-center gap-10">
      {products?.map(item => (
        <div key={item.id} className="w-1/3">
          <Card>
            <div className="relative aspect-[3/2]">
              <Image
                src={JSON.parse(item.images || "[]")?.[0] || "https://via.placeholder.com/350x150"}
                alt=""
                className="object-cover w-full h-full aspect-square"
                fill
                priority={false}
                fetchPriority="low"
                placeholder="empty"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading = 'lazy'
              />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-5 justify-between">
                {item.name}
                <small className="text-blue-500 w-auto px-5 h-10 bg-blue-500/10 rounded flex items-center justify-center text-sm font-semibold">${item.price}</small>
              </CardTitle>
              <CardDescription>{item.summary}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-5 justify-between">
              <Badge className="uppercase text-sm">{item.category}</Badge>

              <div className="flex items-center gap-2">
                <form action={buyProduct}>
                  <input type="text" hidden name="id" value={item.id} readOnly />
                  <Button type="submit" variant="default" size="sm">Buy</Button>
                </form>
                {user?.id === item.userId && (
                  <DeleteProductBtn id={item.id} />
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}