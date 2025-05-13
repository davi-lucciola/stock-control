import { Modal } from "../../components/modal";
import { BaseProps } from "../../components/base-props";
import { ModalCloseButton } from "../../components/modal/modal-close-button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductPayload, ProductSchema } from "./product.type";
import { Product } from "./product.type";
import { useMutation } from "@tanstack/react-query";
import { useService } from "../../services/use-service";

type ProductFormProps = BaseProps & {
  product?: Product;
};

export function ProductsForm({ id, className, product }: ProductFormProps) {
  const { productService } = useService();

  const { mutateAsync: createUpdateProductMudation } = useMutation({
    mutationFn: async (data: ProductPayload) => {
      if (product?.id) {
        return await productService.updateProduct(product.id, data);
      }

      return await productService.createProduct(data);
    },
  });

  const onCreateUpdateProduct = (data: ProductPayload) => {
    return createUpdateProductMudation(data);
  };

  const form = useForm<ProductPayload>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: product?.name ?? "",
      price: product?.price,
    },
  });

  return (
    <Modal
      id={id}
      title={product?.id ? "Cadastrar Produto" : "Editar Produto"}
      className={className}
    >
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(onCreateUpdateProduct)}
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
                {...form.register("name")}
              />
            </div>
            <div className="w-100 d-flex flex-column">
              <label htmlFor="price" className="form-label">
                Preço
              </label>
              <input
                type="number"
                className="form-control"
                {...form.register("price")}
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <ModalCloseButton type="submit" className="btn btn-primary">
            Salvar
          </ModalCloseButton>
        </div>
      </form>
    </Modal>
  );
}
