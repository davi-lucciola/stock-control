import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import { HttpError, HttpWarning } from "@/lib/http";
import { StockList } from "@/app/stock-history";
import { ProductsList } from "@/app/product";
import { StockService } from "@/services/stock-service";
import { ProductService } from "@/services/product-service";
import { toast, ToastContainer } from "react-toastify";
import { ServiceContextProvider } from "@/services/service-provider";
import "react-toastify/ReactToastify.css";

export function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            if (error instanceof HttpWarning) {
              toast.warn(error.message);
            } else if (error instanceof HttpError) {
              toast.error(error.message);
            } else {
              toast.error("Houve um erro ao realizar sua solicitação.");
            }
          },
        }),
      })
  );
  const stockService = new StockService();
  const productService = new ProductService();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ServiceContextProvider
          stockService={stockService}
          productService={productService}
        >
          <StockList />
          <ProductsList />
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
