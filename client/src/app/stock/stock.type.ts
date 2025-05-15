import { z } from "zod";

export type Stock = {
  id: number;
  product: {
    id: number;
    name: string;
  };
  type: string;
  quantity: number;
  timestamp: number;
};

export type StockType = "INPUT" | "OUTPUT";

export type StockFilter = {
  type?: StockType;
  minDate?: Date;
  maxDate?: Date;
  productId?: number;
};

export const StockSchema = z.object({
  productId: z.coerce.number(),
  quantity: z.coerce.number().min(1, "A quantidade deve ser maior que zero."),
});

export type StockPayload = z.infer<typeof StockSchema>;
