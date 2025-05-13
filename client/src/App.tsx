import { StockList } from "./view/inventory";
import { ProductsList } from "./view/product";
import { ProductContextProvider } from "./controller/contexts/ProductContext";
import { ProductService } from "./domain/services/ProductService";
import { StockService } from "./domain/services/StockService";
import { ToastContainer } from "react-toastify";
import { ServiceContextProvider } from "./controller/contexts/service-context";
import "react-toastify/ReactToastify.css";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const stockService = new StockService();
  const productService = new ProductService();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ServiceContextProvider
          stockService={stockService}
          productService={productService}
        >
          <ProductContextProvider productService={productService}>
            <StockList />
            <ProductsList />
          </ProductContextProvider>
        </ServiceContextProvider>
      </QueryClientProvider>
      <ToastContainer
        position="bottom-right"
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </>
  );
}
