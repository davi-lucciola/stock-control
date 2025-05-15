import { Modal } from "@/components/modal";
import { BaseProps } from "@/components/base-props";
import { ModalCloseButton } from "@/components/modal/modal-close-button";
import { useStockProductStore } from "@/app/stock/stock.store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StockPayload, StockSchema } from "../stock.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useService } from "@/services/use-service";
import { httpErrorHandler } from "@/lib/api";
import { toast } from "react-toastify";

export function StocksForm({ id, className }: BaseProps) {
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
    onSuccess: (response) => {
      toast.success(response.detail);
      queryClient.invalidateQueries({
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

  return (
    <Modal
      id={id}
      className={className}
      title={`${product ? product.name : ""} - ${stockType == "INPUT" ? "Entrada" : "Saída"}`}
    >
      <form onSubmit={form.handleSubmit(handleMutateStock)} autoComplete="off">
        <div className="modal-body">
          <input
            id="productId"
            type="hidden"
            className="form-control"
            {...form.register("productId")}
          />
          <div className="w-100 d-flex flex-column">
            <label htmlFor="name" className="form-label">
              Quantidade
            </label>
            <input
              id="quantity"
              type="number"
              className="form-control"
              {...form.register("quantity")}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button type="submit"> </button>
          <ModalCloseButton type="submit" className="btn btn-primary">
            {stockType == "INPUT" ? "Adicionar" : "Remover"}
          </ModalCloseButton>
        </div>
      </form>
    </Modal>
  );
}
