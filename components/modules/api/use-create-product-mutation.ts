import { honoClient } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type RequestType = InferRequestType<typeof honoClient.api.products.$post>["json"];
type ResponseType = InferResponseType<typeof honoClient.api.products.$post>;

export default function useCreateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await honoClient.api.products.$post({ json });
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to create the product!");
      }
    },
    onSuccess: () => {
      toast.success("Product created!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("Failed to create the product!");
    },
  })
}