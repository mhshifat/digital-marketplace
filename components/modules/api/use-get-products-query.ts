import { honoClient } from '@/lib/hono';
import { useQuery } from '@tanstack/react-query';

export default function useGetProductsQuery() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await honoClient.api.products.$get();
      if (!response.ok) throw new Error("Failed to fetch products!");
      const { data } = await response.json();
      return data;
    },
  })
}