import { MessageResponse } from "@/lib/http";
import { Stock, StockFilter, StockPaylod } from "@/app/stock/stock.type";

export interface IStockService {
  fetchStocks(stockFilter: StockFilter): Promise<Stock[]>;
  registerStockIn(stockPayload: StockPaylod): Promise<MessageResponse>;
  registerStockOut(stockPayload: StockPaylod): Promise<MessageResponse>;
}
