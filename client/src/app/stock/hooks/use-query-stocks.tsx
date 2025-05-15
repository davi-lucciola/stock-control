import { useQuery } from "@tanstack/react-query";
import { useService } from "@/services/use-service";

export function useQueryStocks() {
  const { stockService } = useService();

  const { data: stocks, isPending } = useQuery({
    queryKey: ["stock-history"],
    queryFn: () => stockService.fetchStocks({}),
  });

  return {
    stocks,
    isPending,
  };
}
