import { useState } from "react";
import { ProductsForm } from "@/app/product/product-form";
import { ProductsTable } from "@/app/product/product-table";
import { FunnelSimple, Package } from "@phosphor-icons/react";
import { ProductsFilter } from "@/app/product/product-filter";
import { MODALS } from "@/components/modal/types";
import { ModalOpenButton } from "@/components/modal/modal-open-button";
import { ProductDelete } from "@/app/product/product-delete";
import { useSelectedProductStore } from "./product.store";

export function ProductsList() {
  const { setSelectedProduct } = useSelectedProductStore();
  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false);

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
              onClick={() => setSelectedProduct(undefined)}
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
          <ProductsTable />
        </main>
      </div>
      <ProductsForm id={MODALS.PRODUCT_FORM} />
      <ProductDelete id={MODALS.PRODUCT_DELETE} />
    </>
  );
}
