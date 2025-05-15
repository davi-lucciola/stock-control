import { z } from "zod";

export type Product = {
  id: number;
  name: string;
  price: number;
  amount: number;
};

export type ProductFilter = {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
};

export type ProductFilterStore = {
  filter: ProductFilter;
  setFilters: (filter?: ProductFilter) => void;
};

export type SelectedProductStore = {
  product?: Product;
  setProduct: (product?: Product) => void;
};

export const ProductSchema = z.object({
  name: z.string().trim(),
  price: z.coerce
    .number()
    .min(0.01, "O preço do produto deve ser maior que zero."),
});

export type ProductPayload = z.infer<typeof ProductSchema>;
