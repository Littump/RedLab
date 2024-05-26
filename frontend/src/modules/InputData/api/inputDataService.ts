import axios from "axios";
import API_URL from "@/config/api.ts";
import { AddFileDto } from "@/modules/InputData/types/file.ts";

class inputDataService {
  async addFile(body: AddFileDto) {
    const form_data = new FormData();
    form_data.append("file", body.file, body.file.path);
    return axios.post(`${API_URL}tabels/`, form_data, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
}

export default new inputDataService();
