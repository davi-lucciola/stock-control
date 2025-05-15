import { Modal } from "@/components/modal";
import { BaseProps } from "@/components/base-props";
import { ModalCloseButton } from "@/components/modal/modal-close-button";
import { useProductDelete } from "@/app/product/hooks/use-delete-product";

export function ProductDelete({ id, className }: BaseProps) {
  const { product, handleProductDelete } = useProductDelete();

  return (
    <Modal id={id} title="Excluir Produto" className={className}>
      <form autoComplete="off" onSubmit={handleProductDelete}>
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
