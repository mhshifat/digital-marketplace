"use client";

import { useRouter } from "next/navigation";
import CreateProductForm from "./create-product-form";

export default function CreateProductFormWrapper() {
  const router = useRouter();
  
  return (
    <>
      <CreateProductForm
        onSubmit={() => router.push("/")}
      />
    </>
  )
}