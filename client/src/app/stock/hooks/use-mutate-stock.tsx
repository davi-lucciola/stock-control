import { useStockProductStore } from "@/app/stock/stock.store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StockPayload, StockSchema } from "../stock.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useService } from "@/services/use-service";
import { httpErrorHandler } from "@/lib/api";
import { toast } from "react-toastify";

export function useMutateStock() {
  const queryClient = useQueryClient();
  const { stockService } = useService();
  const { product, stockType } = useStockProductStore();

  const form = useForm<StockPayload>({
    resolver: zodResolver(StockSchema),
  });

  const { mutateAsync: changeStockMutation } = useMutation({
    mutationFn: async (data: StockPayload) => {
      if (stockType == "INPUT") {
        return await stockService.registerStockIn(data);
      }

      return await stockService.registerStockOut(data);
    },
    onSuccess: async (response) => {
      toast.success(response.detail);
      await queryClient.invalidateQueries({
        queryKey: ["products", "stock-history"],
      });
    },
    onError: httpErrorHandler,
  });

  const handleMutateStock = (data: StockPayload) => {
    changeStockMutation(data);
  };

  if (product) {
    form.setValue("productId", product.id);
  }

  return {
    form,
    product,
    stockType,
    handleMutateStock,
  };
}
