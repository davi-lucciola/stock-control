import { useQuery } from "@tanstack/react-query";
import { useService } from "@/services/use-service";
import { MODALS } from "@/components/modal/types";
import { Product } from "@/app/product/product.type";
import { ModalOpenButton } from "@/components/modal/modal-open-button";
import { useProductFilterStore } from "@/app/product/product.store";
import { TrashSimple, PencilSimple, Plus, Minus } from "@phosphor-icons/react";

type ProductsTableData = {
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
};

export function ProductsTable({ onEdit, onDelete }: ProductsTableData) {
  const { productService } = useService();
  const { filter } = useProductFilterStore();

  const { data: products, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: async () => await productService.fetchProducts(filter),
  });

  if (isPending) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <table className="container table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th className="w-25"> Id </th>
          <th className="w-25"> Nome </th>
          <th className="w-25"> Preço </th>
          <th className="w-25"> Quantidade </th>
          <th> Ações </th>
        </tr>
      </thead>
      <tbody>
        {products &&
          products.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td>{product.amount}</td>
                <td className="d-flex justify-content-around gap-2">
                  <ModalOpenButton
                    type="button"
                    targetId={MODALS.CHANGE_STOCK_FORM}
                    className="btn btn-secondary d-flex align-items-center justify-content-center p-2"
                    // onClick={() => {
                    //   onChangeStock(product.id, "OUTPUT");
                    // }}
                  >
                    <Minus size={20} />
                  </ModalOpenButton>
                  <ModalOpenButton
                    type="button"
                    targetId={MODALS.CHANGE_STOCK_FORM}
                    className="btn btn-secondary d-flex align-items-center justify-content-center p-2"
                    // onClick={() => onChangeStock(product.id, "INPUT")}
                  >
                    <Plus size={20} />
                  </ModalOpenButton>
                  <ModalOpenButton
                    type="button"
                    targetId={MODALS.PRODUCT_FORM}
                    className="btn btn-primary d-flex align-items-center justify-content-center p-2"
                    onClick={() => onEdit(product)}
                  >
                    <PencilSimple size={20} />
                  </ModalOpenButton>
                  <ModalOpenButton
                    type="button"
                    targetId={MODALS.PRODUCT_DELETE}
                    className="btn btn-danger d-flex align-items-center justify-content-center p-2"
                    onClick={() => onDelete(product)}
                  >
                    <TrashSimple size={20} />
                  </ModalOpenButton>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
