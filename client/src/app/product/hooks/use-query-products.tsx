import {
  useProductFilterStore,
  useSelectedProductStore,
} from "@/app/product/product.store";
import { useQuery } from "@tanstack/react-query";
import { useService } from "@/services/use-service";

export function useQueryProducts() {
  const { productService } = useService();
  const { filter } = useProductFilterStore();
  const { setProduct } = useSelectedProductStore();

  const { data: products, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: () => productService.fetchProducts(filter),
  });

  return {
    products,
    isPending,
    setProduct,
  };
}
