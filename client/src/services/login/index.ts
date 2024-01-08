import { request } from "libs/request";
import { API_URLS } from "./apiConstants";

export const LoginService = {
  doLogin: (body: any) => {
    let url = `${import.meta.env.API_BASE_URL}${API_URLS.login}`;

    const headerOpt = {
      method: "POST",
      contentType: "application/json",
    };

    return request(url, body, headerOpt);
  },
};
