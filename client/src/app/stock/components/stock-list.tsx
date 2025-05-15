import { useQueryStocks } from "../hooks/use-query-stocks";

export function StockList() {
  const { stocks, isPending } = useQueryStocks();

  if (isPending) {
    return (
      <div
        className="spinner-border align-self-center text-light"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <ul className="mt-5 d-flex flex-column gap-4" data-bs-spy="scroll">
      {stocks &&
        stocks.map((stock) => (
          <li
            key={stock.id}
            className={`d-flex text-white fw-bold card rounded ${
              stock.type == "INPUT" ? "bg-success" : "bg-danger "
            }`}
          >
            <div className="card-body d-flex align-items-center justify-content-between">
              <div className="d-flex flex-column">
                <p> {stock.product.name} </p>
                <p className="d-flex gap-4 justify-content-between fw-bold">
                  {new Date(stock.timestamp * 1000).toLocaleString("pt-BR", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </p>
              </div>
              <span className="fs-5">
                {stock.type == "INPUT" ? "+" : "-"}
                {stock.quantity}
              </span>
            </div>
          </li>
        ))}
    </ul>
  );
}
