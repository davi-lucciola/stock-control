import { useState } from "react";
import { ProductsForm } from "./product-form";
import { ProductsTable } from "./ProductsTable";
import { FunnelSimple, Package } from "@phosphor-icons/react";
import { ModalOpenButton } from "../../components/modal/modal-open-button";
import { MODALS } from "../../components/modal/types";
import { ProductsFilter } from "./product-filter";
import { Product } from "./product.type";

export function ProductsList() {
  const [productToEdit, setProductToEdit] = useState<Product>();
  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false);

  const handleOpenUpdateModal = (product: Product) => {
    setProductToEdit(product);
  };

  // const handleChangeStock = (productId: number, stockType: StockType) => {
  //   setStockPayload({
  //     productId: productId,
  //     quantity: 0,
  //     type: stockType,
  //   });
  // };

  return (
    <>
      <div className="container-fluid w-100 d-flex flex-column p-0">
        <header className="container-fluid d-flex flex-column align-items-center bg-light p-5 gap-4">
          <section
            id="product-actions"
            className="container w-100 d-flex align-center justify-content-between"
          >
            <ModalOpenButton
              type="button"
              targetId={MODALS.PRODUCT_FORM}
              className="btn btn-dark d-flex gap-3 align-items-center"
            >
              Adicionar Produto {<Package size={32} />}
            </ModalOpenButton>
            <h1> Controle de Estoque </h1>
            <button
              className="btn btn-dark align-self-start"
              data-bs-toggle="collapse"
              data-bs-target="#product-filter"
              aria-expanded={filterIsOpen}
              aria-controls="product-filter"
              onClick={() => setFilterIsOpen(!filterIsOpen)}
            >
              {<FunnelSimple size={32} />}
            </button>
          </section>
          <ProductsFilter />
        </header>
        <main className="container-fluid p-5">
          <ProductsTable
            onEdit={handleOpenUpdateModal}
            // onDelete={async (id: number) => {}}
          />
        </main>
      </div>
      <ProductsForm id={MODALS.PRODUCT_FORM} product={productToEdit} />
    </>
  );
}
