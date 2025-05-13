import { ReactNode, createContext } from "react";
import { IProductService } from "./interfaces/iproduct-service";
import { IStockService } from "./interfaces/istock-service";

type IServiceContextData = {
  stockService: IStockService;
  productService: IProductService;
};

type ServiceContextProviderProps = IServiceContextData & {
  children: ReactNode;
};

export const ServiceContext = createContext({} as IServiceContextData);

export function ServiceContextProvider({
  children,
  stockService,
  productService,
}: ServiceContextProviderProps) {
  return (
    <ServiceContext.Provider
      value={{
        stockService,
        productService,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
}
