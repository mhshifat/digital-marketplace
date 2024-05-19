"use client";

import { Button } from "@/components/ui/button";
import useDeleteProductMutation from "../api/use-delete-product-mutation";
import useConform from "@/components/hooks/use-confirm";
import { Trash2 } from "lucide-react";

export default function DeleteProductBtn({ id }: { id: string }) {
  const deleteMutation = useDeleteProductMutation(id);
  const [ConfirmDialog, confirm] = useConform(
    "Are you sure?",
    "You are about to perform a delete operation"
  );
  
  return (
    <>
      <ConfirmDialog />
      <Button onClick={async () => {
        const ok = await confirm();
        if (ok) {
          deleteMutation.mutate(undefined);
        }
      }} variant="destructive" size="sm">
        <Trash2 />
      </Button>
    </>
  )
}