//  api/admin-challenge-api.ts
import { Request } from "@/api/axios/request";

const adminChallengeApi = {
  // 挑战管理列表查询
  getAdminChallenges: (params: object) => Request.get(`/admin/challenges`, params),
  // 挑战状态更新接口
  updateChallengesStatus: (params: object) => Request.put(`/admin/challenges/status`, params),
  // 挑战记录接口
  getChallengesRecord: (params: object) => Request.get(`/admin/challenges/record`, params),
};

export default adminChallengeApi;