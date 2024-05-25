import { useQuery } from "@tanstack/react-query";
import tablesService from "@/modules/DataAnalysis/api/tablesService.ts";
import { GetTablePaginatedDto } from "@/modules/DataAnalysis/types/getTable.dto.ts";

export const useGetTablePaginated = ({ id, page }: GetTablePaginatedDto) =>
  useQuery({
    queryKey: ["table_paginated" + id, page],
    queryFn: () => tablesService.getTablePaginated({ page, id }),
    // @ts-ignore
    keepPreviousData: true,
  });
