import { useQuery } from "@tanstack/react-query";
import tablesService from "@/modules/DataAnalysis/api/tablesService.ts";

export const useGetTable = (id: number) =>
  useQuery({
    queryKey: ["table" + id],
    queryFn: () => tablesService.getTableById(id),
  });
