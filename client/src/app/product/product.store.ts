import { create } from "zustand";
import { ProductFilter } from "@/app/product/product.type";

type ProductFilterStore = {
  filter: ProductFilter;
  setFilters: (filter?: ProductFilter) => void;
};

export const useProductFilterStore = create<ProductFilterStore>((set) => ({
  filter: {},
  setFilters: (filter) => set({ filter }),
}));
