import { Modal } from "@/components/modal";
import { BaseProps } from "@/components/base-props";
import { ModalCloseButton } from "@/components/modal/modal-close-button";
import { useMutateStock } from "@/app/stock/hooks/use-mutate-stock";

export function StocksForm({ id, className }: BaseProps) {
  const { form, product, stockType, handleMutateStock } = useMutateStock();

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
