import CreateProductFormWrapper from "@/components/modules/products/create-product-form-wrapper";
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card";

export default function SellPage() {

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Sell your products with ease</CardTitle>
          <CardDescription>Please describe your product here in detail so that it can be sold</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateProductFormWrapper />
        </CardContent>
      </Card>
    </div>
  )
}