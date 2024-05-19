import { honoClient } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<typeof honoClient.api.products[":id"]["$delete"]>;

export default function useDeleteProductMutation(id: string) {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await honoClient.api.products[":id"].$delete({ param: { id } });
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to delete the product!");
      }
    },
    onSuccess: () => {
      toast.success("Product deleted!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("Failed to delete the product!");
    },
  })
}