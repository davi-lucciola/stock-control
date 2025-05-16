import { Modal } from "@/components/modal";
import { BaseProps } from "@/components/base-props";
import { ModalCloseButton } from "@/components/modal/modal-close-button";
import { useMutateProduct } from "../hooks/use-mutate-product";

export function ProductsForm({ id, className }: BaseProps) {
  const { form, errors, product, isPending, handleMutateProduct } =
    useMutateProduct();

  return (
    <Modal
      id={id}
      title={product?.id ? "Editar Produto" : "Cadastrar Produto"}
      className={className}
    >
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(handleMutateProduct)}
        className="container"
      >
        <div className="modal-body">
          <div className="container d-flex flex-column gap-3 p-4">
            <div className="w-100 d-flex flex-column">
              <label htmlFor="name" className="form-label">
                Nome
              </label>
              <input
                type="text"
                className="form-control"
                // defaultValue={product?.name ?? ""}
                {...form.register("name")}
              />
              <p className="text-danger"> {errors.name?.message ?? ""} </p>
            </div>
            <div className="w-100 d-flex flex-column">
              <label htmlFor="price" className="form-label">
                Preço
              </label>
              <input
                type="number"
                className="form-control"
                // defaultValue={product?.price ?? ""}
                {...form.register("price")}
              />
              <p className="text-danger"> {errors.price?.message ?? ""} </p>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <ModalCloseButton
            type="submit"
            className="btn btn-primary"
            disabled={isPending}
          >
            Salvar
          </ModalCloseButton>
        </div>
      </form>
    </Modal>
  );
}
