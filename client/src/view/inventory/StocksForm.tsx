import { Modal } from "../../components/modal";
import { ModalCloseButton } from "../../components/modal/modal-close-button";
import { Product } from "../product/product.type";
import { StockPaylod } from "../../models/stock";

type StocksFormProps = {
  id: string;
  product?: Product;
  stockPayload: StockPaylod;
};

export function StocksForm({ id, product, stockPayload }: StocksFormProps) {
  return (
    <Modal
      id={id}
      title={`${product ? product.name : ""} - ${stockPayload.type == "INPUT" ? "Entrada" : "Saída"}`}
      // onClose={onCloseStockForm}
    >
      <form
        // onSubmit={
        //   stockPayload.type == "INPUT" ? handleAddStock : handleRemoveStock
        // }
        autoComplete="off"
      >
        <div className="modal-body">
          <div className="w-100 d-flex flex-column">
            <label htmlFor="name" className="form-label">
              Quantidade
            </label>
            <input
              id="quantity"
              type="number"
              className="form-control"
              name="quantity"
              // onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="modal-footer">
          <ModalCloseButton
            // onClick={onCloseStockForm}
            type="submit"
            className="btn btn-primary"
          >
            {stockPayload.type == "INPUT" ? "Adicionar" : "Remover"}
          </ModalCloseButton>
        </div>
      </form>
    </Modal>
  );
}
