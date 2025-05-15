import { ProductPayload, ProductSchema } from "@/app/product/product.type";
import { useForm } from "react-hook-form";
import { Modal } from "@/components/modal";
import { BaseProps } from "@/components/base-props";
import { ModalCloseButton } from "@/components/modal/modal-close-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useService } from "@/services/use-service";
import { toast } from "react-toastify";
import { httpErrorHandler } from "@/lib/api";
import { useSelectedProductStore } from "./product.store";

export function ProductsForm({ id, className }: BaseProps) {
  const queryClient = useQueryClient();
  const { productService } = useService();
  const { selectedProduct: product, setSelectedProduct } =
    useSelectedProductStore();

  const form = useForm<ProductPayload>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      price: undefined,
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
      toast.success(response.detail);
      form.reset();
      setSelectedProduct(undefined);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: httpErrorHandler,
  });

  const onCreateUpdateProduct = async (data: ProductPayload) => {
    return await createUpdateProductMudation(data);
  };

  return (
    <Modal
      id={id}
      title={product?.id ? "Editar Produto" : "Cadastrar Produto"}
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
                value={product?.name ?? ""}
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
                value={product?.price ?? ""}
                {...form.register("price")}
                onChange={(event) =>
                  form.setValue(
                    "price",
                    event.target.value ? Number(event.target.value) : 0
                  )
                }
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
