import axios from "axios";
import API_URL from "@/config/api.ts";
import LoginDto from "@/modules/Login/types/login.dto.ts";

class loginService {
  async login(body: LoginDto) {
    return axios.post<ILogin>(`${API_URL}auth/token/login/`, body);
  }
  async registration(body: LoginDto) {
    return axios.post(`${API_URL}users/`, body);
  }
  async isExist(username: string) {
    return axios.post<IExist>(`${API_URL}users/is_exist/`, {
      username,
    });
  }
}

export default new loginService();
