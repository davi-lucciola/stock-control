import { useFilterProducts } from "../hooks/use-filter-products";

export function ProductsFilter() {
  const {
    filter,
    handleChangeName,
    handleChangeMinPrice,
    handleChangeMaxPrice,
    handleFilterProducts,
  } = useFilterProducts();

  return (
    <section className="container collapse w-100" id="product-filter">
      <form className="d-flex flex-row align-items-center justify-content-around gap-5">
        <div className="w-100 d-flex flex-column">
          <label htmlFor="name" className="form-label">
            Nome
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            value={!filter.name ? "" : filter.name}
            onChange={handleChangeName}
          />
        </div>
        <div className="w-100 d-flex flex-column">
          <label htmlFor="name" className="form-label">
            Preço Minimo
          </label>
          <input
            type="number"
            className="form-control"
            name="minPrice"
            id="min-price"
            value={!filter.minPrice ? "" : filter.minPrice}
            onChange={handleChangeMinPrice}
          />
        </div>
        <div className="w-100 d-flex flex-column">
          <label htmlFor="name" className="form-label">
            Preço Máximo
          </label>
          <input
            type="number"
            className="form-control"
            name="maxPrice"
            id="max-price"
            value={!filter.maxPrice ? "" : filter.maxPrice}
            onChange={handleChangeMaxPrice}
          />
        </div>
        <button
          type="button"
          className="btn btn-dark align-self-end"
          onClick={handleFilterProducts}
        >
          Buscar
        </button>
      </form>
    </section>
  );
}
