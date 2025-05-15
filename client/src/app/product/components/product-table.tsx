import { MODALS } from "@/components/modal/types";
import { ModalOpenButton } from "@/components/modal/modal-open-button";
import { useQueryProducts } from "@/app/product/hooks/use-query-products";
import { TrashSimple, PencilSimple, Plus, Minus } from "@phosphor-icons/react";
import { useStockProductStore } from "@/app/stock/stock.store";

export function ProductsTable() {
  const { setStockProduct } = useStockProductStore();
  const { products, isPending, setProduct } = useQueryProducts();

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
                    onClick={() => setStockProduct(product, "OUTPUT")}
                  >
                    <Minus size={20} />
                  </ModalOpenButton>
                  <ModalOpenButton
                    type="button"
                    targetId={MODALS.CHANGE_STOCK_FORM}
                    className="btn btn-secondary d-flex align-items-center justify-content-center p-2"
                    onClick={() => setStockProduct(product, "INPUT")}
                  >
                    <Plus size={20} />
                  </ModalOpenButton>
                  <ModalOpenButton
                    type="button"
                    targetId={MODALS.PRODUCT_FORM}
                    className="btn btn-primary d-flex align-items-center justify-content-center p-2"
                    onClick={() => setProduct(product)}
                  >
                    <PencilSimple size={20} />
                  </ModalOpenButton>
                  <ModalOpenButton
                    type="button"
                    targetId={MODALS.PRODUCT_DELETE}
                    className="btn btn-danger d-flex align-items-center justify-content-center p-2"
                    onClick={() => setProduct(product)}
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
