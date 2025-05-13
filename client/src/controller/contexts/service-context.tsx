import { ReactNode, createContext } from "react";
import { IProductService } from "../../domain/interfaces/IProduct";
import { IStockService } from "../../domain/interfaces/IStock";

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
