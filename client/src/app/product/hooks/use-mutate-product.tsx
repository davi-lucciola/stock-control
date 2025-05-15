import { useForm } from "react-hook-form";
import { ProductPayload, ProductSchema } from "@/app/product/product.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useService } from "@/services/use-service";
import { toast } from "react-toastify";
import { httpErrorHandler } from "@/lib/api";
import { useSelectedProductStore } from "../product.store";

export function useMutateProduct() {
  const queryClient = useQueryClient();
  const { productService } = useService();
  const { product } = useSelectedProductStore();

  const form = useForm<ProductPayload>({
    resolver: zodResolver(ProductSchema),
    values: {
      name: product?.name ?? "",
      price: product?.price ?? 0,
    },
  });
  const { errors } = form.formState;

  const { isPending, mutateAsync: createUpdateProductMudation } = useMutation({
    mutationFn: async (data: ProductPayload) => {
      if (product?.id) {
        return await productService.updateProduct(product.id, data);
      }

      return await productService.createProduct(data);
    },
    onSuccess: (response) => {
      form.reset();
      toast.success(response.detail);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: httpErrorHandler,
  });

  const handleMutateProduct = (data: ProductPayload) => {
    createUpdateProductMudation(data);
  };

  return {
    form,
    errors,
    product,
    isPending,
    handleMutateProduct,
  };
}
