export interface GetTableDto {
  id: number;
  start?: number | null;
  end?: number | null;
}
export interface GetTablePaginatedDto {
  id: number;
  page: number;
}
