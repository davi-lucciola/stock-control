import { Modal } from "@/components/modal";
import { BaseProps } from "@/components/base-props";
import { Product } from "@/app/product/product.type";
import { ModalCloseButton } from "@/components/modal/modal-close-button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useService } from "@/services/use-service";
import { httpErrorHandler } from "@/lib/api";
import { toast } from "react-toastify";

type ProductDeleteConfirmprops = BaseProps & {
  product?: Product;
  setProduct: (product?: Product) => void;
};

export function ProductDelete({
  id,
  className,
  product,
  setProduct,
}: ProductDeleteConfirmprops) {
  const queryClient = useQueryClient();
  const { productService } = useService();

  const { mutateAsync: deleteProductMutation } = useMutation({
    mutationFn: async (productId: number) =>
      productService.deleteProduct(productId),
    onSuccess: (response) => {
      toast.success(response.detail);
      setProduct(undefined);
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
