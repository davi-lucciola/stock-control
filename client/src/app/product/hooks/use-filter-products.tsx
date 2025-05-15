import { ChangeEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useProductFilterStore } from "@/app/product/product.store";

export function useFilterProducts() {
  const queryClient = useQueryClient();
  const { filter, setFilters } = useProductFilterStore();

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filter, name: event.target.value });
  };

  const handleChangeMinPrice = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilters({
      ...filter,
      minPrice: value ? Number(value) : undefined,
    });
  };

  const handleChangeMaxPrice = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilters({
      ...filter,
      maxPrice: value ? Number(value) : undefined,
    });
  };

  const handleFilterProducts = () => {
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };

  return {
    filter,
    handleChangeName,
    handleChangeMinPrice,
    handleChangeMaxPrice,
    handleFilterProducts,
  };
}
