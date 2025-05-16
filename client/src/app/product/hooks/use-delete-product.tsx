import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useService } from "@/services/use-service";
import { httpErrorHandler } from "@/lib/api";
import { toast } from "react-toastify";
import { useSelectedProductStore } from "../product.store";
import { FormEvent } from "react";

export function useProductDelete() {
  const queryClient = useQueryClient();
  const { productService } = useService();
  const { product } = useSelectedProductStore();

  const { mutateAsync: deleteProductMutation } = useMutation({
    mutationFn: async (productId: number) =>
      productService.deleteProduct(productId),
    onSuccess: (response) => {
      toast.success(response.detail);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["stock-history"] });
    },
    onError: httpErrorHandler,
  });

  const handleProductDelete = (event: FormEvent) => {
    event.preventDefault();
    deleteProductMutation(product!.id);
  };

  return {
    product,
    handleProductDelete,
  };
}
