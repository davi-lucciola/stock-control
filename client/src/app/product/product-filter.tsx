// import { useQueryClient } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useProductFilterStore } from "@/app/product/product.store";

export function ProductsFilter() {
  const queryClient = useQueryClient();
  const { filter, setFilters } = useProductFilterStore();

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
            onChange={(event) =>
              setFilters({ ...filter, name: event.target.value })
            }
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
            onChange={(event) => {
              const value = event.target.value;
              setFilters({
                ...filter,
                minPrice: value ? Number(value) : undefined,
              });
            }}
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
            onChange={(event) => {
              const value = event.target.value;
              setFilters({
                ...filter,
                maxPrice: value ? Number(value) : undefined,
              });
            }}
          />
        </div>
        <button
          type="button"
          className="btn btn-dark align-self-end"
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: ["products"] })
          }
        >
          Buscar
        </button>
      </form>
    </section>
  );
}
