import { Modal } from "@/components/modal";
import { BaseProps } from "@/components/base-props";
import { ModalCloseButton } from "@/components/modal/modal-close-button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useService } from "@/services/use-service";
import { httpErrorHandler } from "@/lib/api";
import { toast } from "react-toastify";
import { useSelectedProductStore } from "./product.store";

export function ProductDelete({ id, className }: BaseProps) {
  const queryClient = useQueryClient();
  const { productService } = useService();
  const { selectedProduct: product, setSelectedProduct } =
    useSelectedProductStore();

  const { mutateAsync: deleteProductMutation } = useMutation({
    mutationFn: async (productId: number) =>
      productService.deleteProduct(productId),
    onSuccess: (response) => {
      toast.success(response.detail);
      setSelectedProduct(undefined);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: httpErrorHandler,
  });

  return (
    <Modal id={id} title="Excluir Produto" className={className}>
      <form
        autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault();
          deleteProductMutation(product!.id);
        }}
      >
        <div className="modal-body">
          <p>
            Deseja realmente excluir o produto <b>{product?.name}</b> ?
          </p>
        </div>
        <div className="modal-footer">
          <ModalCloseButton type="submit" className="btn btn-danger">
            Excluir
          </ModalCloseButton>
        </div>
      </form>
    </Modal>
  );
}
