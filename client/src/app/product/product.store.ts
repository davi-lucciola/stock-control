import {
  ProductFilterStore,
  SelectedProductStore,
} from "@/app/product/product.type";
import { create } from "zustand";

export const useProductFilterStore = create<ProductFilterStore>((set) => ({
  filter: {},
  setFilters: (filter) => set({ filter }),
}));

export const useSelectedProductStore = create<SelectedProductStore>((set) => ({
  selectedProduct: undefined,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
}));
