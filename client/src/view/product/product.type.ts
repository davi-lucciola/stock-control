import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().trim(),
  price: z.number().min(0.01, "O preço do produto deve ser maior que zero."),
});

export type ProductPayload = z.infer<typeof ProductSchema>;
