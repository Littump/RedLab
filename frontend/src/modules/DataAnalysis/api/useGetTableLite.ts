import { useQuery } from "@tanstack/react-query";
import tablesService from "@/modules/DataAnalysis/api/tablesService.ts";
import { GetTableDto } from "@/modules/DataAnalysis/types/getTable.dto.ts";

export const useGetTableLite = (body: GetTableDto) =>
  useQuery({
    queryKey: ["table-lite" + body.id],
    queryFn: () => tablesService.getTableByIdLite(body),
  });
