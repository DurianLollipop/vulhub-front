//  api/demo-api.ts
import { Request } from "@/api/axios/request";

const demoApi = {
  test: () => Request.get(`/test/api`),
};

export default demoApi;

