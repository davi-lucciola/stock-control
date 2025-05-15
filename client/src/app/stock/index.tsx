import { useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { StockList } from "./components/stock-list";

export function StockIndex() {
  const [sideBarOpen, setSideBarOpen] = useState(true);

  return (
    <>
      <div
        data-bs-theme="dark"
        className="vh-100 d-flex flex-row align-items-center"
      >
        <aside
          className={`h-100 collapse show collapse-horizontal bg-dark text-white p-4 overflow-y-auto`}
          id="sidebar"
        >
          <h1 className="fs-3"> Movimentações </h1>
          <hr />
          <StockList />
        </aside>
        <button
          className="h-100 btn btn-dark rounded-0 text-uppercase fs-4"
          data-bs-toggle="collapse"
          data-bs-target="#sidebar"
          aria-controls="sidebar"
          aria-expanded={sideBarOpen}
          onClick={() => setSideBarOpen((prev) => !prev)}
        >
          {sideBarOpen ? <CaretLeft size={20} /> : <CaretRight size={20} />}
        </button>
      </div>
      {/* <StocksForm
        id={MODAL_TYPES.changeStockForm}
        product={productInForm}
        stockPayload={stockPayload}
      /> */}
    </>
  );
}
