import axios from "axios";
import API_URL from "@/config/api.ts";
import { IUser } from "@/modules/Sidebar/types/user.ts";

class sidebarService {
  async getMe() {
    return axios.get<IUser>(`${API_URL}users/me/`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
  async deleteTable(id: number) {
    return axios.delete(`${API_URL}tabels/${id}`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
}

export default new sidebarService();
