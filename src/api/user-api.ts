//  api/user-api.ts
import { Request } from "@/api/axios/request";

const userApi = {
  // 登陆
  login: (ticket: string) => Request.post(`/login?ticket=${ticket}&url=${import.meta.env.VITE_APP_FRONT_API_URL}`),
  // 登出
  logout: () => Request.post(`/logout`),
};

export default userApi;