//  api/user-api.ts
import { Request } from "@/api/axios/request";

const userApi = {
  // 登陆
  login: (ticket: string) => Request.post(`/login?ticket=${ticket}`),
  // 登出
  logout: () => Request.post(`/logout`),
};

export default userApi;