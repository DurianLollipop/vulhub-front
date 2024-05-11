//  api/admin-challenge-api.ts
import { Request } from "@/api/axios/request";

const adminChallengeApi = {
  // 挑战管理列表查询
  getAdminChallenges: (params: object) => Request.get(`/admin/challenges`, params),
  // 挑战状态更新接口
  updateChallengesStatus: (params: object) => Request.put(`/admin/challenges/status`, params),
  // 挑战批量更新接口
  batchChallengesStatus: (params: object) => Request.put(`/admin/challenges/batch/status`, params),
  // 挑战记录接口
  getChallengesRecord: (params: object) => Request.get(`/admin/challenges/record`, params),
  // 文件下载
  downloadFile: (fileName: string) => Request.post(`/admin/wakeup/download/${fileName}`),
};

export default adminChallengeApi;