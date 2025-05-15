import { MessageResponse } from "@/lib/http";
import { Stock, StockFilter, StockPayload } from "@/app/stock/stock.type";

export interface IStockService {
  fetchStocks(stockFilter: StockFilter): Promise<Stock[]>;
  registerStockIn(stockPayload: StockPayload): Promise<MessageResponse>;
  registerStockOut(stockPayload: StockPayload): Promise<MessageResponse>;
}
