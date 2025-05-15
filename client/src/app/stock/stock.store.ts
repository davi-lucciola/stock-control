import { create } from "zustand";
import { Product } from "@/app/product/product.type";
import { StockType } from "@/app/stock/stock.type";

type StockProductStore = {
  product?: Product;
  stockType?: StockType;
  setStockProduct: (product?: Product, stockType?: StockType) => void;
};

export const useStockProductStore = create<StockProductStore>((set) => ({
  product: undefined,
  stockType: undefined,
  setStockProduct: (product, stockType) => set({ product, stockType }),
}));
