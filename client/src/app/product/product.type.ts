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

export const ProductSchema = z.object({
  name: z.string().trim(),
  price: z.coerce.number().min(0.01, "O preço do produto deve ser maior que zero."),
});

export type ProductPayload = z.infer<typeof ProductSchema>;
