import axios from "axios";
import API_URL from "@/config/api.ts";
import { ITable } from "@/modules/DataAnalysis/types/graph.ts";
import {
  GetTableDto,
  GetTablePaginatedDto,
} from "@/modules/DataAnalysis/types/getTable.dto.ts";

class tablesService {
  async getTableById(id: number) {
    return axios.get<ITable>(`${API_URL}tabels/${id}`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
  async getTablePaginated(body: GetTablePaginatedDto) {
    return axios.get<ITable>(
      `${API_URL}tabels/${body.id}/window/?page=${body.page}&limit=10`,
      {
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      },
    );
  }
  async getTableByIdLite(body: GetTableDto) {
    if (body.start && body.end)
      return axios.get<ITable>(
        `${API_URL}tabels/${body.id}/lite/?start=${body.start}&end=${body.end}`,
        {
          headers: {
            Authorization: "Token " + localStorage.getItem("token"),
          },
        },
      );
    else
      return axios.get<ITable>(`${API_URL}tabels/${body.id}/lite/`, {
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      });
  }
}

export default new tablesService();
