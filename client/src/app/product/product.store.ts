import { create } from "zustand";
import { Product, ProductFilter } from "@/app/product/product.type";

type ProductFilterStore = {
  filter: ProductFilter;
  setFilters: (filter?: ProductFilter) => void;
};

type SelectedProductStore = {
  product?: Product;
  setProduct: (product?: Product) => void;
};

export const useProductFilterStore = create<ProductFilterStore>((set) => ({
  filter: {},
  setFilters: (filter) => set({ filter }),
}));

export const useSelectedProductStore = create<SelectedProductStore>((set) => ({
  product: undefined,
  setProduct: (product) => set({ product }),
}));
